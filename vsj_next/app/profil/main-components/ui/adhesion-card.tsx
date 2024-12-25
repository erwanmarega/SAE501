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
  // Si la variante est "add", on affiche un design (ou contenu) différent
  if (variant === "add") {
    return (
      <div className="bg-[#f7f7f7] py-4 px-6 relative flex flex-col gap-2 rounded-xl w-96 text-center">
        <div className="flex items-center justify-center h-full">
          <p className="font-outfit font-bold text-md text-gray-600">
            Ajouter une adhésion
          </p>
        </div>
      </div>
    );
  }

  // Sinon, on affiche la carte d’adhésion "classique"
  return (
    <div className="bg-[#f7f7f7] py-4 px-6 relative flex flex-col gap-2 rounded-xl w-96">
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

      <section className="grid grid-rows-3 grid-cols-2 w-3/4 gap-2 mt-2">
        <HForm>Sport</HForm>
        <HFormData className="text-end text-nowrap">{sport}</HFormData>

        <HForm>Catégorie</HForm>
        <HFormData className="text-end text-nowrap">{category}</HFormData>

        <HForm>Adhésion</HForm>
        <HFormData className="text-end text-nowrap">{membership}</HFormData>
      </section>
    </div>
  );
};

export default AdhesionCard;
