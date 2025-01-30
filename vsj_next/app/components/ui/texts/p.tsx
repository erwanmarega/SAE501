import React from "react";

interface PProps {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "mini";
}

const P = ({ children, className, variant = "default" }: PProps) => {
  const variantClasses = variant === "mini" ? "text-3xs" : "text-sm";

  return (
    <p
      className={`font-mona font-light text-[#636363] ${variantClasses} ${className}`}
    >
      {children}
    </p>
  );
};

export default P;
