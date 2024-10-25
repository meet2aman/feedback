"use client";
import React, { useRef } from "react";
import About from "@/components/main/About";
import hover3d from "@/utils/hover";

export function DotBackgroundDemo() {
  const heroRef = useRef<HTMLDivElement>(null);
  //@ts-ignore
  const hoverHero = hover3d(heroRef, {
    x: 30,
    y: -30,
  });
  return (
    <section>
      <div
        className="px-[1rem] lg:px-[6.5rem]"
        ref={heroRef}
        style={{
          transform: hoverHero.transform,
          transition: hoverHero.transtion,
        }}
      >
        <div className="h-[30rem] md:h-[50rem] w-full dark:bg-black bg-dot-white/[0.2] flex items-center justify-center">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="flex flex-col justify-center items-center">
            <About />
            <p className="text-4xl sm:text-7xl font-bold z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
              Building the modern feedback platform
            </p>
          </div>
        </div>
      </div>
      <p className="text-3xl sm:text-3xl font-semibold z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center px-[1rem] lg:px-[6.5rem]">
        Welcome to the future of feedback: where honesty thrives, voices are
        heard, and anonymity empowers. Join us in revolutionizing the way
        feedback is given and received, making transparency and openness
        accessible to all
      </p>
    </section>
  );
}
