'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CustomCursor } from '@/components/custom-cursor';
import { ProjectsSection } from '@/components/projects-section';

// ─── Content ────────────────────────────────────────────────────────────────

const vision = {
  title: 'Our Vision',
  body: 'To be the go-to studio for ambitious builders — the team that turns raw ideas into world-class digital products that scale. We believe great software is the most powerful lever for growth, and we want every company we work with to feel that power.',
};

const mission = {
  title: 'Our Mission',
  body: 'We build with purpose. Every line of code, every design decision, every deployment is guided by one question: does this create real value? Our mission is to deliver products that are technically excellent, beautifully designed, and built to last.',
};

const values = [
  {
    num: '01',
    title: 'Motion-First Design',
    body: 'Interfaces should feel alive. We bake smooth animations and purposeful micro-interactions into every product we ship.',
    color: '#ff6a37',
  },
  {
    num: '02',
    title: 'Engineering Excellence',
    body: 'Performance, scalability, and security are not afterthoughts — they are the foundation. We build for the long term.',
    color: '#a855f7',
  },
  {
    num: '03',
    title: 'Speed Without Compromise',
    body: 'We move fast but never cut corners. Rapid iteration with rigorous standards — that is how great products are made.',
    color: '#3b82f6',
  },
  {
    num: '04',
    title: 'Radical Transparency',
    body: 'No black boxes. Our clients always know where things stand. Clear communication, honest timelines, real partnership.',
    color: '#22c55e',
  },
];

const stats = [
  { value: '6+', label: 'Products Shipped' },
  { value: '2025', label: 'Founded' },
  { value: '3', label: 'Countries Served' },
  { value: '100%', label: 'Client Satisfaction' },
];

// ─── Three.js Background ─────────────────────────────────────────────────────

function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animId: number;
    let renderer: import('three').WebGLRenderer;
    let observer: IntersectionObserver;
    let lastTime = 0;

    const init = async () => {
      try {
        const THREE = await import('three');
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(1);

        let isVisible = true;
        observer = new IntersectionObserver(([entry]) => {
          isVisible = entry.isIntersecting;
        }, { threshold: 0 });
        observer.observe(canvas);

        // Sparse particle field — cheap to render
        const count = 180;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 18;
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const mat = new THREE.PointsMaterial({ color: 0xff6a37, size: 0.035, transparent: true, opacity: 0.3 });
        scene.add(new THREE.Points(geo, mat));

        const animate = (time: number) => {
          animId = requestAnimationFrame(animate);
          if (!isVisible) return;
          if (time - lastTime < 40) return; // ~25fps for background
          lastTime = time;
          scene.rotation.y += 0.0008;
          renderer.render(scene, camera);
        };
        animate(0);
      } catch (err) {
        console.warn('Failed to initialize WebGL context:', err);
      }
    };

    init();
    return () => {
      cancelAnimationFrame(animId);
      observer?.disconnect();
      renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', willChange: 'transform' }}
    />
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function AnimatedBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ff6a37', marginBottom: '1rem' }}>
      {text}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#f5f0e9', margin: '0 0 3rem' }}>
      {children}
    </h2>
  );
}

const divider = '1px solid rgba(255,255,255,0.06)';

// ─── Page ─────────────────────────────────────────────────────────────────────

export function AboutPageClient() {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <CustomCursor />
      <Navigation />

      <main style={{ background: '#0a0a0a', paddingTop: 80 }}>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section style={{ position: 'relative', padding: '7rem 2rem 6rem', overflow: 'hidden', minHeight: '55vh', display: 'flex', alignItems: 'center' }}>
          <ThreeBackground />
          <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
            <AnimatedBlock>
              <SectionLabel text="About Sitarahub" />
              <h1 style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.9, color: '#f5f0e9', marginBottom: '2rem' }}>
                WE BUILD
                <br />
                <span style={{ background: 'linear-gradient(135deg, #ff6a37, #ff9e70)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  DIGITAL FUTURES
                </span>
              </h1>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(245,240,233,0.42)', maxWidth: 520, margin: 0 }}>
                A software studio from Maharashtra, India — shipping exceptional web platforms,
                SaaS products, and digital experiences for ambitious teams worldwide.
              </p>
            </AnimatedBlock>
          </div>
        </section>

        {/* ── Stats strip ──────────────────────────────────────────────── */}
        <div style={{ borderTop: divider, borderBottom: divider, background: '#080808' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="stats-grid">
            {stats.map((s, i) => (
              <AnimatedBlock key={s.label} delay={i * 0.06}>
                <div style={{ padding: '2.5rem 0', textAlign: 'center', borderRight: i < stats.length - 1 ? divider : 'none' }}>
                  <div style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#f5f0e9', lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,233,0.3)', marginTop: '0.5rem' }}>
                    {s.label}
                  </div>
                </div>
              </AnimatedBlock>
            ))}
          </div>
        </div>

        {/* ── Vision & Mission ─────────────────────────────────────────── */}
        <section style={{ padding: '7rem 2rem', background: '#0a0a0a' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: divider }} className="vm-grid">
            {[vision, mission].map((item, i) => (
              <AnimatedBlock key={item.title} delay={i * 0.12}>
                <div style={{ padding: '4rem', background: '#0a0a0a', height: '100%' }}>
                  <SectionLabel text={`0${i + 1}`} />
                  <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#f5f0e9', marginBottom: '1.5rem' }}>
                    {item.title}
                  </h2>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(245,240,233,0.45)', margin: 0 }}>
                    {item.body}
                  </p>
                </div>
              </AnimatedBlock>
            ))}
          </div>
        </section>

        {/* ── Values ───────────────────────────────────────────────────── */}
        <section style={{ padding: '2rem 2rem 7rem', background: '#0a0a0a' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <AnimatedBlock>
              <SectionLabel text="How we work" />
              <SectionTitle>OUR VALUES</SectionTitle>
            </AnimatedBlock>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: divider }} className="values-grid">
              {values.map((v, i) => (
                <AnimatedBlock key={v.num} delay={i * 0.08}>
                  <div style={{ padding: '3rem', background: '#0a0a0a', height: '100%' }}>
                    <div style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: v.color, marginBottom: '1rem', letterSpacing: '0.1em' }}>{v.num}</div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#f5f0e9', marginBottom: '0.75rem' }}>{v.title}</h3>
                    <p style={{ fontSize: '0.825rem', lineHeight: 1.7, color: 'rgba(245,240,233,0.42)', margin: 0 }}>{v.body}</p>
                  </div>
                </AnimatedBlock>
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects ─────────────────────────────────────────────────── */}
        <section style={{ background: '#080808', borderTop: divider }}>
          {/* ProjectsSection has its own OUR PROJECTS heading — no duplicate needed */}
          <ProjectsSection />
        </section>

        {/* ── CTA (single, no duplicate) ───────────────────────────────── */}
        <section style={{ padding: '7rem 2rem', background: '#0a0a0a', borderTop: divider, textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <AnimatedBlock>
              <SectionLabel text="Work With Us" />
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#f5f0e9', marginBottom: '2rem' }}>
                READY TO BUILD<br />SOMETHING GREAT?
              </h2>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(245,240,233,0.4)', marginBottom: '2.5rem' }}>
                Tell us about your project and we'll get back to you within 24 hours.
              </p>
              <Link href="/#contact" className="btn-primary" style={{ borderRadius: 4, display: 'inline-flex' }}>
                <span>START A PROJECT</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </AnimatedBlock>
          </div>
        </section>

      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .vm-grid { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
