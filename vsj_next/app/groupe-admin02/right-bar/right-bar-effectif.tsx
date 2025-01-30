"use client";

import React, { useState } from "react";
import H4 from "../../components/ui/texts/h4";
import InputNumber from "../../components/ui/input-number";

interface RightBarEffectifProps {
  swimmerValue: number;
  setSwimmerValue: React.Dispatch<React.SetStateAction<number>>;
  coachValue: number;
  setCoachValue: React.Dispatch<React.SetStateAction<number>>;
}

const RightBarEffectif = ({
  swimmerValue,
  setSwimmerValue,
  coachValue,
  setCoachValue,
}: RightBarEffectifProps) => {
  return (
    <section className="flex flex-col gap-2">
      <H4>Capacités cible</H4>
      <div className="flex flex-col gap-4">
        <InputNumber
          value={swimmerValue}
          onChange={setSwimmerValue}
          label="Nombres de nageurs optimal"
        />
        <InputNumber
          value={coachValue}
          onChange={setCoachValue}
          label="Nombres de coachs optimal"
        />
      </div>
    </section>
  );
};

export default RightBarEffectif;
