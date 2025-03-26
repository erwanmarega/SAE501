"use client";

import React, { useState } from "react";

interface ToggleSlideProps {
  leftLabel: string;
  rightLabel: string;
  onChange?: (active: "left" | "right") => void;
}

const ToggleSlide: React.FC<ToggleSlideProps> = ({
  leftLabel,
  rightLabel,
  onChange,
}) => {
  const [active, setActive] = useState<"left" | "right">("left");

  const handleClick = (position: "left" | "right") => {
    setActive(position);
    if (onChange) {
      onChange(position);
    }
  };

  return (
    <div className="relative flex items-center w-full max-w-md h-12 bg-[#F6F6F6] rounded-lg overflow-hidden box-border px-1 py-5 border border-[#E4E7EC]">
      <div
        className={`absolute h-8 w-1/2 bg-white rounded-lg transition-transform duration-300 ${
          active === "right" ? "translate-x-[95%]" : "translate-x-0"
        }`}
      ></div>
      <button
        onClick={() => handleClick("left")}
        className={`z-10 flex-1 text-center font-bold text-sm transition-colors duration-200 ${
          active === "left" ? "text-black font-bold" : "text-gray-500"
        }`}
      >
        {leftLabel}
      </button>
      <button
        onClick={() => handleClick("right")}
        className={`z-10 flex-1 text-center font-bold text-sm transition-colors duration-200 ${
          active === "right" ? "text-black font-bold" : "text-gray-500"
        }`}
      >
        {rightLabel}
      </button>
    </div>
  );
};

export default ToggleSlide;
