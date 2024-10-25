import React from "react";
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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const VerifyModal = (userName: any) => {
  const router = useRouter();
  const handleVerifyAccount = async () => {
    try {
      const response = await axios.post("/api/dashboard-verify-code", {
        username: userName.userName,
      });
      toast(`${response.data.message}`);
      router.push(`/verify/${userName.userName}?context=dashboard`);
    } catch (error: any) {
      toast(`${error.response.data.message}`);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Verify</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Verify your account.</AlertDialogTitle>
          <AlertDialogDescription>
            Your account is
            <span className="mx-1 text-red-500">not verified.</span>
            Please
            <span className="mx-1 text-green-500">verify</span>
            Your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleVerifyAccount}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VerifyModal;
