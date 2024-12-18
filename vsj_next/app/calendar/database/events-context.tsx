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
  whatShow: string;
  setWhatShow: React.Dispatch<React.SetStateAction<string>>;
}

const EventsContext = createContext<EventsContextValue | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dataEvents, setDataEvents] = useState<Record<string, Event[]>>({
    "18/12/2024": [
      {
        status: "training",
        title: "",
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
    "19/12/2024": [
      {
        status: null,
        title: "",
        details: {},
      },
    ],
    "20/12/2024": [
      {
        status: "training",
        title: "",
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
    "21/12/2024": [
      {
        status: null,
        title: "",
        details: {},
      },
    ],
    "22/12/2024": [
      {
        status: null,
        title: "",
        details: {},
      },
    ],
    "23/12/2024": [
      {
        status: "training",
        title: "",
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
    console.log(
      `Tentative d'ajout de la session ID "${sessionId}" à la date "${date}".`
    );

    const trainingType = Object.values(TrainingTypes).find(
      (t) => t.id === sessionId
    );
    if (!trainingType) {
      console.error(
        `Aucun type d'entraînement trouvé avec l'ID "${sessionId}".`
      );
      return;
    }

    console.log(`Type d'entraînement trouvé:`, trainingType);

    // Récupérer les événements existants pour la date
    const dayEvents = dataEvents[date] || [];
    console.log(`Événements existants pour la date "${date}":`, dayEvents);

    // Vérifier s'il existe au moins un événement avec un statut "training"
    const isTrainingDay = dayEvents.some(
      (event) => event.status === "training"
    );
    console.log(
      `La date "${date}" est-elle un jour d'entraînement ? ${isTrainingDay}`
    );

    // Si ce n'est pas un "training day", on refuse l'ajout
    if (!isTrainingDay) {
      console.warn(
        `Impossible d'ajouter la session à la date "${date}", car ce n'est pas un jour d'entraînement.`
      );
      return;
    }

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

    console.log(`Nouvel événement à ajouter:`, newEvent);

    setDataEvents((prev) => {
      const existingEvents = prev[date] || [];
      const updatedEvents = [...existingEvents, newEvent];
      console.log(
        `Mise à jour des événements pour la date "${date}":`,
        updatedEvents
      );
      return {
        ...prev,
        [date]: updatedEvents,
      };
    });

    console.log(
      `Session ID "${sessionId}" ajoutée avec succès à la date "${date}".`
    );
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

  const [whatShow, setWhatShow] = useState("admin");

  return (
    <EventsContext.Provider
      value={{
        dataEvents,
        draggingSessionId,
        setDraggingSessionId,
        addSessionToDate,
        addTrainingType,
        whatShow,
        setWhatShow,
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
