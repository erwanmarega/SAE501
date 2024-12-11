import React from "react";

interface PProps {
  className: string;
  children: React.ReactNode;
}

const P = ({ children, className }: PProps) => {
  return (
    <p className={`font-mona font-normal text-sm ${className}`}>{children}</p>
  );
};

export default P;
