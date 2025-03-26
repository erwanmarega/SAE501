interface CalendarEventDetails {
  coach?: string[];
  intensity?: "facile" | "moyen" | "difficile";
  category?: "crawl" | "dos crawlé" | "papillon" | "brasse";
  duration?: string;
  description?: string;
}

interface CalendarEvent {
  status: "training" | "competition" | null;
  title: string;
  details: CalendarEventDetails;
  isDefined: boolean;
}

const DataEvents: Record<string, CalendarEvent[]> = {
  "25/12/2024": [
    {
      status: "training",
      title: " ",
      details: {},
      isDefined: false,
    },
  ],
  "26/12/2024": [
    {
      status: null,
      title: " ",
      details: {},
      isDefined: false,
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
      isDefined: true,
    },
  ],
  "28/12/2024": [
    {
      status: null,
      title: " ",
      details: {},
      isDefined: false,
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
      isDefined: true,
    },
  ],
};
