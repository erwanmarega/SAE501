"use client";

import React from "react";

// Définition des couleurs prédéfinies
const AvailableChartColors = ["#DADADA", "#348CFF", "#DADADA"] as const;
type AvailableChartColorsKeys = (typeof AvailableChartColors)[number];

// Réimplémentation de la fonction utilitaire pour générer une classe CSS en fonction de la couleur
const getColorClassName = (color: AvailableChartColorsKeys, type: string) => {
  return `${color.replace("#", "")}-${type}`;
};

// Fonction pour déterminer la couleur de fond d'un marqueur
const getMarkerBgColor = (
  marker: number | undefined,
  values: number[],
  colors: AvailableChartColorsKeys[]
): string => {
  if (marker === undefined) return "";

  if (marker === 0) {
    for (let index = 0; index < values.length; index++) {
      if (values[index] > 0) {
        return colors[index];
      }
    }
  }

  let prefixSum = 0;
  for (let index = 0; index < values.length; index++) {
    prefixSum += values[index];
    if (prefixSum >= marker) {
      return colors[index];
    }
  }

  return colors[values.length - 1];
};

// Fonction utilitaire pour obtenir la position gauche d'un élément
const getPositionLeft = (value: number | undefined, maxValue: number): number =>
  value ? (value / maxValue) * 100 : 0;

// Somme des éléments d'un tableau
const sumNumericArray = (arr: number[]) =>
  arr.reduce((prefixSum, num) => prefixSum + num, 0);

// Formate un nombre avec un chiffre après la virgule si nécessaire
const formatNumber = (num: number): string => {
  if (Number.isInteger(num)) {
    return num.toString();
  }
  return num.toFixed(1);
};

// Composant pour afficher les étiquettes de la barre
const BarLabels = ({ values }: { values: number[] }) => {
  const sumValues = React.useMemo(() => sumNumericArray(values), [values]);
  let prefixSum = 0;
  let sumConsecutiveHiddenLabels = 0;

  return (
    <div
      className={`relative mb-2 flex h-5 w-full text-sm font-medium text-gray-700 dark:text-gray-300`}
    >
      <div className="absolute bottom-0 left-0 flex items-center">0</div>
      {values.map((widthPercentage, index) => {
        prefixSum += widthPercentage;

        const showLabel =
          (widthPercentage >= 0.1 * sumValues ||
            sumConsecutiveHiddenLabels >= 0.09 * sumValues) &&
          sumValues - prefixSum >= 0.1 * sumValues &&
          prefixSum >= 0.1 * sumValues &&
          prefixSum < 0.9 * sumValues;

        sumConsecutiveHiddenLabels = showLabel
          ? 0
          : (sumConsecutiveHiddenLabels += widthPercentage);

        const widthPositionLeft = getPositionLeft(widthPercentage, sumValues);

        return (
          <div
            key={`item-${index}`}
            className="flex items-center justify-end pr-0.5"
            style={{ width: `${widthPositionLeft}%` }}
          >
            {showLabel ? (
              <span className={`block translate-x-1/2 text-sm tabular-nums`}>
                {formatNumber(prefixSum)}
              </span>
            ) : null}
          </div>
        );
      })}
      <div className="absolute bottom-0 right-0 flex items-center">
        {formatNumber(sumValues)}
      </div>
    </div>
  );
};

// Interface pour les props du composant CategoryBar
interface CategoryBarProps extends React.HTMLAttributes<HTMLDivElement> {
  values: number[];
  marker?: { value: number; tooltip?: string; showAnimation?: boolean };
  showLabels?: boolean;
}

// Composant principal CategoryBar
const CategoryBar = React.forwardRef<HTMLDivElement, CategoryBarProps>(
  (
    { values = [], marker, showLabels = true, className, ...props },
    forwardedRef
  ) => {
    const markerBgColor = React.useMemo(
      () => getMarkerBgColor(marker?.value, values, AvailableChartColors),
      [marker, values]
    );

    const maxValue = React.useMemo(() => sumNumericArray(values), [values]);

    const adjustedMarkerValue = React.useMemo(() => {
      if (marker === undefined) return undefined;
      if (marker.value < 0) return 0;
      if (marker.value > maxValue) return maxValue;
      return marker.value;
    }, [marker, maxValue]);

    const markerPositionLeft: number = React.useMemo(
      () => getPositionLeft(adjustedMarkerValue, maxValue),
      [adjustedMarkerValue, maxValue]
    );

    return (
      <div
        ref={forwardedRef}
        className={className}
        aria-label="Category bar"
        aria-valuenow={marker?.value}
        tremor-id="tremor-raw"
        {...props}
      >
        {showLabels ? <BarLabels values={values} /> : null}
        <div className="relative flex h-2 w-full items-center">
          <div className="flex h-full flex-1 items-center gap-0.5 overflow-hidden rounded-full">
            {values.map((value, index) => {
              const barColor = AvailableChartColors[index] ?? "#999999";
              const percentage = (value / maxValue) * 100;
              return (
                <div
                  key={`item-${index}`}
                  className="h-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: barColor,
                  }}
                />
              );
            })}
          </div>

          {marker !== undefined ? (
            <div
              className={`absolute w-2 -translate-x-1/2 ${
                marker.showAnimation
                  ? "transform-gpu transition-all duration-300 ease-in-out"
                  : ""
              }`}
              style={{
                left: `${markerPositionLeft}%`,
              }}
            >
              {marker.tooltip ? (
                <div
                  aria-hidden="true"
                  className={`relative mx-auto h-4 w-1 rounded-full ring-2 ring-white dark:ring-gray-950`}
                  style={{ backgroundColor: markerBgColor }}
                />
              ) : (
                <div
                  className={`mx-auto h-4 w-1 rounded-full ring-2 ring-white dark:ring-gray-950`}
                  style={{ backgroundColor: markerBgColor }}
                />
              )}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

CategoryBar.displayName = "CategoryBar";

export { CategoryBar, type CategoryBarProps };
