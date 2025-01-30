import H4 from "@/app/components/ui/texts/h4";
import React from "react";

const IndicatorSeanceCompletion = () => {
  return (
    <div className="bg-[#f7f7f7] rounded-xl grid grid-cols-2 h-max w-44 m-auto px-2 py-[0.375rem] mt-[3px]">
      <section className="flex flex-col justify-center items-center border-r-2">
        <div className="flex gap-1 items-center">
          <div
            id="circle-train"
            className="bg-primary rounded-full h-2 w-2"
          ></div>
          <p className="text-5xs font-mona text-[#7F8084]">Entraînements</p>
        </div>
        <H4 className="!text-xs">1/3</H4>
      </section>
      <section className="flex flex-col justify-center items-center">
        <div className="flex gap-1 items-center">
          <div
            id="circle-train"
            className="bg-secondary-map rounded-full h-2 w-2"
          ></div>
          <p className="text-5xs font-mona text-[#7F8084]">Compétition</p>
        </div>
        <H4 className="!text-xs">1/3</H4>
      </section>
    </div>
  );
};

export default IndicatorSeanceCompletion;
