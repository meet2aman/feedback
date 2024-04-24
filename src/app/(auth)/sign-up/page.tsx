"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useGlobal } from "@/context/GlobalProvider";
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

export default function SignUpPage() {
  const { toast } = useToast();
  const router = useRouter();

  /// ZOD checkings
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  /// states
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
              ? toast({
                  className:
                    "py-4 bg-green-600 text-white font-semibold border-none tracking-wide",
                  description: ` ${
                    isCheckingUsername ? (
                      <>
                        <Loader2 className="animate-spin" />
                      </>
                    ) : (
                      `${response.data.message}`
                    )
                  }`,
                })
              : toast({
                  className: "py-4 font-semibold border-none tracking-wide",
                  variant: "destructive",
                  description: ` ${
                    isCheckingUsername ? (
                      <>
                        <Loader2 className="animate-spin" />
                      </>
                    ) : (
                      `${response.data.message}`
                    )
                  }`,
                });
          }

          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          axiosError.response?.data.message ?? "Error checking username";
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
    if (user.username && user.password) {
      setSignupStatus("success");
    } else {
      setSignupStatus("error");
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/sign-up", data);
      toast({
        value: "success",
        description: "Signed up successfully",
      });
      toast({
        description: "Verification email sent successfully",
      });
      console.log("Signup success", response.data);

      setTimeout(() => {
        router.replace(`/verify/${username}`);
        setIsSubmitting(false);
      }, 3000);
    } catch (error: any) {
      console.log("Signup failed", error.message);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Signup failed",
        description: `Sign up Failed${errorMessage}`,
        variant: "destructive",
      });
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setSetShowPassword((prev) => !prev);
  };

  const { user, setUser }: any = useGlobal();
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  const onGoogleClick = () => {
    toast({
      title: "Coming soon 😃",
    });
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-between lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:mt-8">
        <div className="flex items-center justify-center pb-12">
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
                Create a Feedback account
              </h1>
              <div className="text-center text-md text-slate-400">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="underline text-blue-500 hover:text-blue-700 transition-all"
                >
                  Log In
                </Link>
              </div>
            </div>
            {/* ============ form div ========== */}

            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4"
                >
                  {/* =========== Username input ============= */}
                  <div className="grid gap-2">
                    <FormField
                      name="username"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70">
                            Username
                          </FormLabel>
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
                      "Signup"
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

              <Button
                className="w-full bg-white/80 text-black transition-all hover:bg-white"
                onClick={onGoogleClick}
              >
                <IoLogoGoogle className=" mr-2 text-lg" />
                Login with Google
              </Button>
            </div>
            <p className="text-white/70 text-xs tracking-wide">
              By signing up, you agree to our{" "}
              <span className="text-blue-500">terms</span> and{" "}
              <span className="text-blue-500">privacy policy</span>.
            </p>
          </div>
        </div>

        {/* ============ video div ========== */}

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
    </>
  );
}
