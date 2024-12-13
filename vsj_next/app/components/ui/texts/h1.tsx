import React from "react";

interface H1Props {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "black";
}

const H1 = ({ children, className, variant = "default" }: H1Props) => {
  const variantClasses =
    variant === "black"
      ? "font-black font-mona   text-3xl"
      : "font-mona font-semibold text-3xl";

  return <h1 className={`${variantClasses} ${className}`}>{children}</h1>;
};

export default H1;
