"use client";

import React, { useState } from "react";
import Card from "../../components/ui/card";
import InputSelectUpdate from "../../components/ui/input-select-update";
import InputNumber from "../../components/ui/input-number";
import H4 from "../../components/ui/texts/h4";
import ToggleSlide from "../../authentification/ui/toggle-slide";
import RightBarEffectif from "./right-bar-effectif";
import RightBarPlanning from "./right-bar-planning";

const RightBar = () => {
  const options = [
    { value: "baby-swimming", label: "Natation Bébé", icon: "/icons/baby.png" },
    {
      value: "kids-swimming",
      label: "Natation Enfants",
      icon: "/icons/kids.png",
    },
    {
      value: "teens-swimming",
      label: "Natation Ados",
      icon: "/icons/teens.png",
    },
    {
      value: "adults-swimming",
      label: "Natation Adultes",
      icon: "/icons/adults.png",
    },
  ];

  const [toggleValue, setToggleValue] = useState<"Effectif" | "Planning">(
    "Effectif"
  );
  const handleToggleAuth = (active: "Effectif" | "Planning") => {
    setToggleValue(active);
  };

  const whatShow = (value: string) => {
    switch (value) {
      case "Effectif":
        return <RightBarEffectif />;
        break;
      case "Planning":
        return <RightBarPlanning />;
        break;

      default:
        return null;
        break;
    }
  };

  return (
    <Card className="row-start-1 row-end-9 col-start-2 col-end-2 h-full w-full !p-6 flex flex-col gap-4">
      <ToggleSlide
        leftLabel={"Effectif"}
        rightLabel={"Planning"}
        onChange={(position) =>
          handleToggleAuth(position === "left" ? "Effectif" : "Planning")
        }
      />

      {whatShow(toggleValue)}
    </Card>
  );
};

export default RightBar;
