'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Inertia-smoothed page scrolling. Skipped for users who ask for reduced motion.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 }, autoRaf: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
