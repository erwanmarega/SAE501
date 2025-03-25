import Hero from "./Landing/hero";
import Features from "./Landing/features";
import Stats from "./Landing/stats";
import Testimonials from "./Landing/testimonials";
import FAQ from "./Landing/faq";
import LandingSection from "./Landing/section";
import ActivitiesSection from "./Landing/communication";

export default function Landing() {
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
