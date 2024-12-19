// components/SidebarCategory.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEvents } from "../database/events-context";

// Components
import CloseButton from "../ui/closeButton";
import Button from "@/app/components/ui/button";
import H4 from "@/app/components/ui/texts/h4";
import P from "@/app/components/ui/texts/p";

// Icons
import LowIntensityIcon from "@/public/assets/icons/lowIntensity.svg";
import MediumItensityIcon from "@/public/assets/icons/mediumIntensity.svg";
import HighItensityIcon from "@/public/assets/icons/highIntensity.svg";
import Profil from "@/app/components/profil/profil";
import Separator from "../ui/separator";
import IntensitySelect from "../ui/intensity-select";
import GroupBlock from "../ui/group-block";
import SelectWithIcons from "@/app/components/ui/select-withIcons";

interface SidebarCategoryProps {
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarCategory = ({ setWhatShow }: SidebarCategoryProps) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState(1);
  const { userStatus } = useEvents();

  const options = [
    {
      value: 1,
      label: "Natation",
      icon: (
        <Image
          src="/assets/icons/disciplines/natation.svg"
          alt="Natation"
          width={24}
          height={24}
        />
      ),
    },
    {
      value: 2,
      label: "Aquabike",
      icon: (
        <Image
          src="/assets/icons/disciplines/aquabike.svg"
          alt="Aquabike"
          width={24}
          height={24}
        />
      ),
    },
    {
      value: 3,
      label: "Aquagym",
      icon: (
        <Image
          src="/assets/icons/disciplines/aquagym.svg"
          alt="Aquagym"
          width={24}
          height={24}
        />
      ),
    },
  ];

  const handleSelectChange = (newValue: number) => {
    setSelectedDiscipline(newValue);
    // Vous pouvez également appeler setWhatShow ici si nécessaire
    // setWhatShow(newValue);
  };

  // Définir les groupes pour chaque section
  const groups = [
    {
      title: "Natation enfants",
      items: [
        {
          imageSrc: "/assets/icons/groups/groupA.svg",
          imageAlt: "Groupe A",
          groupName: "Groupe A",
        },
        {
          imageSrc: "/assets/icons/groups/groupB.svg",
          imageAlt: "Groupe B",
          groupName: "Groupe B",
        },
        {
          imageSrc: "/assets/icons/groups/groupC.svg",
          imageAlt: "Groupe C",
          groupName: "Groupe C",
        },
      ],
    },
    {
      title: "Natation adolescents",
      items: [
        {
          imageSrc: "/assets/icons/groups/groupA.svg",
          imageAlt: "Groupe A",
          groupName: "Groupe A",
        },
        {
          imageSrc: "/assets/icons/groups/groupB.svg",
          imageAlt: "Groupe B",
          groupName: "Groupe B",
        },
        {
          imageSrc: "/assets/icons/groups/groupC.svg",
          imageAlt: "Groupe C",
          groupName: "Groupe C",
        },
      ],
    },
    {
      title: "Natation adultes",
      items: [
        {
          imageSrc: "/assets/icons/groups/groupA.svg",
          imageAlt: "Groupe A",
          groupName: "Groupe A",
        },
        {
          imageSrc: "/assets/icons/groups/groupB.svg",
          imageAlt: "Groupe B",
          groupName: "Groupe B",
        },
        {
          imageSrc: "/assets/icons/groups/groupC.svg",
          imageAlt: "Groupe C",
          groupName: "Groupe C",
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full flex flex-col ">
      <header className="w-full flex flex-col gap-4 items-center p-4">
        <H4 className="!text-2xl text-center mb-0">Liste des groupes</H4>
        <SelectWithIcons
          name="select"
          options={options}
          placeholder="Disciplines"
          value={selectedDiscipline}
          onChange={handleSelectChange}
        />
      </header>

      <main className="flex flex-col items-center h-full justify-around">
        {groups.map((section, sectionIndex) => (
          <section
            key={sectionIndex}
            className="w-full max-w-96 grid grid-rows-[30px_1fr relative"
          >
            <h5 className="font-mona font-medium text-lg">{section.title}</h5>
            {userStatus === "admin" && (
              <Image
                src={"/assets/icons/editGroup.svg"}
                width={25}
                height={25}
                alt="Modifier ce groupe"
                className="absolute right-0 top-0 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setWhatShow("edit-week")}
              />
            )}
            <div className="bg-[#f7f7f7] flex py-4 px-2 rounded-xl w-full relative justify-around ">
              {section.items.map((group, groupIndex) => {
                // Générer un ID unique en combinant les indices
                const uniqueId = `group-${sectionIndex}-${groupIndex}`;
                return (
                  <GroupBlock
                    key={uniqueId} // Utilisation de l'ID unique comme key
                    id={uniqueId} // Passer l'ID unique en prop
                    imageSrc={group.imageSrc}
                    imageAlt={group.imageAlt}
                    groupName={group.groupName}
                    additionalClasses={
                      group.groupName === "Groupe C" ? "pb-8" : "pt-6 pb-8"
                    } // Exemple pour ajouter des classes conditionnelles
                  />
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default SidebarCategory;
