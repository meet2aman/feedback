"use client";
import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Mail, Router } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGlobal } from "@/context/GlobalProvider";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import Link from "next/link";
import { verifySchema } from "@/schemas/verifySchema";
import { useRouter } from "next/navigation";
const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify({
  params,
}: {
  params: {
    username: string;
  };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const username = params.username;
  const { user }: any = useGlobal();
  const [verified, setVerified] = React.useState(false);
  const [error, setError] = React.useState("");
  console.log(verified);
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      pin: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log(data);
      const response = await axios.post("/api/verify-code", {
        code: data.pin,
        username: username,
      });

      toast({
        className: "py-4",
        description: `${response.data.message}`,
      });

      if (response.data.success === true) {
        setVerified(true);
      }

      router.replace(`/sign-in`);
    } catch (error: any) {
      console.error("Problem occurred while verifying the account", error);
      toast({
        variant: "destructive",
        description: "Problem occurred while verifying the account",
      });
      setError(
        "An error occurred while verifying the account. Please try again later."
      );
    }
  }

  return (
    <section className="flex justify-center items-center my-40">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="font-semibold text-3xl">
            {verified
              ? "Your Account has been verified successfully"
              : "Verify Your Account"}
          </CardTitle>
          {verified ? (
            <>
              <CardDescription>
                <Link href={"/sign-in"}>
                  <Button>
                    {" "}
                    <Mail className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              </CardDescription>
            </>
          ) : (
            <>
              <CardDescription>
                Hello <span className="font-bold">{username}</span> we have sent
                an OTP on your Email{" "}
                <span className="font-bold">{user.email}</span>
              </CardDescription>
            </>
          )}
        </CardHeader>
        {!verified && (
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your Email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">
                  {" "}
                  <Mail className="mr-2 h-4 w-4" />
                  Verify
                </Button>
              </form>
            </Form>
          </CardContent>
        )}
      </Card>
    </section>
  );
}
