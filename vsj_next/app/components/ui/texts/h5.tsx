// components/ui/texts/h4.jsx
import React from "react";

interface H4Props {
  children: React.ReactNode;
  className?: string;
}

const H5 = ({ children, className }: H4Props) => {
  return (
    <h5
      className={`font-mona font-medium text-lg  
      } ${className}`}
    >
      {children}
    </h5>
  );
};

export default H5;
