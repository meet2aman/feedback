"use client";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/models/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { profile } from "console";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [data, setData] = React.useState("");

  const { toast } = useToast();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message.id !== messageId));
  };

  // const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/user-details");
      console.log(response);
      setData(response.data.data.username);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessage);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        className: "py-3",
        title: "Error",
        description:
          axiosError.response?.data.message || "Failed to Fetch message status",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages: any = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response?.data?.messages || []);
        if (refresh) {
          toast({
            className: "py-3",
            title: "Refreshed messages",
            description: "Showing latest messages",
          });
        }
      } catch (error: any) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          className: "py-3",
          title: "Error",
          description:
            axiosError.response?.data.message ||
            "Failed to Fetch message status",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    getUserDetails();
    // if (data. || !session.user) return;
    // fetchMessages();
    // fetchAcceptMessages();
  }, [setValue, fetchAcceptMessages, fetchMessages]);

  // handleSwitchChange
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast({
        title: response.data.message,
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        className: "py-3",
        title: "Error",
        description:
          axiosError.response?.data.message || "Failed to Fetch messages",
        variant: "destructive",
      });
    }
  };

  // const { username } = session?.user as User;

  // const baseUrl = `${window.location.protocol}//${window.location.host}`;
  // const profileUrl = `${baseUrl}/u/${username}`;

  // const copyToClipboard = () => {
  //   navigator.clipboard.writeText(profileUrl);
  //   toast({
  //     title: "URL copied",
  //     description: "Profile URL has been copied successfully",
  //   });
  // };

  if (!data) {
    return (
      <>
        <div className="text-white font-semibold tracking-wide text-xl text-center px-10 py-20">
          Please login to see the dashboard
          <Link
            className="text-xl text-blue-500 hover:text-blue-600 underline transition-all ml-2"
            href={"/sign-in"}
          >
            Login
          </Link>
        </div>
      </>
    );
  }

  return <h1 className="text-white">DashBoard of {data}</h1>;
}
