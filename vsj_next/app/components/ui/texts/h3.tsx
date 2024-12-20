import React from "react";

interface H4Props {
  children: React.ReactNode;
  className?: string;
}

const H3 = ({ children, className }: H4Props) => {
  return (
    <h3 className={`font-outfit font-bold text-2xl ${className}`}>
      {children}
    </h3>
  );
};

export default H3;
