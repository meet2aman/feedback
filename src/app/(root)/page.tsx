"use client";
import { useToast } from "@/components/ui/use-toast";
import { month, weekday } from "@/constants/constants";
import Hero from "@/components/main/Hero";
import { Spotlight } from "@/components/ui/Spotlight";
import React, { useEffect } from "react";
import { Experience } from "@/components/main/Experience";
import { DotBackgroundDemo } from "@/components/ui/dotBackground";

export default function Home() {
  const { toast } = useToast();
  const date = new Date();
  const year = date.getFullYear();
  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const d = date.getDate();
  const day = weekday[date.getDay()];
  const months = month[date.getMonth()];
  useEffect(() => {
    toast({
      title: "🎊 Welcome to Feedback 🎊 ",
      description: `${day}, ${months} ${d}, ${year} at ${hours}:${minutes} ${ampm} | ⏰   Hope We can Serve You better !
      `,
    });
  }, []);
  return (
    <>
      <main className="bg-black">
        <Spotlight className="hidden xl:block" />
        <Hero />
        <DotBackgroundDemo />
      </main>
    </>
  );
}
