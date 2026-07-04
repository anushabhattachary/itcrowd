import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import FeatureCards from "@/components/FeatureCards";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        {/* Navbar renders inside Hero (glass header over the full-bleed backdrop) */}
        <Hero />
        <TrustedBy />
        <FeatureCards />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
