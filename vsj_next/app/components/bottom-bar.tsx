"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardIcon from "./ui/interactive-icons/dashboardIcon";
import CalendarIcon from "./ui/interactive-icons/calendarIcon";
import StatsIcon from "./ui/interactive-icons/statsIcon";
import MessageIcon from "./ui/interactive-icons/messageIcon";
import GroupeIcon from "./ui/interactive-icons/groupeIcon";
import MapIcon from "./ui/interactive-icons/mapIcon";
import { TypingText } from "./ui/typing-text";
import { AnimatedCloud } from "./ui/animated-cloud";

type BottomBarProps = {
  isPage?: boolean;
};

const BottomBar: React.FC<BottomBarProps> = ({ isPage = false }) => {
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [showBar, setShowBar] = useState<boolean>(!isPage);

  const handleIconClick = (iconName: string) => {
    setSelectedIcon(iconName);
  };

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

  return (
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
      <div onClick={() => handleIconClick("dashboard")}>
        <DashboardIcon isSelected={selectedIcon === "dashboard"} />
      </div>
      <div className="flex items-center w-full justify-around">
        <div
          onClick={() => handleIconClick("calendar")}
          className={`flex flex-col items-center gap-1 transition-transform duration-300 ${
            selectedIcon === "calendar" ? "translate-y-[-7px]" : "translate-y-0"
          }`}
        >
          <CalendarIcon isSelected={selectedIcon === "calendar"} />
          {selectedIcon === "calendar" && (
            <>
              <div className="flex flex-col items-center">
                <TypingText
                  text="Calendrier"
                  className="absolute -bottom-4 m-auto font-outfit font-bold text-[#818181] text-xs"
                />
              </div>
              <AnimatedCloud color="rgba(237, 72, 72, 0.15)" />
            </>
          )}
        </div>
        <div
          onClick={() => handleIconClick("message")}
          className={`flex flex-col items-center gap-1 transition-transform duration-300 ${
            selectedIcon === "message" ? "translate-y-[-7px]" : "translate-y-0"
          }`}
        >
          <MessageIcon isSelected={selectedIcon === "message"} />
          {selectedIcon === "message" && (
            <>
              <div className="flex flex-col items-center z-10">
                <TypingText
                  text="Messages"
                  className="absolute -bottom-4 m-auto font-outfit font-bold text-[#818181] text-xs"
                />
              </div>
              <AnimatedCloud color="rgba(68, 210, 115, 0.15)" />
            </>
          )}
        </div>
        <div
          onClick={() => handleIconClick("groupe")}
          className={`flex flex-col items-center gap-1 transition-transform duration-300 ${
            selectedIcon === "groupe" ? "translate-y-[-7px]" : "translate-y-0"
          }`}
        >
          <GroupeIcon isSelected={selectedIcon === "groupe"} />
          {selectedIcon === "groupe" && (
            <>
              <div className="flex flex-col items-center">
                <TypingText
                  text="Groupe"
                  className="absolute -bottom-4 m-auto font-outfit font-bold text-[#818181] text-xs"
                />
              </div>
              <AnimatedCloud color="rgba(123,104,238,0.15)" />
            </>
          )}
        </div>
        <div
          onClick={() => handleIconClick("stats")}
          className={`flex flex-col items-center gap-1 transition-transform duration-300 ${
            selectedIcon === "stats" ? "translate-y-[-7px]" : "translate-y-0"
          }`}
        >
          <StatsIcon isSelected={selectedIcon === "stats"} />
          {selectedIcon === "stats" && (
            <>
              <div className="flex flex-col items-center">
                <TypingText
                  text="Statistiques"
                  className="absolute -bottom-4 m-auto font-outfit font-bold text-[#818181] text-xs"
                />
              </div>
              <AnimatedCloud color="rgba(52, 140, 255, 0.15)" />
            </>
          )}
        </div>
        <div
          onClick={() => handleIconClick("map")}
          className={`flex flex-col items-center gap-1 transition-transform duration-300 ${
            selectedIcon === "map" ? "translate-y-[-7px]" : "translate-y-0"
          }`}
        >
          <MapIcon isSelected={selectedIcon === "map"} />
          {selectedIcon === "map" && (
            <>
              <div className="flex flex-col items-center">
                <TypingText
                  text="Carte"
                  className="absolute -bottom-4 m-auto font-outfit font-bold text-[#818181] text-xs"
                />
              </div>
              <AnimatedCloud color="rgba(250, 218, 94, 0.15)" />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BottomBar;
