"use client";

import React, { useState } from "react";

interface EditIconButton {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  handleClick: () => void;
}

const EditIconButton = ({
  isActive,
  setIsActive,
  handleClick,
}: EditIconButton) => {
  return (
    <div
      onClick={handleClick}
      className={`${
        isActive ? "bg-primary" : "bg-white"
      } shadow-md absolute right-4 bottom-4 h-10 w-10 flex items-center justify-center rounded-xl transition-colors duration-200 hover:bg-primary cursor-pointer`}
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.28 9L0 26.28V33H6.72L24 15.72L17.28 9Z"
          fill={isActive ? "white" : "#348CFF"}
        />
        <path
          d="M27 13L20 6L26 0L33 7L27 13Z"
          fill={isActive ? "white" : "#348CFF"}
        />
      </svg>
    </div>
  );
};

export default EditIconButton;
