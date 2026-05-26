'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const services = [
  {
    number: '01',
    title: 'Web Development',
    description:
      'Full-stack web applications from high-converting landing pages to complex multi-tenant SaaS platforms. We work in Next.js, React, Node.js, and TypeScript — with pixel-perfect UI and production-grade infrastructure.',
    deliverables: ['Landing Pages', 'SaaS Platforms', 'Admin Dashboards', 'API Integrations'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'ERP & CRM Systems',
    description:
      'Custom enterprise platforms that unify your operations — WhatsApp automation, inventory, HR, billing, and reporting in one system. Built on the GPSERP framework we use for our own flagship product.',
    deliverables: ['WhatsApp ERP', 'Inventory Systems', 'HR Portals', 'Billing & Reports'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Event & Trade Platforms',
    description:
      'Scalable platforms for exhibitions, summits, and B2B trade events — handling 50,000+ concurrent users. Registration, exhibitor management, buyer-seller matching, and live analytics built for high-traffic events.',
    deliverables: ['Event Registration', 'Exhibitor Portals', 'B2B Matchmaking', 'Live Analytics'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Marketing Automation',
    description:
      'WhatsApp and email outreach tools with AI-powered personalization. From campaign builders to intelligent send scheduling and reply-rate optimization — using our in-house GPSERP and Mail platforms as the backbone.',
    deliverables: ['WhatsApp Campaigns', 'Cold Email Outreach', 'AI Personalization', 'Analytics Dashboards'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
  },
  {
    number: '05',
    title: 'eCommerce & Marketplaces',
    description:
      'Premium online stores built for international markets — Shopify and custom-built solutions with USD/INR pricing, logistics integration, and conversion-optimised UI. Serving Indian ethnic fashion brands selling in the USA.',
    deliverables: ['Shopify Stores', 'Custom Carts', 'Payment Gateways', 'Logistics APIs'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Support & Maintenance',
    description:
      '24/7 monitoring, rapid issue resolution, performance audits, and security updates for all deployed projects. We do not hand off and disappear — every client gets a dedicated Slack or WhatsApp channel for instant support.',
    deliverables: ['24/7 Uptime Monitoring', 'Security Patches', 'Performance Audits', 'Priority Support'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
];

const stats = [
  { label: 'Products Shipped', value: 6, suffix: '' },
  { label: 'Countries Served', value: 3, suffix: '' },
  { label: 'Years Active', value: 1, suffix: '' },
  { label: 'Uptime SLA', value: 99, suffix: '%' },
];

function CountUp({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) { setDisplay(0); return; }
    let v = 0;
    const step = Math.ceil(value / 60);
    const id = setInterval(() => {
      v = Math.min(v + step, value);
      setDisplay(v);
      if (v >= value) clearInterval(id);
    }, 25);
    return () => clearInterval(id);
  }, [active, value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animId: number;
    let renderer: import('three').WebGLRenderer;
    let observer: IntersectionObserver;

    const init = async () => {
      try {
        const THREE = await import('three');
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
        camera.position.set(0, 0, 8);

        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(1);

        let isVisible = true;
        observer = new IntersectionObserver(([entry]) => {
          isVisible = entry.isIntersecting;
        }, { threshold: 0 });
        observer.observe(canvas);

        // Torus knot wireframe
        const geo = new THREE.TorusKnotGeometry(2, 0.5, 128, 32);
        const mat = new THREE.MeshBasicMaterial({
          color: 0xff6a37,
          wireframe: true,
          transparent: true,
          opacity: 0.06,
        });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        let lastTime = 0;
        const animate = (time: number) => {
          animId = requestAnimationFrame(animate);
          if (!isVisible) return;
          if (time - lastTime < 33) return; // 30fps
          lastTime = time;
          mesh.rotation.x += 0.01;
          mesh.rotation.y += 0.015;
          renderer.render(scene, camera);
        };
        animate(0);

        const onResize = () => {
          if (!canvas) return;
          camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
      } catch (err) {
        console.warn('Failed to initialize WebGL context:', err);
      }
    };

    const cleanup = init();
    return () => {
      cancelAnimationFrame(animId);
      observer?.disconnect();
      cleanup.then((fn) => fn && fn());
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

export function ServicesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section
      id="services"
      style={{ position: 'relative', padding: '8rem 0', background: '#0c0c0c', overflow: 'hidden' }}
    >
      <ThreeBackground />

      <div
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}
        ref={ref}
      >
        {/* Header */}
        <div style={{ marginBottom: '5rem' }}>
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
            What We Do
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#f5f0e9',
              maxWidth: 600,
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            OUR
            <br />
            SERVICES
          </h2>
        </div>

        {/* Services grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} inView={inView} />
          ))}
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          style={{
            marginTop: '6rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2px',
            background: 'rgba(255,255,255,0.04)',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: '3rem 2rem',
                background: '#0a0a0a',
                textAlign: 'center',
                opacity: statsInView ? 1 : 0,
                transform: statsInView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.05em',
                  background: 'linear-gradient(135deg, #ff6a37, #ff9e70)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                }}
              >
                <CountUp value={stat.value} suffix={stat.suffix} active={statsInView} />
              </div>
              <div
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,233,0.35)',
                  marginTop: '0.625rem',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  inView,
}: {
  service: (typeof services)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '2.5rem',
        background: hovered ? 'rgba(255, 106, 55, 0.04)' : '#0a0a0a',
        transition: `background 0.35s ease, opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
        cursor: 'none',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Bottom accent border on hover */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(to right, #ff6a37, #ff9e70)',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.35s ease',
        }}
      />

      {/* Number & Icon row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <span
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            fontFamily: 'monospace',
            color: hovered ? '#ff6a37' : 'rgba(245,240,233,0.2)',
            transition: 'color 0.3s ease',
          }}
        >
          {service.number}
        </span>
        <div
          style={{
            color: hovered ? '#ff6a37' : 'rgba(245,240,233,0.3)',
            transition: 'all 0.3s ease',
            transform: hovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          {service.icon}
        </div>
      </div>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#f5f0e9', marginBottom: '0.75rem', lineHeight: 1.25 }}>
        {service.title}
      </h3>

      <p style={{ fontSize: '0.815rem', lineHeight: 1.72, color: 'rgba(245,240,233,0.42)', marginBottom: '1.5rem', flex: 1 }}>
        {service.description}
      </p>

      {/* Deliverables */}
      {service.deliverables && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.5rem' }}>
          {service.deliverables.map((item) => (
            <span
              key={item}
              style={{
                fontSize: '0.52rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: hovered ? '#ff6a37' : 'rgba(245,240,233,0.3)',
                border: `1px solid ${hovered ? 'rgba(255,106,55,0.25)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 2,
                padding: '0.12rem 0.4rem',
                transition: 'color 0.3s ease, border-color 0.3s ease',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: hovered ? '#ff6a37' : 'rgba(245,240,233,0.22)',
          transition: 'color 0.3s ease',
        }}
      >
        Learn More
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{ transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.25s ease' }}
        >
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  );
}
