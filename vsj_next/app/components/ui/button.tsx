"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  icon?: string; // URL ou chemin vers l'image
  iconAlt?: string; // Texte alternatif pour l'icône
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  icon,
  iconAlt = "Icon",
  className,
  ...props
}) => {
  const variantClasses = {
    primary:
      "h-12 bg-primary text-white font-outfit font-bold text-sm w-80 flex items-center justify-center gap-2 rounded-md shadow-inner-1 shadow-inner-2 shadow-drop-1",
    outline:
      "h-12 bg-white text-black shadow-3d-button font-outfit font-bold text-sm w-80 border border-[#D0D5DD] flex items-center justify-center gap-2",
    danger:
      "h-10 bg-red-500 text-white hover:bg-red-600 font-outfit font-bold text-sm flex items-center justify-center gap-2",
  };

  return variant === "primary" ? (
    <motion.button
      className={`${variantClasses[variant]} ${className}`}
      whileHover={{
        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {icon && (
        <Image
          src={icon}
          alt={iconAlt}
          width={20}
          height={20}
          className="inline-block"
        />
      )}
      <span>{children}</span>
    </motion.button>
  ) : (
    <button
      className={`px-4 py-2 rounded-md ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && (
        <Image
          src={icon}
          alt={iconAlt}
          width={20}
          height={20}
          className="inline-block"
        />
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
