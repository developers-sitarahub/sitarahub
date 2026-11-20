'use client';

import Link from 'next/link';
import { motion, MotionConfig } from 'framer-motion';
import { projects } from '@/lib/projects-data';
import { magnetic } from '@/lib/magnetic';
import { HeroMap } from './hero-map';

const ease = [0.22, 0.7, 0.2, 1] as const;
const headline = ['We', 'design', 'and', 'build', 'the', 'software'];
const headlineEm = ['businesses', 'run', 'on.'];
const marquee = ['Web platforms', 'ERP & CRM', 'WhatsApp automation', 'Marketplaces', 'Event platforms', 'Cold email', 'Support & care'];

// The overflow-hidden mask makes each word rise out of its own line.
function Word({ children, i, em }: { children: string; i: number; em?: boolean }) {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.12em' }}>
      <motion.span
        style={{ display: 'inline-block', fontStyle: em ? 'italic' : undefined, color: em ? 'var(--teal-ink)' : undefined }}
        initial={{ y: '110%', rotate: 4 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.15 + i * 0.07, ease }}
      >
        {children}
      </motion.span>
      &nbsp;
    </span>
  );
}

export function HeroSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="home" className="hero">
        <div className="wrap hero-grid">
          <div>
            <motion.p
              className="hero-pill"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="hero-dot" /> Software studio · Mumbai
            </motion.p>

            <h1 className="display" style={{ marginTop: '1.5rem' }}>
              {headline.map((w, i) => (
                <Word key={w + i} i={i}>{w}</Word>
              ))}
              {headlineEm.map((w, i) => (
                <Word key={w} i={headline.length + i} em>{w}</Word>
              ))}
            </h1>

            <motion.p
              className="lede"
              style={{ marginTop: '1.75rem' }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease }}
            >
              Web platforms, ERP and CRM systems, marketplaces and marketing automation. Planned, designed and
              engineered in Mumbai for companies in India and abroad.
            </motion.p>

            <motion.div
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem 2rem', marginTop: '2.25rem' }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05, ease }}
            >
              <a href="#projects" className="btn magnetic" {...magnetic}>
                See our work <span className="arrow" aria-hidden="true">→</span>
              </a>
              <a href="mailto:developers@sitarahub.com" className="link">developers@sitarahub.com</a>
            </motion.div>
          </div>

          {/* Hub map: Sitarahub at the centre, circuit lines out to what we build */}
          <HeroMap />
        </div>

        <motion.dl
          className="wrap hero-facts"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease }}
        >
          <div><dt className="label">Founded</dt><dd>June 2025</dd></div>
          <div><dt className="label">Based in</dt><dd>Mumbai, India</dd></div>
          <div><dt className="label">We reply</dt><dd>Within 24 hours</dd></div>
          <div>
            <dt className="label">Products shipped</dt>
            <dd><Link href="#projects" className="link">{projects.length} since 2025</Link></dd>
          </div>
        </motion.dl>

        <div className="hero-marquee" aria-hidden="true">
          <div className="hero-track">
            {[...marquee, ...marquee].map((m, i) => (
              <span key={i}>{m}<em>✦</em></span>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
