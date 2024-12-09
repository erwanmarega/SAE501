import React from "react";
import LogoVSJ from "@/public/assets/img/logo.png";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="absolute left-6 top-6">
      <Image src={LogoVSJ} alt="Logo de VSJ Natation" width={56} />
    </div>
  );
};

export default Logo;
