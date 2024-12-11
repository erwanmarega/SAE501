export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center px-6 py-12">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-2xl font-bold mb-2">
          Bonjour <span className="text-blue-600">Erwan</span>
        </h1>
        <p className="text-gray-600 text-lg">Nos activités</p>
        <p className="text-gray-500">
          Découvrez nos options pour profiter pleinement des activités du club
          de natation.
        </p>
      </header>

      {/* Activities Section */}
      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Card: Aquagym */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Aquagym</h3>
            <span className="text-sm bg-blue-100 text-blue-600 py-1 px-2 rounded-full">
              Souplesse
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">225.00€</p>
          <p className="text-sm text-gray-500">Facturation annuelle à 225 €</p>
          <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700">
            Souscrire →
          </button>
          <ul className="mt-6 space-y-2 text-sm text-gray-600">
            <li>✔️ Séances dynamiques et conviviales en musique</li>
            <li>
              ✔️ Exercices adaptés pour renforcer vos muscles tout en douceur
            </li>
            <li>
              ✔️ Activité idéale pour fortifier le corps et améliorer votre
              bien-être
            </li>
          </ul>
          <a
            href="#"
            className="mt-4 inline-block text-blue-600 text-sm font-medium"
          >
            Voir plus →
          </a>
        </div>

        {/* Card: Natation */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Natation</h3>
            <span className="text-sm bg-blue-100 text-blue-600 py-1 px-2 rounded-full">
              Elite
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">300.00€</p>
          <p className="text-sm text-gray-500">Facturation annuelle à 300 €</p>
          <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700">
            Souscrire →
          </button>
          <ul className="mt-6 space-y-2 text-sm text-gray-600">
            <li>✔️ Accès aux séances de natation libre pour tous niveaux</li>
            <li>
              ✔️ Cours encadrés pour perfectionner votre technique et votre
              style
            </li>
            <li>✔️ Programmes adaptés aux nageurs débutants comme confirmés</li>
          </ul>
          <a
            href="#"
            className="mt-4 inline-block text-blue-600 text-sm font-medium"
          >
            Voir plus →
          </a>
        </div>

        {/* Card: Aquabike */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Aquabike</h3>
            <span className="text-sm bg-blue-100 text-blue-600 py-1 px-2 rounded-full">
              Remise en forme
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">250.00€</p>
          <p className="text-sm text-gray-500">Facturation annuelle à 250 €</p>
          <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700">
            Souscrire →
          </button>
          <ul className="mt-6 space-y-2 text-sm text-gray-600">
            <li>
              ✔️ Pédalez dans l’eau pour un entraînement intensif et efficace
            </li>
            <li>✔️ Séances qui allient cardio et renforcement musculaire</li>
            <li>
              ✔️ Idéal pour brûler des calories tout en préservant vos
              articulations
            </li>
          </ul>
          <a
            href="#"
            className="mt-4 inline-block text-blue-600 text-sm font-medium"
          >
            Voir plus →
          </a>
        </div>
      </section>
    </div>
  );
}
