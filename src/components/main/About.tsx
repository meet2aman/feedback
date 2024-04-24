"use client";
import Image from "next/image";
import React, { useRef } from "react";
import hover3d from "@/utils/hover";

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  //@ts-ignore
  const hoverHero = hover3d(heroRef, {
    x: 30,
    y: -40,
    z: 30,
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
      <Image src={"/download.png"} alt="logo" height={300} width={400} />
    </div>
  );
};

export default About;
