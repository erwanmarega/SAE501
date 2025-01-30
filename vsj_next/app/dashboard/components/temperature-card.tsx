import React from "react";
import Card from "@/app/components/ui/card";
import { useLanguage } from "@/app/components/header/ui/context/language-provider";
import Image from "next/image";
import H4 from "@/app/components/ui/texts/h4";
import BlockTemperature from "./ui/block-temperature";

const TemperatureCard = () => {
  const { language } = useLanguage();

  return (
    <Card className="w-full h-full row-start-3 row-end-7 col-start-5 col-end-6 grid grid-rows-[50px_1fr]">
      <header className="flex items-center gap-3">
        <Image
          width={25}
          height={25}
          src={"/assets/icons/temperature.svg"}
          alt="Température de l'eau"
        />
        <H4>Température</H4>
      </header>
      <main className="flex items-center justify-center">
        <BlockTemperature />
      </main>
    </Card>
  );
};

export default TemperatureCard;
