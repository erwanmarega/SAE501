import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface ProgressIndicatorProps {
  present: number; // Nombre de personnes présentes
  absent: number; // Nombre de personnes absentes
  unmarked: number; // Nombre de personnes non-indiquées
  total: number; // Nombre total de personnes
  isSelected?: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  present,
  absent,
  unmarked,
  total,
  isSelected = true, // Valeur par défaut définie ici
}) => {
  // Calculer les pourcentages
  const presentPercentage = (present / total) * 100 || 0;
  const unmarkedPercentage = (unmarked / total) * 100 || 0;
  const absentPercentage = (absent / total) * 100 || 0;

  return (
    <div className="m-auto w-[96%] h-3 rounded-full max-w-96 bg-[#EBEBEB] flex overflow-hidden relative">
      {/* Présents */}
      <motion.div
        className={clsx(
          "h-full",
          { "bg-primary": isSelected },
          { "bg-gray-400": !isSelected }
        )}
        initial={{ width: "0%" }}
        animate={{ width: `${presentPercentage}%` }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      ></motion.div>
      {/* Non-indiqués */}
      <motion.div
        className={clsx(
          "h-full",
          { "bg-primary/30": isSelected },
          { "bg-gray-400/30": !isSelected }
        )}
        initial={{ width: "0%" }}
        animate={{ width: `${unmarkedPercentage}%` }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
      ></motion.div>
      {/* Absents */}
      <motion.div
        className={clsx(
          "h-full",
          { "bg-primary/10": isSelected },
          { "bg-gray-400/10": !isSelected }
        )}
        initial={{ width: "0%" }}
        animate={{ width: `${absentPercentage}%` }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 3 }}
      ></motion.div>
    </div>
  );
};

export default ProgressIndicator;
