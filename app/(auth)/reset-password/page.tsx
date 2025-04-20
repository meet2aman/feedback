"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
import axios from "axios";
import Video from "@/components/custom/Video";

export default function ResetPassword() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [token, setToken] = useState<string | "">("");

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

  }, []);

  /// zod impliments ///
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  /////  handle on Submit form fn //////
  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    try {
      if (!data.password && !data.confirmPassword) {
        toast("Please enter your password");
        return;
      }
      if (data.password !== data.confirmPassword) {
        toast("Passwords do not match");
        return;
      }

      setIsSubmitting(true);

      const response = await axios.post("/api/reset-password", {
        token,
        password: data.password,
      });
      toast(response.data.message);

      if (response.status === 200) {
        toast("Password updated Successfully!");

        setIsSubmitting(false);
      }
      setIsSubmitting(false);
      router.push("/sign-in");
    } catch (error: any) {
      toast("Password Updation Failed");
    }
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
              Reset Your password
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
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                {/* =========== Email or username input ============= */}
                <div className="grid gap-2">
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70">
                          New Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-zinc-900 text-neutral-300 border-gray-700"
                            placeholder="Enter new password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    name="confirmPassword"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 tracking-wide">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-zinc-900 text-neutral-300 border-gray-700"
                            placeholder="Confirm Password"
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
          </div>
        </div>
      </div>
      <Video />
    </div>
  );
}
