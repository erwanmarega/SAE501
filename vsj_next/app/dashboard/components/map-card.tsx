import React from "react";
import Card from "@/app/components/ui/card";
import { useLanguage } from "@/app/components/header/ui/context/language-provider";

const MapCard = () => {
  const { language } = useLanguage();

  return (
    <Card className="w-full h-full row-start-1 row-end-8 col-start-1 col-end-4 flex items-center">
      {" "}
      <h1 className="m-auto text-xl font-semibold dark:text-white">
        {language === "en" ? "3D MAP" : "CARTE 3D"}
      </h1>
    </Card>
  );
};

export default MapCard;
