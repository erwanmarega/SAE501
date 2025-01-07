"use client";

import React, { useState } from "react";
import H4 from "../../components/ui/texts/h4";
import InputNumber from "../../components/ui/input-number";
import SeanceCard from "../ui/seance-card";
import IndicatorSeanceCompletion from "../ui/indicator-seanceCompletion";

const RightBarPlanning = () => {
  const [trainingValue, setTrainingValue] = useState(0);
  const [competitionValue, setCompetitionValue] = useState(0);

  // Génération dynamique des cartes
  const generateSeanceCards = () => {
    const trainingCards = Array.from({ length: trainingValue }, (_, index) => (
      <SeanceCard key={`training-${index}`} variant="training" />
    ));
    const competitionCards = Array.from(
      { length: competitionValue },
      (_, index) => (
        <SeanceCard key={`competition-${index}`} variant="competition" />
      )
    );

    return [...trainingCards, ...competitionCards];
  };

  return (
    <section className="flex flex-col gap-2">
      <H4>Nombres de séances</H4>
      <div className="flex flex-col gap-4">
        <InputNumber
          value={trainingValue}
          onChange={setTrainingValue}
          label="Nombres d’entraînements"
        />
        <InputNumber
          value={competitionValue}
          onChange={setCompetitionValue}
          label="Nombres de compétitions"
        />
      </div>
      <H4>Disposez ces éléments</H4>
      <div className="bg-[#F9F9F9] border-dashed border-[#C9C9C9] border-[1px] h-48 w-full rounded-xl flex flex-wrap p-4 gap-6 overflow-hidden">
        {generateSeanceCards()}
      </div>
      <IndicatorSeanceCompletion />
    </section>
  );
};

export default RightBarPlanning;
