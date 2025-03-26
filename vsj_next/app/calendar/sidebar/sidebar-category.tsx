// components/SidebarCategory.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEvents } from "../database/events-context";
import CloseButton from "../ui/closeButton";
import Button from "@/app/components/ui/button";
import H4 from "@/app/components/ui/texts/h4";
import P from "@/app/components/ui/texts/p";
import SelectWithIcons from "@/app/components/ui/select-withIcons";
import GroupCard from "../ui/group-card";

interface Group {
  title: string;
  imageSrc: string;
}

interface Option {
  value: number;
  label: string;
  icon: React.ReactNode;
  groupes: Group[];
}

interface SidebarCategoryProps {
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarCategory = ({ setWhatShow }: SidebarCategoryProps) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState(1);
  const [clickedGroups, setClickedGroups] = useState<number[]>([]);
  const { userStatus } = useEvents();

  // Options de disciplines
  const options: Option[] = [
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
      groupes: [
        { title: "Natation Bébé", imageSrc: "/assets/icons/groups/groupA.svg" },
        {
          title: "Natation Enfants",
          imageSrc: "/assets/icons/groups/groupA.svg",
        },
        {
          title: "Natation Adolescents",
          imageSrc: "/assets/icons/groups/groupA.svg",
        },
        {
          title: "Natation Adultes",
          imageSrc: "/assets/icons/groups/groupA.svg",
        },
      ],
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
      groupes: [
        {
          title: "Aquabike jeunes",
          imageSrc: "/assets/icons/groups/groupA.svg",
        },
        { title: "Aquabike", imageSrc: "/assets/icons/groups/groupA.svg" },
      ],
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
      groupes: [
        {
          title: "Aquagym jeunes",
          imageSrc: "/assets/icons/groups/groupA.svg",
        },
        { title: "Aquagym", imageSrc: "/assets/icons/groups/groupA.svg" },
      ],
    },
  ];

  // Récupérer l'option sélectionnée
  const selectedOption = options.find(
    (option) => option.value === selectedDiscipline
  );
  const groupesToDisplay = selectedOption ? selectedOption.groupes : [];

  // Mise à jour de la discipline sélectionnée
  const handleSelectChange = (newValue: number) => {
    setSelectedDiscipline(newValue);
  };

  // Ajoute ou retire l'index du tableau des groupes cliqués
  const handleSelectCard = (groupIndex: number) => {
    setClickedGroups((prevClicked) => {
      // Si l'index est déjà dans le tableau, on l'enlève
      if (prevClicked.includes(groupIndex)) {
        return prevClicked.filter((idx) => idx !== groupIndex);
      }
      // Sinon on l'ajoute
      return [...prevClicked, groupIndex];
    });
  };

  const Title = userStatus === "admin" ? "Liste des groupes" : "Mes groupes";

  return (
    <div className="w-full h-full grid grid-rows-[120px_1fr]">
      <header className="w-full h-full flex flex-col gap-4 items-center p-4">
        <H4 className="!text-2xl text-center mb-0">{Title}</H4>
        <SelectWithIcons
          name="select"
          options={options}
          placeholder="Disciplines"
          value={selectedDiscipline}
          onChange={handleSelectChange}
        />
      </header>

      <main
        className="h-full max-h-[63vh] flex flex-col items-center overflow-y-auto gap-8 pr-2 -mr-2
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {groupesToDisplay.map((group, groupIndex) => (
          <GroupCard
            key={groupIndex}
            group={group}
            groupIndex={groupIndex}
            userStatus={userStatus}
            // isSelected vérifie si l'index est dans clickedGroups
            isSelected={clickedGroups.includes(groupIndex)}
            onSelect={handleSelectCard}
            setWhatShow={setWhatShow}
          />
        ))}
      </main>
    </div>
  );
};

export default SidebarCategory;
