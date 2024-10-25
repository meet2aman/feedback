"use client";
import MessageCard from "@/components/main/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Message } from "@/models/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Glitch from "@/components/sub/Glitch";
import VerifyModal from "@/components/main/VerifyModal";
import { SessionType } from "@/types/next-auth";

const DashboardUserDetails = ({ user }: { user: SessionType }) => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");

  /* ============= zod implimentation ============ */
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  /* ============= handleSwitchChange ============ */
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
        userId: user._id,
      });
      setValue("acceptMessages", !acceptMessages);
      toast(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast(axiosError.response?.data.message || "Failed to Fetch messages");
    }
  };

  /* ============= fetch status of accepting Message function ============ */
  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.post(`/api/fetch-accept-message`, {
        userId: user._id,
      });
      setValue("acceptMessages", response.data.isAcceptingMessage);
    } catch (error: any) {
      toast(error?.response?.data?.message || "Failed to Fetch message status");
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  /* ============= Fetch message function ============ */

  const fetchMessages: any = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get(`/api/get-messages`);
        console.log("response :: ", response?.data?.messages);
        setMessages(response?.data?.messages || []);
        if (refresh) {
          toast("Refreshed messages", {
            description: "Showing latest messages",
          });
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to Fetch messages"
        );
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  /* ============= generating profileUrl ============ */
  useEffect(() => {
    if (user.username) {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      setProfileUrl(`${baseUrl}/u/${user.username}`);
    }
  }, [user.username]);

  /* ============= Delete message function ============ */
  const handleDeleteMessage = (messageId: string) => {
    console.log("messageId", messageId);
    setMessages(messages.filter((message) => message._id !== messageId));
    router.refresh();
  };

  /* ============= useEffect Hook ============ */

  useEffect(() => {
    if (!user.username) return;
    fetchAcceptMessages();
    fetchMessages();
  }, [setValue, fetchAcceptMessages, user]);

  /* ============= Copy function ============ */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast("URL copied", {
      description: "Profile URL has been copied successfully",
    });
  };
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold mb-4 capitalize">
          {user.username}&apos;s Dashboard
        </h1>
        {user?.isVerified === false ? (
          <VerifyModal userName={user.username} />
        ) : (
          <div className="relative">
            <Button onClick={() => {}} disabled>
              Verified
            </Button>
            <span className="absolute flex h-3 w-3 top-0 left-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 -top-1 -left-1"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 -top-1 -left-1"></span>
            </span>
          </div>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{" "}
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2 bg-neutral-300 rounded"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
          <Button
            className="ml-2"
            onClick={() => {
              router.replace(profileUrl);
            }}
          >
            Go
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? "On" : "Off"}
        </span>
      </div>
      <Separator />
      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={index}
              message={message}
              onMessageDelete={handleDeleteMessage}
              user={user}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </>
  );
};

export default DashboardUserDetails;
