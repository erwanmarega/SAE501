// components/ui/side-bar-new.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEvents } from "../database/events-context";
import CloseButton from "../ui/closeButton";
import Button from "@/app/components/ui/button";
import H4 from "@/app/components/ui/texts/h4";
import P from "@/app/components/ui/texts/p";
import Textarea from "@/app/components/ui/text-area";
import Badge from "@/app/components/ui/badge";
import LowItensityIcon from "@/public/assets/icons/lowIntensity.svg";
import MediumItensityIcon from "@/public/assets/icons/mediumIntensity.svg";
import HighItensityIcon from "@/public/assets/icons/highIntensity.svg";
import Profil from "@/app/components/profil/profil";
import Separator from "../ui/separator";
import IntensitySelect from "../ui/intensity-select";
import GroupSelect from "@/app/components/ui/group-select";
import InputHourWithDuration from "@/app/components/ui/input-hour";

interface SideBarNewProps {
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
}

const SideBarNew = ({ setWhatShow }: SideBarNewProps) => {
  const { addTrainingType } = useEvents();

  const [intensity, setIntensity] = useState<string>(""); // Initialisez avec une valeur par défaut appropriée
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
  const [category, setCategory] = useState("Brasses");
  const [time, setTime] = useState("18:00");
  const [duration, setDuration] = useState("30 minutes");
  const [description, setDescription] = useState("");

  const [selectedGroup, setSelectedGroup] = useState<{
    label: string;
    icon: string;
  }>({
    label: "Groupe C",
    icon: "/assets/icons/groups/groupC.svg",
  });

  const handleSave = () => {
    addTrainingType(
      "23/12/2024",
      title,
      category,
      time,
      duration,
      intensity,
      description,
      ["Martin"]
    );

    setWhatShow("new");
  };

  const handleGroupSelect = (group: { label: string; icon: string }) => {
    setSelectedGroup(group);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden justify-between ">
      <CloseButton onClick={() => setWhatShow("category")} />
      <div className="absolute top-4 left-4">
        <Badge
          edit={true}
          text={category}
          onChange={(newCategory) => setCategory(newCategory)}
        />
      </div>
      <header className="w-full flex flex-col gap-4 items-center p-4">
        <div>
          <H4 className="!text-2xl text-center mt-4">10X200m </H4>
          <P className="text-center mt-0 !text-xs">10 Janvier</P>
        </div>
      </header>

      <main className="flex flex-col px-2 -mt-4">
        <section className="border-t-2 border-gray-100 py-4 h-20 flex items-center w-full">
          <div className="grid grid-cols-[1fr_auto] items-center w-full">
            <H4>Horaires</H4>
            <div className="flex items-center justify-end gap-4 ml-auto mr-0 w-full">
              <InputHourWithDuration
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                duration={duration}
                onDurationChange={setDuration}
                min="00:00"
                max="23:59"
                required
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
                {selectedGroup.label}
              </P>
              <GroupSelect size={45} onSelect={handleGroupSelect} />{" "}
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
                  className="w-[93%] ml-auto mr-0"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="w-full flex items-center justify-between gap-12">
          <Button
            variant="primary"
            className="!w-2/4 max-w-96 m-auto"
            onClick={handleSave}
          >
            Enregistrez
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default SideBarNew;
