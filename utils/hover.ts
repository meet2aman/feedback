"use client";

import React, { useState, useEffect } from "react";

export default function hover3d(ref: any, { x = 0, y = 0 }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseMove = (e: any) => {
    const { offsetWidth: width, offsetHeight: height } = ref.current;
    const { clientX, clientY } = e;

    const x = (clientX - width / 2) / width;
    const y = (clientY - height / 2) / height;
    setCoords({ x, y });
  };
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  useEffect(() => {
    const { current } = ref;
    current.addEventListener("mousemove", handleMouseMove);
    current.addEventListener("mouseenter", handleMouseEnter);
    current.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      current.addEventListener("mousemove", handleMouseMove);
      current.addEventListener("mouseenter", handleMouseEnter);
      current.addEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);
  const { x: xCoord, y: yCoord } = coords;
  const xTransform = isHovering ? xCoord * x : 0;
  const yTransform = isHovering ? yCoord * y : 0;

  const transform = `perspective(1000px) translateX(${xTransform}px) translateY(${yTransform}px) `;
  const transtion = isHovering ? `transform 0.3s ease-out` : "0.3s ease-out";

  return { transform, transtion };
}
