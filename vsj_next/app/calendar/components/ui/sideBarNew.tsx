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
import Textarea from "@/app/components/ui/text-area";

// Icons
import LowItensityIcon from "@/public/assets/icons/lowIntensity.svg";
import MediumItensityIcon from "@/public/assets/icons/mediumIntensity.svg";
import HighItensityIcon from "@/public/assets/icons/highIntensity.svg";
import Profil from "@/app/components/profil/profil";
import Separator from "./separator";
import IntensitySelect from "./intensity-select";
import GroupSelect from "@/app/components/ui/group-select";

interface SideBarNewProps {
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
}

const SideBarNew = ({ setWhatShow }: SideBarNewProps) => {
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

  // États pour chaque valeur
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("18:00");
  const [duration, setDuration] = useState("30 minutes"); // Nouvel état pour la durée
  const [description, setDescription] = useState("");

  // Nouvel état pour le groupe sélectionné
  const [selectedGroup, setSelectedGroup] = useState<{
    label: string;
    icon: string;
  }>(
    { label: "Groupe C", icon: "/assets/icons/groups/groupC.svg" } // Par défaut groupe C
  );

  // Fonction de sauvegarde (exemple)
  const handleSave = () => {
    addTrainingType(
      "23/12/2024", // Date où vous souhaitez ajouter ce training
      title,
      category,
      time,
      duration,
      intensity,
      description,
      ["Martin"] // Coachs (optionnel)
    );

    setWhatShow("new");
  };

  // Gestionnaire de sélection de groupe
  const handleGroupSelect = (group: { label: string; icon: string }) => {
    setSelectedGroup(group);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden justify-between ">
      <CloseButton onClick={() => setWhatShow("type")} />
      {/*BADGE*/}
      <div className="absolute top-4 left-4">
        <div className="bg-primary/15 rounded-full py-2 px-4">
          <p className="text-primary font-mona font-medium text-xs text-center whitespace-nowrap flex gap-2 items-center cursor-pointer">
            <Image
              src={"/assets/icons/edit.svg"}
              width={15}
              height={15}
              alt="Modifier catégorie"
            />
            Brasse
          </p>
        </div>
      </div>
      {/*BADGE*/}
      <header className="w-full flex flex-col gap-4 items-center p-4">
        <div>
          <H4 className="!text-2xl text-center mt-4">10X200m </H4>
          <P className="text-center mt-0 !text-xs">10 Janvier</P>
        </div>
      </header>

      <main className="flex flex-col px-2 -mt-4">
        .
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
            <div className="flex items-center justify-end gap-4 ml-auto w-full">
              <P className="text-end text-lg+ !font-light text-nowrap">
                {selectedGroup.label} {/* Affichage dynamique du label */}
              </P>
              <GroupSelect size={45} onSelect={handleGroupSelect} />{" "}
              {/* Passage de la fonction de rappel */}
            </div>
          </div>
        </section>
        <section className="border-t-2 border-b-2 border-gray-100 pt-4 h-max">
          <div className="grid grid-rows-[max-content_1fr]">
            <H4>Description</H4>
            <div className="rounded-lg py-2 px-2 mt-2">
              <div>
                <Textarea
                  name="Adresse"
                  placeholder="Entrez une description...."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  classNameContainer="w-[93%] ml-auto mr-0"
                />
              </div>
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

export default SideBarNew;
