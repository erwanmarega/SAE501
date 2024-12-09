import type { Config } from "tailwindcss";

export default {
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
        "bar-shadow": "0 5px 10px 0 rgba(0, 0, 0, 0.1)", // Votre ombre personnalisée
        // Ombre externe pour accentuer la surélévation
        "card-shadow": "24px 4px 34px rgba(0, 0, 0, 0.04)", // custom shadow
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"], // Pour Outfit
        mona: ["Mona Sans", "sans-serif"], // Pour Mona Sans
      },
      colors: {
        primary: "#348CFF",
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
    },
  },
  plugins: [],
} satisfies Config;
