"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
//import { Navigation, Pagination } from "swiper"; // Importation correcte des modules
import "swiper/swiper-bundle.css"; // Importation du CSS de Swiper

// Utilisation des modules
//Swiper.use([Navigation, Pagination]);

export default function GroupePage() {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
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
        <h2 className="text-xl font-semibold mb-3">
          Historique des performances
        </h2>
        <div className="relative">
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            navigation={true} // Navigation activée
            pagination={{ clickable: true }} // Pagination cliquable
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {[...Array(8)].map((_, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#F5F5F5] rounded-2xl flex flex-col items-center p-4">
                  <p className="text-lg font-medium mb-1">
                    Tournoi de Malreaux
                  </p>
                  <p className="text-xs text-gray-600">12 décembre 2023</p>
                  <div className="text-base font-semibold mt-1 mb-3">
                    4ème - 30"56'10
                  </div>
                  <p className="text-center text-xs text-gray-500 mb-3">
                    Vous avez réalisé une performance d'équipe digne des plus
                    grands, je vous félicite !
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

      {/* Autres sections */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {/* Section 1 */}
        <div className="bg-white rounded-3xl shadow-md p-4 col-span-2">
          <h2 className="text-xl font-semibold mb-3 inline-block bg-blue-500 text-white px-2 py-1 rounded">
            Nombres de nageurs : 25
          </h2>
          <div className="bg-[#F5F5F5] p-4 rounded-3xl">
            <ul className="grid grid-cols-2 gap-4">
              {[...Array(10)].map((_, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between border-b py-2"
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/assets/img/Group274.png"
                      alt="Avatar"
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col items-start">
                      <p className="font-medium text-sm">Stéphane Cabelot</p>
                      <p className="text-xs text-gray-500">
                        Nageur 100m | Om me nomme...
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 ml-2">17 ans</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-2xl shadow-md p-4 col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Prochaine compétition
          </h2>
          <div className="bg-[#F5F5F5] rounded-2xl p-4 flex flex-col space-y-4">
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-sm">Nom de compétition :</p>
              <p className="text-xs text-gray-500">Nom de la compétition ici</p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-sm">Adresse postale :</p>
              <p className="text-xs text-gray-500">
                Adresse de la compétition ici
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-sm">Nages à effectuer :</p>
              <p className="text-xs text-gray-500">
                Liste des nages à effectuer ici
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-sm">Équipements nécessaires :</p>
              <p className="text-xs text-gray-500">Liste des équipements ici</p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-sm">Autres informations :</p>
              <p className="text-xs text-gray-500">
                Détails supplémentaires ici
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
