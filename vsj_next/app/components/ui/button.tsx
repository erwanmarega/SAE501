import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  format?: "big" | "standard"; // Ensure both are defined
  icon?: string;
  iconAlt?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  format = "standard",
  icon,
  iconAlt = "Icon",
  className = "", // Provide a default value
  ...props
}) => {
  const variantClasses: Record<string, string> = {
    primary:
      "h-12 bg-primary text-white font-outfit font-bold text-sm w-80 flex items-center justify-center gap-2 rounded-lg shadow-inner-1 shadow-inner-2 shadow-drop-1",
    outline:
      "h-12 bg-white text-black shadow-3d-button font-outfit font-bold text-sm w-80 border border-[#D0D5DD] flex items-center justify-center gap-2 shadow-inner-1 shadow-inner-2 shadow-drop-1",
    soft: "h-10 bg-gray-100 text-primary shadow-3d-button font-outfit font-bold text-sm w-36 flex items-center justify-center gap-2 shadow-inner-1 shadow-inner-2 shadow-drop-1",
    danger:
      "h-10 bg-red-500 text-white hover:bg-red-600 font-outfit font-bold text-sm flex items-center justify-center gap-2 shadow-inner-1 shadow-inner-2 shadow-drop-1",
    secondary:
      "h-12 bg-gray-100 text-white font-outfit font-bold text-sm w-80 flex items-center justify-center gap-2 rounded-lg hover:bg-gray-200",
  };

  const formatClasses: Record<string, string> = {
    big: "!h-14 !w-full",
    standard: "",
  };

  const buttonClasses = `px-4 py-2 rounded-lg hover:shadow-none ${
    variantClasses[variant] || ""
  } ${formatClasses[format] || ""} ${className}`.trim();

  return (
    <motion.button
      whileHover={
        variant !== "secondary" ? { filter: "brightness(1.1)" } : undefined
      }
      transition={{ duration: 0.3 }}
      className={buttonClasses}
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
  );
};

export default Button;
