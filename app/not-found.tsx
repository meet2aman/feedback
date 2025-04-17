import Video from "@/components/custom/Video";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const NotFound = () => {
  return (
    <div className="lg:grid grid-cols-6 h-screen">
      <div className="col-span-3">
        <Video />
      </div>
      <div className="col-span-3 justify-self-center content-center space-y-4 flex justify-center items-center flex-col">
        <div className=" lg:flex justify-center items-center">
          <Image
            className=""
            src={"/feedback.png"}
            alt="logo"
            height={400}
            width={400}
          />
        </div>
        <h2 className="text-white text-3xl">404 Page not Found</h2>
        <Link
          href={"/"}
          className="text-md mt-5 bg-white transition-all hover:bg-white/90 px-4 py-2 cursor-pointer rounded-full flex justify-center items-center gap-1 font-[500]"
        >
          <button>Home</button>
          <IoIosArrowForward />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
