export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center px-4 py-8 select-none">
      {" "}
      {}
      <header className="w-full mb-6">
        <h1 className="text-2xl font-bold mb-2 text-left">
          Bonjour{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 underline decoration-2">
            Erwan
          </span>
        </h1>
        <div className="flex justify-center mb-4">
          <img src="./assets/img/logo.png" alt="Logo" className="w-16 h-auto" />
        </div>
        <div className="text-center">
          <p className="text-gray-600 text-4xl font-semibold">Nos activités</p>
          <p className="text-gray-500 text-sm">
            Découvrez nos options pour profiter pleinement des activités du club
            de natation.
          </p>
        </div>
      </header>
      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-5xl">
        {/* Carte 1 */}
        <div className="bg-white rounded-xl shadow-md p-6 transform transition-transform duration-500 hover:scale-110 hover:shadow-lg w-full mx-auto space-y-4 select-none">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">Aquagym</h3>
            <span className="text-xs bg-blue-100 text-blue-600 py-1 px-2 rounded-full">
              Souplesse
            </span>
          </div>
          <p className="text-xl font-bold text-gray-800 mb-0.5">225.00€</p>
          <p className="text-xs text-gray-500">Facturation annuelle à 225 €</p>
          <button className="mt-4 bg-primary text-white py-2 px-4 rounded-md w-full hover:bg-blue-700">
            Souscrire →
          </button>
          <div className="w-65 h-0.5 bg-[#E8EAE9] mx-auto mt-4"></div>
          <ul className="space-y-3 text-xs text-gray-600">
            <li>
              <img
                src="./assets/img/image.png"
                alt="Check"
                className="inline-block w-4 h-4 mr-2"
              />
              Séances dynamiques et conviviales en musique
            </li>
            <li>
              <img
                src="./assets/img/image.png"
                alt="Check"
                className="inline-block w-4 h-4 mr-2"
              />
              Exercices adaptés pour renforcer vos muscles tout en douceur
            </li>
            <li>
              <img
                src="./assets/img/image.png"
                alt="Check"
                className="inline-block w-4 h-4 mr-2"
              />
              Activité idéale pour fortifier le corps et améliorer votre
              bien-être
            </li>
          </ul>
          <div className="text-right">
            <a
              href="#"
              className="mt-4 inline-block text-blue-600 text-xs font-medium"
            >
              Voir plus →
            </a>
          </div>
        </div>

        {}
        <div className="bg-white rounded-xl shadow-md p-6 transform transition-transform duration-500 hover:scale-110 hover:shadow-lg w-full mx-auto space-y-4 select-none">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">Natation</h3>
            <span className="text-xs bg-blue-100 text-blue-600 py-1 px-2 rounded-full">
              Elite
            </span>
          </div>
          <p className="text-xl font-bold text-gray-800 mb-0.5">300.00€</p>
          <p className="text-xs text-gray-500">Facturation annuelle à 300 €</p>
          <button className="mt-4 bg-primary text-white py-2 px-4 rounded-md w-full hover:bg-blue-700">
            Souscrire →
          </button>
          <div className="w-65 h-0.5 bg-[#E8EAE9] mx-auto mt-4"></div>
          <ul className="space-y-3 text-xs text-gray-600">
            <li>
              <img
                src="./assets/img/image.png"
                alt="Check"
                className="inline-block w-4 h-4 mr-2"
              />
              Accès aux séances de natation libre pour tous niveaux
            </li>
            <li>
              <img
                src="./assets/img/image.png"
                alt="Check"
                className="inline-block w-4 h-4 mr-2"
              />
              Cours encadrés pour perfectionner votre technique et votre style
            </li>
            <li>
              <img
                src="./assets/img/image.png"
                alt="Check"
                className="inline-block w-4 h-4 mr-2"
              />
              Programmes adaptés aux nageurs débutants comme confirmés
            </li>
          </ul>
          <div className="text-right">
            <a
              href="#"
              className="mt-4 inline-block text-blue-600 text-xs font-medium"
            >
              Voir plus →
            </a>
          </div>
        </div>

        {}
        <div className="bg-white rounded-xl shadow-md p-6 transform transition-transform duration-500 hover:scale-110 hover:shadow-lg w-full mx-auto space-y-4 select-none">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">Aquabike</h3>
            <span className="text-xs bg-blue-100 text-blue-600 py-1 px-2 rounded-full">
              Remise en forme
            </span>
          </div>
          <p className="text-xl font-bold text-gray-800 mb-0.5">250.00€</p>
          <p className="text-xs text-gray-500">Facturation annuelle à 250 €</p>
          <button className="mt-4 bg-primary text-white py-2 px-4 rounded-md w-full hover:bg-blue-700">
            Souscrire →
          </button>
          <div className="w-65 h-0.5 bg-[#E8EAE9] mx-auto mt-4"></div>
          <ul className="space-y-3 text-xs text-gray-600">
            <li>
              <img
                src="./assets/img/image.png"
                alt="Check"
                className="inline-block w-4 h-4 mr-2"
              />
              Pédalez dans l’eau pour un entraînement intensif et efficace
            </li>
            <li>
              <img
                src="./assets/img/image.png"
                alt="Check"
                className="inline-block w-4 h-4 mr-2"
              />
              Séances qui allient cardio et renforcement musculaire
            </li>
            <li>
              <img
                src="./assets/img/image.png"
                alt="Check"
                className="inline-block w-4 h-4 mr-2"
              />
              Idéal pour brûler des calories tout en préservant vos
              articulations
            </li>
          </ul>
          <div className="text-right">
            <a
              href="#"
              className="mt-4 inline-block text-blue-600 text-xs font-medium"
            >
              Voir plus →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
