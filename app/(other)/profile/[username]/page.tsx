"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useAuth } from "@/context/AuthProvider";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ProfilePage = ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  const { session, currentUserDetails, fetchCurrentUserDetails } = useAuth();

  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const abortController = new AbortController();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFiles([file]);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: { "image/*": [] },
    onDrop,
  });

  const authenticator = async () => {
    try {
      const response = await fetch("/api/upload-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleClearPreview = () => {

    setPreview(null);
    setFiles([]);
  };

  const handleUpload = async () => {
    if (!files.length) return;
    setUploading(true);

    const toastId = toast.loading("Uploading...");

    const file = files[0];


    let authParams;

    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      toast.error("Authentication failed", {
        id: toastId,
      });
      return;
    }

    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,

        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },

        abortSignal: abortController.signal,
      });

      const response = await axios.patch("/api/update-profile", {
        avatarUrl: uploadResponse.url,
      });


      if (response.status === 200) {
        toast.success("Profile updated successfully", {
          id: toastId,
        });
        setUploading(false);
        setPreview(null);
        fetchCurrentUserDetails();
      } else {
        toast.error("Failed to update profile", {
          id: toastId,
        });
        setUploading(false);
      }
      // Handle the successful upload response here
    } catch (error) {
      toast.dismiss(toastId);

      toast.error("Upload failed", {
        action: {
          label: "Retry",
          onClick: () => {
            handleUpload();
          },
        },
      });

      if (error instanceof ImageKitAbortError) {
        toast.message("Upload aborted", {
          description: `${error.reason}`,
        });
      } else if (error instanceof ImageKitInvalidRequestError) {
        toast.message("Invalid request", {
          description: `${error.message}`,
        });
      } else if (error instanceof ImageKitUploadNetworkError) {
        toast.message("Network error", {
          description: `${error.message}`,
        });
      } else if (error instanceof ImageKitServerError) {
        toast.message("Server error", {
          description: `${error.message}`,
        });
      } else {
        toast.message("Upload error", {
          description: `${error}`,
        });
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className=" text-white px-10 lg:px-20 py-20 lg:grid grid-cols-6 flex flex-col justify-center max-lg:items-center gap-20 w-full lg:gap-12">
      <div className="col-span-2 lg:w-[300px] lg:h-[300px]">
        {currentUserDetails?.avatarUrl && (
          <div className="rounded-full lg:rounded-xl bg-neutral-200 p-2 shadow-lg shadow-neutral-700">
            <div className="rounded-full lg:rounded-none overflow-hidden lg:w-[300px] lg:h-[300px] grid grid-cols-5 justify-between items-center lg:p-2 lg:flex flex-col lg:justify-center">
              <Image
                className="object-cover rounded-full col-span-1 lg:w-[200px] lg:h-[200px]"
                src={currentUserDetails?.avatarUrl}
                alt="Profile Image"
                width={50}
                height={50}
              />
              <h2 className="text-black col-span-4 text-3xl tracking-wide font-bold">
                {session ? session.user.name : params.username}
              </h2>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4">
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 p-8 h-full rounded-xl text-center cursor-pointer hover:bg-neutral-900 flex justify-center items-center"
        >
          {preview ? (
            <div className="flex flex-col items-center">
              <Image
                src={preview}
                alt="Preview"
                height="200"
                width="200"
                className="max-w-xs rounded shadow"
              />
            </div>
          ) : (
            <>
              <input {...getInputProps()} type="file" />
              {isDragActive ? (
                <div className="flex flex-col justify-center items-center">
                  <Download className="text-neutral-500 size-6" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto mb-2 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5z" />
                    <path d="M2 17l10 5 10-5v-7l-10 5L2 10v7z" />
                  </svg>
                  <p>Drop your image here...</p>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <Download className="text-neutral-500 size-6" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto mb-2 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5z" />
                    <path d="M2 17l10 5 10-5v-7l-10 5L2 10v7z" />
                  </svg>
                  <p>Drag and drop an image, or click to select</p>
                </div>
              )}
            </>
          )}
        </div>

        {uploading && (
          <Progress
            className="my-6 bg-white text-blue-500"
            value={progress}
            max={100}
          >
            Status: {progress}%
          </Progress>
        )}

        <div className="flex gap-5 justify-center items-center my-10 w-full">
          <button
            onClick={handleClearPreview}
            disabled={files.length > 0 ? false : true}
            className="bg-neutral-200 tracking-wide text-black py-2 px-4 rounded hover:bg-blue-700"
          >
            Clear
          </button>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-blue-600 text-white py-2 px-4 tracking-wide rounded hover:bg-blue-700"
          >
            {uploading ? (
              <>
                <span className="flex gap-2 items-center">
                  <Loader2 className="animate-spin " />
                  <p>Uploading...</p>
                </span>
              </>
            ) : (
              "Update Avatar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
