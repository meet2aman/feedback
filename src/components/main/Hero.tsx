import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const Hero = () => {
  return (
    <>
      <main>
        <section className="flex flex-col xl:flex-row justify-center xl:justify-between items-center px-5 -z-10  w-[100%] xl:gap-20 xl:px-[10rem]">
          {/* ================= Video  =============== */}
          <div className="relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-[225px] w-[225px] xl:w-[800px] xl:h-[640px] -z-50"
              height="300"
              poster="./cube-fallback.jpg"
              src="./cube.mp4"
              width="300"
            />
          </div>

          {/* ================= right div  =============== */}

          <div className="flex flex-col justify-center items-center xl:items-start">
            {/* ================= chip =============== */}

            <div className="flex items-center justify-center md:inline-flex">
              <Link
                className="rainbowBorder mb-6 inline-flex items-center justify-center text-[13px] bg-white p-[1.4px] rounded-full bg-gradient-to-r from-green-700 via-orange-700 to-purple-700"
                href="/blog/send-marketing-emails-with-resend-broadcasts"
              >
                <span className="inline-flex tracking-wide text-white items-center gap-1 whitespace-nowrap px-3 bg-gray-900 py-1 rounded-full">
                  Introducing Feedback
                  <IoIosArrowForward />
                </span>
              </Link>
            </div>

            {/* ================= Heading =============== */}

            <h1 className="text-[3rem] xl:text-[5rem] tracking-wide text-white/80 text-center leading-[50px] lg:leading-[80px] font-favorit font-[600] xl:text-start">
              Anonymous Feedback <br /> System
            </h1>
            <p className="my-5 text-gray-400 text-center text-md tracking-wide leading-6 xl:text-start">
              The best way to reach humans instead of spam folders. Deliver
              transactional and marketing emails at scale.
            </p>
            {/* ================= buttons =============== */}

            <div className="xl:flex gap-3">
              <Link
                href={"/sign-up"}
                className="text-md mt-5 bg-white transition-all hover:bg-white/90 px-4 py-2 cursor-pointer rounded-full flex justify-center items-center gap-1 font-[500]"
              >
                <button>Get Started</button>
                <IoIosArrowForward />
              </Link>
              <div
                className="text-md mt-5 bg-transparent transition-all hover:bg-zinc-900/90 px-4 py-2 cursor-pointer rounded-full flex justify-center 
                text-white items-center gap-1 font-[500]"
              >
                <button>Anonymous</button>
                <IoIosArrowForward />
              </div>
            </div>
          </div>
        </section>
        {/* ================= backed by bar =============== */}

        <div className="flex justify-center text-sm items-center tracking-wide text-gray-300 p-4 pb-24">
          Backed By{" "}
          <span className="bg-zinc-900/90 rounded-xl ml-2 px-3 py-1">
            Aman kushwaha
          </span>
        </div>
      </main>
    </>
  );
};

export default Hero;
