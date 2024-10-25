"use client";

import { month, weekday } from "@/constants/constants";
import Hero from "@/components/main/Hero";
import { Spotlight } from "@/components/ui/Spotlight";
import React, { useEffect } from "react";
import { Experience } from "@/components/main/Experience";
import { DotBackgroundDemo } from "@/components/ui/dotBackground";
import Swiper from "@/components/sub/Swiper";
import Collab from "@/components/main/Collab";
import { toast } from "sonner";

export default function Home() {
  const date = new Date();
  const year = date.getFullYear();
  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const d = date.getDate();
  const day = weekday[date.getDay()];
  const months = month[date.getMonth()];
  useEffect(() => {
    toast("🎊 Welcome to Feedback 🎊 ", {
      description: `${day}, ${months} ${d}, ${year} at ${hours}:${minutes} ${ampm} | ⏰   Hope We can Serve You better !
      `,
    });
  }, []);
  return (
    <>
      <main className="bg-black">
        <Spotlight className="hidden xl:block" />
        <Hero />
        <Collab />
        <Swiper />
        <DotBackgroundDemo />
      </main>
    </>
  );
}
