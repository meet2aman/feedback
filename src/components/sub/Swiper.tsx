import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AiOutlineArrowRight } from "react-icons/ai";

const Swiper = () => {
  return (
    <Carousel className="pb-[8rem] pr-4">
      <CarouselContent className="text-white gap-10 px-20 font-[Bebas Neue] py-20">
        <CarouselItem className="lg:basis-[31%] border group max-lg:bg-[#ff6b00] max-lg:shadow-[0px_0px_15px,0px_0px_50px,0px_0px_90px] max-lg:shadow-[#ff6b00]/40 border-[#ff6b00] rounded-md hover:bg-[#ff6b00] transition-all cursor-pointer duration-700 hover:shadow-[0px_0px_15px,0px_0px_50px,0px_0px_90px] hover:shadow-[#ff6b00]/40">
          <div className="flex flex-col justify-around p-8 items-start gap-[90px]">
            <div className="text-3xl font-bold  group-hover:text-black transition-all duration-700">
              GRUBHUB
            </div>
            <div className="text-7xl font-black flex flex-col justify-center items-start group-hover:text-black transition-all duration-700 gap-4">
              <h1>1.3M</h1>
              <p
                className="text-xl line-clamp-5 font-semibold
              "
              >
                This anonymous feedback web app is a game-changer! Finally, I
                can speak my mind without fear of judgment. It's so liberating
                to share my thoughts and ideas openly while maintaining my
                privacy.
              </p>
            </div>
            <div className="flex justify-center items-center gap-2 group-hover:text-black transition-all duration-700">
              <p>Read Story</p>
              <AiOutlineArrowRight className="group-hover:translate-x-2 transition-all" />
            </div>
          </div>
        </CarouselItem>

        <CarouselItem className="lg:basis-[31%] border group border-[#146ef5] hover:shadow-[0px_0px_15px,0px_0px_50px,0px_0px_90px] rounded-md hover:bg-[#146ef5] hover:shadow-[#146ef5]/40 transition-all duration-700 cursor-pointer max-lg:bg-[#146ef5] max-lg:shadow-[0px_0px_15px,0px_0px_50px,0px_0px_90px] max-lg:shadow-[#146ef5]/40">
          <div className="flex flex-col justify-around p-8 items-start gap-[90px]">
            <div className="text-3xl font-bold  group-hover:text-black transition-all duration-700">
              GRUBHUB
            </div>
            <div className="text-7xl font-black flex flex-col justify-center items-start group-hover:text-black transition-all duration-700 gap-4">
              <h1>1.3M</h1>
              <p
                className="text-xl line-clamp-5 font-semibold
              "
              >
                I've tried several feedback platforms, but none compare to this
                one. The anonymity feature gives me the confidence to provide
                honest feedback, leading to more valuable insights for
                improvement. Kudos to the developers for creating such a
                user-friendly and empowering tool!
              </p>
            </div>
            <div className="flex justify-center items-center gap-4 group-hover:text-black transition-all duration-700">
              <p>Read Story</p>
              <AiOutlineArrowRight />
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="lg:basis-[31%] border hover:shadow-[0px_0px_15px,0px_0px_50px,0px_0px_90px] group border-[#ed52cb] rounded-md hover:bg-[#ed52cb] hover:shadow-[#ed52cb]/40 transition-all duration-700 cursor-pointer max-lg:bg-[#ed52cb] max-lg:shadow-[0px_0px_15px,0px_0px_50px,0px_0px_90px] max-lg:shadow-[#ed52cb]/40">
          <div className="flex flex-col justify-around p-8 items-start gap-[90px]">
            <div className="text-3xl font-bold  group-hover:text-black transition-all duration-700">
              GRUBHUB
            </div>
            <div className="text-7xl font-black flex flex-col justify-center items-start group-hover:text-black transition-all duration-700 gap-4">
              <h1>1.3M</h1>
              <p
                className="text-xl line-clamp-5 font-semibold
              "
              >
                I love how easy it is to use this anonymous feedback app. The
                sleek design and intuitive interface make it a breeze to
                navigate. Plus, the option to give feedback anonymously ensures
                that my opinions are heard without any bias. It's definitely my
                go-to platform for sharing feedback!
              </p>
            </div>
            <div className="flex justify-center items-center gap-4 group-hover:text-black transition-all duration-700">
              <p>Read Story</p>
              <AiOutlineArrowRight />
            </div>
          </div>
        </CarouselItem>

        <CarouselItem className="lg:basis-[31%] hover:shadow-[0px_0px_15px,0px_0px_50px,0px_0px_90px] border group border-[#00d722] rounded-md hover:bg-[#00d722] hover:shadow-[#00d722]/40 transition-all duration-700 cursor-pointer max-lg:bg-[#00d722] max-lg:shadow-[0px_0px_15px,0px_0px_50px,0px_0px_90px] max-lg:shadow-[#00d722]/40">
          <div className="flex flex-col justify-around p-8 items-start gap-[90px]">
            <div className="text-3xl font-bold  group-hover:text-black transition-all duration-700">
              GRUBHUB
            </div>
            <div className="text-7xl font-black flex flex-col justify-center items-start group-hover:text-black transition-all duration-700 gap-4">
              <h1>1.3M</h1>
              <p
                className="text-xl line-clamp-5 font-semibold
              "
              >
                As someone who values transparency, I appreciate the commitment
                to anonymity in this feedback app. It fosters a culture of
                openness and trust, allowing for genuine feedback exchanges.
                This app has truly revolutionized the way I give and receive
                feedback.
              </p>
            </div>
            <div className="flex justify-center items-center gap-4 group-hover:text-black transition-all duration-700">
              <p>Read Story</p>
              <AiOutlineArrowRight />
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="lg:basis-[31%] border group hover:shadow-[0px_0px_15px,0px_0px_50px,0px_0px_90px] border-[#ee1d36] rounded-md hover:bg-[#ee1d36] transition-all duration-700 cursor-pointer hover:shadow-[#ee1d36]/40 max-lg:bg-[#ee1d36]  max-lg:shadow-[0px_0px_15px,0px_0px_50px,0px_0px_90px] max-lg:shadow-[#ee1d36]/40">
          <div className="flex flex-col justify-around p-8 items-start gap-[90px]">
            <div className="text-3xl font-bold  group-hover:text-black transition-all duration-700">
              GRUBHUB
            </div>
            <div className="text-7xl font-black flex flex-col justify-center items-start group-hover:text-black transition-all duration-700 gap-4">
              <h1>1.3M</h1>
              <p
                className="text-xl line-clamp-5 font-semibold
              "
              >
                What sets this anonymous feedback app apart is its emphasis on
                confidentiality and security. I feel reassured knowing that my
                identity is protected, allowing me to express myself freely.
                With its robust privacy measures and user-centric approach, this
                app has become an invaluable tool for soliciting honest
                feedback.
              </p>
            </div>
            <div className="flex justify-center items-center gap-4 group-hover:text-black transition-all duration-700">
              <p>Read Story</p>
              <AiOutlineArrowRight />
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default Swiper;
