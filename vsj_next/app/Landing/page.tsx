import Hero from "../components/hero/hero";
import Features from "../components/features/features";
import Stats from "./stats";
import Testimonials from "./testimonials";
import FAQ from "./faq";
import LandingSection from "./section";
import ActivitiesSection from "./communication";

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      <LandingSection />
      <ActivitiesSection />
      <Stats />
      <Testimonials />
      <FAQ />
    </main>
  );
}