"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import Image from "next/image";
import { IoLogoGoogle, IoLogoGithub } from "react-icons/io5";

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
import { AppleLogin, GithubLogin, GoogleLogin, SignIn } from "@/actions/index";
import Video from "@/components/custom/Video";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthProvider";

export default function SignInPage() {
  const { session } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showPassword, setSetShowPassword] = React.useState(false);

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
    let toastid;

    try {
      setIsSubmitting(true);
      if (!data.identifier || !data.password) {
        return toast.error("Please Provide all fields");
      }
      toastid = toast.loading("Signing in...");

      const error = await SignIn(data);

      if (!error) {
        toast.success("You have been logged in.", {
          id: toastid,
        });
        form.reset();
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error(String(error), {
          id: toastid,
        });
      }
      setIsSubmitting(false);
    } catch (error: any) {
      console.log("Error while logging in...", error);
      toast.error(String(error), {
        id: toastid,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGithubLogin = async () => {
    await GithubLogin();
    toast.success("Login using github successfull");
  };

  const handleGoogleLogin = async () => {
    await GoogleLogin();
    toast.success("Login using google successfull");
  };

  const handleAppleLogin = async () => {
    await AppleLogin();
    toast.success("Login using apple successfull");
  };

  /////  handle show password fn //////
  const handleShowPassword = () => {
    setSetShowPassword((prev) => !prev);
  };

  if (session) {
    router.push("/dashboard");
  }

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
              Don&apos;t have an account?{" "}
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
                onClick={handleGoogleLogin}
              >
                <IoLogoGoogle className=" mr-2 text-lg" />
                Login with Google
              </Button>
              <Button
                className="w-full bg-white/80 text-black transition-all hover:bg-white"
                onClick={handleGithubLogin}
              >
                <IoLogoGithub className=" mr-2 text-lg" />
                Login with Github
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Video />
    </div>
  );
}
