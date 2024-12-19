import React from "react";
import DragCard from "../ui/drag-card";
import { TrainingTypes } from "../database/training-types";
import Button from "@/app/components/ui/button";

interface SideBarTypesProps {
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
}

const SideBarTypes = ({ setWhatShow }: SideBarTypesProps) => {
  const sessionEntries = Object.entries(TrainingTypes);

  return (
    <>
      <header className="py-1">
        <h3 className="text-center text-2xl font-mona font-semibold text-[#484848]">
          Mes séances types
        </h3>
      </header>
      <main className="flex flex-wrap justify-center gap-4 px-0">
        {sessionEntries.map(([title, session]) => (
          <DragCard
            key={session.id}
            sessionId={session.id}
            title={title}
            coaches={session.coach}
            category={session.category}
            intensity={session.intensity}
            duration={session.duration}
          />
        ))}
      </main>
      <footer>
        <div className="w-full flex items-center justify-center">
          <Button
            onClick={() => setWhatShow("new")}
            className="absolute bottom-6 !w-44"
          >
            Ajouter une séance
          </Button>
        </div>
      </footer>
    </>
  );
};

export default SideBarTypes;
