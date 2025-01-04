// events-context.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { TrainingTypes } from "../database/training-types";

interface SelectedEvent {
  date: string;
  event: Event;
}

interface EventDetails {
  coach?: string[];
  intensity?: "facile" | "moyen" | "difficile";
  category?: string;
  duration?: string;
  description?: string;
}

interface Event {
  id: number;
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
  selectedEvent: SelectedEvent | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<SelectedEvent | null>>;
  userStatus: "swimmer" | "coach" | "admin";
  setUserStatus: React.Dispatch<
    React.SetStateAction<"swimmer" | "coach" | "admin">
  >;
  nextTrain: SelectedEvent | null;
  nextCompetition: SelectedEvent | null;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  selectEventById: (eventId: number) => void;
}

const EventsContext = createContext<EventsContextValue | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dataEvents, setDataEvents] = useState<Record<string, Event[]>>({
    "17/01/2025": [
      {
        id: 0,
        status: "training",
        title: "",
        details: {},
      },
    ],
    "18/01/2025": [
      {
        id: 1,
        status: "training",
        title: "Entraînement 18",
        details: {
          coach: ["Martin", "Dupont", "Lefèvre"],
          intensity: "facile",
          category: "papillon",
          duration: "2 heures",
          description:
            "Description de l'entraînement du 18, entrainement sans eau...",
        },
      },
      {
        id: 2,
        status: "training",
        title: "2ème Entraînement 18",
        details: {
          coach: ["Martin", "Dupont", "Lefèvre"],
          intensity: "facile",
          category: "papillon",
          duration: "2 heures",
          description:
            "Description de l'entraînement du 18, entrainement sans eau...",
        },
      },
    ],
    "19/01/2025": [
      {
        id: 3,
        status: null,
        title: "",
        details: {},
      },
    ],
    "20/01/2025": [
      {
        id: 4,
        status: "training",
        title: "Entraînement 20",
        details: {
          coach: ["Martin", "Dupont", "Lefèvre"],
          intensity: "moyen",
          category: "papillon",
          duration: "2 heures",
          description:
            "Entrainement du 20: Réintroduction progressif de l'eau...",
        },
      },
    ],
    "21/01/2025": [
      {
        id: 5,
        status: null,
        title: "",
        details: {},
      },
    ],
    "22/01/2025": [
      {
        id: 6,
        status: null,
        title: "",
        details: {},
      },
    ],
    "23/01/2025": [
      {
        id: 7,
        status: "training",
        title: "Entraînement 23",
        details: {
          coach: ["Martin", "Dupont", "Lefèvre"],
          intensity: "difficile",
          category: "papillon",
          duration: "2 heures",
          description:
            "Samedi dernier on a pas été selectionné, c'est votre dernière chance...",
        },
      },
    ],
    "24/01/2025": [
      {
        id: 8,
        status: null,
        title: "",
        details: {},
      },
    ],
    "25/01/2025": [
      {
        id: 9,
        status: "training",
        title: "",
        details: {},
      },
    ],
    "26/01/2025": [
      {
        id: 10,
        status: null,
        title: "",
        details: {},
      },
    ],
    "27/01/2025": [
      {
        id: 11,
        status: "competition",
        title: "Compétition Papillon Interne",
        details: {
          coach: ["Martin", "Dupont", "Lefèvre"],
          intensity: "difficile",
          category: "papillon",
          duration: "2 heures",
          description: "Le jour J, allez les mecs...",
        },
      },
    ],
    "28/01/2025": [
      {
        id: 12,
        status: null,
        title: "",
        details: {},
      },
    ],
    "29/01/2025": [
      {
        id: 13,
        status: "competition",
        title: "Compétition Papillon Interne",
        details: {
          coach: ["Martin", "Dupont", "Lefèvre"],
          intensity: "difficile",
          category: "papillon",
          duration: "2 heures",
          description: "Salut je suis Micka, le nouveau coach...",
        },
      },
    ],
  });

  const [draggingSessionId, setDraggingSessionId] = useState<string | null>(
    null
  );
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(
    null
  );
  const selectEventById = (eventId: number) => {
    for (const dateStr in dataEvents) {
      const foundEvent = dataEvents[dateStr].find((evt) => evt.id === eventId);
      if (foundEvent) {
        setSelectedEvent({ date: dateStr, event: foundEvent });
        break;
      }
    }
  };

  const [whatShow, setWhatShow] = useState("show");
  const [userStatus, setUserStatus] = useState<"swimmer" | "coach" | "admin">(
    "coach"
  );
  const [nextTrain, setNextTrain] = useState<SelectedEvent | null>(null);
  const [nextCompetition, setNextCompetition] = useState<SelectedEvent | null>(
    null
  );

  const addSessionToDate = (sessionId: string, date: string) => {
    const trainingType = Object.values(TrainingTypes).find(
      (t) => t.id === sessionId
    );
    if (!trainingType) {
      console.error(
        `Aucun type d'entraînement trouvé avec l'ID "${sessionId}".`
      );
      return;
    }

    const dayEvents = dataEvents[date] || [];
    const isTrainingDay = dayEvents.some(
      (event) => event.status === "training"
    );

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

    setDataEvents((prev) => {
      const existingEvents = prev[date] || [];
      return {
        ...prev,
        [date]: [...existingEvents, newEvent],
      };
    });
  };

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

    setDataEvents((prev) => {
      const existingEvents = prev[date] || [];
      return {
        ...prev,
        [date]: [...existingEvents, newEvent],
      };
    });
  };

  // Chercher le prochain entraînement avec un titre
  // ...
  // Chercher le prochain entraînement et la prochaine compétition FUTURS avec un titre
  useEffect(() => {
    // Récupérer la date d'aujourd'hui (on peut remettre l'heure, minute, seconde à 0 pour éviter les effets de bord)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // On récupère toutes les clés de dataEvents (ex: "17/12/2025", "18/12/2025", etc.)
    const dates = Object.keys(dataEvents);
    // On convertit chaque clé en objet date pour pouvoir comparer
    const parsedDates = dates.map((d) => {
      const [day, month, year] = d.split("/").map(Number);
      return { dateStr: d, dateObj: new Date(year, month - 1, day) };
    });

    // On ne garde que les dates dans le futur ou égales à aujourd'hui
    const futureDates = parsedDates.filter((d) => d.dateObj >= today);

    // Ensuite, on trie ces dates du plus proche au plus lointain
    futureDates.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

    let foundNextTraining: SelectedEvent | null = null;
    let foundNextCompetition: SelectedEvent | null = null;

    // On parcourt les dates futures pour trouver la prochaine date d'entraînement et de compétition
    for (const { dateStr } of futureDates) {
      const events = dataEvents[dateStr] || [];

      // Chercher un entraînement FUTUR avec un titre non vide
      if (!foundNextTraining) {
        const nextTrainEvent = events.find(
          (e) => e.status === "training" && e.title && e.title.trim() !== ""
        );
        if (nextTrainEvent) {
          foundNextTraining = { date: dateStr, event: nextTrainEvent };
        }
      }

      // Chercher une compétition FUTURE avec un titre non vide
      if (!foundNextCompetition) {
        const nextCompetitionEvent = events.find(
          (e) => e.status === "competition" && e.title && e.title.trim() !== ""
        );
        if (nextCompetitionEvent) {
          foundNextCompetition = { date: dateStr, event: nextCompetitionEvent };
        }
      }

      // Si on a trouvé les deux, on peut arrêter la boucle
      if (foundNextTraining && foundNextCompetition) {
        break;
      }
    }

    // Si on trouve un entraînement ou une compétition, on le met dans selectedEvent
    if (foundNextTraining || foundNextCompetition) {
      const next = foundNextTraining || foundNextCompetition;
      setSelectedEvent(next as SelectedEvent);

      // Déterminer ce qu'on affiche en fonction du userStatus
      if (userStatus === "coach" || userStatus === "admin") {
        setWhatShow("category");
      } else {
        setWhatShow("show");
      }
    } else {
      // Si pas de prochain entraînement futur, on change l'affichage
      setWhatShow("no-train");
    }

    // Mettre à jour les states nextTrain et nextCompetition
    setNextTrain(foundNextTraining);
    setNextCompetition(foundNextCompetition);
  }, [dataEvents, userStatus]);

  const [currentDate, setCurrentDate] = useState(new Date());

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
        selectedEvent,
        setSelectedEvent,
        userStatus,
        setUserStatus,
        nextTrain,
        nextCompetition,
        currentDate,
        setCurrentDate,
        selectEventById,
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
