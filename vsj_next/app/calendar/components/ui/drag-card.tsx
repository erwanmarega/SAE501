// drag-card.tsx
"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import Profil from "@/app/components/profil/profil";

interface DragCardProps {
  title: string;
  coaches: string[];
  category: string;
  intensity: "facile" | "moyen" | "difficile";
  duration: string;
  sessionId: string;
}

const DragCard: React.FC<DragCardProps> = ({
  title,
  coaches,
  category,
  intensity,
  duration,
  sessionId,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: sessionId,
    });

  const whatIntensity = () => {
    switch (intensity) {
      case "facile":
        return "/assets/icons/intensityLow.svg";
      case "moyen":
        return "/assets/icons/intensityMedium.svg";
      case "difficile":
        return "/assets/icons/intensityHigh.svg";
      default:
        return "/assets/icons/intensityDefault.svg";
    }
  };

  const style: React.CSSProperties = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="bg-gray-50 hover:bg-gray-100 rounded-lg p-2 w-36 h-28 flex flex-col justify-between select-none">
        <header className="flex justify-between items-center">
          <div className="flex gap-2">
            {coaches.map((coach, index) => (
              <Profil key={index} size={25} />
            ))}
          </div>
          <div>
            <div className="bg-primary/15 rounded-full py-1 px-2">
              <p className="text-primary font-mona font-medium text-5xs text-center whitespace-nowrap">
                {category}
              </p>
            </div>
          </div>
        </header>
        <main className="flex flex-col items-center gap-1">
          <div className="w-full flex justify-between relative">
            <p className="font-mona font-light text-2xs text-[#4D4D4D] whitespace-nowrap">
              Durée <span className="font-semibold">{duration}</span>
            </p>
            <img
              src="/assets/icons/testDurationChart.svg"
              alt="Durée de l'entraînement"
              width={25}
              height={25}
              className="-right-2 -top-1 absolute"
            />
          </div>
          <div className="w-full flex justify-between">
            <p className="font-mona font-light text-2xs text-[#4D4D4D]">
              Intensité <span className="font-semibold">{intensity}</span>
            </p>
            <img src={whatIntensity()} alt="Intensité" width={15} height={15} />
          </div>
        </main>
        <footer className="flex items-center">
          <p className="font-mona font-black m-auto text-[#484848] whitespace-nowrap truncate">
            {title}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DragCard;
