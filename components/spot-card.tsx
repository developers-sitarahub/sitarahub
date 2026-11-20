'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// Card that reveals on scroll and follows the cursor with a warm spotlight (see .spot in globals.css).
export function SpotCard({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={`spot ${className}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </motion.div>
  );
}
