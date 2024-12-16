import { h4 } from "framer-motion/client";
import React from "react";

interface H4Props {
  children: React.ReactNode;
  className?: string;
}

const H2 = ({ children, className }: H4Props) => {
  return (
    <h2
      className={`text-2xl font-semibold text-gray-700 text-center ${className}`}
    >
      {children}
    </h2>
  );
};

export default H2;
