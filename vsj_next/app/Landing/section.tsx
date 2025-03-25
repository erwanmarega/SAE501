import { section } from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";

export default function LandingSection() {
  return (
    <section className="relative bg-white text-gray-900 font-['Mona_Sans']">
      {/* Hero Section avec image */}
      <div className="relative w-full h-[600px]">
        <Image
          src="/assets/img/rectangle42.png"
          alt="Natation"
          fill
          className="object-cover opacity-100"
        />

        {/* Contenu texte principal */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 text-white font-['Mona_Sans']">
          {/* Badge Club de Natation */}
          <div className="bg-white/80 rounded-full px-4 py-2 shadow-md w-max">
            <p className="text-gray-900 font-medium text-xs">
              Club de Natation
            </p>
          </div>

          {/* Texte VSJ au-dessus et Natation en gras */}
          <div className="mt-4">
            <h1 className="text-4xl sm:text-5xl font-light leading-none">
              VSJ
            </h1>
            <h1
              className="text-5xl sm:text-6xl font-bold"
              style={{ fontFamily: "Mona Sans Black" }}
            >
              Natation
            </h1>
          </div>

          {/* Texte descendu davantage sous le logo */}
          <p className="mt-12 text-sm max-w-lg text-center">
            Meilleur club de natation de la planète, ne manquez pas
            l'incontournable !
          </p>
        </div>

        {/* Connexion & Inscription */}
        <div className="absolute top-6 right-6 flex items-center gap-4 font-['Mona_Sans']">
          <Link href="/authentification">
            <button className="px-6 py-3 bg-white text-[#348CFF] rounded-lg shadow-lg hover:bg-gray-100">
              Inscription
            </button>
          </Link>
        </div>

        {/* Carte Logiciel & App Mobile */}
        <div className="absolute top-1/3 right-10 bg-white/90 p-6 rounded-2xl shadow-lg w-44 font-['Mona_Sans']">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-50 h-50 flex items-center justify-center">
              <Image
                src="/assets/img/logiciel.png"
                alt="Logiciel"
                width={70}
                height={70}
                className="object-contain"
              />
            </div>
            <p className="text-gray-900 font-medium">Logiciel</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-50 h-50 flex items-center justify-center">
              <Image
                src="/assets/img/app.png"
                alt="App mobile"
                width={95}
                height={95}
                className="object-contain"
              />
            </div>
            <p className="text-gray-900 font-medium">L'App mobile</p>
          </div>

          {/* Texte à espacer davantage du titre dans la carte */}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-12 relative -mt-24 z-10">
        <div className="bg-white shadow-xl rounded-2xl p-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bloc Informations */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { img: "calendrer.png", title: "Calendrier" },
              { img: "presence.png", title: "Présence" },
              { img: "check.png", title: "Calendrier" },
              { img: "group.png", title: "Groupe" },
            ].map((item, index) => (
              <section
                key={index}
                className="p-5 bg-gray-100 rounded-2xl flex items-start flex-col"
              >
                <div className="flex items-center gap-4">
                  {/* Rond blanc avec l'icône */}
                  <div className="w-12 h-12">
                    <Image
                      src={`/assets/img/${item.img}`}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>

                  {/* Texte */}
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  Meilleur club de natation de la planète, ne manquez pas
                  l'incontournable !
                </p>
              </section>
            ))}
          </div>

          {/* Section Rejoignez-nous */}
          <div className="p-8 flex flex-col justify-center items-center text-center bg-blue-50 rounded-2xl">
            <span className="bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              VSJ Natation
            </span>
            <h2 className="text-3xl font-bold mt-4">Rejoignez-nous</h2>
            <p className="mt-4 text-gray-600">
              Meilleur club de natation de la planète, ne manquez pas
              l'incontournable !
            </p>
            <button className="mt-6 px-8 py-3 bg-blue-600 text-white text-lg rounded-full shadow-lg hover:bg-blue-700">
              <Link href="/signup">🚀 Inscription</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
