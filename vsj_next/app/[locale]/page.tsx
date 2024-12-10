export default function HomePage({ params }: { params: { locale: string } }) {
  // Définir les traductions directement dans la page
  const translations = {
    en: {
      welcome: "Welcome to our homepage!",
      description: "This is an example of a multilingual page.",
    },
    fr: {
      welcome: "Bienvenue sur notre page d'accueil !",
      description: "Ceci est un exemple de page multilingue.",
    },
  };

  // Sélectionner les traductions en fonction de la langue
  const t =
    translations[params.locale as keyof typeof translations] || translations.en;

  return (
    <main>
      <h1>{t.welcome}</h1>
      <p>{t.description}</p>
    </main>
  );
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}
