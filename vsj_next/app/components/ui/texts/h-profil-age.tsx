import React from "react";

interface HProfilAgeProps {
  children: React.ReactNode;
  className?: string;
}

const HProfilAge = ({ children, className }: HProfilAgeProps) => {
  return (
    <h5 className={`font-mona font-semibold text-[#747474] ${className}`}>
      {children}
    </h5>
  );
};

export default HProfilAge;
