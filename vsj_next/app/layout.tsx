import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BookOpenIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import Tooltip from "./components/ui/tooltip";
import { LanguageProvider } from "./contexts/language-context";
import { useContext } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
        <Link href="/summary">
          <button className="shadow-xl rounded-full bg-gray-700 fixed left-4 bottom-4 w-12 h-12 flex- items-center justify-center hover:shadow-2xl">
            <BookOpenIcon className="text-white w-7 m-auto" />{" "}
          </button>
        </Link>{" "}
      </body>
    </html>
  );
}
