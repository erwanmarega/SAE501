import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Langues supportées
const locales = ["en", "fr"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Vérifier si l'URL contient une langue supportée
  const pathnameSegments = pathname.split("/");
  const locale = pathnameSegments[1];

  if (!locales.includes(locale)) {
    // Rediriger vers la langue par défaut si aucune langue valide n'est trouvée
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
