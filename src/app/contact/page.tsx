import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | ItCrowd",
  description: "Get in touch with ItCrowd — whether you're a startup or an influencer.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-8 md:pt-40">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left — Info */}
            <div>
              <span className="text-sm uppercase tracking-[0.2em] text-brand-purple font-semibold">
                Contact
              </span>
              <h1 className="mt-4 text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-syne)]">
                Let&apos;s Build Something Together.
              </h1>
              <p className="mt-4 text-muted leading-relaxed">
                Whether you&apos;re a startup founder looking for marketing help or
                a creator ready to level up, we&apos;d love to hear from you.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-brand-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Email Us</h3>
                    <p className="text-muted text-sm mt-1">
                      hello@itcrowd.io
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-brand-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Location</h3>
                    <p className="text-muted text-sm mt-1">
                      Atlanta, GA — Georgia Tech 🐝
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
