import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex  justify-center items-center py-4">
      <Image
        src={"/Feedback.png"}
        alt="logo"
        height={400}
        width={1550}
        className=""
      />
    </div>
  );
};

export default Footer;
