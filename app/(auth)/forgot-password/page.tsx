"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import Image from "next/image";
import { IoLogoGithub, IoLogoGoogle } from "react-icons/io5";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import axios from "axios";
import { toast } from "sonner";
import { GithubLogin, GoogleLogin } from "@/actions";
import Video from "@/components/custom/Video";

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  /// zod impliments ///
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  /////  handle on Submit form fn //////
  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    setIsSubmitting(true);

    const response = await axios.post("/api/forgot-password", {
      email: data.email,
    });

    toast("Password updatation Status", { description: response.data.message });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  /////  handle on google fn //////
  const onGoogleClick = async () => {
    await GoogleLogin();
    toast("Login with google successfull");
  };

  /////  handle on github fn //////
  const onGithubClick = async () => {
    await GithubLogin();
    toast("Login with github successfull");
  };

  return (
    <div className="w-full flex flex-col items-center justify-between lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:mt-8">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex justify-center items-center mb-4">
              <Image
                src={"/download.png"}
                alt={"logo"}
                width={50}
                height={50}
              />
            </div>
            <h1 className="text-[1.2rem] font-semibold text-white tracking-wide font-poppins ">
              Forgot password
            </h1>
            <div className="text-center text-md text-slate-400">
              If you want to{" "}
              <Link
                href="/sign-in"
                className="underline text-blue-500 hover:text-blue-700 transition-all"
              >
                Login
              </Link>
            </div>
          </div>
          {isSubmitted ? (
            <>
              <p className="text-center text-md text-slate-400">
                Check your Inbox whe have send a link to your email address.
              </p>
            </>
          ) : (
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4"
                >
                  {/* =========== Email or username input ============= */}
                  <div className="grid gap-2">
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70">Email</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-zinc-900 text-neutral-300 border-gray-700"
                              placeholder="Enter your registered email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* =========== Button ============= */}

                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                        wait ...
                      </>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </form>
              </Form>

              {/* =========== divider ============= */}

              <div className="mb-6 mt-6 flex items-center justify-center">
                <div
                  aria-hidden="true"
                  className="h-px w-full bg-neutral-700"
                  data-orientation="horizontal"
                  role="separator"
                />
                <span className="mx-4 text-xs text-slate-11 font-normal text-white">
                  OR
                </span>
                <div
                  aria-hidden="true"
                  className="h-px w-full bg-neutral-700"
                  data-orientation="horizontal"
                  role="separator"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  className="w-full bg-white/80 text-black transition-all hover:bg-white"
                  onClick={onGoogleClick}
                >
                  <IoLogoGoogle className=" mr-2 text-lg" />
                  Login with Google
                </Button>
                <Button
                  className="w-full bg-white/80 text-black transition-all hover:bg-white"
                  onClick={onGithubClick}
                >
                  <IoLogoGithub className=" mr-2 text-lg" />
                  Login with Github
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Video />
    </div>
  );
}
