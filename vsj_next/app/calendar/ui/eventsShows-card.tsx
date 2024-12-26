import React from "react";
import { motion } from "framer-motion";
import ProgressIndicator from "@/app/components/ui/progress-indicator";
import { useEvents } from "../database/events-context";

// Exemple de structure que doit respecter "event"
interface EventDetails {
  coach?: string[];
  intensity?: "facile" | "moyen" | "difficile";
  category?: string;
  duration?: string;
  description?: string;
}

// Ici, on peut personnaliser selon tes besoins réels
interface EventType {
  id: number;
  status: "training" | "competition" | null;
  title: string;
  details: EventDetails;
  // Par exemple, si tu gères l'heure de début,
  // la présence, etc. depuis le backend :
  startTime?: string;
  total?: number; // total de participants
  present?: number; // nb de participants présents
  absent?: number; // nb de participants absents
  unmarked?: number; // nb de participants non marqués
}

interface EventsShowsCardProps {
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
  event: EventType;
}

export const EventsShowsCard = ({
  setWhatShow,
  event,
}: EventsShowsCardProps) => {
  // On extrait les données qu’on veut afficher
  const {
    id,
    status,
    title,
    details,
    startTime = "09:30", // Valeur par défaut si non fourni
    total = 30,
    present = 20,
    absent = 3,
    unmarked = 7,
  } = event;

  // Label pour le badge (en fonction du status)
  const statusLabel =
    status === "training"
      ? "Entraînement"
      : status === "competition"
      ? "Compétition"
      : "Non défini";

  // Durée si disponible
  const durationLabel = details?.duration || "1h30";
  const { selectEventById } = useEvents();

  return (
    <motion.section
      className="w-full max-w-96 relative cursor-pointer transition-opacity"
      initial={{ scale: 1 }}
      whileTap={{
        scale: 0.975,
        transition: { duration: 0.1 },
      }}
      onClick={() => {
        setWhatShow("show");
        selectEventById(id);
      }}
    >
      <div className="bg-[#f7f7f7] py-3 px-4 rounded-xl w-full relative flex flex-col gap-3">
        <section className="flex flex-col gap-1">
          {/* BADGE en haut à droite */}
          <div className="absolute right-3 top-3">
            <div className="bg-primary/15 rounded-full py-1 px-2">
              <p className="text-primary font-mona font-medium text-5xs text-center whitespace-nowrap">
                {statusLabel}
              </p>
            </div>
          </div>
          {/* Titre */}
          <h3 className="font-semibold font-outfit text-lg">
            {title || "Sans titre"}
          </h3>

          {/* Heure de début + durée */}
          <section className="flex items-center gap-2">
            <div className="rounded-full w-max px-2 py-1 bg-primary">
              <p className="font-mona font-base text-3xs text-white">
                {startTime}
              </p>
            </div>
            <p className="font-mona font-medium text-[#696969] text-xs">
              {durationLabel}
            </p>
          </section>
        </section>

        {/* Indicateur de progression (si tu gères la présence) */}
        <ProgressIndicator
          total={total}
          present={present}
          unmarked={unmarked}
          absent={absent}
        />

        <p className="font-mona font-medium text-[#696969] text-3xs mr-0 ml-auto text-end -mt-2 -mb-1">
          {present}/{total} présents
        </p>
      </div>
    </motion.section>
  );
};
