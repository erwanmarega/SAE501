"use client";

import React, { useState } from "react";
import Card from "../../components/ui/card";
import RightBarEffectif from "./right-bar-effectif";
import RightBarPlanning from "./right-bar-planning";
import RightBarRole from "./right-bar-role";

interface RightBarProps {
  swimmerValue: number;
  setSwimmerValue: React.Dispatch<React.SetStateAction<number>>;
  coachValue: number;
  setCoachValue: React.Dispatch<React.SetStateAction<number>>;
  toggleValue: string;
  setToggleValue: React.Dispatch<
    React.SetStateAction<"Effectif" | "Planning" | "Rôle">
  >;
}

const RightBar = ({
  swimmerValue,
  setSwimmerValue,
  coachValue,
  setCoachValue,
  toggleValue,
  setToggleValue,
}: RightBarProps) => {
  const handleToggleAuth = (active: "Effectif" | "Planning" | "Rôle") => {
    setToggleValue(active);
  };

  const whatShow = (value: string) => {
    switch (value) {
      case "Effectif":
        return (
          <RightBarEffectif
            swimmerValue={swimmerValue}
            setSwimmerValue={setSwimmerValue}
            coachValue={coachValue}
            setCoachValue={setCoachValue}
          />
        );
      case "Planning":
        return <RightBarPlanning />;
      case "Rôle":
        return <RightBarRole />;
      default:
        return null;
    }
  };

  return (
    <Card className="row-start-1 row-end-9 col-start-2 col-end-2 h-full w-full !p-6 flex flex-col gap-4">
      {/* Boutons de navigation */}
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 rounded-md ${
            toggleValue === "Effectif"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => handleToggleAuth("Effectif")}
        >
          Effectif
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            toggleValue === "Planning"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => handleToggleAuth("Planning")}
        >
          Planning
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            toggleValue === "Rôle" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleToggleAuth("Rôle")}
        >
          Rôle
        </button>
      </div>

      {/* Affichage du contenu sélectionné */}
      {whatShow(toggleValue)}
    </Card>
  );
};

export default RightBar;
