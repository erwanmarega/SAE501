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
  const nageursParPage = 4;
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const nageurs = Array.from({ length: totalNageurs }, (_, index) => ({
    id: index + 1,
    name: `Nageur ${index + 1}`,
    age: 17 + (index % 5),
  }));

  return (
    <div className="bg-gray-100 dark:bg-gray-900 h-[92vh] p-4 grid grid-rows-2 grid-cols-2 gap-6">
      {/* Historique des performances */}
      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-md p-4 col-start-1 col-end-3 h-full w-full">
        <h2 className="text-xl font-semibold mb-3 text-center">
          Historique des performances
        </h2>
        <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"></div>

        <div className="relative h-5/6">
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
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {[...Array(8)].map((_, index) => (
              <SwiperSlide key={index} style={{ height: "100%" }}>
                <div className="bg-[#F7F7F7] dark:bg-gray-700 dark:text-white rounded-2xl flex flex-col items-center p-4 h-full justify-between transition-all hover:shadow-[0px_4px_10px_rgba(0,0,0,0.2)] dark:hover:shadow-[0px_4px_10px_rgba(255,255,255,0.2)]">
                  <p className="text-base font-medium mb-1 text-center">
                    Tournoi de Malreaux
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    12 déc. 2023
                  </p>
                  <p className="text-sm font-semibold mb-2 text-center">
                    4ème - 30"56'10
                  </p>
                  <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Une performance d'équipe remarquable !
                  </p>

                  <div className="flex justify-center space-x-5 mb-3">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="text-center flex flex-col items-center"
                      >
                        <Image
                          src="/assets/img/Group274.png"
                          alt="Avatar"
                          width={40}
                          height={40}
                          className="shadow-md object-contain"
                        />
                        <p className="text-xs mt-1">Taylor</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          30"56'10
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Liste des nageurs */}
      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-3xl shadow-md p-4 h-full w-full">
        <h2 className="text-lg font-semibold mb-2 text-left bg-blue-500 dark:bg-blue-700 text-white px-1 py-1 rounded-lg inline-block">
          Liste des nageurs ({totalNageurs})
        </h2>
        <div className="bg-[#F7F7F7] dark:bg-gray-700 p-4 rounded-3xl relative">
          <ul
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 transition-all duration-500 ease-out transform ${
              isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"
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
                      className="shadow-md"
                    />
                    <div>
                      <p className="font-medium text-sm">{nageur.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Nageur 100m | Om me nomme...
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {nageur.age} ans
                  </p>
                </li>
              ))}
          </ul>

          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={handleScrollUp}
              disabled={currentIndex === 0}
              className={`p-3 bg-transparent text-blue-500 dark:text-blue-400 rounded-full shadow-lg hover:bg-blue-200 dark:hover:bg-blue-600 transition-transform duration-200 ease-in-out transform ${
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
              className={`p-3 bg-transparent text-blue-500 dark:text-blue-400 rounded-full shadow-lg hover:bg-blue-200 dark:hover:bg-blue-600 transition-transform duration-200 ease-in-out transform ${
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

      {/* Prochaine compétition */}
      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-md p-4 h-full w-full">
        <h2 className="text-lg font-semibold mb-4 text-left">
          Prochaine compétition
        </h2>
        <div className="bg-[#F7F7F7] dark:bg-gray-700 rounded-2xl p-4 flex space-x-6">
          {/* flex et space-x-6 pour espacer l'image et les infos */}
          {/* Informations de la compétition */}
          <div className="flex-1">
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-sm">Nom de compétition :</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Nom de la compétition ici
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-sm">Adresse postale :</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Adresse de la compétition ici
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-sm">Nages à effectuer :</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Liste des nages à effectuer ici
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-sm">Équipements nécessaires :</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Liste des équipements ici
              </p>
            </div>
          </div>
          {/* Image de la compétition */}
          <div className="w-1/2">
            <Image
              src="/assets/img/image2.png"
              alt="Prochaine compétition"
              width={400}
              height={150}
              className="rounded-xl mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
