// drag-card.tsx
"use client";

import React, { useState, useEffect } from "react";
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

  // Nouvel état pour gérer un drop valide
  const [isDroppedValid, setIsDroppedValid] = useState(false);

  // Lorsqu'on arrête de dragguer (isDragging repasse à false),
  // on vérifie si la zone finale (transform.x, transform.y) est valide.
  useEffect(() => {
    if (!isDragging && transform) {
      // EXEMPLE : Si le point final est au-delà de x=200, on considère le drop "valide"
      if (transform.x > 200) {
        setIsDroppedValid(true);
      }
    }
  }, [isDragging, transform]);

  // Styles pour le drag avec un effet smooth et opacité réduite
  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${
          isDragging ? 1.05 : 1
        })`
      : undefined,
    transition: isDragging
      ? "transform 0.1s ease-out"
      : "transform 0.2s ease-out",
    opacity: isDragging ? 0.9 : 1,
    cursor: isDragging ? "grabbing" : "grab",
    touchAction: "none",
  };

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

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        className={`
          bg-gray-50 
          hover:bg-gray-100 
          rounded-lg 
          p-2 
          w-36 
          h-28 
          flex 
          flex-col 
          justify-between 
          select-none 
          ${isDragging ? "shadow-md" : ""} 
          ${
            isDroppedValid
              ? // Animation plus voyante : rotation, scale plus grand, disparition lente
                // Durée un peu plus longue pour qu'on voie bien l'effet (700 ms)
                "transition-all duration-700 ease-in-out transform scale-150 rotate-12 opacity-0"
              : ""
          }
        `}
      >
        <header className="flex justify-between items-center">
          <div className="flex gap-2">
            {coaches.map((coach, index) => (
              <Profil key={index} size={25} />
            ))}
          </div>
          {/*BADGE*/}
          <div>
            <div className="bg-primary/15 rounded-full py-1 px-2">
              <p className="text-primary font-mona font-medium text-5xs text-center whitespace-nowrap">
                {category}
              </p>
            </div>
          </div>
          {/*BADGE*/}
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
