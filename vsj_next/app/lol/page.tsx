"use client";

import React, { useEffect, useState } from "react";
import VanillaTilt from "vanilla-tilt";
import CardActivity from "./card-activity";
import CardRecap from "./card-recap";

const ActivityPage = () => {
  useEffect(() => {
    // Initialiser VanillaTilt sur tous les éléments avec la classe "card"
    VanillaTilt.init(document.querySelectorAll(".card"), {
      max: 25,
      speed: 5000,
      glare: true,
      "max-glare": 0.5,
    });

    // Gérer le flip sur clic
    const cards = document.querySelectorAll(".card");
    const handleCardClick = (event: Event, card?: Element) => {
      // On vérifie si la cible du clic est un bouton ou se trouve à l’intérieur d’un bouton
      const target = event.target as HTMLElement;
      if (target.closest("button")) {
        return;
      }
      // Sinon, on applique le flip
      card?.classList.toggle("flipped");
    };

    cards.forEach((card) => {
      card.addEventListener("click", (event) => handleCardClick(event, card));
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("click", (event) =>
          handleCardClick(event, card)
        );
      });
    };
  }, []);

  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [permanentSelectedCard, setPermanentSelectedCard] = useState<
    number | null
  >(null);

  // Notre tableau d'objets, chacun correspondant à une carte
  const activities = [
    {
      title: "Aquabike",
      imageSrc: "/assets/img/3dblockAquabike.png",
      imageAlt: "Aquabike",
      description:
        "L'aquabike est un sport aquatique intense, parfait pour renforcer le bas du corps.",
      price: "250€",
      badge: "Intermédiaire",
    },
    {
      title: "Natation",
      imageSrc: "/assets/img/3dblockNatation.png",
      imageAlt: "Natation",
      description:
        "La natation est le sport aquatique élite où les meilleurs se rencontrent.",
      price: "300€",
      badge: "Élite",
    },
    {
      title: "Aquagym",
      imageSrc: "/assets/img/3dblockAquagym.png",
      imageAlt: "Aquagym",
      description:
        "L'aquagym est un excellent moyen de rester en forme tout en douceur.",
      price: "200€",
      badge: "Débutant",
    },
  ];

  const [chosenButton, setChosenButton] = useState(false);
  const [hiddenCard, setHiddenCard] = useState(false);

  const handleRemove = () => {
    setTimeout(() => {
      setHiddenCard(true);
    }, 2500);
  };

  return (
    <section className="flex justify-center items-center h-screen m-auto w-2/3 gap-12 bg-[#f7f7f7] overflow-hidden">
      {/* 
        Si hiddenCard est false, on affiche la liste des cartes (activities.map).
        Si hiddenCard est true, on affiche à la place le composant CardRecap.
      */}
      {!hiddenCard ? (
        activities.map((activity, index) => (
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
          />
        ))
      ) : (
        <CardRecap />
      )}
    </section>
  );
};

export default ActivityPage;
