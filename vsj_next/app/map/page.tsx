"use client";

import React, { useState } from "react";
import Header from "../components/header/header";
import BassinOlympique from "./bassin-olympique";
import Pateugoire from "./pateugoire";
import PetitBassin from "./petit-bassin";
import PlateformeDeJeux from "./plateforme-jeux";
import BassinAquabike from "./bassin-aquabike";
import SpaBienEtre from "./spa";
import Vestiaires from "./vestiaire";

const MapPage = () => {
  const [selectedPage, setSelectedPage] = useState("spa");

  const whatShow = (value: string) => {
    switch (value) {
      case "bassin olympique":
        return <BassinOlympique />;
        break;
      case "pateugoire":
        return <Pateugoire />;
        break;
      case "petit bassin":
        return <PetitBassin />;
        break;
      case "plateforme jeux":
        return <PlateformeDeJeux />;
        break;
      case "bassin aquabike":
        return <BassinAquabike />;
        break;
      case "spa":
        return <SpaBienEtre />;
        break;
      case "vestiaire":
        return <Vestiaires />;
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
