import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Activer le mode sombre basé sur la classe

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "inner-1": "inset 0 0 0 1px rgba(16, 24, 40, 0.18)", // Inner shadow #1
        "inner-2": "inset 0 -4px 0 0 rgba(16, 24, 40, 0.1)", // Accentuation de l'ombre interne basse
        "drop-1": "0 6px 12px rgba(0, 0, 0, 0.15)",
        bar: "0 5px 10px 0 rgba(0, 0, 0, 0.1)", // Votre ombre personnalisée
        // Ombre externe pour accentuer la surélévation
        card: "4px 4px 8px rgba(0, 0, 0, 0.05)", // custom shadow
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"], // Pour Outfit
        mona: ["Mona Sans", "sans-serif"], // Pour Mona Sans
      },
      colors: {
        primary: "#348CFF",
        "secondary-dashboard": "#343434",
        "secondary-group": "#7B68EE",
        "secondary-message": "#44D273",
        "secondary-stats": "#348CFF",
        "secondary-agenda": "#ED4848",
        "secondary-map": "#FADA5E",
        "icon-inactive-light": "#D5D8E5",
        "icon-inactive-dark": "#545454",
      },
      animation: {
        typing: "typing 0.3s steps(10, end)",
      },
      keyframes: {
        typing: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
      },
      fontSize: {
        "3xs": ["0.625rem", "0.875rem"], // 10px font-size, 14px line-height
        "2xs": ["0.6875rem", "1rem"], // 11px font-size, 16px line-height
      },
    },
  },
  plugins: [],
} satisfies Config;
