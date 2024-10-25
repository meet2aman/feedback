"Use client";
import React from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Message, User } from "@/models/User";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { dateConverter } from "@/utils/cn";
import { SessionType } from "@/types/next-auth";
import { toast } from "sonner";

type MessageCardProps = {
  user: SessionType;
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ user, message, onMessageDelete }: MessageCardProps) => {
  const handleDeleteConfirm = async () => {
    const response = await axios.delete<ApiResponse>(`/api/delete-message`, {
      data: {
        messageId: message._id,
        userId: user._id,
      },
    });
    toast(response.data.message);
    onMessageDelete(message.id);
  };
  const date = dateConverter(message.createdAt);

  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-md">{message.content}</p>
        <CardDescription>{date}</CardDescription>
        <AlertDialog>
          <AlertDialogTrigger asChild className="mt-5">
            <Button variant="destructive" className="text-sm !py-2">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="mt-8">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently
                <span className="line-through mx-1 text-[#ef4444]">delete</span>
                your message from our database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
