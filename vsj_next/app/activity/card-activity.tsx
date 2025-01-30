"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import VanillaTilt from "vanilla-tilt";
import Button from "../components/ui/button";
import clsx from "clsx";
import Link from "next/link";

interface CardActivityProps {
  identity: number;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  price: string;
  badge: string;
  selected: number | null;
  permanentSelectedCard: number | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  setChosenButton: React.Dispatch<React.SetStateAction<boolean>>;
  chosenButton: boolean;
  hiddenCard: boolean;
  handleRemove: () => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardActivity: React.FC<CardActivityProps> = ({
  identity,
  imageSrc,
  imageAlt,
  title,
  description,
  price,
  badge,
  onMouseEnter,
  onMouseLeave,
  selected,
  permanentSelectedCard,
  setChosenButton,
  chosenButton,
  hiddenCard,
  handleRemove,
  setIsLoading,
}) => {
  const whatIdName = (title: string) => {
    switch (title) {
      case "Aquabike":
        return "aquabike-card";
        break;
      case "Natation":
        return "natation-card";
        break;
      case "Aquagym":
        return "aquagym-card";

        break;

      default:
        break;
    }
  };

  const hideCard = chosenButton && permanentSelectedCard !== identity;

  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <div
      className={clsx(
        "card sm:h-60 md:h-64 lg:h-72 xl:h-80 2xl:h-[400px] sm:w-52 md:w-56 lg:w-60 xl:w-72 2xl:w-80 cursor-pointer flex justify-center items-center m-auto select-none",
        {
          "opacity-50": selected !== null && selected !== identity,
          "col-start-1 col-end-4 !w-full no-flip flipped":
            chosenButton && permanentSelectedCard === identity,
          "!-translate-y-[666px] !absolute": hideCard,
          // hidden: hideCard && hiddenCard,
        }
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Recto de la carte */}
      <div
        className="card__front flex flex-col justify-between h-full py-2 px-4 sm:rounded-lg md:rounded-xl lg:rounded-xl xl:rounded-2xl w-full border-[#BDCBDD] border-[1px] shadow-activity"
        id={whatIdName(title)}
      >
        <header
          className={`h-3/6 transition-transform duration-300 survol-container flex justify-center items-center ${
            selected === identity
              ? "scale-110 -translate-y-2 translate"
              : "scale-100"
          }`}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            width={250}
            height={250}
            className="rounded-lg transition-all survol-element"
            style={{
              filter:
                selected === identity
                  ? "drop-shadow(-5px 10px 10px rgba(0, 0, 0, 0.2))"
                  : "drop-shadow(-5px 10px 10px rgba(0, 0, 0, 0.15))",
            }}
          />
        </header>
        <div className="w-[95%] rounded-full m-auto h-[2px] bg-[#E8EAE9] absolute top-[55%] left-2"></div>

        <main className="flex flex-col justify-between h-full">
          <h3
            className="text-center font-outfit font-black text-[#232323] mx-auto mt-auto mb-0
            text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
          >
            {title}
          </h3>
          <p className="font-mona font-normal text-[#6A6A6A] px-2 mt-2 sm:text-2xs md:text-2xs lg:text-xs xl:text-sm 2xl:text-base h-20">
            {description}
          </p>
          <div className="flex justify-between items-center px-2 mt-2">
            <p className="font-outfit font-medium sm:text-2xs md:text-2xs lg:text-xs xl:text-sm 2xl:text-base">
              {price}
            </p>
            {/*BADGE*/}
            <div>
              <div className="bg-primary/15 rounded-full py-1 px-2">
                <p className="text-primary font-mona font-medium sm:text-3xs md:text-3xs lg:text-2xs xl:text-xs 2xl:text-sm text-center whitespace-nowrap">
                  {badge}
                </p>
              </div>
            </div>
            {/*BADGE*/}
          </div>
        </main>
      </div>

      {/* Verso de la carte */}
      <div
        className={clsx(
          "card__back flex flex-col justify-between h-full p-6 sm:rounded-lg md:rounded-xl lg:rounded-xl xl:rounded-2xl relative w-full"
        )}
      >
        {/*BADGE*/}
        <header className="h-4/6 mb-10 ">
          <div className="absolute right-2 top-2">
            <div className="bg-primary/15 rounded-full py-1 px-2">
              <p className="text-primary font-mona font-medium sm:text-3xs md:text-3xs lg:text-2xs xl:text-xs 2xl:text-sm text-center whitespace-nowrap">
                {badge}
              </p>
            </div>
          </div>
          {/*BADGE*/}
          <div className="flex flex-col gap-2">
            {" "}
            <h3 className="font-mona text-2xl">Natation</h3>
            <p className="font-outfit font-bold text-medium text-2xl">
              300.00€
            </p>
            <p className="font-mona font-regular text-[#B1B5B8] text-sm">
              Facturation annuelle à 300 €
            </p>{" "}
            <div className="flex justify-center mt-4">
              {isConfirming ? (
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLoading(true); // Passe à l'état de chargement
                  }}
                >
                  <p className="text-gray-700">Confirmer</p>
                </Button>
              ) : (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsConfirming(true); // Passe à l'état de confirmation
                  }}
                >
                  Choisir
                </Button>
              )}
            </div>
          </div>
        </header>
        <div className="w-[95%] rounded-full m-auto h-[1px] bg-[#E8EAE9] -mt-3 mb-3"></div>
        <main className="flex flex-col justify-between h-full">
          <div className="flex flex-col relative">
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <img
                  src="assets/icons/checkV.svg"
                  alt="Valide"
                  height={15}
                  width={15}
                />
                <p className="font-mona font-medium text-xs">
                  Accès aux séances de natation libre pour tous niveaux
                </p>
              </div>
              <div className="flex gap-4">
                <img
                  src="assets/icons/checkV.svg"
                  alt="Valide"
                  height={15}
                  width={15}
                />
                <p className="font-mona font-medium text-xs">
                  Cours encadrés pour perfectionner votre technique et votre
                  endurance
                </p>
              </div>
              <div className="flex gap-4">
                <img
                  src="assets/icons/checkV.svg"
                  alt="Valide"
                  height={15}
                  width={15}
                />{" "}
                <p className="font-mona font-medium text-xs">
                  Programmes adaptés aux nageurs débutants comme confirmés
                </p>
              </div>
              <div className="flex gap-4">
                <img
                  src="assets/icons/checkV.svg"
                  alt="Valide"
                  height={15}
                  width={15}
                />{" "}
                <p className="font-mona font-medium text-xs">
                  Programmes adaptés aux nageurs débutants comme confirmés
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CardActivity;
