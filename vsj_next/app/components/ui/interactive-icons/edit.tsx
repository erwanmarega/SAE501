"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface EditIconProps {
  className?: string;
  onClick?: () => void;
  isActive?: boolean; // Indique si l'icône est active
}

const EditIcon: React.FC<EditIconProps> = ({
  className,
  onClick,
  isActive,
}) => {
  const [hoverEffect, setHoverEffect] = useState(false);

  return (
    <motion.svg
      width="25"
      height="25"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer outline-none ${className || ""}`}
      onClick={onClick}
      onMouseEnter={() => setHoverEffect(true)}
      onMouseLeave={() => setHoverEffect(false)}
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9, rotate: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <path
        d="M23.6673 0.333008H10.334C4.81898 0.333008 0.333984 4.81801 0.333984 10.333V31.9997C0.333984 32.4417 0.509579 32.8656 0.82214 33.1782C1.1347 33.4907 1.55862 33.6663 2.00065 33.6663H23.6673C29.1823 33.6663 33.6673 29.1813 33.6673 23.6663V10.333C33.6673 4.81801 29.1823 0.333008 23.6673 0.333008ZM11.999 25.333H8.66732V22.0013L17.884 12.798L21.2157 16.1297L11.999 25.333ZM22.7873 14.558L19.4557 11.2263L21.9956 8.68801L25.3273 12.0197L22.7873 14.558Z"
        className={`transition-colors ${
          isActive
            ? "fill-primary"
            : hoverEffect
            ? "fill-primary"
            : "fill-[#8A86A0]"
        }`}
      />
    </motion.svg>
  );
};

export default EditIcon;
