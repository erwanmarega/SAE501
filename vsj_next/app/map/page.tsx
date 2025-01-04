"use client";

import React, { useState } from "react";
import Header from "../components/header/header";
import BassinOlympique from "./bassin-olympique";

const MapPage = () => {
  const [selectedPage, setSelectedPage] = useState("bassin olympique");

  const whatShow = (value: string) => {
    switch (value) {
      case "bassin olympique":
        return <BassinOlympique />;
        break;

      default:
        break;
    }
  };

  return (
    <div className="lg:h-[100vh] flex items-center justify-center lg:overflow-y-hidden bg-[#F7F7F7] dark:bg-[#262629]">
      {/* Composant d'en-tête */}
      <Header />
      {whatShow(selectedPage)}
    </div>
  );
};

export default MapPage;
