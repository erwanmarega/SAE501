import React, { useEffect, useRef, useState } from "react";
import Card from "@/app/components/ui/card";
import { useLanguage } from "@/app/components/header/ui/context/language-provider";
import H4 from "@/app/components/ui/texts/h4";
import Image from "next/image";
import P from "@/app/components/ui/texts/p";
import BlockStats from "./ui/block-stats";

const StatsCard = () => {
  const { language } = useLanguage();

  const DatesData = [
    { date: "2024-12-20", quantity: 0 }, // i=0 (pas de quantity)
    { date: "2024-12-21", quantity: 0 }, // i=1
    { date: "2024-12-22", quantity: 1 }, // i=2
    { date: "2024-12-23", quantity: 2 }, // i=3
    { date: "2024-12-24", quantity: 0 }, // i=4
    { date: "2024-12-25", quantity: 0 }, // i=5
    { date: "2024-12-26", quantity: 1 }, // i=6
    { date: "2024-12-27", quantity: 2 }, // i=7
    { date: "2024-12-28", quantity: 0 }, // i=8
    { date: "2024-12-29", quantity: 0 }, // i=9
    { date: "2024-12-30", quantity: 1 }, // i=10
    { date: "2024-12-31", quantity: 2 }, // i=11
    { date: "2025-01-01", quantity: 0 }, // i=12
    { date: "2025-01-02", quantity: 0 }, // i=13
    { date: "2025-01-03", quantity: 1 }, // i=14
    { date: "2025-01-04", quantity: 2 }, // i=15
    { date: "2025-01-05", quantity: 0 }, // i=16
    { date: "2025-01-06", quantity: 0 }, // i=17
    { date: "2025-01-07", quantity: 1 }, // i=18
    { date: "2025-01-08", quantity: 2 }, // i=19
    { date: "2025-01-09", quantity: 0 }, // i=20
    { date: "2025-01-10", quantity: 0 }, // i=21
    { date: "2025-01-11", quantity: 1 }, // i=22
    { date: "2025-01-12", quantity: 2 }, // i=23
    { date: "2025-01-13", quantity: 0 }, // i=24
    { date: "2025-01-14", quantity: 0 }, // i=25
    { date: "2025-01-15", quantity: 1 }, // i=26
    { date: "2025-01-16", quantity: 2 }, // i=27
    { date: "2025-01-17" }, // i=28
    { date: "2025-01-18" }, // i=29
    { date: "2025-01-19" }, // i=30
    { date: "2025-01-20" }, // i=31
    { date: "2025-01-21" }, // i=32
    { date: "2025-01-22" }, // i=33
    { date: "2025-01-23" }, // i=34
    { date: "2025-01-24" }, // i=35
    { date: "2025-01-25" }, // i=36
    { date: "2025-01-26" }, // i=37
    { date: "2025-01-27" }, // i=38
    { date: "2025-01-28" }, // i=39
    { date: "2025-01-29" }, // i=40
    { date: "2025-01-30" }, // i=41
    { date: "2025-01-31" }, // i=42
    { date: "2025-02-01" }, // i=43
    { date: "2025-02-02" }, // i=44
    { date: "2025-02-03" }, // i=45
    { date: "2025-02-04" }, // i=46
    { date: "2025-02-05" }, // i=47
    { date: "2025-02-06" }, // i=48
    { date: "2025-02-07" }, // i=49
    { date: "2025-02-08" }, // i=50
    { date: "2025-02-09" }, // i=51
    { date: "2025-02-10" }, // i=52
    { date: "2025-02-11" }, // i=53
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [nbElementsAffiches, setNbElementsAffiches] = useState<number>(
    DatesData.length
  );

  const ITEM_MIN_WIDTH = 5.7;

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const containerWidth = entry.contentRect.width;
        const newCount = Math.floor(containerWidth / ITEM_MIN_WIDTH);
        setNbElementsAffiches(Math.min(newCount, DatesData.length));
      }
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [DatesData]);

  const visibleDates = DatesData.slice(0, nbElementsAffiches);

  // État pour suivre le mode sombre
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Détecter si le mode sombre est activé en vérifiant la classe 'dark' sur <html>
    const checkDarkMode = () => {
      if (typeof window !== "undefined") {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
      }
    };

    checkDarkMode(); // Vérifier au chargement initial

    // Optionnel : Ajouter un observer pour détecter les changements de classe 'dark'
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const getColorFromQuantity = (quantity?: number): string => {
    if (quantity === undefined) {
      return isDarkMode ? "#3E3E3E" : "#D9D9D9"; // si dark mode : #3E3E3E
    }
    if (quantity === 0) {
      return isDarkMode ? "#333333" : "#F0F0F0"; // si dark mode : #343434
    }
    if (quantity === 1) {
      return isDarkMode ? "rgba(52, 140, 255, 0.5)" : "#66A8FF"; // toujours égal à #348CFF à 50% d'opacité
    }
    if (quantity === 2) {
      return "#348CFF"; // ne change jamais
    }
    return isDarkMode ? "#3E3E3E" : "#D9D9D9"; // fallback
  };

  return (
    <Card className="w-full h-full row-start-7 row-end-11 col-start-5 col-end-6 grid grid-rows-[40px_1fr]">
      <header className="flex gap-2 items-center">
        <Image
          width={30}
          height={30}
          src={"/assets/icons/stats.svg"}
          alt="Température de l'eau"
        />
        <H4>Statistiques</H4>
      </header>
      <main className="flex justify-center items-center">
        <section className="flex flex-col">
          <div className="flex justify-start">
            <P className="text-end mb-1 " variant="mini">
              Semaine du 30 janv
            </P>
          </div>
          <div
            ref={containerRef}
            className="flex flex-wrap gap-[0.35rem] justify-center items-center"
          >
            {visibleDates.map((item, index) => (
              <BlockStats
                key={index}
                color={getColorFromQuantity(item.quantity)}
              />
            ))}
          </div>
          <div className="flex gap-1 justify-end items-center mt-2 mr-3">
            <P variant="mini">less</P>
            <div className="bg-[#D9D9D9] rounded-sm h-2 w-2"></div>
            <div className="bg-[#66A8FF] rounded-sm h-2 w-2"></div>
            <div className="bg-[#348CFF] rounded-sm h-2 w-2"></div>
            <P variant="mini">more</P>
          </div>
        </section>
      </main>
    </Card>
  );
};

export default StatsCard;
