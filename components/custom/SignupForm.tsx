"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EyeIcon, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import { IoLogoGoogle } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io5";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "sonner";
import Video from "@/components/custom/Video";
import { GithubLogin, GoogleLogin } from "@/actions";

const SignupForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setSetShowPassword] = useState(false);
  const debounced = useDebounceCallback(setUsername, 500);
  const [signupStatus, setSignupStatus] = React.useState<
    "success" | "error" | null
  >(null);

  useEffect(() => {
    const checkUsernameUniqueness = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");

        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          {
            response.data.message === "Username is unique"
              ? toast(
                  ` ${
                    isCheckingUsername ? (
                      <>
                        <Loader2 className="animate-spin" />
                      </>
                    ) : (
                      `${response.data.message}`
                    )
                  }`
                )
              : toast.error(
                  ` ${
                    isCheckingUsername ? (
                      <>
                        <Loader2 className="animate-spin" />
                      </>
                    ) : (
                      `${response.data.message}`
                    )
                  }`
                );
          }

          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          axiosError.response?.data.message ?? "Error checking username";
          toast.error(`Error while checking username `);
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUniqueness();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    console.log(data);
    setIsSubmitting(true);
    // if (user.username && user.password) {
    //   setSignupStatus("success");
    // } else {
    //   setSignupStatus("error");
    // }
    try {
      setLoading(true);
      const response = await axios.post("/api/sign-up", data);
      toast(`${response.data.message}`);
      toast("Verification email sent successfully");
      console.log("Signup success", response.data);

      setTimeout(() => {
        router.replace(`/verify/${username}?context=signup`);
        setIsSubmitting(false);
      }, 3000);
    } catch (error: any) {
      toast(`${error.response.data.message}`);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
      form.reset({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  const handleShowPassword = () => {
    setSetShowPassword((prev) => !prev);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          {/* =========== Username input ============= */}
          <div className="grid gap-2">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">Username</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-zinc-900 text-neutral-300 border-gray-700
                              "
                      placeholder="John Doe"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);

                        debounced(e.target.value);
                      }}
                    />
                  </FormControl>
                  {/* {isCheckingUsername && (
                            <Loader2 className="animate-spin text-white" />
                          )}
                          <p
                            className={`text-sm ${
                              usernameMessage === "Username is unique"
                                ? "text-green-500"
                                : "text-red-500"
                            } `}
                          >
                            test {usernameMessage}
                          </p> */}

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* =========== Email input ============= */}
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
                      type="email"
                      placeholder="john.doe@gmail.com"
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
                    <FormLabel className="text-white/70">Password</FormLabel>

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
                          <div className="btn" onClick={handleShowPassword}>
                            <EyeOff className="text-white" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="btn" onClick={handleShowPassword}>
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

          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                ...
              </>
            ) : (
              "Signup"
            )}
          </Button>
        </form>
      </Form>
      {/* =========== Devider ============= */}

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
          onClick={GoogleLogin}
        >
          <IoLogoGoogle className=" mr-2 text-lg" />
          Login with Google
        </Button>
        <Button
          className="w-full bg-white/80 text-black transition-all hover:bg-white"
          onClick={GithubLogin}
        >
          <IoLogoGithub className=" mr-2 text-lg" />
          Login with Github
        </Button>
      </div>
    </>
  );
};

export default SignupForm;
