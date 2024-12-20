import React, { useEffect, useRef, useState } from "react";
import Card from "@/app/components/ui/card";
import { useLanguage } from "@/app/components/header/ui/context/language-provider";
import GroupeIcon from "@/app/components/ui/interactive-icons/groupeIcon";
import BlockProfil from "./ui/block-profil";
import H4 from "@/app/components/ui/texts/h4";
import Image from "next/image";

const GroupCard = () => {
  const { language } = useLanguage();

  const profilsData = [
    {
      name: "Erwan",
      bio: "Nageur 100m | On me nomme le dauphin de Meaux. Boxe, Natation & Cricket rien ne m’arrête. #ElChefe 👊",
    },
    {
      name: "Valentin",
      bio: "Plongeur professionnel | Je coule comme un caillou mais c'est coool. #DeepDiver 🐠",
    },
    {
      name: "Alan",
      bio: "Nage en eaux interdite | Interdit de séjour aux US  pour des Game Pass obtenu illégalement #AlanBlackFriday 🚑",
    },

    {
      name: "Antoine",
      bio: "Athlète en nage en eau froide | Braver les températures glaciales pour des courses extrêmes. #IceSwimmer ❄️",
    },

    {
      name: "Justine",
      bio: "Spécialiste en nage papillon | Passionnée par les défis et la compétition en haute mer. #ButterflyQueen 🦋",
    },
    {
      name: "Maxime",
      bio: "Entraîneur de natation | Aide les athlètes à atteindre leur potentiel maximal dans l'eau. #SwimCoach 🏊‍♂️",
    },
    {
      name: "Sophie",
      bio: "Nageuse de fond | Explore les eaux ouvertes et les longues distances. #OpenWaterSwimmer 🌊",
    },
    {
      name: "Clara",
      bio: "Triathlète | Excellente en natation, cyclisme et course, avec un amour pour les défis multidisciplinaires. #TriathlonLife 🚴‍♀️🏃‍♀️",
    },
    {
      name: "Lucas",
      bio: "Nageur synchronisé | Fusionner art et sport dans chaque performance. #SyncSwim 🎭",
    },
    {
      name: "Mélanie",
      bio: "Instructrice de plongée | Enseigner la sécurité et la beauté de la plongée à tous les niveaux. #ScubaCertified 🤿",
    },
    {
      name: "Théo",
      bio: "Water-polo joueur | Combinaison de natation et d'habileté, menant mon équipe à la victoire. #WaterPolo 🤽‍♂️",
    },
    {
      name: "Léa",
      bio: "Photographe sous-marine | Capturer la beauté cachée des océans. #UnderwaterPhotography 📷",
    },
    {
      name: "Nicolas",
      bio: "Biologiste marin | Explorer la biodiversité marine et promouvoir sa conservation. #MarineBiology 🦑",
    },
    {
      name: "Marie",
      bio: "Nageuse de compétition | Spécialisée dans le dos crawlé, visant toujours les podiums nationaux. #Backstroke 🏅",
    },
    {
      name: "Eva",
      bio: "Championne de surf | Surfer sur les vagues du monde entier, inspirant les jeunes à poursuivre leurs passions. #SurfGirl 🏄‍♀️",
    },
  ];

  // Référence du conteneur
  const containerRef = useRef<HTMLDivElement>(null);
  const [nbElementsAffiches, setNbElementsAffiches] = useState<number>(
    profilsData.length
  );

  // Largeur minimale pour un profil (inclure marges/paddings si nécessaire)
  const ITEM_MIN_WIDTH = 75;

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width;
        const newCount = Math.floor(containerWidth / ITEM_MIN_WIDTH);

        // S'assurer de ne pas dépasser le nombre total d'items
        setNbElementsAffiches(Math.min(newCount, profilsData.length));
      }
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [profilsData]);

  const visibleProfiles = profilsData.slice(0, nbElementsAffiches);

  return (
    <Card className="w-full h-full row-start-3 row-end-11 col-start-4 col-end-5">
      <section className="grid grid-rows-[50px_1fr]">
        <header className="flex gap-2 items-center -mt-2">
          <GroupeIcon color={"true"} />
          <H4>Natation U18</H4>
        </header>
        <main ref={containerRef} className="flex flex-col items-center">
          <div className="bg-primary rounded-md p-2 flex justify-between items-center w-3/5 m-auto font-outfit font-medium">
            <p className="text-white font-mona text-3xs">Nombres de nageurs</p>
            <span className="text-white font-outfit font-bold text-xs">
              {profilsData.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {visibleProfiles.map((profil) => (
              <BlockProfil
                key={profil.name}
                name={profil.name}
                bio={profil.bio}
              />
            ))}
          </div>
          <Image
            src={"/assets/icons/seeMore.svg"}
            width={25}
            height={25}
            alt="See more"
            className="mt-2"
          />
        </main>
      </section>
    </Card>
  );
};

export default GroupCard;
