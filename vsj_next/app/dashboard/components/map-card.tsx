import React from "react";
import Card from "@/app/components/ui/card";
import { useLanguage } from "@/app/components/header/ui/context/language-provider";
import Image from "next/image";

const MapCard = () => {
  const { language } = useLanguage();

  return (
    <Card className="w-full h-full row-start-1 row-end-8 col-start-1 col-end-4 flex items-center   !bg-[#D7D7D7] justify-center">
      <img src={"/assets/icons/3d_model.webp"} className="-mt-28" />
    </Card>
  );
};

export default MapCard;
