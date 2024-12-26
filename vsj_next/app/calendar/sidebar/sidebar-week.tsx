"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// Components
import CloseButton from "../ui/closeButton";
import Button from "@/app/components/ui/button";
import H4 from "@/app/components/ui/texts/h4";
import P from "@/app/components/ui/texts/p";
import SelectWithIcons from "@/app/components/ui/select-withIcons";
import EditBlock from "../ui/edit-block";
import InputNumber from "@/app/components/ui/input-number";
import H6 from "@/app/components/ui/texts/h6";

interface SidebarWeekProps {
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarWeek = ({ setWhatShow }: SidebarWeekProps) => {
  // Définir les états pour chaque input number
  const [value1, setValue1] = useState<number>(1);
  const [value2, setValue2] = useState<number>(1);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden ">
      <header className="w-full flex flex-col gap-4 items-center p-4">
        <H4 className="!text-2xl text-center mb-0">Semaine type</H4>
        <CloseButton onClick={() => setWhatShow("category")} />
      </header>

      <main className="flex flex-col items-center h-full justify-around">
        <section className="flex flex-col gap-4">
          <H6>Définir semaine type</H6>
          <InputNumber
            value={value1}
            onChange={setValue1}
            label="Nombres d'entraînements"
          />
          <InputNumber
            value={value2}
            onChange={setValue2}
            label="Nombres de compétitions"
          />
        </section>

        <section className="flex flex-col gap-4 h-full w-full max-w-72">
          <H6>Positionner les séances </H6>
          <div className="bg-[#f7f7f7] rounded-xl border-dashed border-[#c9c9c9] border-2 w-full h-32 relative overflow-auto p-2 flex gap-2 flex-wrap">
            {Array.from({ length: value1 }).map((_, i) => (
              <div
                key={`entrainement-${i}`}
                className="w-12 h-12 bg-primary/15 rounded flex-shrink-0"
              ></div>
            ))}
            {Array.from({ length: value2 }).map((_, i) => (
              <div
                key={`competition-${i}`}
                className="w-12 h-12 bg-secondary-map/15 rounded flex-shrink-0"
              ></div>
            ))}
          </div>
        </section>
      </main>

      <footer className="flex items-center">
        <Button className="!w-2/4 max-w-40 m-auto" variant="primary">
          Enregistrez
        </Button>
      </footer>
    </div>
  );
};

export default SidebarWeek;
