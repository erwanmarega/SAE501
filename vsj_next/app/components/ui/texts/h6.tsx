import { h6 } from "framer-motion/client";
import React from "react";

interface H6Props {
  children: React.ReactNode;
}

const H6 = ({ children }: H6Props) => {
  return (
    <h6 className="mona-outfit text-[#636363] font-semibold text-xs">
      {children}
    </h6>
  );
};

export default H6;
