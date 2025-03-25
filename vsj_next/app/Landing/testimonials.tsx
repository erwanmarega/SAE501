import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Icône et Titre */}
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Image
              src="/assets/img/quote.png"
              alt="Quote Icon"
              width={32}
              height={32}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Recommandations & avis
          </h2>
          <p className="text-gray-600">Les avis sur nos anciens travaux</p>
        </div>

        {/* Carte du témoignage */}
        <div className="mt-9 bg-white shadow-lg rounded-2xl p-8 max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            {/* Image utilisateur */}
            <Image
              src="/assets/img/user.png"
              alt="Utilisateur"
              width={64}
              height={64}
              className=" object-cover"
            />
            {/* Étoiles et Témoignage */}
            <div className="flex-1">
              <div className="flex gap-1 text-yellow-500 text-xl">
                {"★★★★★".split("").map((star, index) => (
                  <span key={index}>{star}</span>
                ))}
              </div>
              <p className="mt-4 text-gray-700">
                Syra a révolutionné l'organisation de notre club de tennis, je
                recommande 1000 fois, désormais l'administration est simplifiée
                et l'engagement des joueurs a fortement augmenté ! Merci Syra
              </p>
              <p className="mt-4 text-gray-900 font-semibold">
                Mélanie Delatreno
              </p>
              <p className="text-gray-500 text-sm">
                Présidente du TFF Chantilly
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
