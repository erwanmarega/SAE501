import { h4 } from "framer-motion/client";
import React from "react";

interface H4Props {
  children: React.ReactNode;
  className?: string;
}

const H4 = ({ children, className }: H4Props) => {
  return (
    <h4 className={`font-mona font-bold text-lg text-[#424242] ${className}`}>
      {children}
    </h4>
  );
};

export default H4;
