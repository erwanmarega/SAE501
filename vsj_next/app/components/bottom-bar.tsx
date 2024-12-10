"use client";

import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import DashboardIcon from "./ui/interactive-icons/dashboardIcon";
import CalendarIcon from "./ui/interactive-icons/calendarIcon";
import StatsIcon from "./ui/interactive-icons/statsIcon";
import MessageIcon from "./ui/interactive-icons/messageIcon";
import GroupeIcon from "./ui/interactive-icons/groupeIcon";
import MapIcon from "./ui/interactive-icons/mapIcon";
import { TypingText } from "./ui/typing-text";
import { AnimatedCloud } from "./ui/animated-cloud";
import { LanguageContext } from "../contexts/language-context";

type BottomBarProps = {
  isPage?: boolean;
  setCurrentPage: (page: string) => void;
  currentPage: string;
};

const BottomBar: React.FC<BottomBarProps> = ({
  isPage = false,
  setCurrentPage,
  currentPage,
}) => {
  const { currentLocale } = useContext(LanguageContext);
  const [showBar, setShowBar] = useState<boolean>(!isPage);

  useEffect(() => {
    if (!isPage) return;

    const handleMouseMove = (event: MouseEvent) => {
      const { clientY } = event;
      const windowHeight = window.innerHeight;

      // Affiche la barre si la souris approche du bas
      if (clientY > windowHeight - 50) {
        setShowBar(true);
      }
      // Cache la barre si la souris remonte à plus de 60% de l'écran
      else if (clientY < windowHeight * 0.75) {
        setShowBar(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isPage]);

  // Fonction pour déterminer si une page est sélectionnée
  const isSelected = (page: string) => currentPage === page;

  // Définir les traductions directement
  const translations = {
    en: {
      Calendar: "Calendar",
      Message: "Messages",
      Group: "Group",
      Stats: "Statistics",
      Map: "Map",
    },
    fr: {
      Calendar: "Calendrier",
      Message: "Messages",
      Group: "Groupe",
      Stats: "Statistiques",
      Map: "Carte",
    },
  } as const;

  const t = translations[currentLocale];

  return (
    <div className="flex justify-center">
      <motion.div
        initial={{ y: isPage ? 100 : 0 }}
        animate={{ y: showBar ? 0 : 125 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className="overflow-hidden bg-white w-[550px] flex items-center rounded-3xl fixed bottom-7 shadow-lg p-5 h-20 gap-8 border-1 border-[#ECECEC] m-auto"
        style={{
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div>
          <button onClick={() => setCurrentPage("Dashboard")}>
            <DashboardIcon isSelected={isSelected("Dashboard")} />
          </button>
        </div>

        <div className="flex items-center w-full justify-around">
          <div
            className={`flex flex-col items-center gap-1 transition-transform duration-300 ${
              isSelected("Calendar") ? "translate-y-[-7px]" : "translate-y-0"
            }`}
          >
            <button onClick={() => setCurrentPage("Calendar")}>
              <CalendarIcon isSelected={isSelected("Calendar")} />
            </button>
            {isSelected("Calendar") && (
              <>
                <TypingText
                  text={t.Calendar}
                  className="absolute -bottom-4 m-auto font-outfit font-bold text-[#818181] text-xs"
                />
                <AnimatedCloud color="rgba(237, 72, 72, 0.15)" />
              </>
            )}
          </div>

          <div
            className={`flex flex-col items-center gap-1 transition-transform duration-300 ${
              isSelected("Message") ? "translate-y-[-7px]" : "translate-y-0"
            }`}
          >
            <button onClick={() => setCurrentPage("Message")}>
              <MessageIcon isSelected={isSelected("Message")} />
            </button>
            {isSelected("Message") && (
              <>
                <TypingText
                  text={t.Message}
                  className="absolute -bottom-4 m-auto font-outfit font-bold text-[#818181] text-xs"
                />
                <AnimatedCloud color="rgba(68, 210, 115, 0.15)" />
              </>
            )}
          </div>

          <div
            className={`flex flex-col items-center gap-1 transition-transform duration-300 ${
              isSelected("Group") ? "translate-y-[-7px]" : "translate-y-0"
            }`}
          >
            <button onClick={() => setCurrentPage("Group")}>
              <GroupeIcon isSelected={isSelected("Group")} />
            </button>
            {isSelected("Group") && (
              <>
                <TypingText
                  text={t.Group}
                  className="absolute -bottom-4 m-auto font-outfit font-bold text-[#818181] text-xs"
                />
                <AnimatedCloud color="rgba(123,104,238,0.15)" />
              </>
            )}
          </div>

          <div
            className={`flex flex-col items-center gap-1 transition-transform duration-300 ${
              isSelected("Stats") ? "translate-y-[-7px]" : "translate-y-0"
            }`}
          >
            <button onClick={() => setCurrentPage("Stats")}>
              <StatsIcon isSelected={isSelected("Stats")} />
            </button>
            {isSelected("Stats") && (
              <>
                <TypingText
                  text={t.Stats}
                  className="absolute -bottom-4 m-auto font-outfit font-bold text-[#818181] text-xs"
                />
                <AnimatedCloud color="rgba(52, 140, 255, 0.15)" />
              </>
            )}
          </div>

          <div
            className={`flex flex-col items-center gap-1 transition-transform duration-300 ${
              isSelected("Map") ? "translate-y-[-7px]" : "translate-y-0"
            }`}
          >
            <button onClick={() => setCurrentPage("Map")}>
              <MapIcon isSelected={isSelected("Map")} />
            </button>
            {isSelected("Map") && (
              <>
                <TypingText
                  text={t.Map}
                  className="absolute -bottom-4 m-auto font-outfit font-bold text-[#818181] text-xs"
                />
                <AnimatedCloud color="rgba(250, 218, 94, 0.15)" />
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BottomBar;
