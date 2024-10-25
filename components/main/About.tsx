"use client";
import Image from "next/image";
import React, { useRef } from "react";
import hover3d from "@/utils/hover";

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  //@ts-ignore
  const hoverHero = hover3d(heroRef, {
    x: 50,
    y: -40,
  });
  return (
    <div
      ref={heroRef}
      style={{
        transform: hoverHero.transform,
        transition: hoverHero.transtion,
      }}
      className="w-full h-full flex justify-center"
    >
      <Image
        src={"/download.png"}
        alt="logo"
        height={400}
        width={400}
        className="h-[200px] w-[200px] md:w-[400px] md:h-[400px]"
      />
    </div>
  );
};

export default About;
