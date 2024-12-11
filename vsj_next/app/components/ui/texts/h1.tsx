import React from "react";

interface PProps {
  className: string;
  children: React.ReactNode;
}

const P = ({ children, className }: PProps) => {
  return (
    <p className={`font-mona font-medium text-3xl ${className}`}>{children}</p>
  );
};

export default P;
