"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function GroupePage() {
  const totalNageurs = 25; 
  const nageursParPage = 6; 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [visibleCount, setVisibleCount] = useState(6); 
  const [isAnimating, setIsAnimating] = useState(false); 

  const handleScrollUp = () => {
    if (currentIndex > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => Math.max(prev - nageursParPage, 0));
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleScrollDown = () => {
    if (currentIndex + nageursParPage < totalNageurs) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) =>
          Math.min(prev + nageursParPage, totalNageurs - nageursParPage)
        );
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleVoirPlus = () => {
    setVisibleCount((prev) => Math.min(prev + 6, totalNageurs)); 
  };

  const nageurs = Array.from({ length: totalNageurs }, (_, index) => ({
    id: index + 1,
    name: `Nageur ${index + 1}`,
    age: 17 + (index % 5), 
  }));

  return (
    <div className="bg-gray-100 min-h-screen p-4 overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Image src="/assets/img/logo.png" alt="Logo" width={65} height={40} />
        </div>
        <div className="flex items-center">
          <Image
            src="/assets/img/Group274.png"
            alt="Avatar"
            width={40}
            height={40}
          />
        </div>
      </div>

      {/* Historique des performances */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Historique des performances</h2>
        <div className="relative">
          <div className="swiper-button-prev custom-swiper-button-prev"></div>
          <div className="swiper-button-next custom-swiper-button-next"></div>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={4}
            navigation={{
              prevEl: ".custom-swiper-button-prev",
              nextEl: ".custom-swiper-button-next",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {[...Array(8)].map((_, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#F5F5F5] rounded-2xl flex flex-col items-center p-4">
                  <p className="text-lg font-medium mb-1">Tournoi de Malreaux</p>
                  <p className="text-xs text-gray-600">12 décembre 2023</p>
                  <div className="text-base font-semibold mt-1 mb-3">4ème - 30"56'10</div>
                  <p className="text-center text-xs text-gray-500 mb-3">
                    Vous avez réalisé une performance d'équipe digne des plus grands, je vous félicite !
                  </p>
                  <p className="text-center text-sm text-blue-600 mb-2 font-semibold">
                    Meilleures performances
                  </p>
                  <div className="flex space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="text-center">
                        <Image
                          src="/assets/img/Group274.png"
                          alt="Avatar"
                          width={40}
                          height={40}
                        />
                        <p className="text-xs mt-1">Taylor</p>
                        <p className="text-xs text-gray-500">30"56'10</p>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {}
      <div className="flex space-x-6 mb-6">
        {}
        <div className="flex-1 bg-white rounded-3xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-3 text-center bg-blue-500 text-white px-3 py-1 rounded-lg">
            Liste des nageurs ({totalNageurs})
          </h2>
          <div className="bg-[#F5F5F5] p-4 rounded-3xl relative">
            <ul
              className={`grid grid-cols-2 gap-4 transition-transform duration-300 ${
                isAnimating ? "translate-y-4 opacity-50" : "translate-y-0 opacity-100"
              }`}
            >
              {nageurs
                .slice(currentIndex, currentIndex + nageursParPage)
                .map((nageur) => (
                  <li
                    key={nageur.id}
                    className="flex items-center justify-between border-b py-2"
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        src="/assets/img/Group274.png"
                        alt="Avatar"
                        width={40}
                        height={40}
                      />
                      <div>
                        <p className="font-medium text-sm">{nageur.name}</p>
                        <p className="text-xs text-gray-500">Nageur 100m | Om me nomme...</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{nageur.age} ans</p>
                  </li>
                ))}
            </ul>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleScrollUp}
                disabled={currentIndex === 0}
                className={`p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-transform duration-200 ease-in-out transform ${
                  currentIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-110"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>

              <button
                onClick={handleScrollDown}
                disabled={currentIndex + nageursParPage >= totalNageurs}
                className={`p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-transform duration-200 ease-in-out transform ${
                  currentIndex + nageursParPage >= totalNageurs
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-110"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Prochaine compétition</h2>
          <div className="bg-[#F5F5F5] rounded-2xl p-4 flex flex-col space-y-4">
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-sm">Nom de compétition :</p>
              <p className="text-xs text-gray-500">Nom de la compétition ici</p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-sm">Adresse postale :</p>
              <p className="text-xs text-gray-500">Adresse de la compétition ici</p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-sm">Nages à effectuer :</p>
              <p className="text-xs text-gray-500">Liste des nages à effectuer ici</p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-sm">Équipements nécessaires :</p>
              <p className="text-xs text-gray-500">Liste des équipements ici</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
