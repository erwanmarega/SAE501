import LandingSection from "./section";
import Testimonials from "./testimonials";
import FAQ from "./faq";
import Stats from "./stats";
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
