"use client";

interface LanguageSwitcherProps {
  currentLocale: string;
  onLanguageChange: (locale: "en" | "fr") => void;
}

export default function LanguageSwitcher({
  currentLocale,
  onLanguageChange,
}: LanguageSwitcherProps) {
  return (
    <div className="flex gap-2 absolute right-0 top-0 z-10">
      <button
        onClick={() => onLanguageChange("en")}
        disabled={currentLocale === "en"}
        className={`px-4 py-2 ${
          currentLocale === "en" ? "bg-gray-300" : "bg-blue-500 text-white"
        }`}
      >
        English
      </button>
      <button
        onClick={() => onLanguageChange("fr")}
        disabled={currentLocale === "fr"}
        className={`px-4 py-2 ${
          currentLocale === "fr" ? "bg-gray-300" : "bg-blue-500 text-white"
        }`}
      >
        Français
      </button>
    </div>
  );
}
