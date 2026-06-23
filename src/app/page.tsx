import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InTheCrowd from "@/components/InTheCrowd";
import StatsBar from "@/components/StatsBar";
import WhyItCrowd from "@/components/WhyItCrowd";
import HowItWorksBusinesses from "@/components/HowItWorksBusinesses";
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
        <InTheCrowd />
        <StatsBar />
        <WhyItCrowd />
        <HowItWorksBusinesses />
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
