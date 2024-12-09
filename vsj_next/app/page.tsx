import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-black mb-8">Sommaire des Pages</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link href="/authentification">
          <div className="bg-white shadow-md rounded-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl">
            <p className="text-xl font-semibold text-gray-800">
              Page Authentification
            </p>
          </div>
        </Link>
        <Link href="/dashboard">
          <div className="bg-white shadow-md rounded-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl">
            <p className="text-xl font-semibold text-gray-800">
              Page Dashboard
            </p>
          </div>
        </Link>
        <Link href="/calendar">
          <div className="bg-white shadow-md rounded-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl">
            <p className="text-xl font-semibold text-gray-800">Page Calendar</p>
          </div>
        </Link>
        <Link href="/message">
          <div className="bg-white shadow-md rounded-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl">
            <p className="text-xl font-semibold text-gray-800">
              Page Messagerie
            </p>
          </div>
        </Link>
        <Link href="/group">
          <div className="bg-white shadow-md rounded-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl">
            <p className="text-xl font-semibold text-gray-800">Page Groupe</p>
          </div>
        </Link>
        <Link href="/stats">
          <div className="bg-white shadow-md rounded-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl">
            <p className="text-xl font-semibold text-gray-800">
              Page Statistiques
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
