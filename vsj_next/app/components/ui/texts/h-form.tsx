import React from "react";

interface HFormProps {
  children: React.ReactNode;
  className?: string;
}

const HForm = ({ children, className }: HFormProps) => {
  const variantClasses = "text-mona font-medium text-sm";

  return <h1 className={`${variantClasses} ${className}`}>{children}</h1>;
};

export default HForm;
