"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface IntensitySelectProps {
  onSelect: (level: number) => void;
  initialLevel?: number;
  isEditable?: boolean; // Ajout du props facultatif
}

const IntensitySelect = ({
  onSelect,
  initialLevel = 1,
  isEditable = true, // Valeur par défaut à true
}: IntensitySelectProps) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(initialLevel);

  useEffect(() => {
    setSelectedLevel(initialLevel);
  }, [initialLevel]);

  const handleSelect = (level: number) => {
    if (isEditable) {
      setSelectedLevel(level);
      onSelect(level);
    }
  };

  return (
    <section
      className={`flex items-end justify-between w-14 h-10 gap-1 ${
        isEditable ? "cursor-pointer" : "cursor-default"
      }`}
    >
      {/* Barre 1 */}
      <div
        className="w-1/4 h-1/3 rounded-md bg-gray-200 relative overflow-hidden"
        onClick={() => handleSelect(1)}
      >
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-primary"
          initial={{ height: 0 }}
          animate={{ height: selectedLevel >= 1 ? "100%" : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Barre 2 */}
      <div
        className="w-1/4 h-2/3 rounded-md bg-gray-200 relative overflow-hidden"
        onClick={() => handleSelect(2)}
      >
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-primary"
          initial={{ height: 0 }}
          animate={{ height: selectedLevel >= 2 ? "100%" : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Barre 3 */}
      <div
        className="w-1/4 h-full rounded-md bg-gray-200 relative overflow-hidden"
        onClick={() => handleSelect(3)}
      >
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-primary"
          initial={{ height: 0 }}
          animate={{ height: selectedLevel >= 3 ? "100%" : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </section>
  );
};

export default IntensitySelect;
