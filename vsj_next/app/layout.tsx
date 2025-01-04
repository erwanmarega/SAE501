import "./globals.css";
import { BookOpenIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

import LanguageProviderClient from "./components/header/ui/context/language-provider-client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          href="./node_modules/apexcharts/dist/apexcharts.css"
        />
      </head>
      <body>
        <LanguageProviderClient>
          {children}
          <Link href="/summary">
            <button className="shadow-xl rounded-full bg-gray-700 fixed left-4 bottom-4 w-12 h-12 flex items-center justify-center hover:shadow-2xl">
              <BookOpenIcon className="text-white w-7 m-auto" />
            </button>
          </Link>
        </LanguageProviderClient>
        <script src="./node_modules/lodash/lodash.min.js"></script>
        <script src="./node_modules/apexcharts/dist/apexcharts.min.js"></script>
        <script src="./node_modules/preline/dist/helper-apexcharts.js"></script>
      </body>
    </html>
  );
}
