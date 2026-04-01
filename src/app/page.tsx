import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import WhyItCrowd from "@/components/WhyItCrowd";
import HowItWorksStartups from "@/components/HowItWorksStartups";
import HowItWorksInfluencers from "@/components/HowItWorksInfluencers";
import ComparisonTable from "@/components/ComparisonTable";
import SplitPanel from "@/components/SplitPanel";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <WhyItCrowd />
        <HowItWorksStartups />
        <HowItWorksInfluencers />
        <ComparisonTable />
        <SplitPanel />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
