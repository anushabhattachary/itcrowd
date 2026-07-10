import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        {/* Navbar renders inside Hero (glass header over the full-bleed backdrop) */}
        <Hero />
        <FeatureCards />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
