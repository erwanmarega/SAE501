"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SunIcon from "../../ui/interactive-icons/sunIcon";
import MoonIcon from "../../ui/interactive-icons/moonIcon";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="p-1 rounded-full bg-primary-light dark:bg-primary-dark text-black  flex flex-row gap-1 relative">
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-white rounded-full"
        animate={{ backgroundColor: isDark ? "#333" : "#fff" }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="absolute w-6 h-6 bg-blue-500 rounded-full"
        animate={{
          x: !isDark ? "1.75rem" : "0rem",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      />
      <div
        className="z-10 cursor-pointer flex justify-center items-center w-6 h-6"
        onClick={() => setIsDark(true)}
      >
        <MoonIcon color={isDark ? "white" : "#C8C8C8"} />
      </div>
      <div
        className="z-10 cursor-pointer flex justify-center items-center w-6 h-6"
        onClick={() => setIsDark(false)}
      >
        <SunIcon color={isDark ? "#C8C8C8" : "white"} />
      </div>
    </div>
  );
};

export default ThemeToggle;
