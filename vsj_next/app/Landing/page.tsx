import Hero from "./hero";
import Features from "./features";
import Stats from "./stats";
import Testimonials from "./testimonials";
import FAQ from "./faq";
import LandingSection from "./section";
import ActivitiesSection from "./communication";

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
