"use client";

import React, { useState } from "react";

const GlobeLanguageIcon = () => {
  const [hoverEffect, setHoverEffect] = useState(false);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={hoverEffect ? "#C1C6DA" : "#D5D8E5"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-globe"
      onMouseEnter={() => setHoverEffect(true)}
      onMouseLeave={() => setHoverEffect(false)}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
};

export default GlobeLanguageIcon;
