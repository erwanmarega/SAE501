// components/ui/Tooltip.tsx

import React, { ReactNode } from "react";

type Placement = "top" | "right" | "bottom" | "left";

interface TooltipProps {
  content: string;
  placement?: Placement;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = "top",
  children,
}) => {
  // Définir les classes de positionnement en fonction de la prop 'placement'
  const placementClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
  };

  // Définir les classes pour l'ombre et la flèche en fonction de la prop 'placement'
  const arrowClasses = {
    top: "absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 border-b border-r border-gray-300 bg-white rotate-45",
    right:
      "absolute -left-1.5 top-1/2 -translate-y-1/2 h-3 w-3 border-b border-l border-gray-300 bg-white rotate-45",
    bottom:
      "absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 border-t border-l border-gray-300 bg-white rotate-45",
    left: "absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 border-t border-r border-gray-300 bg-white rotate-45",
  };

  // Générer un ID unique pour l'accessibilité
  const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className=" flex group absolute">
      <div aria-describedby={tooltipId}>{children}</div>
      <div
        id={tooltipId}
        className={`absolute ${placementClasses[placement]} z-20 whitespace-nowrap rounded-md bg-white py-2 px-4 text-xs text-gray-800 font-medium border border-gray-300 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none`}
        role="tooltip"
      >
        {content}
        <span className={arrowClasses[placement]}></span>
      </div>
    </div>
  );
};

export default Tooltip;
