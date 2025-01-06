import React from "react";

interface CapacityMeterProps {
  currentValue: number; // La valeur actuelle
  idealCapacity: number; // La capacité idéale
}

const CapacityMeter: React.FC<CapacityMeterProps> = ({
  currentValue,
  idealCapacity,
}) => {
  // Calcul de la couleur du texte en fonction de la proximité de la valeur
  const fillPercentage = Math.min(currentValue / idealCapacity, 1);
  const textColor = `rgba(59, 130, 246, ${fillPercentage})`; // Bleu de Tailwind (rgb(59, 130, 246))

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Le cercle de progression */}
      <div className="relative">
        <svg
          className="w-32 h-32"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cercle de fond */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#E5E7EB" /* Gris clair */
            strokeWidth="10"
            fill="none"
          />
          {/* Cercle de progression */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#3B82F6" /* Bleu */
            strokeWidth="10"
            fill="none"
            strokeDasharray="282.6" // Périmètre du cercle (2 * π * rayon)
            strokeDashoffset={282.6 - 282.6 * fillPercentage}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        {/* Valeur actuelle au centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold" style={{ color: textColor }}>
            {currentValue}
          </span>
        </div>
      </div>
      {/* Texte de capacité idéale */}
      <p className="mt-2 text-gray-500">capacité idéale : {idealCapacity}</p>
    </div>
  );
};

export default CapacityMeter;
