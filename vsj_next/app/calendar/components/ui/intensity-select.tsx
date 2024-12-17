"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface IntensitySelectProps {
  onSelect: (level: number) => void;
}

const IntensitySelect = ({ onSelect }: IntensitySelectProps) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);

  const handleSelect = (level: number) => {
    setSelectedLevel(level);
    onSelect(level);
  };

  return (
    <section className="flex items-end justify-between w-14 h-10 gap-1 cursor-pointer">
      {/* Première barre */}
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

      {/* Deuxième barre */}
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

      {/* Troisième barre */}
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
