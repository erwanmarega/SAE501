import React from "react";
import clsx from "clsx";
import Image from "next/image";

interface SeanceCardProps {
  variant?: "training" | "competition";
}

const SeanceCard = ({ variant = "training" }: SeanceCardProps) => {
  // Définir les constantes pour réutilisation
  const isTraining = variant === "training";

  return (
    <div
      className={clsx(
        "rounded-xl bg-white border-[3px] p-2 h-16 w-[72px] flex flex-col items-center justify-center gap-1 transition hover:shadow-lg hover:-translate-y-1 cursor-pointer",
        {
          "border-primary": isTraining,
          "border-secondary-map": !isTraining,
        }
      )}
    >
      <Image
        src={
          isTraining
            ? "/assets/icons/data_train.svg"
            : "/assets/icons/storm_competition.svg"
        }
        alt={isTraining ? "Entraînement" : "Compétition"}
        width={28}
        height={28}
      />
      <h5 className="font-mona font-bold text-5xs text-[#8E8E8E]">
        {isTraining ? "Entraînement" : "Compétition"}
      </h5>
    </div>
  );
};

export default SeanceCard;
