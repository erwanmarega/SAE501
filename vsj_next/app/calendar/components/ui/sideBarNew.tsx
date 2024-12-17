"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEvents } from "../../database/events-context";

// Components
import CloseButton from "./closeButton";
import Button from "@/app/components/ui/button";
import H4 from "@/app/components/ui/texts/h4";

// Inputs
import Input from "@/app/components/ui/input";
import Textarea from "@/app/components/ui/text-area";
import Select from "@/app/components/ui/select";
import InputHourWithDuration from "@/app/components/ui/input-hour";
import SelectWithIcons from "@/app/components/ui/select-withIcons";

// Icons
import LowItensityIcon from "@/public/assets/icons/lowIntensity.svg";
import MediumItensityIcon from "@/public/assets/icons/mediumIntensity.svg";
import HighItensityIcon from "@/public/assets/icons/highIntensity.svg";

interface SideBarNewProps {
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
}

const SideBarNew = ({ setWhatShow }: SideBarNewProps) => {
  const { addTrainingType } = useEvents();

  // États pour chaque valeur
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("18:00");
  const [duration, setDuration] = useState("30 minutes"); // Nouvel état pour la durée
  const [intensity, setIntensity] = useState("");
  const [description, setDescription] = useState("");

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

  return (
    <div className="w-full h-full flex flex-col overflow-hidden justify-between">
      <CloseButton onClick={() => setWhatShow("type")} />
      <header className="w-full flex flex-col gap-4 items-center">
        <Input
          type="text"
          name="Title"
          placeholder="Entrez un titre"
          className="!w-full mt-6"
          classNameContainer="items-center"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="h-[1px] bg-slate-200 w-96"></div>
      </header>

      <main className="flex flex-col h-3/5 justify-between">
        <div className="grid grid-cols-2">
          <H4>Catégorie</H4>
          <Select
            name="Type"
            options={[
              { value: "crawl", label: "Crawl" },
              { value: "brasse", label: "Brasse" },
              { value: "papillon", label: "Papillon" },
              { value: "back-crawl", label: "Dos crawlé" },
            ]}
            placeholder="Choisir"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            classNameContainer="w-max mr-0 ml-auto"
          />
        </div>

        <div className="grid grid-cols-2">
          <H4>Horaires</H4>
          <div>
            <InputHourWithDuration
              name="appointmentTime"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              duration={duration}
              onDurationChange={(newDuration) => setDuration(newDuration)}
              classNameContainer="w-max mr-0 ml-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-2">
          <H4>Intensité</H4>
          <div>
            <SelectWithIcons
              name="Difficulty"
              options={[
                {
                  value: "high",
                  label: "Élevé",
                  icon: (
                    <Image
                      src={HighItensityIcon}
                      alt="High Intensity"
                      width={20}
                      height={20}
                    />
                  ),
                },
                {
                  value: "medium",
                  label: "Moyen",
                  icon: (
                    <Image
                      src={MediumItensityIcon}
                      alt="Medium Intensity"
                      width={20}
                      height={20}
                    />
                  ),
                },
                {
                  value: "low",
                  label: "Facile",
                  icon: (
                    <Image
                      src={LowItensityIcon}
                      alt="Low Intensity"
                      width={20}
                      height={20}
                    />
                  ),
                },
              ]}
              placeholder="Choisir le niveau"
              value={intensity}
              onChange={(newValue) => setIntensity(newValue)}
              classNameContainer="w-max mr-0 ml-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-2">
          <H4>Description</H4>
          <div>
            <Textarea
              name="Adresse"
              placeholder="Entrez une description...."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              classNameContainer="w-max mr-0 ml-auto"
            />
          </div>
        </div>
      </main>

      <footer>
        <div className="w-full flex items-center justify-center">
          <div>
            <p className="text-3xl opacity-0">hsej</p>
            <p className="text-3xl opacity-0">hsej</p>
          </div>
          <Button onClick={handleSave} className="absolute bottom-6 !w-44">
            Enregistrez
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default SideBarNew;
