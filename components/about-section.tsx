'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const values = [
  {
    number: '01',
    title: 'Motion-First Design',
    description: 'Every interface we build feels alive. Smooth animations and purposeful micro-interactions are baked into our process.',
  },
  {
    number: '02',
    title: 'Engineering Excellence',
    description: 'Performance, scalability, and security are not afterthoughts — they are built into the foundation of everything we ship.',
  },
  {
    number: '03',
    title: 'Business Impact',
    description: 'We measure success by your results. Every decision is grounded in outcomes — growth, efficiency, and real ROI.',
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
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(1); // Force 1x — background element

        let isVisible = true;
        observer = new IntersectionObserver(([entry]) => {
          isVisible = entry.isIntersecting;
        }, { threshold: 0 });
        observer.observe(canvas);

        // Two low-poly wireframe shapes
        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(2, 2, 2),
          new THREE.MeshBasicMaterial({ color: 0xff6a37, wireframe: true, transparent: true, opacity: 0.05 })
        );
        scene.add(cube);

        const oct = new THREE.Mesh(
          new THREE.OctahedronGeometry(2.5, 0), // detail=0 for fewer vertices
          new THREE.MeshBasicMaterial({ color: 0xff6a37, wireframe: true, transparent: true, opacity: 0.025 })
        );
        scene.add(oct);

        // ~30fps cap for background
        const animate = (time: number) => {
          animId = requestAnimationFrame(animate);
          if (!isVisible) return;
          if (time - lastTime < 33) return;
          lastTime = time;
          cube.rotation.x += 0.008;
          cube.rotation.y += 0.012;
          oct.rotation.y += 0.004;
          oct.rotation.x += 0.002;
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
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}

export function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="about"
      style={{ position: 'relative', padding: '8rem 0', background: '#0a0a0a', overflow: 'hidden' }}
    >
      <ThreeBackground />

      <div
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}
        ref={ref}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6rem',
            alignItems: 'center',
          }}
        >
          {/* Left */}
          <div>
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
              About Sitarahub
            </div>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: '#f5f0e9',
                marginBottom: '2rem',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              WE BUILD
              <br />
              THINGS THAT
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #ff6a37, #ff9e70)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                MATTER
              </span>
            </h2>

            <p
              style={{
                fontSize: '0.925rem',
                lineHeight: 1.8,
                color: 'rgba(245,240,233,0.45)',
                marginBottom: '1.5rem',
                opacity: inView ? 1 : 0,
                transition: 'opacity 0.6s ease 0.3s',
              }}
            >
              Founded in 2025, Sitarahub Private Limited (CIN: U46901MH2025PTC450939) is a
              premium software development studio from Maharashtra, India — building
              web platforms, ERP systems, SaaS products, and digital experiences
              for ambitious clients across India, USA, and beyond.
            </p>

            <p
              style={{
                fontSize: '0.925rem',
                lineHeight: 1.8,
                color: 'rgba(245,240,233,0.45)',
                opacity: inView ? 1 : 0,
                transition: 'opacity 0.6s ease 0.4s',
              }}
            >
              From eCommerce stores to B2B trade platforms and WhatsApp automation
              tools — we partner with ambitious companies to build the digital
              infrastructure that powers their next chapter.
            </p>

            <div
              style={{
                marginTop: '2.5rem',
                opacity: inView ? 1 : 0,
                transition: 'opacity 0.6s ease 0.5s',
              }}
            >
              <a href="/about" className="btn-primary" style={{ borderRadius: 4 }}>
                <span>COMPANY PROFILE</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right - values */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {values.map((val, i) => (
              <div
                key={val.number}
                style={{
                  padding: '2rem 0',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  borderBottom: i === values.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateX(0)' : 'translateX(40px)',
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + i * 0.15}s`,
                }}
              >
                <div
                  style={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    fontFamily: 'Geist Mono, monospace',
                    color: 'rgba(255,106,55,0.5)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {val.number}
                </div>
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#f5f0e9',
                    marginBottom: '0.5rem',
                  }}
                >
                  {val.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.825rem',
                    lineHeight: 1.65,
                    color: 'rgba(245,240,233,0.4)',
                  }}
                >
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
