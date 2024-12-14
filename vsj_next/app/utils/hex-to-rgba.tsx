// src/utils/colorUtils.ts

/**
 * Convertit un code hexadécimal en une chaîne RGBA avec l'opacité spécifiée.
 * @param hex - Code couleur hexadécimal (ex: "#CC3939").
 * @param opacity - Opacité souhaitée (entre 0 et 1).
 * @returns Chaîne RGBA correspondante.
 */
export const hexToRgba = (hex: string, opacity: number): string => {
  let cleanHex = hex.replace("#", "");

  // Gérer les codes hex à 3 ou 6 caractères
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
