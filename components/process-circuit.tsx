'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    title: 'Message and first call',
    body: 'Tell us what you need. We reply within 24 hours with a few questions and a time to talk.',
    meta: 'Within 24 hours',
  },
  {
    title: 'Written proposal',
    body: 'Scope, cost and timeline agreed in writing before any code is written, so nobody is guessing later.',
    meta: 'Within 3 business days',
  },
  {
    title: 'Design',
    body: 'We design the key screens and flows with you, so you can see the product before we build it.',
    meta: 'Before any code',
  },
  {
    title: 'Build',
    body: 'The people who designed it build it. You talk to them directly on WhatsApp or Slack while it takes shape.',
    meta: 'Direct line to engineers',
  },
  {
    title: 'Launch and support',
    body: 'We deploy, monitor and keep improving it. Fixes go straight to the team that built it, not a ticket queue.',
    meta: 'For as long as you need',
  },
];

function Step({ step, i, last }: { step: (typeof steps)[number]; i: number; last: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  // 0 when this step's node reaches 70% down the viewport, 1 when the next node does.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.7'] });
  const on = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const text = useTransform(scrollYProgress, [0, 0.12], [0.3, 1]);
  const ringScale = useTransform(on, [0, 1], [0.4, 1]);

  return (
    <li ref={ref} className="pc-step">
      <div className="pc-rail" aria-hidden="true">
        {!last && <motion.span className="pc-line" style={{ scaleY: scrollYProgress }} />}
        <span className="pc-node">
          <motion.span className="pc-node-fill" style={{ opacity: on, scale: ringScale }} />
        </span>
        <motion.span className="pc-stub" style={{ scaleX: on }} />
      </div>
      <motion.div className="pc-body" style={{ opacity: text }}>
        <div className="pc-head">
          <span className="num">{String(i + 1).padStart(2, '0')}</span>
          <span className="pc-meta">{step.meta}</span>
        </div>
        <h3 className="h3" style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.1rem)', margin: '0.6rem 0 0.5rem' }}>{step.title}</h3>
        <p className="body">{step.body}</p>
      </motion.div>
    </li>
  );
}

export function ProcessCircuit() {
  return (
    <section id="process" className="section">
      <div className="wrap pc-grid">
        <div className="pc-intro">
          <p className="label">Process</p>
          <h2 className="h2" style={{ marginTop: '1.25rem' }}>
            How a project <em>runs</em>, from first message to support.
          </h2>
          <p className="lede" style={{ marginTop: '1.25rem' }}>
            Five steps, one team. You always know what happens next and who is doing it.
          </p>
        </div>
        <ol className="pc-steps">
          {steps.map((s, i) => (
            <Step key={s.title} step={s} i={i} last={i === steps.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}
