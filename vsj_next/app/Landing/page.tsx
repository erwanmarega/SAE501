import Hero from "../components/hero/hero";
import Features from "../components/features/features";
import Stats from "../components/stats/stats";
import Testimonials from "../components/testimonials/testimonials";
import FAQ from "../components/faq/faq";
import LandingSection from "../components/section/section";
import CommunicationSection from "../components/communication/communication";

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      <LandingSection />
      <CommunicationSection />
      <Stats />
      <Testimonials />
      <FAQ />
    </main>
  );
}
