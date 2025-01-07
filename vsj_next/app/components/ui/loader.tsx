"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const texts = [
  "Initialisation en cours...",
  "Chargement des éléments...",
  "Création du compte...",
  "Derniers préparatifs...",
];

const Loader = () => {
  const [currentText, setCurrentText] = useState(0); // Index du texte actuel
  const [displayText, setDisplayText] = useState(""); // Texte affiché progressivement
  const [isDeleting, setIsDeleting] = useState(false); // Indique si on efface le texte
  const [speed, setSpeed] = useState(50); // Vitesse d'écriture/effacement
  const [pause, setPause] = useState(false); // Pause après écriture complète

  const router = useRouter();

  // Animation progressive
  useEffect(() => {
    if (pause) return; // Si en pause, on arrête l'animation

    const interval = setTimeout(() => {
      const fullText = texts[currentText];
      if (!isDeleting) {
        // Ajout des lettres progressivement
        setDisplayText(fullText.substring(0, displayText.length + 1));
        if (displayText === fullText) {
          setPause(true); // Met en pause après avoir écrit tout le texte
          setTimeout(() => {
            setIsDeleting(true);
            setPause(false);
          }, 1000); // Pause de 1 seconde
          return;
        }
      } else {
        // Efface les lettres progressivement
        setDisplayText(fullText.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setCurrentText((prev) => (prev + 1) % texts.length); // Texte suivant
        }
      }
    }, speed);

    return () => clearTimeout(interval); // Nettoyage de l'intervalle
  }, [displayText, isDeleting, currentText, speed, pause]);

  // Redirection après 15 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 15000); // Ajustez selon vos besoins
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center fixed h-screen w-screen top-0 left-0 bg-[#F7F7F7]">
      <motion.h3
        className="text-2xl font-bold text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {displayText}
      </motion.h3>
      <p className="text-sm text-gray-600 mt-4">
        Veuillez ne pas quitter cette page
      </p>

      <svg height="0" width="0">
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            height="200%"
            y="-50%"
            width="200%"
            x="-50%"
            id="goo"
          >
            <feGaussianBlur
              result="blur"
              stdDeviation="8"
              in="SourceGraphic"
            ></feGaussianBlur>
            <feColorMatrix
              result="cm"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
              mode="matrix"
              in="blur"
            ></feColorMatrix>
          </filter>
        </defs>
      </svg>
      <svg height="180" width="320" viewBox="0 0 320 180">
        <g filter="url(#goo)">
          <circle
            cy="90"
            cx="160"
            r="24"
            fill="#348CFF"
            className="circle"
          ></circle>
          <circle
            cy="90"
            cx="160"
            r="24"
            fill="#348CFF"
            className="circle right"
          ></circle>
        </g>
      </svg>
    </div>
  );
};

export default Loader;
