// components/ui/Logo.tsx

import React from "react";
import Image from "next/image";
import LogoVSJ from "@/public/assets/img/logo.png";

interface LogoProps {
  placement: "left" | "center" | "right";
}

const Logo: React.FC<LogoProps> = ({ placement }) => {
  // Définir les classes Tailwind CSS en fonction du placement
  const placementClasses: { [key in LogoProps["placement"]]: string } = {
    left: "absolute top-2 left-6",
    center: "absolute top-2 left-1/2 transform -translate-x-1/2",
    right: "absolute top-2 right-6",
  };

  return (
    <div className={placementClasses[placement]}>
      <Image src={LogoVSJ} alt="Logo de VSJ Natation" width={56} height={56} />
    </div>
  );
};

export default Logo;
