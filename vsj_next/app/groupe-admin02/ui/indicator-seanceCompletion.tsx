import H4 from "@/app/components/ui/texts/h4";
import React from "react";

const IndicatorSeanceCompletion = () => {
  return (
    <div className="bg-[#f7f7f7] rounded-xl grid grid-cols-2">
      <section className="flex flex-col justify-center items-center">
        <div
          id="circle-train"
          className="bg-primary rounded-full h-6 w-6"
        ></div>
        <H4>1/3</H4>
      </section>
      <section className="flex flex-col justify-center items-center">
        <div
          id="circle-train"
          className="bg-secondary-map rounded-full h-6 w-6"
        ></div>
        <H4>1/3</H4>
      </section>
    </div>
  );
};

export default IndicatorSeanceCompletion;
