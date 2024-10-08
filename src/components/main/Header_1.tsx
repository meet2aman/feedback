"use client";
import React, { useCallback } from "react";
import { navLinks } from "@/constants/constants";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGlobal } from "@/context/GlobalProvider";
import { useToast } from "../ui/use-toast";
import axios from "axios";

const Header_1 = () => {
  const pathname = usePathname();
  const [toggle, setToggle] = React.useState(false);
  const { toast } = useToast();
  const { user, setUser }: any = useGlobal();

  console.log(user);

  const handleSignOut = async () => {
    await axios.get("/api/sign-out");
    toast({
      className: "py-3",
      description: "Logout successfully",
    });
    setUser(undefined);
    window.location.reload();
  };
  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
        }}
        style={{ backdropFilter: "blur(10px)" }}
        className={cn(
          "flex z-50 sticky top-0 items-center md:bg-transparent justify-between px-[1.5rem] lg:px-[5.6rem] py-2 2xl:px-[6.6rem] 2xl:py-[0.86rem] bg-slate-900/20 border-b-[0.2px] border-neutral-700"
        )}
      >
        {/* logo */}
        <div>
          <Link href={"/"}>
            <h2 className="text-[1.3rem] md:text-[1.3rem] text-white font-semibold leading-none">
              Feedback
            </h2>
          </Link>
        </div>
        {/* navlinks */}
        <div className="hidden lg:block">
          <ul className="flex items-center justify-center gap-8 tracking-wide">
            {navLinks.map((items) => {
              const isActive =
                pathname === items.url || pathname.startsWith(`${items.url}/`);
              return (
                <li key={items.title}>
                  <Link
                    href={items.url}
                    className={cn(
                      `text-[14px] text-neutral-400 hover:text-slate-200 transition-all`,
                      {
                        "text-white": isActive,
                      }
                    )}
                  >
                    {items.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="block lg:hidden">
          {toggle ? (
            <>
              <button
                onClick={() => setToggle((prev) => !prev)}
                className="cursor-pointer transition-all hover:bg-gray-400/30 rounded-md"
              >
                <IoClose className="text-slate-400 text-[2.6rem]" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setToggle((prev) => !prev)}
                className="cursor-pointer transition-all hover:bg-gray-400/30 rounded-md"
              >
                <IoMenu className="text-slate-400 text-[2.6rem]" />
              </button>
            </>
          )}
        </div>

        {/* ============= functional buttons ============ */}
        <div className="hidden lg:flex gap-3">
          {user?._id ? (
            <>
              <button
                onClick={handleSignOut}
                className="text-white text-[14px] hidden lg:block cursor-pointer px-5 py-2 rounded-full bg-[#ef4444] hover:bg-red-500/50 transition-all font-500 tracking-wide"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href={"/sign-in"}>
                <button className="text-slate-300 text-[14px] hidden xl:block cursor-pointer px-5 py-2 rounded-full hover:bg-gray-600/50 font-500 tracking-wide">
                  Sign in
                </button>
              </Link>
            </>
          )}
          {user?._id ? (
            <>
              <Link
                href={`/u/${user.username}`}
                className="border-2 rounded-full bg-white p-[0.3px] "
              >
                <Avatar className="bg-black h-[2rem] w-[2rem]">
                  <AvatarImage src="https://github.com/shadcn.pngs" />
                  <AvatarFallback className="uppercase !p-1 bg-black text-white text-sm">
                    {user?.username?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <Link href={"/sign-up"}>
                <div className="text-[15px] bg-white transition-all hover:bg-white/90 px-5 py-2 cursor-pointer rounded-full flex justify-center items-center gap-1 font-[500] group">
                  <button>Get Started</button>
                  <IoIosArrowForward className="text-gray-400 group-hover:text-black transition-all group-hover:translate-x-2" />
                </div>
              </Link>
            </>
          )}
        </div>
      </motion.nav>

      {/* ========================================== Mobile nav ===================================== */}

      {toggle && (
        <>
          <motion.div className="lg:hidden px-7 py-3 flex flex-col gap-4 absolute w-full bg-black transition-all z-50 h-full">
            <motion.div
              initial={{ opacity: 0, height: 0 }} // Initial state with opacity 0 and height 0
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="w-full h-fit "
            >
              {user?._id ? (
                <>
                  <button
                    onClick={handleSignOut}
                    className="px-10 bg-[#ef4444] hover:bg-red-500/50 transition-all py-3 text-xl text-center w-full rounded-lg text-white border border-gray-600 font-[500]"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href={"/sign-in"}>
                    <button className="px-10 bg-gray-900/50 py-3 text-xl text-center w-full rounded-lg text-slate-300 border border-gray-600 font-[500]">
                      Sign In
                    </button>
                  </Link>
                </>
              )}
            </motion.div>
            {user?._id ? (
              <>
                <div className="w-full h-fit ">
                  <button className="px-10 bg-white py-3 text-xl text-center w-full rounded-lg text-black border border-gray-800 font-[500] capitalize">
                    Welcome {user.username}
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href={"/sign-up"} className="w-full h-fit ">
                  <button className="px-10 bg-white py-3 text-xl text-center w-full rounded-lg text-black border border-gray-800 font-[500]">
                    Get Started
                  </button>
                </Link>
              </>
            )}

            <div className="mt-6">
              <ul className="flex flex-col items-start justify-center gap-5 tracking-wide">
                {navLinks.map((items) => (
                  <li
                    key={items.title}
                    className="border-b-[0.6px] pb-5 border-slate-600 w-full"
                  >
                    <Link
                      href={items.url}
                      className="text-xl tracking-wide text-slate-400 font-[500]"
                    >
                      {items.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Header_1;
