/**
 * Central asset map - every image/video on the marketing surface is referenced
 * through `A` (mirrors the reference design's assets.ts pattern).
 *
 * Placeholder policy: files under /placeholders are clearly-labeled neutral
 * stand-ins. When real ItCrowd footage/photography exists, drop it in
 * /public/media and update the path here - nothing else needs to change.
 */
const A = {
  /** White ring-and-dot mark, for dark surfaces (hero nav). */
  logo: "/logo.svg",
  /** Near-black (#141413) mark, for white surfaces. */
  logoDark: "/logo-dark.svg",
  /**
   * Hero background video. None shot yet - set to a /media/*.mp4 path when
   * real campaign footage exists; the hero falls back to `heroBackdrop`.
   */
  heroVideo: null as string | null,
  /** Dark warm-neutral backdrop standing in for the hero video. */
  heroBackdrop: "/placeholders/hero-backdrop.svg",
  /** Warm stone backdrop behind the creator-niche pill carousel. */
  carouselBackdrop: "/placeholders/card-creators.svg",
  /** Circular team headshots (transparent PNGs) used on /about and the quote block. */
  team: {
    chris: "/team/chris-richardson.png",
    anusha: "/team/anusha-bhattacharya.png",
    rayan: "/team/rayan-castilla.png",
    kimi: "/team/kimi-andrew.png",
  },
} as const;

export default A;
