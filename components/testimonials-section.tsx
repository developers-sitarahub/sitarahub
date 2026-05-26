'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

// Project-focused — no fake client names
const stories = [
  {
    project: 'Indo Global Trade Fair',
    category: 'B2B Trade Platform',
    highlight: '50,000+ concurrent users handled without any performance degradation during peak event hours.',
    detail: 'Built for scale. The platform managed real-time visitor registrations, exhibitor dashboards, and live buyer-seller connections simultaneously.',
    color: '#f59e0b',
    stat: '50K+',
    statLabel: 'Concurrent Users',
  },
  {
    project: 'National Franchise Investment Summit',
    category: 'Franchise Ecosystem',
    highlight: '500+ brands onboarded. 5,000 visitors per event. Full discovery, registration & exhibition management in one platform.',
    detail: 'End-to-end platform covering franchise listings, investment range filtering, exhibitor booking, and live event management.',
    color: '#ef4444',
    stat: '500+',
    statLabel: 'Brands Onboarded',
  },
  {
    project: 'GPSERP — WhatsApp Automation',
    category: 'SaaS · WhatsApp API',
    highlight: 'Enterprise WhatsApp flows, AI chatbots, dual workflow engines and a unified team inbox — all on one platform.',
    detail: 'Built on the Meta Business API with native flow builder, interactive catalogs, CRM integration and analytics dashboard.',
    color: '#a855f7',
    stat: '10x',
    statLabel: 'Message Throughput',
  },
  {
    project: 'Mail by GPSERP',
    category: 'AI Email Outreach',
    highlight: 'AI-generated hyper-personalized cold emails at scale. Higher deliverability, better reply rates.',
    detail: 'Campaign management, smart send scheduling, inbox rotation, and AI content generation — all designed for serious outreach.',
    color: '#3b82f6',
    stat: '3x',
    statLabel: 'Reply Rate Improvement',
  },
];

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
        camera.position.z = 6;

        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(1); // Force 1x for performance

        let isVisible = true;
        observer = new IntersectionObserver(([entry]) => {
          isVisible = entry.isIntersecting;
        }, { threshold: 0 });
        observer.observe(canvas);

        // Single low-poly icosahedron — fewer draw calls
        const geo = new THREE.IcosahedronGeometry(2.5, 0);
        const mat = new THREE.MeshBasicMaterial({ color: 0xff6a37, wireframe: true, transparent: true, opacity: 0.04 });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        // Throttle to 30fps for background elements
        const animate = (time: number) => {
          animId = requestAnimationFrame(animate);
          if (!isVisible) return;
          if (time - lastTime < 33) return; // ~30fps cap
          lastTime = time;
          mesh.rotation.y += 0.006;
          mesh.rotation.z += 0.002;
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

export function TestimonialsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [active, setActive] = useState(0);

  // Auto-cycle
  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % stories.length), 5000);
    return () => clearInterval(id);
  }, []);

  const s = stories[active];

  return (
    <section
      id="testimonials"
      style={{ position: 'relative', padding: '8rem 0', background: '#0a0a0a', overflow: 'hidden' }}
    >
      <ThreeBackground />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }} ref={ref}>
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#ff6a37',
              marginBottom: '1rem',
              opacity: inView ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          >
            Project Highlights
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#f5f0e9',
              margin: 0,
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            WHAT WE
            <br />
            DELIVERED
          </h2>
        </div>

        {/* Main display */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 300px',
            gap: '3rem',
            alignItems: 'start',
          }}
          className="stories-grid"
        >
          {/* Featured story */}
          <div
            key={active}
            style={{ animation: 'revealUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          >
            {/* Big stat */}
            <div style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  fontSize: 'clamp(3rem, 7vw, 6rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                  color: s.color,
                  marginBottom: '0.25rem',
                }}
              >
                {s.stat}
              </div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,233,0.3)' }}>
                {s.statLabel}
              </div>
            </div>

            <p
              style={{
                fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                color: '#f5f0e9',
                marginBottom: '1.25rem',
              }}
            >
              {s.highlight}
            </p>

            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(245,240,233,0.4)', marginBottom: '2rem' }}>
              {s.detail}
            </p>

            {/* Project label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, color: '#f5f0e9', fontSize: '0.875rem' }}>{s.project}</div>
                <div style={{ fontSize: '0.65rem', color: s.color, marginTop: '0.125rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.category}</div>
              </div>
            </div>
          </div>

          {/* Sidebar selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {stories.map((story, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  padding: '1.25rem',
                  background: active === i ? 'rgba(255,106,55,0.07)' : 'transparent',
                  border: active === i ? `1px solid ${story.color}33` : '1px solid rgba(255,255,255,0.04)',
                  borderRadius: 4,
                  textAlign: 'left',
                  transition: 'all 0.25s ease',
                  cursor: 'none',
                  willChange: 'background',
                }}
              >
                <div style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: active === i ? story.color : 'rgba(245,240,233,0.25)', marginBottom: '0.3rem' }}>
                  {story.category}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: active === i ? '#f5f0e9' : 'rgba(245,240,233,0.4)' }}>
                  {story.project}
                </div>
              </button>
            ))}

            {/* Progress dots */}
            <div style={{ display: 'flex', gap: '0.4rem', paddingTop: '0.75rem', paddingLeft: '1.25rem' }}>
              {stories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: active === i ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: active === i ? '#ff6a37' : 'rgba(255,255,255,0.15)',
                    border: 'none',
                    padding: 0,
                    cursor: 'none',
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .stories-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
