"use client";

import { motion } from "framer-motion";

interface TypingTextProps {
  text: string;
  className?: string; // Option pour personnaliser les styles externes
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  className = "",
}) => {
  // Diviser le texte en lettres individuelles
  const letters = text.split("");

  return (
    <motion.div
      className={`flex overflow-hidden ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05, // Délai entre chaque lettre
          },
        },
      }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: "100%" }, // Les lettres commencent en bas
            visible: { opacity: 1, y: "0%" }, // Les lettres remontent avec opacité
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};
