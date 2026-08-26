"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Route prefixes that keep native scrolling.
 *
 * Smooth scroll is for brand surfaces. On working surfaces — search, the two
 * portals, calculators — it fights the user: it delays scroll-to-anchor, breaks
 * scroll restoration on back navigation, and makes long result lists feel
 * laggy. See the launch plan, section 05.
 */
const NATIVE_SCROLL_PREFIXES = [
  "/search",
  "/agent",
  "/account",
  "/admin",
  "/login",
  "/register",
  "/tools",
  "/add-property",
  "/list-property",
];

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SmoothScrollProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const isNative = NATIVE_SCROLL_PREFIXES.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`)
    );

    if (isNative || prefersReducedMotion()) {
      // Make sure any ScrollTrigger built by a previous route is torn down,
      // otherwise pinned sections leak transforms onto the next page.
      ScrollTrigger.getAll().forEach((t) => t.kill());
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Drive Lenis from GSAP's ticker rather than a second rAF loop, so scroll
    // position and scroll-linked animation resolve in the same frame.
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);

  return null;
}
