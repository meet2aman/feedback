"use client";
import SendMessage from "@/components/custom/SendMessage";
import SuggestMessage from "@/components/custom/SuggestMessage";
import { User } from "lucide-react";

const MessagePage = ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  return (
    <main className="flex justify-center items-start gap-5 lg:px-8">
      <div className=" hidden lg:flex lg:fixed top-0 left-0 items-center justify-center h-screen border-r-[0.7px] border-neutral-800 w-[10%]">
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-[4rem] uppercase tracking-widest font-black whitespace-nowrap -rotate-90 text-center">
          user&apos;s Page
        </span>
      </div>

      <div className="mt-2 rounded max-w-6xl w-full p-6 overflow-auto capitalize ml-[11rem]">
        <div className="">
          <div className="grid gap-8 items-start justify-center">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <button className="relative px-7 py-3 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600">
                <span className="flex items-center space-x-5">
                  <User className="text-pink-500" />
                  <span className="pr-6 text-gray-100 tracking-wide">
                    Welcome to Feedback
                  </span>
                </span>
                <span className="pl-6 uppercase tracking-wide text-indigo-400 group-hover:text-gray-100 transition duration-200">
                  {params.username} &rarr;
                </span>
              </button>
            </div>
          </div>
          <SendMessage username={params?.username} />
        </div>
        <SuggestMessage />
      </div>
    </main>
  );
};

export default MessagePage;
