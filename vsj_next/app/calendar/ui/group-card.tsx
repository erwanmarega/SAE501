// components/ui/group-card.tsx
"use client";

import React from "react";
import Image from "next/image";
// Import framer-motion
import { motion } from "framer-motion";
import ProgressIndicator from "@/app/components/ui/progress-indicator";
import clsx from "clsx";

interface Group {
  title: string;
  imageSrc: string;
}

interface GroupCardProps {
  group: Group;
  groupIndex: number;
  userStatus?: string;
  isSelected: boolean;
  onSelect: (index: number) => void;
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
}

const GroupCard: React.FC<GroupCardProps> = ({
  group,
  groupIndex,
  userStatus,
  isSelected,
  onSelect,
  setWhatShow,
}) => {
  // fonction qui gère le clic sur la carte
  const handleClick = () => {
    onSelect(groupIndex);
  };

  return (
    <motion.section
      // On alterne l’opacité en fonction de isSelected
      className={`
        w-full max-w-96 relative cursor-pointer transition-opacity
        ${isSelected ? "opacity-100" : "opacity-50"}
      `}
      onClick={handleClick}
      // Framer Motion props :
      initial={{ scale: 1 }}
      whileTap={{
        scale: 0.975, // Effet de 'tap' (l'élément se rétrécit légèrement)
        transition: { duration: 0.1 },
      }}
    >
      <div className="bg-[#f7f7f7] py-3 px-4 rounded-xl w-full relative flex flex-col gap-3">
        <section className="flex flex-col gap-1">
          <div
            className={clsx(
              "rounded-full w-10 h-10  absolute top-3 right-3 flex items-center justify-center",
              { "bg-primary": isSelected },
              { "bg-gray-400": !isSelected }
            )}
          >
            <Image
              src="/assets/icons/groups/groupAwhite.svg"
              width={20}
              height={20}
              alt="Groupe A"
              className="m-auto"
            />
          </div>

          <h3 className="font-semibold font-outfit text-lg">{group.title}</h3>

          <section className="flex items-center gap-2">
            <div
              className={clsx(
                " rounded-full w-max px-2 py-1",
                { "bg-primary": isSelected },
                { "bg-gray-400": !isSelected }
              )}
            >
              <p className="font-mona font-base text-3xs text-white">DEMAIN</p>
            </div>
            <p className="font-mona font-medium text-[#696969] text-xs">
              09:30 - 10:30
            </p>
          </section>
        </section>

        <ProgressIndicator
          total={30}
          present={20}
          unmarked={7}
          absent={3}
          isSelected={isSelected}
        />
        <p className="font-mona font-medium text-[#696969] text-3xs mr-0 ml-auto text-end -mt-2 -mb-1">
          {20}/{30} présents
        </p>
      </div>
    </motion.section>
  );
};

export default GroupCard;
