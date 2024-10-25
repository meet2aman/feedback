"use server";

import { signIn, signOut } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

export async function SignIn(data: { identifier: string; password: string }) {
  try {
    await signIn("credentials", {
      identifier: data.identifier,
      password: data.password,
      redirect: true,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause?.err?.message;
  }
}

export async function SignOut() {
  try {
    await signOut();
    redirect("/");
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
}

export async function GithubLogin() {
  await signIn("github");
}

export async function GoogleLogin() {
  await signIn("google");
}

export async function AppleLogin() {
  await signIn("apple");
}
