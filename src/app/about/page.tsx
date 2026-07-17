import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedWords from "@/components/AnimatedWords";
import A from "@/lib/assets";

export const metadata: Metadata = {
  title: "About | ItCrowd",
  description:
    "Meet the team behind ItCrowd, the Atlanta startup connecting brands with trusted local creators.",
};

const TEAM = [
  {
    name: "Chris Richardson",
    role: "Founder and CEO",
    photo: A.team.chris,
  },
  {
    name: "Anusha Bhattacharya",
    role: "Co-Founder and CTO",
    photo: A.team.anusha,
  },
  {
    name: "Rayan Castilla",
    role: "Founding Engineer",
    photo: A.team.rayan,
  },
  {
    name: "Kimi Andrew",
    role: "Intern",
    photo: A.team.kimi,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Dark mini-hero */}
      <section className="dark-surface relative bg-[#141413] text-white p-6 md:p-12 pb-16 md:pb-24 overflow-hidden">
        <Navbar theme="dark" entrance="fade" />

        <div className="w-full max-w-[1360px] mx-auto mt-16 md:mt-24">
          <span className="block text-sm uppercase tracking-[0.2em] text-[#9E948B] font-sans">
            <AnimatedWords text="About ItCrowd" baseDelay={0.2} />
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] font-heading max-w-[760px]">
            <AnimatedWords text="Meet the" baseDelay={0.3} />{" "}
            <span className="font-accent italic">
              <AnimatedWords text="team." baseDelay={0.5} />
            </span>
          </h1>
          <p className="mt-6 text-white/70 text-lg md:text-xl leading-snug max-w-[560px] font-sans">
            <AnimatedWords
              baseDelay={0.65}
              text="We are a small team out of Georgia Tech building a simpler way for brands and local creators to work together."
            />
          </p>
        </div>
      </section>

      {/* Team grid */}
      <main className="bg-white">
        <section className="max-w-[1360px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
            {TEAM.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center">
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-[#F1F0EF] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.photo}
                    alt={`${member.name}, ${member.role} at ItCrowd`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="mt-6 text-2xl md:text-[26px] font-medium text-neutral-900 font-heading">
                  {member.name}
                </h2>
                <p className="mt-1.5 text-base md:text-lg text-[#887C71] font-sans">
                  {member.role}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 md:mt-24 pt-12 border-t border-[#F1F0EF] flex flex-col items-center text-center gap-6">
            <p className="max-w-[560px] text-xl md:text-2xl leading-snug text-neutral-500 font-sans">
              Founded at Georgia Tech and based in Atlanta. If you want to work
              with us, we would love to hear from you.
            </p>
            <a
              href="/contact"
              className="h-12 md:h-14 px-6 md:px-8 rounded-2xl bg-[#141413] text-white text-lg md:text-xl font-medium font-sans inline-flex items-center justify-center hover:bg-neutral-800 transition-colors"
            >
              Get in touch
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
