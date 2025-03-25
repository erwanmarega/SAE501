export default function Stats() {
  return (
    <section className="py-16 bg-white text-center">
      <div className="max-w-5xl mx-auto">
        {/* Titre */}
        <h2 className="text-4xl font-bold text-gray-900">
          Les performances en chiffres
        </h2>

        {/* Conteneur des statistiques */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-blue-600">
          {[
            { value: "25%", label: "d'amélioration" },
            { value: "4h", label: "de pratique par semaine" },
            { value: "50%", label: "de progression" },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <p className="text-6xl font-bold">{stat.value}</p>
              <p className="text-gray-600 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
