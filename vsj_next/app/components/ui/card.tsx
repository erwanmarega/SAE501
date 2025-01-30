import React from "react";
import clsx from "clsx";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Card = ({ className, onClick, children }: CardProps) => {
  return (
    <div
      className={clsx(
        "rounded-3xl shadow-card bg-white dark:bg-[#2E2E2E] px-4 py-2", // Classes par défaut
        className // Classes passées via les props pour priorité
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
