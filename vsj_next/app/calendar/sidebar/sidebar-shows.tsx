// components/SidebarCategory.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEvents } from "../database/events-context";
import H4 from "@/app/components/ui/texts/h4";
import ProgressIndicator from "@/app/components/ui/progress-indicator";

interface SidebarShowsProps {
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarShows = ({ setWhatShow }: SidebarShowsProps) => {
  return (
    <div className="w-full h-full grid grid-rows-[130px_1fr] relative">
      <header className="w-full h-full flex flex-col gap-4 items-center p-4">
        <H4 className="!text-2xl text-center mb-0">Entraînemets</H4>
        {/*BADGE*/}
        <div className="absolute left-2 top-2">
          <div className="bg-black/15 rounded-full py-1 px-2">
            <p className="text-black font-mona font-medium text-5xs text-center whitespace-nowrap">
              18/02/2024
            </p>
          </div>
        </div>
        {/*BADGE*/}
      </header>

      <main
        className="h-full max-h-[60vh] flex flex-col items-center overflow-y-auto gap-8 pr-2 -mr-2
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <motion.section
          // On alterne l’opacité en fonction de isSelected
          className={`
        w-full max-w-96 relative cursor-pointer transition-opacity
       `}
          // Framer Motion props :
          initial={{ scale: 1 }}
          whileTap={{
            scale: 0.975,
            transition: { duration: 0.1 },
          }}
          onClick={() => setWhatShow("show")}
        >
          <div className="bg-[#f7f7f7] py-3 px-4 rounded-xl w-full relative flex flex-col gap-3">
            <section className="flex flex-col gap-1">
              {/*BADGE*/}
              <div className="absolute right-3 top-3">
                <div className="bg-primary/15 rounded-full py-1 px-2">
                  <p className="text-primary font-mona font-medium text-5xs text-center whitespace-nowrap">
                    Entraînement
                  </p>
                </div>
              </div>
              {/*BADGE*/}

              <h3 className="font-semibold font-outfit text-lg">2x200m</h3>

              <section className="flex items-center gap-2">
                <div className={" rounded-full w-max px-2 py-1 bg-primary"}>
                  <p className="font-mona font-base text-3xs text-white">
                    09:30
                  </p>
                </div>
                <p className="font-mona font-medium text-[#696969] text-xs">
                  1h30
                </p>
              </section>
            </section>

            <ProgressIndicator
              total={30}
              present={20}
              unmarked={7}
              absent={3}
            />
            <p className="font-mona font-medium text-[#696969] text-3xs mr-0 ml-auto text-end -mt-2 -mb-1">
              {20}/{30} présents
            </p>
          </div>
        </motion.section>
        <motion.section
          // On alterne l’opacité en fonction de isSelected
          className={`
        w-full max-w-96 relative cursor-pointer transition-opacity
       `}
          // Framer Motion props :
          initial={{ scale: 1 }}
          whileTap={{
            scale: 0.975, // Effet de 'tap' (l'élément se rétrécit légèrement)
            transition: { duration: 0.1 },
          }}
        >
          <div className="bg-[#f7f7f7] py-3 px-4 rounded-xl w-full relative flex flex-col gap-3">
            <section className="flex flex-col gap-1">
              {/*BADGE*/}
              <div className="absolute right-3 top-3">
                <div className="bg-primary/15 rounded-full py-1 px-2">
                  <p className="text-primary font-mona font-medium text-5xs text-center whitespace-nowrap">
                    Entraînement
                  </p>
                </div>
              </div>
              {/*BADGE*/}

              <h3 className="font-semibold font-outfit text-lg">2x200m</h3>

              <section className="flex items-center gap-2">
                <div className={" rounded-full w-max px-2 py-1 bg-primary"}>
                  <p className="font-mona font-base text-3xs text-white">
                    09:30
                  </p>
                </div>
                <p className="font-mona font-medium text-[#696969] text-xs">
                  1h30
                </p>
              </section>
            </section>

            <ProgressIndicator
              total={30}
              present={20}
              unmarked={7}
              absent={3}
            />
            <p className="font-mona font-medium text-[#696969] text-3xs mr-0 ml-auto text-end -mt-2 -mb-1">
              {20}/{30} présents
            </p>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default SidebarShows;
