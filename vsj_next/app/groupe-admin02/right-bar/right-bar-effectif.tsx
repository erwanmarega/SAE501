"use client";

import React, { useState } from "react";
import H4 from "../../components/ui/texts/h4";
import InputNumber from "../../components/ui/input-number";

const RightBarEffectif = () => {
  const [swimmerValue, setSwimmerValue] = useState(0);
  const [coachValue, setCoachValue] = useState(0);

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
