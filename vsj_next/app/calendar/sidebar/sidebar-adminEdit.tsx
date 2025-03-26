// components/SideBarAdmin.jsx
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
import SelectWithIcons from "@/app/components/ui/select-withIcons";
import Select from "@/app/components/ui/select";
import EditBlock from "../ui/edit-block";

interface SideBarAdminEditProps {
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
}

const SideBarAdminEdit = ({ setWhatShow }: SideBarAdminEditProps) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const options = [
    {
      value: "1",
      label: "Natation Bébé",
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
      value: "2",
      label: "Natation Enfants",
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
      value: "3",
      label: "Natation Adolescents",
      icon: (
        <Image
          src="/assets/icons/disciplines/aquagym.svg"
          alt="Aquagym"
          width={24}
          height={24}
        />
      ),
    },
    {
      value: "4",
      label: "Natation Adultes",
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDiscipline(e.target.value);
  };

  const groups = [
    {
      title: "Entraînements",
      items: [
        {
          imageSrc: "/assets/icons/addIcon.svg",
          imageAlt: "Ajouter",
          groupName: "Ajouter",
        },
        {
          imageSrc: "/assets/icons/deleteIcon.svg",
          imageAlt: "Supprimer",
          groupName: "Supprimer",
        },
      ],
    },
    {
      title: "Compétition",
      items: [
        {
          imageSrc: "/assets/icons/addIcon.svg",
          imageAlt: "Ajouter",
          groupName: "Ajouter",
        },
        {
          imageSrc: "/assets/icons/deleteIcon.svg",
          imageAlt: "Supprimer",
          groupName: "Supprimer",
        },
      ],
    },
  ];

  const handleBlockClick = (id: string) => {
    setSelectedBlockId(id);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden ">
      <CloseButton onClick={() => setWhatShow("category")} />

      <header className="w-full flex flex-col gap-4 items-center p-4">
        <H4 className="!text-2xl text-center mb-0">Modifier planning</H4>
        <Select
          name="select"
          options={options}
          value={selectedDiscipline}
          onChange={handleSelectChange}
        />
      </header>

      <main className="flex flex-col items-center h-full justify-around ">
        {groups.map((section, sectionIndex) => (
          <section
            key={sectionIndex}
            className="w-full max-w-96 grid grid-rows-[30px_1fr]"
          >
            <h5 className="font-mona font-medium text-lg">{section.title}</h5>
            <div className="bg-[#f7f7f7] flex py-4 px-2 rounded-xl w-full relative justify-around">
              {section.items.map((group, groupIndex) => {
                const uniqueId = `group-${sectionIndex}-${groupIndex}`;
                return (
                  <EditBlock
                    key={uniqueId}
                    id={uniqueId}
                    imageSrc={group.imageSrc}
                    imageAlt={group.imageAlt}
                    groupName={group.groupName}
                    additionalClasses={
                      group.groupName === "Groupe C" ? "pb-8" : "pt-6 pb-8"
                    }
                    isSelected={selectedBlockId === uniqueId}
                    onClick={() => handleBlockClick(uniqueId)}
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

export default SideBarAdminEdit;
