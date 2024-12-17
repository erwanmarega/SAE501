"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEvents } from "../../database/events-context";

// Components
import CloseButton from "./closeButton";
import Button from "@/app/components/ui/button";
import H4 from "@/app/components/ui/texts/h4";
import P from "@/app/components/ui/texts/p";

// Icons
import LowItensityIcon from "@/public/assets/icons/lowIntensity.svg";
import MediumItensityIcon from "@/public/assets/icons/mediumIntensity.svg";
import HighItensityIcon from "@/public/assets/icons/highIntensity.svg";
import Profil from "@/app/components/profil/profil";
import Separator from "./separator";
import IntensitySelect from "./intensity-select";

interface SideBarNewProps {
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
}

const SideBarShow = ({ setWhatShow }: SideBarNewProps) => {
  const { addTrainingType } = useEvents();

  const [intensity, setIntensity] = useState<string>("Facile");
  const handleIntensitySelect = (level: number) => {
    switch (level) {
      case 1:
        setIntensity("Facile");
        break;
      case 2:
        setIntensity("Moyen");
        break;
      case 3:
        setIntensity("Difficile");
        break;
      default:
        setIntensity("");
    }
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden justify-between ">
      <CloseButton onClick={() => setWhatShow("type")} />
      {/*BADGE*/}
      <div className="absolute top-4 left-4">
        <div className="bg-primary/15 rounded-full py-2 px-4">
          <p className="text-primary font-mona font-medium text-xs text-center whitespace-nowrap">
            Brasse
          </p>
        </div>
      </div>
      {/*BADGE*/}
      <header className="w-full flex flex-col gap-4 items-center p-4">
        <div>
          <H4 className="!text-2xl text-center mb-0">10X200m </H4>
          <P className="text-center mt-0 !text-xs">10 Janvier</P>
        </div>
      </header>

      <main className="flex flex-col px-2 -mt-14">
        <section className="border-t-2 border-gray-100 py-4 h-20 flex items-center w-full">
          <div className="grid grid-cols-[1fr_auto] items-center w-full">
            <H4>Horaires</H4>
            <div className="flex items-center justify-end gap-4 ml-auto mr-0 w-full">
              <P className="text-end text-lg+ !font-light">18:00 - 19:30</P>

              <Image
                src={"/assets/icons/charts-hour/30.svg"}
                alt="Durée de 30min"
                width={60}
                height={60}
                className="-mt-2 -mr-4"
              />
            </div>
          </div>
        </section>

        <section className="border-t-2 border-gray-100 py-4 h-20 flex items-center w-full">
          <div className="grid grid-cols-[1fr_auto] items-center w-full">
            <H4>Intensité</H4>
            <div className="flex items-center justify-end gap-4 ml-auto mr-0 w-full">
              <P className="text-end text-lg+ !font-light"> {intensity}</P>
              <div>
                <IntensitySelect onSelect={handleIntensitySelect} />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t-2 border-gray-100 py-4 h-20 flex items-center w-full">
          <div className="grid grid-cols-[1fr_auto] items-center w-full">
            <H4>Groupe</H4>
            <div className="flex items-center justify-end gap-4 ml-auto -mr-1 w-full">
              <P className="text-end text-lg+ !font-light text-nowrap">
                {" "}
                Groupe A
              </P>

              <Profil size={55} />
            </div>
          </div>
        </section>

        <section className="border-t-2 border-b-2 border-gray-100 py-4 h-32">
          <div className="grid grid-rows-[max-content_1fr]">
            <H4>Description</H4>
            <div className="bg-gray-100 rounded-lg py-2 px-2 mt-2">
              <P className="text-xs">
                Ceci est une description complète, j'écris pour remplir, cela
                est vrai, test pour tester le design. Donc entrainement sans
                eau, ça va vous apprendre, Eh tu toi tu va faire quoi ? Conduire
                le bus, alors ALLEZ DONNE TOI!! C'est ton dernière entraînement
                ici
              </P>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="w-full flex items-center justify-between gap-12">
          <Button className="" variant="outline">
            Absent
          </Button>

          <Button variant="primary">Présent</Button>
        </div>
      </footer>
    </div>
  );
};

export default SideBarShow;
