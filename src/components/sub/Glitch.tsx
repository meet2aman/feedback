import Link from "next/link";
import React from "react";

const Glitch = () => {
  return (
    <div id="app">
      <div id="wrapper">
        {/* Make sure data-text equals the text you put inside the tags. */}
        <h1 className="glitch !font-black" data-text="Feedback">
          Feedback
        </h1>
        <div className="mt-10 font-Kusanagi flex flex-col justify-center items-center gap-5">
          <p>Please login to see the dashboard</p>
          <button className="px-3 py-1 rounded-full bg-white text-black text-[16px] ml-2 font-[500] group hover:bg-black/60 hover:text-white transition-all hover:border hover:border-white">
            <Link
              href={"/sign-in"}
              className="group-hover:tracking-widest transition-all"
            >
              Sign In
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Glitch;
