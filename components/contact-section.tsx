'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

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
        const camera = new THREE.PerspectiveCamera(70, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
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

        // Ring geometries
        const rings: import('three').Mesh[] = [];
        for (let i = 0; i < 4; i++) {
          const geo = new THREE.TorusGeometry(1.5 + i * 0.8, 0.005, 8, 120);
          const mat = new THREE.MeshBasicMaterial({
            color: 0xff6a37,
            transparent: true,
            opacity: 0.08 - i * 0.015,
          });
          const ring = new THREE.Mesh(geo, mat);
          ring.rotation.x = Math.PI / 2 + i * 0.3;
          ring.rotation.z = i * 0.5;
          scene.add(ring);
          rings.push(ring);
        }

        let lastTime = 0;
        const animate = (time: number) => {
          animId = requestAnimationFrame(animate);
          if (!isVisible) return;
          if (time - lastTime < 33) return; // 30fps
          lastTime = time;
          rings.forEach((ring, i) => {
            ring.rotation.z += 0.006 + i * 0.0015;
            ring.rotation.y += 0.003;
          });
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

export function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        alert(`Error: ${data.error || 'Failed to submit form.'}`);
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to send message. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const services = [
    'Web Development',
    'ERP Solutions',
    'Mobile App',
    'Marketing Automation',
    'Digital Strategy',
    'Other',
  ];

  return (
    <section
      id="contact"
      style={{ position: 'relative', padding: '8rem 0', background: '#0c0c0c', overflow: 'hidden' }}
    >
      <ThreeBackground />

      <div
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}
        ref={ref}
      >
        {/* Header */}
        <div style={{ marginBottom: '5rem', maxWidth: 600 }}>
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
            Get In Touch
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#f5f0e9',
              marginBottom: '1.5rem',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            START YOUR
            <br />
            PROJECT
          </h2>
          <p
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.7,
              color: 'rgba(245,240,233,0.45)',
              opacity: inView ? 1 : 0,
              transition: 'opacity 0.6s ease 0.2s',
            }}
          >
            Ready to build something exceptional? Tell us about your project and
            we'll craft a solution that exceeds expectations.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 360px',
            gap: '6rem',
            alignItems: 'start',
          }}
        >
          {/* Form */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            {submitted ? (
              <div
                style={{
                  padding: '4rem 3rem',
                  border: '1px solid rgba(255,106,55,0.2)',
                  borderRadius: 4,
                  textAlign: 'center',
                  background: 'rgba(255,106,55,0.04)',
                  animation: 'revealUp 0.6s ease forwards',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>✓</div>
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#f5f0e9',
                    letterSpacing: '-0.03em',
                    marginBottom: '0.75rem',
                  }}
                >
                  Message Sent!
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(245,240,233,0.5)', lineHeight: 1.65 }}>
                  Thank you for reaching out. We'll review your project and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label
                      style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,233,0.4)', marginBottom: '0.5rem' }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Smith"
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label
                      style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,233,0.4)', marginBottom: '0.5rem' }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,233,0.4)', marginBottom: '0.5rem' }}
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Company"
                    className="form-input"
                    value={formData.company}
                    onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label
                      style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,233,0.4)', marginBottom: '0.5rem' }}
                    >
                      Service Required *
                    </label>
                    <select
                      required
                      className="form-input"
                      value={formData.service}
                      onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))}
                      style={{ cursor: 'none', appearance: 'none' }}
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s} style={{ background: '#111' }}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,233,0.4)', marginBottom: '0.5rem' }}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 99999 99999"
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,233,0.4)', marginBottom: '0.5rem' }}
                  >
                    Project Brief *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your project, goals, and timeline..."
                    className="form-input"
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    style={{ resize: 'vertical', minHeight: 120 }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    borderRadius: 4,
                    marginTop: '0.5rem',
                    opacity: loading ? 0.7 : 1,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span>{loading ? 'SENDING...' : 'SEND MESSAGE'}</span>
                  {!loading && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact info sidebar */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
            }}
            className="hidden md:block"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                {
                  label: 'Email Us',
                  value: 'developers@sitarahub.com',
                  href: 'mailto:developers@sitarahub.com',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                },
                {
                  label: 'WhatsApp',
                  value: '+91 91194 36661',
                  href: 'https://wa.me/919119436661',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01-0 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  ),
                },
                {
                  label: 'Location',
                  value: 'Mumbai, India',
                  href: null,
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      border: '1px solid rgba(255,106,55,0.2)',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ff6a37',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,233,0.3)', marginBottom: '0.25rem' }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: '0.875rem', color: '#f5f0e9', textDecoration: 'none' }}>
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ fontSize: '0.875rem', color: '#f5f0e9' }}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}

              {/* Response time promise */}
              <div
                style={{
                  marginTop: '1rem',
                  padding: '1.5rem',
                  background: 'rgba(255,106,55,0.05)',
                  border: '1px solid rgba(255,106,55,0.12)',
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#ff6a37',
                    marginBottom: '0.5rem',
                  }}
                >
                  Our Promise
                </div>
                <p style={{ fontSize: '0.8rem', lineHeight: 1.6, color: 'rgba(245,240,233,0.5)' }}>
                  We respond to every inquiry within{' '}
                  <span style={{ color: '#f5f0e9', fontWeight: 600 }}>24 hours</span>{' '}
                  and provide a detailed project proposal within 3 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
