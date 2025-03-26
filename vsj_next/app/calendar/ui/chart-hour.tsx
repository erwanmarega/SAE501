// app/components/SegmentedPieChart.tsx
"use client";

import { useState, useRef } from "react";

export default function SegmentedPieChart() {
  const [angle, setAngle] = useState(0); // Angle initial en degrés
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const segments = 16; // Nombre de niveaux intermédiaires
  const step = 360 / segments; // Taille d'un segment en degrés (22,5°)

  // Fonction pour démarrer le glissement
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsDragging(true);
    updateAngle(e);
  };

  // Fonction pour ajuster l'angle pendant le glissement
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging) {
      updateAngle(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateAngle = (e: React.MouseEvent<SVGSVGElement>) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = e.clientX - centerX;
      const y = e.clientY - centerY;
      let newAngle = (Math.atan2(y, x) * (180 / Math.PI) + 360) % 360;

      // Ajuster l'angle au segment le plus proche
      newAngle = Math.round(newAngle / step) * step;
      setAngle(newAngle);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-200"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <svg
        ref={svgRef}
        width="200"
        height="200"
        viewBox="0 0 100 100"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        className="cursor-pointer"
      >
        {/* Fond gris du camembert */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="lightgray"
          stroke="black"
          strokeWidth="2"
        />

        {/* Portion remplie */}
        <path d={describeArc(50, 50, 45, 0, angle)} fill="blue" />

        {/* Cercle transparent pour capturer les événements sur les bords */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="transparent"
          strokeWidth="10"
          cursor="pointer"
        />
      </svg>
    </div>
  );
}

// Fonction pour décrire un arc en SVG
function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    x,
    y,
    "L",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    "Z",
  ].join(" ");
}

// Fonction pour convertir des coordonnées polaires en coordonnées cartésiennes
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180.0);
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}
