"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import Image from "next/image";
import { IoLogoGoogle, IoLogoGithub } from "react-icons/io5";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas/signInSchema";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EyeIcon, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import { signIn } from "@/auth";

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showPassword, setSetShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  /// zod impliments ///
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  /////  handle on Submit form fn //////
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    const response = await axios.post("/api/sign-in", {
      identifier: data.identifier,
      password: data.password,
    });
    console.log(response);
    if (response.data.success === true) {
      toast({
        className: "py-4",
        title: response.data.message,
      });
      router.replace("/dashboard");
      setIsSubmitting(false);
    }

    if (response.data.success === false) {
      toast({
        className: "py-3 !font-[400] text-white",
        title: response.data.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
    setIsSubmitting(false);
  };

  /////  handle on google fn //////
  const onGoogleClick = () => {
    toast({
      className: "py-3",
      title: "Coming soon 😃",
    });
  };
  const onGithubClick = async () => {
    await signIn("github");
  };

  /////  handle show password fn //////
  const handleShowPassword = () => {
    setSetShowPassword((prev) => !prev);
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
              Login to Feedback
            </h1>
            <div className="text-center text-md text-slate-400">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="underline text-blue-500 hover:text-blue-700 transition-all"
              >
                Sign up.
              </Link>
            </div>
          </div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                {/* =========== Email input ============= */}
                <div className="grid gap-2">
                  <FormField
                    name="identifier"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70">
                          Email or Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-zinc-900 text-neutral-300 border-gray-700"
                            placeholder="Email or Username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* =========== Password input ============= */}
                <div className="grid gap-2">
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel className="text-white/70">
                            Password
                          </FormLabel>

                          <Link
                            href="/forgot-password"
                            className="ml-auto inline-block text-sm underline text-white/70 border-none hover:text-white transition-all"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <div className="grid grid-cols-6 gap-2 justify-center items-center">
                          <FormControl>
                            <Input
                              className="col-span-5 bg-zinc-900 text-neutral-300 border-gray-700"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <div className="col-span-1 cursor-pointer h-full w-full">
                            {showPassword ? (
                              <>
                                <div
                                  className="btn"
                                  onClick={handleShowPassword}
                                >
                                  <EyeOff className="text-white" />
                                </div>
                              </>
                            ) : (
                              <>
                                <div
                                  className="btn"
                                  onClick={handleShowPassword}
                                >
                                  <EyeIcon className="text-white" />
                                </div>
                              </>
                            )}
                          </div>
                        </div>

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
                    "Login"
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

            <div className="flex justify-between items-center gap-2">
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
        </div>
      </div>
      <div className="bg-black w-full h-full flex items-center justify-center">
        <div className="bg-muted  w-full !bg-black flex items-center justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-[225px] w-[225px] lg:h-[300px] lg:w-[300px]  xl:h-[500px] xl:w-[500px]"
            height="300"
            poster="/static/cube-fallback.jpg"
            src="./cube.mp4"
            width="300"
          />
        </div>
      </div>
    </div>
  );
}
