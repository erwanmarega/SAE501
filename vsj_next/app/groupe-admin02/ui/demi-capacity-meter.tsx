import React from "react";

interface DemiCapacityMeterProps {
  currentValue: number; // La valeur actuelle
  idealCapacity: number; // La capacité idéale
}

const DemiCapacityMeter: React.FC<DemiCapacityMeterProps> = ({
  currentValue,
  idealCapacity,
}) => {
  // Calcul de la progression en pourcentage
  const fillPercentage = Math.min(currentValue / idealCapacity, 1);
  const arcLength = 180; // Longueur d'un demi-cercle (en degrés)
  const strokeDasharray = `${arcLength * fillPercentage} ${arcLength}`;

  // Couleur du texte dynamique (bleu proportionnel à la valeur)
  const textColor = `rgba(59, 130, 246, ${fillPercentage})`; // Bleu Tailwind

  return (
    <div className="flex flex-col items-center -mt-6">
      {/* Demi-cercle */}
      <div className="relative">
        <svg
          className="w-40 h-24"
          viewBox="0 0 100 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Demi-cercle gris (fond) */}
          <path
            d="M 10 40 A 40 40 0 0 1 90 40"
            fill="none"
            stroke="#E5E7EB" // Gris clair
            strokeWidth="10"
            strokeLinecap="butt" // Pas d'arrondi sur les extrémités
          />
          {/* Demi-cercle de progression */}
          <path
            d="M 10 40 A 40 40 0 0 1 90 40"
            fill="none"
            stroke="#3B82F6" // Bleu
            strokeWidth="10"
            strokeLinecap="butt" // Pas d'arrondi sur les extrémités
            strokeDasharray={strokeDasharray}
            strokeDashoffset="0"
          />
        </svg>
        {/* Valeur actuelle au centre */}
        <div className="absolute inset-0 top-4 flex items-center justify-center">
          <span className="text-4xl font-bold" style={{ color: textColor }}>
            {currentValue}
          </span>
        </div>
      </div>
      {/* Texte de capacité idéale */}
      <p className=" text-gray-500 text-nowrap -mt-4 text-xs">
        capacité idéale : {idealCapacity}
      </p>
    </div>
  );
};

export default DemiCapacityMeter;
