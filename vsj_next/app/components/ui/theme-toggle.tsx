import React from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";

const ThemeToggle = () => {
  return (
    <div>
      <div className="bg-white w-20 h-8 rounded-3xl py-1 px-2">
        <div className="w-1/2 bg-[#348CFF] rounded-full">
          <MoonIcon className="text-white" />
        </div>
        <div>
          <SunIcon className="black" />
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
