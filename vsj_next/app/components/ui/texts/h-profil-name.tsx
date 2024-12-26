import React from "react";

interface HProfilNameProps {
  children: React.ReactNode;
  className?: string;
}

const HProfilName = ({ children, className }: HProfilNameProps) => {
  return (
    <h3
      className={`font-outfit font-black text-[#3B3B3B] text-3xl ${className}`}
    >
      {children}
    </h3>
  );
};

export default HProfilName;
