// events-context.tsx
import React, { createContext, useContext, useState } from "react";
import { TrainingTypes } from "../database/training-types"; // Vérifiez le chemin

interface EventDetails {
  coach?: string[];
  intensity?: "facile" | "moyen" | "difficile";
  category?: string;
  duration?: string;
  description?: string;
}

interface Event {
  status: "training" | "competition" | null;
  title: string;
  details: EventDetails;
}

interface EventsContextValue {
  dataEvents: Record<string, Event[]>;
  draggingSessionId: string | null;
  setDraggingSessionId: (id: string | null) => void;
  addSessionToDate: (sessionId: string, date: string) => void;
  addTrainingType: (
    date: string,
    title: string,
    category: string,
    time: string,
    duration: string,
    intensity: string,
    description: string,
    coach?: string[]
  ) => void;
}

const EventsContext = createContext<EventsContextValue | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dataEvents, setDataEvents] = useState<Record<string, Event[]>>({
    "23/12/2024": [
      {
        status: "training",
        title: "",
        details: {},
      },
    ],
    "24/12/2024": [
      {
        status: null,
        title: "",
        details: {},
      },
    ],
    "25/12/2024": [
      {
        status: "training",
        title: "",
        details: {},
      },
    ],
    "26/12/2024": [
      {
        status: null,
        title: "",
        details: {},
      },
    ],
    "27/12/2024": [
      {
        status: "competition",
        title: "Compétition Papillon Interne",
        details: {
          coach: ["Martin", "Dupont", "Lefèvre"],
          intensity: "difficile",
          category: "papillon",
          duration: "2 heures",
          description:
            "Compétition interne pour évaluer les progrès en papillon.",
        },
      },
    ],
    "28/12/2024": [
      {
        status: null,
        title: "",
        details: {},
      },
    ],
    "29/12/2024": [
      {
        status: "competition",
        title: "Compétition Papillon Interne",
        details: {
          coach: ["Martin", "Dupont", "Lefèvre"],
          intensity: "difficile",
          category: "papillon",
          duration: "2 heures",
          description:
            "Compétition interne pour évaluer les progrès en papillon.",
        },
      },
    ],
  });

  const [draggingSessionId, setDraggingSessionId] = useState<string | null>(
    null
  );

  const addSessionToDate = (sessionId: string, date: string) => {
    const trainingType = Object.values(TrainingTypes).find(
      (t) => t.id === sessionId
    );
    if (!trainingType) return;

    const newEvent: Event = {
      status: "training",
      title: trainingType.title,
      details: {
        coach: trainingType.coach,
        intensity: trainingType.intensity,
        category: trainingType.category,
        duration: trainingType.duration,
        description: trainingType.description,
      },
    };

    setDataEvents((prev) => {
      const existingEvents = prev[date] || [];
      return {
        ...prev,
        [date]: [...existingEvents, newEvent],
      };
    });
  };

  // Nouvelle fonction pour ajouter un training type
  const addTrainingType = (
    date: string,
    title: string,
    category: string,
    time: string,
    duration: string,
    intensity: string,
    description: string,
    coach: string[] = []
  ) => {
    // Crée un nouvel événement de type training
    const newEvent: Event = {
      status: "training",
      title,
      details: {
        coach,
        intensity: intensity as "facile" | "moyen" | "difficile",
        category,
        duration,
        description,
      },
    };

    // Ajoute l'événement à la date indiquée
    setDataEvents((prev) => {
      const existingEvents = prev[date] || [];
      return {
        ...prev,
        [date]: [...existingEvents, newEvent],
      };
    });
  };

  return (
    <EventsContext.Provider
      value={{
        dataEvents,
        draggingSessionId,
        setDraggingSessionId,
        addSessionToDate,
        addTrainingType,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};
