import React, { useEffect, useRef, useState } from "react";
import Card from "@/app/components/ui/card";
import { useLanguage } from "@/app/components/header/ui/context/language-provider";
import BlockDay from "./ui/block-day";
import H4 from "@/app/components/ui/texts/h4";
import CalendarIcon from "@/app/components/ui/interactive-icons/calendarIcon";

const CalendarCard = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItemsCount, setVisibleItemsCount] = useState<number | null>(
    null
  );
  const [allMeasured, setAllMeasured] = useState(false);

  const calendarData = [
    {
      date: "24/12/2024",
      plan: {
        name: "10x200m",
        type: "entrainement",
        active_hour: "18:20",
        duration: "01:30",
        coach: "Marega",
      },
    },
    {
      date: "25/12/2024",
      plan: {},
    },
    {
      date: "26/12/2024",
      plan: {
        name: "Qualifs Rgnl",
        type: "compétition",
        active_hour: "08:00",
        duration: "03:30",
        coach: "Marega",
      },
    },
    {
      date: "27/12/2024",
      plan: {},
    },
    {
      date: "28/12/2024",
      plan: {
        name: "Recovery Swim",
        type: "entrainement",
        active_hour: "10:00",
        duration: "01:00",
        coach: "Marega",
      },
    },
    {
      date: "29/12/2024",
      plan: {},
    },
    
  ];

  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (allMeasured) {
      const handleResize = () => {
        if (!containerRef.current) return;
        const containerWidth =
          containerRef.current.getBoundingClientRect().width;

        let cumulativeWidth = 0;
        let count = 0;
        for (let i = 0; i < calendarData.length; i++) {
          const el = itemRefs.current[i];
          if (el) {
            const itemWidth = el.getBoundingClientRect().width;
            if (cumulativeWidth + itemWidth <= containerWidth) {
              cumulativeWidth += itemWidth;
              count++;
            } else {
              break;
            }
          }
        }

        if (count !== visibleItemsCount) {
          setVisibleItemsCount(count);
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [calendarData, allMeasured, visibleItemsCount]);

  useEffect(() => {
  
    if (
      itemRefs.current.filter(Boolean).length === calendarData.length &&
      !allMeasured
    ) {
      setAllMeasured(true);
    }
  });

  const itemsToRender =
    visibleItemsCount && allMeasured
      ? calendarData.slice(0, visibleItemsCount)
      : calendarData; 

  return (
    <Card className="w-full h-full row-start-8 row-end-11 col-start-1 col-end-4 grid-row-2">
      <header>
        <H4 className="m-auto text-xl font-semibold dark:text-white ">
          24 Août 2025
        </H4>
      </header>

      <main className="flex flex-row justify-between">
        <div
          ref={containerRef}
          className="overflow-hidden flex-nowrap flex gap-4"
        >
          {itemsToRender.map((dayData, index) => (
            <div
              key={index}
              className="w-max inline-block align-top"
              ref={(el) => {
                if (el) itemRefs.current[index] = el;
              }}
            >
              <BlockDay
                date={dayData.date}
                name={dayData.plan?.name}
                type={dayData.plan?.type}
                active_hour={dayData.plan?.active_hour}
                duration={dayData.plan?.duration}
                coach={dayData.plan?.coach}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <div className="h-[4.75rem] w-[4.75rem] rounded-2xl bg-[#F7F7F7] dark:bg-icon-inactive-dark flex justify-center items-center">
            <CalendarIcon />
          </div>
        </div>
      </main>
    </Card>
  );
};

export default CalendarCard;
