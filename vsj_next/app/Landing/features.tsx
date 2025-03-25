export default function Features() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold">Les fonctionnalités clés</h2>
        <p className="text-gray-600 mt-2">
          Tout ce dont vous avez besoin pour améliorer vos performances
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[
            {
              title: "Communication avec l'équipe",
              desc: "Discutez en temps réel avec votre coach.",
            },
            {
              title: "Suivi des entraînements",
              desc: "Gardez une trace de vos progrès.",
            },
            {
              title: "Statistiques avancées",
              desc: "Analysez vos performances.",
            },
          ].map((feature, index) => (
            <div key={index} className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
