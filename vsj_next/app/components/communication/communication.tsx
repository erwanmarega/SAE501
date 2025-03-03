"use client";

import Image from "next/image";

const features = [
  { text: "Moyen de communication rapide", icon: "/icons/check.svg" },
  { text: "Simple et intuitive", icon: "/icons/check.svg" },
  { text: "Plus rapide que jamais", icon: "/icons/check.svg" },
];

export default function CommunicationSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Texte */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-100 p-3 rounded-full">
              <Image
                src="/icons/chat.svg"
                alt="Chat Icon"
                width={24}
                height={24}
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Communication avec <span className="font-bold">Equipe</span>
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Grâce à notre solution de messagerie, vous pouvez communiquer
            directement avec votre coach et les différents membres de votre
            club.
          </p>

          {/* Liste des avantages avec icônes */}
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-3">
                <Image
                  src={feature.icon}
                  alt="Check Icon"
                  width={24}
                  height={24}
                />
                <span className="text-gray-700 text-lg">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Images */}
        <div className="relative">
          <div className="absolute top-0 left-0 w-3/4 -translate-x-6 -translate-y-6"></div>
          <div className="relative z-10">
            <Image
              src="/images/chat-2.png"
              alt="Chat Screenshot 2"
              width={500}
              height={350}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
