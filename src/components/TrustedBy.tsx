import A from "@/lib/assets";

/**
 * Placeholder brand roster. Swap for real client/creator logos when the
 * roster is public. Names are illustrative, marked as such below the strip.
 */
const BRANDS: { name: string; mark: string | null }[] = [
  { name: "Forge Fitness", mark: null },
  { name: "ItCrowd", mark: A.logoDark },
  { name: "Northside Coffee", mark: null },
  { name: "Peak Physio", mark: null },
  { name: "Bloom Skincare", mark: null },
  { name: "Rally Sportswear", mark: null },
  { name: "Harbor Kitchen", mark: null },
];

export default function TrustedBy() {
  return (
    <section className="bg-white pt-16 pb-14 px-[40px]">
      <h2 className="text-center text-3xl md:text-4xl font-medium text-neutral-900 mb-12 font-heading">
        Trusted by <span className="font-accent italic">growing businesses</span>
      </h2>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex w-max animate-marquee gap-16">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div key={`${brand.name}-${i}`} className="flex items-center gap-3 shrink-0 opacity-40">
              {brand.mark && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={brand.mark} alt="" aria-hidden="true" className="w-8 h-8" />
              )}
              <span className="text-3xl font-bold text-black whitespace-nowrap font-brand">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-neutral-400 mt-10 font-sans">
        Illustrative placeholder marks. Early client roster publishing soon.
      </p>
    </section>
  );
}
