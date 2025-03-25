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
import { useLanguage } from "@/app/components/header/ui/context/language-provider";

const ActivityPage = () => {
  const { language } = useLanguage();
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
      title: language === "en" ? "Aquabike" : "Aquabike",
      imageSrc: "/assets/img/bloc_aquabike.webp",
      imageAlt: language === "en" ? "Aquabike" : "Aquabike",
      description:
        language === "en"
          ? "Aquabike is an intense aquatic sport, perfect for strengthening the lower body."
          : "L'aquabike est un sport aquatique intense, parfait pour renforcer le bas du corps.",
      price: "250€",
      badge: language === "en" ? "Intermediate" : "Intermédiaire",
    },
    {
      title: language === "en" ? "Swimming" : "Natation",
      imageSrc: "/assets/img/bloc_natation.webp",
      imageAlt: language === "en" ? "Swimming" : "Natation",
      description:
        language === "en"
          ? "Swimming is the elite aquatic sport where the best meet."
          : "La natation est le sport aquatique élite où les meilleurs se rencontrent.",
      price: "300€",
      badge: language === "en" ? "Elite" : "Élite",
    },
    {
      title: language === "en" ? "Aquagym" : "Aquagym",
      imageSrc: "/assets/img/block_aquagym.webp",
      imageAlt: language === "en" ? "Aquagym" : "Aquagym",
      description:
        language === "en"
          ? "Aquagym is a great way to stay fit gently."
          : "L'aquagym est un excellent moyen de rester en forme tout en douceur.",
      price: "200€",
      badge: language === "en" ? "Beginner" : "Débutant",
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
    <section className="h-screen flex flex-col justify-center items-center  dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <H1 className="absolute top-4 left-6">
        {language === "en" ? "Welcome" : "Bienvenue"}{" "}
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
        <H3 className="text-3xl">
          {language === "en" ? "Our Activities" : "Nos activités"}
        </H3>
        <P className="!text-lg max-w-96 text-wrap text-center leading-tight">
          {language === "en"
            ? "Discover our options to fully enjoy the activities of the swimming club."
            : "Découvrez nos options pour profiter pleinement des activités du club de natation."}
        </P>
      </section>
      <section className="grid grid-cols-3 m-auto w-2/3 gap-12">
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
