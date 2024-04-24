"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { IoLogoGoogle } from "react-icons/io5";
import { useToast } from "@/components/ui/use-toast";
export default function SignInPage() {
  const { toast } = useToast();

  const { data: session } = useSession();
  console.log(session);
  const onGoogleClick = () => {
    toast({
      className: "py-3",
      title: "Coming soon 😃",
    });
  };

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
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
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="underline text-blue-500 hover:text-blue-700 transition-all"
              >
                Sign up.
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline text-white"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
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
