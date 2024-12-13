import React from "react";
import clsx from "clsx";

interface CardProps {
  className?: string; // Rendre la classe optionnelle pour plus de flexibilité
  children: React.ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={clsx(
        "rounded-3xl shadow-card bg-white dark:bg-[#2E2E2E]   px-4 py-2",
        className // Ajouter les classes passées via les props
      )}
    >
      {children}
    </div>
  );
};

export default Card;
