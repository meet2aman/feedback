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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

const ProfilePage = ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  const session = useAuth();
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleUpload = async () => {
    if (!files.length) return;
    setUploading(true);

    // Access the file input element using the ref
    // const fileInput = fileInputRef.current;
    // console.log(fileInput);
    // if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    //   alert("Please select a file to upload");
    //   return;
    // }

    // Extract the first file from the file input
    const file = files[0];
    console.log(file);
    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name, // Optionally set a custom file name
        // Progress callback to update upload progress state
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        // Abort signal to allow cancellation of the upload if needed.
        abortSignal: abortController.signal,
      });
      console.log("Upload response:", uploadResponse);
      const response = await axios.patch("/api/update-profile", {
        avatarUrl: uploadResponse.url,
      });
      if (response.data.status === 200) {
        console.log("Profile updated successfully");
        setUploading(false);
        setPreview(null);
      } else {
        console.log("Error updating profile");
        setUploading(false);
      }
      // Handle the successful upload response here
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <div className=" text-white px-20 py-20 space-y-4 grid grid-cols-6 gap-4">
      <div className="col-span-2 w-[300px] h-[300px]">
        ProfilePage of {params.username}
        {session?.avatarUrl && (
          <div className="rounded-full bg-white p-2">
            <div className="rounded-full overflow-hidden w-[300px] h-[300px]">
              <Image
                className="object-cover"
                src={session?.avatarUrl}
                alt="Profile Image"
                width={300}
                height={200}
              />
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4 p-6">
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 p-8 h-full rounded-xl text-center cursor-pointer hover:bg-neutral-900"
        >
          <input {...getInputProps()} type="file" ref={fileInputRef} />
          {isDragActive ? (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-2 text-gray-500"
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
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-2 text-gray-500"
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
        </div>
        {preview && (
          <div className="flex flex-col items-center">
            <Image
              src={preview}
              alt="Preview"
              height="200"
              width="200"
              className="max-w-xs rounded shadow"
            />
          </div>
        )}
        {files.length > 0 && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        )}
        Upload progress: {progress === 100 ? "Upload complete" : `${progress}%`}
        <Progress value={progress} max={100}>
          Status: {progress}%
        </Progress>
      </div>
    </div>
  );
};

export default ProfilePage;
