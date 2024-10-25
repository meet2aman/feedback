import { Check, Cross } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { PiDotsThree } from "react-icons/pi";
import Loader from "../sub/Loader";
const Collab = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<String[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  console.log(comment, comments);
  const handleSubmit = () => {
    setIsLoading(true);
    setComments((prevComments) => [...prevComments, comment]);
    setComment("");
    setIsLoading(false);
  };
  return (
    <section className="lg:flex justify-center items-center px-20 py-10 hidden">
      <main className="border-[1px] border-neutral-800 h-[35rem] w-full rounded-lg flex justify-start items-start overflow-hidden pt-10 gap-16">
        <div className="max-w-[30%] pl-10 ">
          <div className="flex flex-col justify-start items-start gap-3">
            <h3 className="h4 text-white text-2xl">Collaboration</h3>
            <p>
              <span className="text-gray-500 text-md tracking-wider">
                Work better together, ship faster, and avoid unauthorized
                changes with advanced roles and permissions, page branching, and
                more.
              </span>
            </p>
          </div>
          <a
            data-cta-text="collaboration read more"
            pointer-auto=""
            data-cta="homepage page CTA"
            data-cta-position="growth section"
            href="https://webflow.com/blog/content-editing-commenter-roles"
            className="text-white flex justify-start items-center gap-2 group text-sm mt-2"
          >
            <div className="inline-block text-white">Read more</div>
            <div className="group-hover:translate-x-2 transition-all text-white">
              →
            </div>
          </a>
        </div>

        <div className="border-t-[1px] border-l-[1px] border-neutral-500 text-white w-full h-screen rounded-tl-md">
          <div className="flex justify-start items-start">
            <div className="bg-[#2e2e2e] w-9 h-screen rounded-tl-md"></div>
            <div className="w-full h-screen flex flex-col">
              <div className="h-8 bg-[#2e2e2e]"></div>
              <div className="h-full overflow-hidden relative">
                <Image
                  className="object-none object-left-top bg-no-repeat h-[1500px] w-[1500px] flex-shrink"
                  src={"/collab.webp"}
                  height={2000}
                  width={2000}
                  alt="img"
                />
                <div className="flex flex-col  bg-[#2e2e2e] z-10 w-[17.3rem] rounded-md absolute top-14 left-24 justify-around">
                  <div className="px-2 py-3 text-sm flex justify-end gap-2">
                    <IoCheckmark className="cursor-pointer text-white/80 hover:text-white transition-all" />
                    <IoClose className="cursor-pointer text-white/80 hover:text-white transition-all" />
                  </div>
                  <div className="border-y-[1px] flex-1 border-neutral-600 px-2 py-3 ">
                    <div className="flex justify-between items-center">
                      <div className="flex justify-start items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarImage
                            src="https://assets-global.website-files.com/6515a6d5f30daec433d0abe2/6515a6d5f30daec433d0ac87_growth-collab-comment-pic-3.jpg"
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-[12px] font-normal tracking-wide">
                          Kaushik
                        </p>
                      </div>
                      <div>
                        <PiDotsThree className="text-gray-400 text-xl font-bold" />
                      </div>
                    </div>
                    <div className="flex justify-start items-center my-4">
                      <p className="text-[11px] font-light">
                        <a className="text-blue-400">@Webber Flowing</a> I feel
                        like there is too much whitespace here. What else could
                        we add here from our components?
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 font-light">
                        34 minutes ago
                      </p>
                    </div>
                    {comments ? (
                      <>
                        <div className="mt-2">
                          {comments.map((comment, index) => (
                            <p
                              key={index}
                              className="text-[11px] text-neutral-400 font-light border-y-[0.7px] border-neutral-600 py-1"
                            >
                              {comment}
                            </p>
                          ))}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="px-2 py-2 flex justify-center items-center gap-3">
                    <div>
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <Input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        type="email"
                        placeholder="Add a comment"
                        className="p-2 h-7 bg-[#232323] border border-neutral-700 text-xs text-white/60 no-focus"
                      />
                    </div>
                    <div className="">
                      <button
                        onClick={handleSubmit}
                        className="bg-blue-600 h-full hover:bg-blue-500 transition-all text-white text-xs py-[0.25rem] px-2 rounded-md w-full"
                      >
                        {isLoading ? <Loader /> : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Collab;
