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
        "rounded-2xl shadow-card-shadow bg-white dark:bg-[#2E2E2E] dark:border-[#545454] dark:border-2",
        className // Ajouter les classes passées via les props
      )}
    >
      {children}
    </div>
  );
};

export default Card;
