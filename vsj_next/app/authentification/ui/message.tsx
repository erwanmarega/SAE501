import React, { useState, useEffect } from "react";
import ArrowCarousel from "./arrow-carousel";

type Citation = {
  author: string;
  quote: string;
};

const citations: Citation[] = [
  {
    author: "Michael Phelps",
    quote: "La natation est plus qu'un sport, c'est un mode de vie.",
  },
  { author: "Mark Spitz", quote: "La natation n'est pas tout, gagner l'est." },
  {
    author: "Debbie Meyer",
    quote:
      "Croyez en vous, non seulement en nageant, mais dans la vie elle-même. Il faut toujours s'amuser. Il faut avoir l'esprit ouvert. Si vous ne l'appréciez pas, ne le faites pas. La vie est trop courte.",
  },
  {
    author: "Missy Franklin",
    quote:
      "Pour moi, une grande partie de la natation est que j'adore ça et c'est tellement amusant.",
  },
  {
    author: "Alexander Popov",
    quote:
      "L'eau est votre amie... vous n'avez pas à vous battre avec l'eau, partagez simplement le même esprit que l'eau, et cela vous aidera à bouger.",
  },

  {
    author: "Diana Nyad",
    quote: "La natation est probablement le sport le plus épuisant.",
  },
  { author: "Ryan Lochte", quote: "J'aime nager car je peux concourir." },
  {
    author: "Eric Shanteau",
    quote:
      "Pour être heureux en dehors de la piscine, il faut nager rapidement.",
  },

  {
    author: "Amanda Beard",
    quote:
      "Je me concentre sur la préparation de ma course et je laisse les autres nageurs penser à moi, pas moi à eux.",
  },
  {
    author: "Simone Manuel",
    quote: "La natation est une compétence qui sauve des vies.",
  },
  {
    author: "Natalie du Toit",
    quote: "La natation est ma passion et quelque chose que j’aime.",
  },
  {
    author: "Bruce Lee",
    quote:
      "Si vous voulez apprendre à nager, sautez dans l’eau. Sur la terre ferme, aucun état d’esprit ne vous aidera jamais.",
  },
  {
    author: "Léon Marchand",
    quote: "J’ai envie de battre le plus de records possible.",
  },
  {
    author: "Felix Auböck",
    quote:
      "Seuls ceux qui aspirent à la grandeur peuvent guider le destin des autres.",
  },
];

const Message: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Affiche une citation aléatoire au chargement
    const randomIndex = Math.floor(Math.random() * citations.length);
    setCurrentIndex(randomIndex);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? citations.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === citations.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { author, quote } = citations[currentIndex];

  return (
    <div className="absolute bottom-0 left-0 w-full h-1/4 bg-white/15 backdrop-blur-md flex items-center justify-center">
      <section className="flex flex-col w-5/6">
        <p className="text-white font-light font-mona text-lg italic">
          "{quote}"
        </p>
        <div className="mt-4">
          <h5 className="text-white font-outfit font-semibold text-base mb-0">
            {author}
          </h5>
          <p className="font-light text-sm text-white -mt-1">
            Nageur profesionnel
          </p>
        </div>
        <ArrowCarousel onPrevious={handlePrevious} onNext={handleNext} />
      </section>
    </div>
  );
};

export default Message;
