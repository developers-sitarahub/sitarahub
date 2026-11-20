'use client';

import { motion, MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

// Long expo-out: fast start, very soft landing.
const ease = [0.16, 1, 0.3, 1] as const;

// Fades and lifts its children in once as they scroll into view.
export function Reveal({
  children,
  delay = 0,
  className,
  onLoad = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  onLoad?: boolean; // animate on mount (hero) instead of on scroll
}) {
  const target = { opacity: 1, y: 0, filter: 'blur(0px)' };
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        // Starts as a faint ghost (not invisible) so text settles in like ink.
        initial={{ opacity: 0.12, y: 24, filter: 'blur(4px)' }}
        {...(onLoad
          ? { animate: target }
          : { whileInView: target, viewport: { once: true, margin: '0px 0px -12% 0px' } })}
        transition={{ duration: 1.2, delay, ease }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
