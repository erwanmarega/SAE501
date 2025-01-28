import React from "react";
import Image from "next/image";
import HForm from "@/app/components/ui/texts/h-form";
import HFormData from "@/app/components/ui/texts/h-form-data";

const AdhesionCard = ({
  variant = "default",
  price,
  startDate,
  endDate,
  sport,
  category,
  membership,
}) => {
  if (variant === "add") {
    return (
      <div className="bg-[#f7f7f7] py-4 px-6 relative flex flex-col gap-2 rounded-xl w-96 h-48 text-center cursor-pointer hover:bg-gray-200 group">
        <div className="flex items-center justify-center h-full">
          <Image
            src="/assets/icons/more.svg"
            alt="Ajouter une catégorie"
            width={35}
            height={35}
            className="transition-transform group-hover:scale-125"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f7f7] py-4 px-6 relative flex flex-col gap-2 rounded-xl w-96 h-48">
      <div
        id="group"
        className="absolute top-3 right-3 h-12 w-12 rounded-full bg-white flex items-center justify-center"
      >
        <Image
          src="assets/icons/groups/groupA.svg"
          height={25}
          width={25}
          alt="Mon groupe"
        />
      </div>

      <h3 className="font-outfit font-bold text-3xl -mb-1">{price}€</h3>
      <p className="font-mona text-[#464646] font-light text-sm">
        {startDate} - {endDate}
      </p>

      <section className="flex flex-col w-full gap-2 mt-2">
        <div className="w-full flex justify-between">
          <HForm>Sport</HForm>
          <HFormData className="text-end text-nowrap">{sport}</HFormData>
        </div>

        <div className="w-full flex justify-between">
          <HForm>Catégorie</HForm>
          <HFormData className="text-end text-nowrap">{category}</HFormData>
        </div>

        <div className="w-full flex justify-between">
          <HForm>Adhésion</HForm>
          <HFormData className="text-end text-nowrap">{membership}</HFormData>
        </div>
      </section>
    </div>
  );
};

export default AdhesionCard;
