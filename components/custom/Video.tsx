import React from "react";

const Video = () => {
  return (
    <div className="bg-black w-full h-full flex items-center justify-center">
      <div className="bg-muted  w-full !bg-black flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-[225px] w-[225px] lg:h-[300px] lg:w-[300px]  xl:h-[500px] xl:w-[500px]"
          height="300"
          poster="/static/cube-fallback.jpg"
          src="./cube.mp4"
          width="300"
        />
      </div>
    </div>
  );
};

export default Video;
