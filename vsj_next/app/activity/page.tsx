"use client";

import React, { useEffect, useState } from "react";
import VanillaTilt from "vanilla-tilt";
import CardActivity from "./card-activity";
import CardRecap from "./card-recap";
import Logo from "../components/ui/logo";
import H3 from "../components/ui/texts/h3";
import P from "../components/ui/texts/p";
import H1 from "../components/ui/texts/h1";
import Loader from "../components/ui/loader";
import ThemeToggle from "../components/header/ui/theme-toggle";
import LanguageSwitcher from "../components/header/ui/language-switcher";

const ActivityPage = () => {
  const [chosenButton, setChosenButton] = useState(false);

  useEffect(() => {
    console.log("CHOSENBUTTON:", chosenButton);

    if (!chosenButton) {
      VanillaTilt.init(document.querySelectorAll(".card"), {
        max: 25,
        speed: 5000,
        glare: true,
        "max-glare": 0.5,
      });
    }

    const cards = document.querySelectorAll(".card");
    const handleCardClick = (event: Event, card?: Element) => {
      const target = event.target as HTMLElement;

      if (target.closest("button") || target.closest(".interactive-element")) {
        return;
      }

      if (chosenButton) {
        return;
      }

      card?.classList.toggle("flipped");
    };

    cards.forEach((card) => {
      card.addEventListener("click", (event) => handleCardClick(event, card));
    });

    return () => {
      if (chosenButton) {
        cards.forEach((card) => {
          card.removeEventListener("click", () => handleCardClick(card));
        });
      }
    };
  }, [chosenButton]);

  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [permanentSelectedCard, setPermanentSelectedCard] = useState<
    number | null
  >(null);

  const activities = [
    {
      title: "Aquabike",
      imageSrc: "/assets/img/bloc_aquabike.webp",
      imageAlt: "Aquabike",
      description:
        "L'aquabike est un sport aquatique intense, parfait pour renforcer le bas du corps.",
      price: "250€",
      badge: "Intermédiaire",
    },
    {
      title: "Natation",
      imageSrc: "/assets/img/bloc_natation.webp",
      imageAlt: "Natation",
      description:
        "La natation est le sport aquatique élite où les meilleurs se rencontrent.",
      price: "300€",
      badge: "Élite",
    },
    {
      title: "Aquagym",
      imageSrc: "/assets/img/block_aquagym.webp",
      imageAlt: "Aquagym",
      description:
        "L'aquagym est un excellent moyen de rester en forme tout en douceur.",
      price: "200€",
      badge: "Débutant",
    },
  ];

  const [hiddenCard, setHiddenCard] = useState(false);
  const handleRemove = () => {
    setTimeout(() => {
      setHiddenCard(true);
    }, 2500);
  };

  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="h-screen flex flex-col justify-center items-center">
      <H1 className="absolute top-4 left-6">
        Bienvenue{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 underline decoration-2">
          Erwan
        </span>
      </H1>
      <div className="flex items-center gap-6 top-0 right-6 p-6 absolute">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>

      <section className="flex flex-col items-center">
        <Logo />
        <H3 className="text-3xl">Nos activités</H3>
        <P className="!text-lg max-w-96 text-wrap text-center leading-tight">
          Découvrez nos options pour profiter pleinement des activités du club
          de natation.
        </P>
      </section>
      <section className="grid grid-cols-3  m-auto w-2/3 gap-12 bg-[#f7f7f7] ">
        {activities.map((activity, index) => (
          <CardActivity
            key={index}
            identity={index}
            imageSrc={activity.imageSrc}
            imageAlt={activity.imageAlt}
            title={activity.title}
            description={activity.description}
            price={activity.price}
            badge={activity.badge}
            onMouseEnter={() => {
              setSelectedCard(index);
              setPermanentSelectedCard(index);
            }}
            onMouseLeave={() => setSelectedCard(null)}
            selected={selectedCard}
            chosenButton={chosenButton}
            setChosenButton={setChosenButton}
            permanentSelectedCard={permanentSelectedCard}
            hiddenCard={hiddenCard}
            handleRemove={handleRemove}
            setIsLoading={setIsLoading}
          />
        ))}
      </section>
    </section>
  );
};

export default ActivityPage;
