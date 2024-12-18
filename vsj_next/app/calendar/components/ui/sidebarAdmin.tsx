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
import LowIntensityIcon from "@/public/assets/icons/lowIntensity.svg";
import MediumItensityIcon from "@/public/assets/icons/mediumIntensity.svg";
import HighItensityIcon from "@/public/assets/icons/highIntensity.svg";
import Profil from "@/app/components/profil/profil";
import Separator from "./separator";
import IntensitySelect from "./intensity-select";
import Group from "@/app/components/ui/group";
import SelectWithIcons from "@/app/components/ui/select-withIcons";

interface SideBarAdminProps {
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
}

const SideBarAdmin = ({ setWhatShow }: SideBarAdminProps) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState("");

  const options = [
    {
      value: "1",
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
      value: "2",
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
      value: "3",
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

  const handleSelectChange = (newValue: string) => {
    setSelectedDiscipline(newValue);
    // Vous pouvez également appeler setWhatShow ici si nécessaire
    // setWhatShow(newValue);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden ">
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

      <main className="">
        <section className="w-full grid grid-rows-[30px_1fr]">
          <h5 className="font-mona font-medium text-lg">Natation enfants</h5>
          <div className="bg-[#f7f7f7] flex py-4 px-2 rounded-xl w-full relativen justify-around relative">
            <div
              className="rounded-xl bg-white border-2 border-[#E5E7EB] p-6 flex flex-col items-center
            "
            >
              <Image
                src={"/assets/icons/groups/groupA.svg"}
                alt="Groupe A"
                width={35}
                height={35}
                className="-mt-1"
              />
              <h5 className="font-outfit font-semibold text-sm text-center absolute bottom-6 text-gray-900">
                Groupe A
              </h5>
            </div>
            <div
              className="rounded-xl bg-white border-2 border-[#E5E7EB] p-6 pt-6 pb-8 flex flex-col items-center 
            "
            >
              <Image
                src={"/assets/icons/groups/groupA.svg"}
                alt="Groupe A"
                width={35}
                height={35}
                className="-mt-1"
              />
              <h5 className="font-outfit font-semibold text-sm text-center absolute bottom-6 text-gray-900">
                Groupe A
              </h5>
            </div>
            <div
              className="rounded-xl bg-white border-2 border-[#E5E7EB] p-6 flex flex-col items-center
            "
            >
              <Image
                src={"/assets/icons/groups/groupA.svg"}
                alt="Groupe A"
                width={35}
                height={35}
                className="-mt-1"
              />
              <h5 className="font-outfit font-semibold text-sm text-center absolute bottom-6 text-gray-900">
                Groupe C
              </h5>
            </div>
          </div>
        </section>
        <section className="w-full grid grid-rows-[30px_1fr]">
          <h5 className="font-mona font-medium text-lg">
            Natation adolescents
          </h5>
          <div className="bg-[#f7f7f7] flex py-4 px-2 rounded-xl w-full relativen justify-around relative">
            <div
              className="rounded-xl bg-white border-2 border-[#E5E7EB] p-6 flex flex-col items-center
            "
            >
              <Image
                src={"/assets/icons/groups/groupA.svg"}
                alt="Groupe A"
                width={35}
                height={35}
                className="-mt-1"
              />
              <h5 className="font-outfit font-semibold text-sm text-center absolute bottom-6 text-gray-900">
                Groupe A
              </h5>
            </div>
            <div
              className="rounded-xl bg-white border-2 border-[#E5E7EB] p-6 pt-6 pb-8 flex flex-col items-center 
            "
            >
              <Image
                src={"/assets/icons/groups/groupA.svg"}
                alt="Groupe A"
                width={35}
                height={35}
                className="-mt-1"
              />
              <h5 className="font-outfit font-semibold text-sm text-center absolute bottom-6 text-gray-900">
                Groupe A
              </h5>
            </div>
            <div
              className="rounded-xl bg-white border-2 border-[#E5E7EB] p-6 flex flex-col items-center
            "
            >
              <Image
                src={"/assets/icons/groups/groupA.svg"}
                alt="Groupe A"
                width={35}
                height={35}
                className="-mt-1"
              />
              <h5 className="font-outfit font-semibold text-sm text-center absolute bottom-6 text-gray-900">
                Groupe C
              </h5>
            </div>
          </div>
        </section>
        <section className="w-full grid grid-rows-[30px_1fr]">
          <h5 className="font-mona font-medium text-lg">Natation adultes</h5>
          <div className="bg-[#f7f7f7] flex py-4 px-2 rounded-xl w-full relativen justify-around relative">
            <div
              className="rounded-xl bg-white border-2 border-[#E5E7EB] p-6 flex flex-col items-center
            "
            >
              <Image
                src={"/assets/icons/groups/groupA.svg"}
                alt="Groupe A"
                width={35}
                height={35}
                className="-mt-1"
              />
              <h5 className="font-outfit font-semibold text-sm text-center absolute bottom-6 text-gray-900">
                Groupe A
              </h5>
            </div>
            <div
              className="rounded-xl bg-white border-2 border-[#E5E7EB] p-6 pt-6 pb-8 flex flex-col items-center 
            "
            >
              <Image
                src={"/assets/icons/groups/groupA.svg"}
                alt="Groupe A"
                width={35}
                height={35}
                className="-mt-1"
              />
              <h5 className="font-outfit font-semibold text-sm text-center absolute bottom-6 text-gray-900">
                Groupe A
              </h5>
            </div>
            <div
              className="rounded-xl bg-white border-2 border-[#E5E7EB] p-6 flex flex-col items-center
            "
            >
              <Image
                src={"/assets/icons/groups/groupA.svg"}
                alt="Groupe A"
                width={35}
                height={35}
                className="-mt-1"
              />
              <h5 className="font-outfit font-semibold text-sm text-center absolute bottom-6 text-gray-900">
                Groupe C
              </h5>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SideBarAdmin;
