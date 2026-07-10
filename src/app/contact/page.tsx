import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | ItCrowd",
  description: "Get in touch with ItCrowd. We work with both businesses and creators.",
};

export default function ContactPage() {
  return (
    <>
      {/* Dark mini-hero */}
      <section className="dark-surface relative bg-[#141413] text-white p-6 md:p-12 pb-16 md:pb-24 overflow-hidden">
        <Navbar theme="dark" entrance="fade" />

        <div className="w-full max-w-[1360px] mx-auto mt-16 md:mt-24">
          <span className="block text-sm uppercase tracking-[0.2em] text-[#9E948B] font-sans">
            Contact
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] font-heading max-w-[760px]">
            Let&apos;s build something{" "}
            <span className="font-accent italic">together.</span>
          </h1>
          <p className="mt-6 text-white/70 text-lg md:text-xl leading-snug max-w-[560px] font-sans">
            Whether you&apos;re a business owner looking for marketing help or a
            creator ready to level up, we&apos;d love to hear from you.
          </p>

          {/* Contact details */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <div className="inline-flex items-center gap-3 h-[56px] px-5 rounded-2xl border border-white/40 font-sans">
              <Mail size={18} className="text-white/70" aria-hidden="true" />
              <span className="text-white text-lg whitespace-nowrap">hello@itcrowd.io</span>
            </div>
            <div className="inline-flex items-center gap-3 h-[56px] px-5 rounded-2xl border border-white/40 font-sans">
              <MapPin size={18} className="text-white/70" aria-hidden="true" />
              <span className="text-white text-lg whitespace-nowrap">
                Atlanta, GA · Georgia Tech 🐝
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Form: ContactForm renders its own white section (id="contact") */}
      <ContactForm />

      <Footer />
    </>
  );
}
