"use client";

import React, { useState } from "react";

interface IconProps {
  isSelected: boolean;
  color?: string;
}

const StatsIcon: React.FC<IconProps> = ({ isSelected, color }) => {
  const [hoverEffect, setHoverEffect] = useState(false);

  return (
    <svg
      width="37"
      height="29"
      viewBox="0 0 54 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      onMouseEnter={() => setHoverEffect(true)}
      onMouseLeave={() => setHoverEffect(false)}
    >
      <rect
        y="22"
        width="9"
        height="19"
        rx="4.5"
        className={`transition-colors ${
          color
            ? "fill-secondary-stats"
            : !isSelected && !hoverEffect
            ? "fill-icon-inactive-light dark:fill-icon-inactive-dark"
            : "fill-primary"
        }`}
      />
      <rect
        x="15"
        y="8"
        width="9"
        height="33"
        rx="4.5"
        className={`transition-colors ${
          color
            ? "fill-primary"
            : !isSelected && !hoverEffect
            ? "fill-icon-inactive-light dark:fill-icon-inactive-dark"
            : "fill-primary"
        }`}
      />
      <rect
        x="30"
        y="17"
        width="9"
        height="24"
        rx="4.5"
        className={`transition-colors ${
          color
            ? "fill-primary"
            : !isSelected && !hoverEffect
            ? "fill-icon-inactive-light dark:fill-icon-inactive-dark"
            : "fill-primary"
        }`}
      />
      <rect
        x="45"
        width="9"
        height="41"
        rx="4.5"
        className={`transition-colors ${
          color
            ? "fill-primary"
            : !isSelected && !hoverEffect
            ? "fill-icon-inactive-light dark:fill-icon-inactive-dark"
            : "fill-primary"
        }`}
      />
    </svg>
  );
};

export default StatsIcon;
