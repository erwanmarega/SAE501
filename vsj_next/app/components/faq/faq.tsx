export default function FAQ() {
  const faqs = [
    {
      question: "Comment réserver un cours ?",
      answer:
        "Vous pouvez réserver un cours directement sur notre plateforme en ligne via votre espace personnel.",
    },
    {
      question: "Quels sont les niveaux disponibles ?",
      answer:
        "Nous proposons des cours pour débutants, intermédiaires et avancés afin de s'adapter à chaque niveau.",
    },
    {
      question: "Puis-je annuler une réservation ?",
      answer:
        "Oui, vous pouvez annuler un cours jusqu'à 24 heures avant l'heure prévue directement dans votre espace personnel.",
    },
    {
      question: "Quels sont les modes de paiement acceptés ?",
      answer:
        "Nous acceptons les paiements par carte bancaire, PayPal et virement bancaire.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Titre */}
        <h2 className="text-4xl font-bold text-center text-gray-900">FAQ</h2>

        {/* Liste des FAQ */}
        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="p-4 bg-gray-100 rounded-lg cursor-pointer transition-all duration-300 open:bg-blue-100"
            >
              <summary className="font-semibold text-gray-900 text-lg flex justify-between items-center">
                {faq.question}
                <span className="text-blue-600">+</span>
              </summary>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
