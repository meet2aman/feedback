import React from "react";
import Image from "next/image";
const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <Image src={"/loading-circle.svg"} alt="loading" width={15} height={15} />
    </div>
  );
};

export default Loader;
