"use client";

import { motion } from "framer-motion";

interface AnimatedCloudProps {
  color: string; // Couleur du nuage au format rgba (ex: "rgba(16,185,129,0.15)")
}

export const AnimatedCloud: React.FC<AnimatedCloudProps> = ({ color }) => {
  return (
    <motion.div
      className="absolute rounded-full -bottom-10"
      style={{
        boxShadow: `0 0 30px 30px ${color}`,
      }}
      initial={{
        scale: 0.5,
        opacity: 0,
        y: 20, // Partir légèrement en bas
      }}
      animate={{
        scale: 1,
        opacity: 1,
        y: 0, // Se stabiliser à sa position finale
      }}
      transition={{
        duration: 0.8, // Durée de l'animation
        ease: "easeOut", // Animation douce
      }}
    />
  );
};
