import Image from "next/image";

export default function LandingSection() {
  return (
    <section className="bg-white text-gray-900">
      {/* Hero Section */}
      <div className="relative w-full h-[600px]">
        <Image
          src="/assets/img/Rectangle42.png"
          alt="Natation"
          fill
          className="object-cover opacity-100"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 text-white">
          <div className="bg-white/80 rounded-lg px-2 py-0.5 shadow-md w-max inline-block">
            <p className="text-gray-900 font-medium text-xs sm:text-2xs md:text-2xs lg:text-xs xl:text-sm 2xl:text-base text-center whitespace-nowrap">
              Club de Natation
            </p>
          </div>

          <h1 className="mt-4 text-6xl font-bold">
            VSJ <span className="text-blue-400">Natation</span>
          </h1>
          <p className="mt-4 text-lg">
            Plongez dans une expérience unique où chaque coup de nage devient un
            jeu !
          </p>
        </div>

        {/* Connexion & Inscription */}
        <div className="absolute top-6 right-6 flex gap-4">
          <button className="text-white font-medium">Connexion</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700">
            Inscription
          </button>
        </div>
      </div>

      {/* Features Section (superposé) */}
      <div className="container mx-auto px-6 py-8 relative -mt-28 z-10">
        <div className="bg-white shadow-xl rounded-lg p-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Colonne Gauche */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold">📅 Calendrier</h3>
              <p className="mt-2 text-gray-600">
                Ne manquez pas l’incontournable, rejoignez-nous dès maintenant !
              </p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold">✅ Présence</h3>
              <p className="mt-2 text-gray-600">
                Un suivi précis pour améliorer vos performances.
              </p>
            </div>
          </div>

          {/* Colonne Droite - Offre et inscription */}
          <div className="p-6 rounded-lg text-center flex flex-col justify-center">
            <span className="text-blue-600 font-medium">
              🔹 Offre exclusive
            </span>
            <h2 className="text-2xl font-bold mt-2">Rejoignez-nous</h2>
            <p className="mt-4 text-gray-600">
              Intégrez le meilleur club de natation, profitez d’une expérience
              unique !
            </p>
            <button className="mt-4 px-5 py-2 bg-blue-600 text-white text-lg rounded-lg shadow-lg hover:bg-blue-700">
              🚀 Inscription
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
