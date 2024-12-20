// database/training-types.tsx
export interface TrainingTypesProps {
  id: string;
  title: string;
  coach: string[];
  intensity: "facile" | "moyen" | "difficile";
  category: "crawl" | "dos crawlé" | "papillon" | "brasse";
  duration: string;
  description: string;
}

export const TrainingTypes: Record<string, TrainingTypesProps> = {
  "Intense Crawl": {
    id: "01",
    title: "Intense Crawl",
    coach: ["Martin"],
    intensity: "difficile",
    category: "crawl",
    duration: "2h00",
    description: "Entraînement intensif pour améliorer la vitesse en crawl.",
  },
  "Technique Dos Crawlé": {
    id: "02",
    title: "Technique Dos Crawlé",
    coach: ["Martin", "Dupont"],
    intensity: "moyen",
    category: "dos crawlé",
    duration: "1h30",
    description: "Session axée sur la technique de dos crawlé et l'endurance.",
  },
  "Compétition Papillon": {
    id: "03",
    title: "Compétition Papillon",
    coach: ["Martin", "Dupont"],
    intensity: "difficile",
    category: "papillon",
    duration: "2h00",
    description: "Compétition interne pour évaluer les progrès en papillon.",
  },
  "Récupération Brasse": {
    id: "04",
    title: "Récupération Brasse",
    coach: ["Martin"],
    intensity: "facile",
    category: "brasse",
    duration: "1h00",
    description: "Récupération active et technique de brasse.",
  },
  "10X200m": {
    id: "05",
    title: "10X200m",
    coach: ["Martin"],
    intensity: "difficile",
    category: "papillon",
    duration: "3h00",
    description:
      "Série de 10 x 200m avec un focus sur la performance en papillon.",
  },
};
