"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[700px] flex items-center justify-center bg-[url('/swimming.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center text-white px-6"
      >
        <h1 className="text-5xl font-bold">VS Natation</h1>
        <p className="mt-4 text-lg">
          Rejoignez-nous pour améliorer vos performances !
        </p>
        <button className="mt-6 bg-primary px-6 py-3 rounded-lg font-semibold">
          Réservez un cours
        </button>
      </motion.div>
    </section>
  );
}
