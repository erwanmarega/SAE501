"use client";

import React, { useState } from "react";
import H4 from "@/app/components/ui/texts/h4";
import Image from "next/image";
import { motion } from "framer-motion";
import CloseButton from "./closeButton";
import Button from "@/app/components/ui/button";

// Inputs
import Input from "@/app/components/ui/input";
import Textarea from "@/app/components/ui/text-area";
import Select from "@/app/components/ui/select";
import InputHour from "@/app/components/ui/input-hour";
import SelectWithIcons from "@/app/components/ui/select-withIcons";

// Icons
import LowItensityIcon from "@/public/assets/icons/lowIntensity.svg";
import MediumItensityIcon from "@/public/assets/icons/mediumIntensity.svg";
import HighItensityIcon from "@/public/assets/icons/highIntensity.svg";

interface SideBarNewProps {
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
}

const SideBarNew = ({ setWhatShow }: SideBarNewProps) => {
  const [time, setTime] = useState("18:00");

  return (
    <div className="w-full h-full flex flex-col overflow-hidden justify-between">
      <CloseButton onClick={() => setWhatShow("type")} />
      <header className="w-full flex flex-col gap-4 items-center">
        <Input
          type="text"
          name="Ttile"
          placeholder="Entrez un titre"
          className="!w-full mt-6"
          classNameContainer="items-center"
        ></Input>
        <div className="h-[1px] bg-slate-200 w-96"></div>
      </header>

      <main
        className="flex flex-col h-3/5 
       justify-between"
      >
        <div className="flex justify-between items-center">
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
            className="!w-full "
          />
        </div>
        <div className="flex justify-between  items-center">
          <H4>Horaires</H4>
          <div>
            <InputHour
              name="appointmentTime"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="!w-full"
            />
          </div>
        </div>
        <div className="flex justify-between  items-center">
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
                      alt="High Intensity"
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
                      alt="High Intensity"
                      width={20}
                      height={20}
                    />
                  ),
                },
              ]}
              placeholder="Choisir le niveau"
              className="!w-full"
              classNameContainer="!w-full"
            />
          </div>
        </div>
        <div className="flex justify-between  items-center">
          <H4>Coach</H4>
          <div>
            <Input
              type="text"
              name="Adresse"
              placeholder="Entrez une adresse"
              className="!w-full "
            />
          </div>
        </div>
        <div className="flex justify-between  items-center">
          <H4>Description</H4>
          <div>
            <Textarea
              type="text"
              name="Adresse"
              placeholder="Entrez une adresse"
              className="!w-full"
            />
          </div>
        </div>
      </main>
      <footer>
        <div className="w-full flex items-center justify-center">
          <div>
            <p
              className="text-3xl opacity-0
            "
            >
              hsej
            </p>
            <p
              className="text-3xl opacity-0
            "
            >
              hsej
            </p>
          </div>
          <Button
            onClick={() => setWhatShow("new")}
            className="absolute bottom-6 !w-44"
          >
            Enregistrez
          </Button>
        </div>{" "}
      </footer>
    </div>
  );
};

export default SideBarNew;
