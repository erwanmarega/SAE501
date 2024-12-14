// Badge.tsx
import React from "react";
import clsx from "clsx";
import { hexToRgba } from "@/app/utils/hex-to-rgba"; // Assurez-vous que le chemin est correct

interface BadgeProps {
  text: string;
  textColor: string;
  bgColor: string;
  opacity?: number; // Ajout d'une prop d'opacité
}

const Badge: React.FC<BadgeProps> = ({
  text,
  textColor,
  bgColor,
  opacity = 0.5,
}) => {
  const isTailwindColor = !bgColor.startsWith("#");

  let bgClass;
  let bgStyle;

  if (isTailwindColor) {
    bgClass = opacity ? `${bgColor}/${opacity * 100}` : bgColor;
  } else {
    bgStyle = opacity
      ? { backgroundColor: hexToRgba(bgColor, opacity) }
      : { backgroundColor: bgColor };
  }

  return (
    <div className={clsx("rounded-full py-1 px-2", bgClass)} style={bgStyle}>
      <p
        className={clsx(
          "font-mona font-medium text-5xs text-center",
          textColor
        )}
      >
        {text}
      </p>
    </div>
  );
};
