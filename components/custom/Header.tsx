"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navLinks } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoClose, IoMenu } from "react-icons/io5";

import { SignOut } from "@/actions/index";
import { useAuth } from "@/context/AuthProvider";
import { CredentialsSignin } from "next-auth";
import { toast } from "sonner";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { CalendarDays } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [toggle, setToggle] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);

  const { session, currentUserDetails } = useAuth();

  React.useEffect(() => {
    const handleScroll = (): any => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > 0) {
        // Apply animation to show border bottom
        setIsScrolling(true);
        // gsap.to(".nav", { borderBottomWidth: "0.5px", duration: "0.1" });
      } else {
        // Apply animation to hide border bottom
        // gsap.to(".nav", { borderBottomWidth: "0", duration: "0.1" });
        setIsScrolling(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove scroll event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignIn = async () => {
    router.replace("/sign-in");
  };

  const handleSignOut = async () => {
    try {
      await SignOut();
      toast("You have been logged out.");
      router.push("/");
      router.refresh();
    } catch (error) {
      const err = error as CredentialsSignin;
      toast(err.message);
    }
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
          "flex z-50 sticky top-0 items-center md:bg-transparent justify-between px-[1.5rem] lg:px-[5.6rem] py-2 2xl:px-[6.6rem] 2xl:py-[0.86rem] bg-slate-900/20 nav",
          {
            "border-b-[0.2px] border-neutral-700": isScrolling,
          }
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

        {/* ============= Smaller devices hemburger menu ============ */}

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

        {/* ============= medium device dropdown-menu ============ */}

        {/* ============= functional buttons ============ */}
        <div className="hidden lg:flex gap-3">
          {session ? (
            <>
              <button
                onClick={handleSignOut}
                className="text-white text-[14px] hidden lg:block cursor-pointer px-5 py-1 rounded-full bg-[#ef4444] hover:bg-red-500/50 transition-all font-500 tracking-wide"
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
          {session ? (
            <>
              <div
                // href={`/u/${session.username}`}
                className="border-2 rounded-full bg-white p-[0.3px] "
              >
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Link
                      href={`/profile/${session.user?.username}`}
                      className="cursor-pointer"
                    >
                      <Avatar>
                        {currentUserDetails?.avatarUrl && (
                          <AvatarImage
                            src={currentUserDetails?.avatarUrl}
                            className="object-cover"
                          />
                        )}
                        <AvatarFallback className="text-sm text-orange-600 bg-black uppercase">
                          {session.user?.username
                            ? session.user.username.slice(0, 2)
                            : "??"}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 font-semibold bg-black boder-neutral-700 text-white">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src={currentUserDetails?.avatarUrl} />
                        <AvatarFallback className="uppercase text-black">
                          {session.user?.username
                            ? session.user?.username.slice(0, 2)
                            : "??"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          @{session.user?.username}
                        </h4>
                        <p className="text-xs text-neutral-500">
                          {session.user?.email}
                        </p>
                        <p className="text-sm">
                          The Next-Auth Library – created and maintained by
                          @vercel.
                        </p>
                        <div className="flex items-center pt-2">
                          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">
                            Joined December 2021
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
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
              {session ? (
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
            {session ? (
              <>
                <div className="w-full h-fit ">
                  <button className="px-5 bg-white py-2 text-xl text-center w-full rounded-lg text-black border border-gray-800 font-[500] capitalize flex justify-center gap-3 items-center">
                    <Avatar>
                      {currentUserDetails?.avatarUrl && (
                        <AvatarImage src={currentUserDetails?.avatarUrl} />
                      )}
                      <AvatarFallback className="text-sm text-orange-600 bg-black uppercase">
                        {session.user?.username
                          ? session.user?.username.slice(0, 2)
                          : "??"}
                      </AvatarFallback>
                    </Avatar>
                    <p className="line-clamp-1">{session.user?.username}</p>
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

export default Header;
