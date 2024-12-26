import React from "react";

interface HFormDataProps {
  children: React.ReactNode;
  className?: string;
}

const HFormData = ({ children, className }: HFormDataProps) => {
  const variantClasses = "font-mona font-light text-gray-800 text-sm";

  return <h1 className={`${variantClasses} ${className}`}>{children}</h1>;
};

export default HFormData;
