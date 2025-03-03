export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Titre */}
        <h2 className="text-4xl font-bold text-gray-900">
          Pourquoi nos utilisateurs nous font confiance
        </h2>

        {/* Carte du témoignage */}
        <div className="mt-12 bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
          {/* Étoiles */}
          <div className="flex justify-center gap-1 text-yellow-500 text-2xl">
            {"★★★★★".split("").map((star, index) => (
              <span key={index}>{star}</span>
            ))}
          </div>

          {/* Témoignage */}
          <p className="mt-4 text-lg text-gray-700 italic">
            "Le site est vraiment incroyable et l'organisation des cours est
            très efficace. J'ai pu améliorer ma technique en seulement quelques
            semaines grâce aux conseils des coachs."
          </p>

          {/* Utilisateur */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <img
              src="/images/user.jpg"
              alt="Utilisateur"
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
            />
            <div>
              <p className="text-gray-900 font-semibold">Sophie L.</p>
              <p className="text-gray-500 text-sm">Nageuse passionnée</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
