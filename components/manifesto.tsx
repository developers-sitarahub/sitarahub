'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const text =
  'Most software agencies hand you a login and disappear. We stay. The people who design your product write its code, answer your WhatsApp, and keep it running long after launch.';
const words = text.split(' ');
// Words in this set are drawn in the serif italic accent.
const accent = new Set(['stay.', 'design', 'code,', 'running']);

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={accent.has(word) ? 'manifesto-em' : undefined}>
      {word}{' '}
    </motion.span>
  );
}

// Each word brightens in turn as the paragraph scrolls through the viewport.
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });

  return (
    <section className="manifesto">
      <div className="wrap">
        <p className="label" style={{ marginBottom: '2rem' }}>Why Sitarahub</p>
        <p ref={ref} className="manifesto-text">
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>
      </div>
    </section>
  );
}
