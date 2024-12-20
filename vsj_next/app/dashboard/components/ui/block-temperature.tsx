import React from "react";
import Image from "next/image";
import H1 from "@/app/components/ui/texts/h1";

const BlockTemperature = () => {
  return (
    <div className="relative">
      <Image
        src={"/assets/img/dashboard/temperature_sphere.svg"}
        width={110}
        height={110}
        alt="Température sphere"
      />
      <H1 className="absolute z-10 top-8 right-0 text-2xl" variant="black">
        19.3 <span className="text-primary">°C</span>
      </H1>
    </div>
  );
};

export default BlockTemperature;
