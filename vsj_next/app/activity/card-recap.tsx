import React from "react";
import clsx from "clsx";
import Link from "next/link";

const CardRecap = () => {
  return (
    <>
      <header className="h-4/6 mb-10 transition-transform duration-300">
        <div className="flex flex-col gap-2">
          {" "}
          <h3 className="font-mona text-2xl">Récapitaltif</h3>
          <p className="font-outfit font-bold text-medium text-2xl">300.00€</p>
          <p className="font-mona font-regular text-[#B1B5B8] text-sm">
            Facturation annuelle à 300 €
          </p>
          <Link href={"/"}>
            <Button
              className="!w-5/6 m-auto mt-2 -mb-2 interactive-element"
              onClick={(e) => {
                e.stopPropagation();
                setChosenButton(true);
                handleRemove();
              }}
            >
              Choisir
            </Button>
          </Link>
        </div>
      </header>
      <div className="w-[95%] rounded-full m-auto h-[1px] bg-[#E8EAE9] -mt-3 mb-3"></div>
      <main className="flex flex-col justify-between h-full">
        <div className="flex flex-col relative">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <Image
                src="assets/icons/checkV.svg"
                alt="Valide"
                height={15}
                width={15}
              />
              <p className="font-mona font-medium text-xs">
                Accès aux séances de natation libre pour tous niveaux
              </p>
            </div>
            <div className="flex gap-4">
              <Image
                src="assets/icons/checkV.svg"
                alt="Valide"
                height={15}
                width={15}
              />
              <p className="font-mona font-medium text-xs">
                Cours encadrés pour perfectionner votre technique et votre
                endurance
              </p>
            </div>
            <div className="flex gap-4">
              <Image
                src="assets/icons/checkV.svg"
                alt="Valide"
                height={15}
                width={15}
              />
              <p className="font-mona font-medium text-xs">
                Programmes adaptés aux nageurs débutants comme confirmés
              </p>
            </div>
            <div className="flex gap-4">
              <Image
                src="assets/icons/checkV.svg"
                alt="Valide"
                height={15}
                width={15}
              />{" "}
              <p className="font-mona font-medium text-xs">
                Programmes adaptés aux nageurs débutants comme confirmés
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CardRecap;
