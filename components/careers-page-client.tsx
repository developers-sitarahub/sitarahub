'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CustomCursor } from '@/components/custom-cursor';

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

        // Torus rings for visual consistency with the main page backgrounds
        const rings: import('three').Mesh[] = [];
        for (let i = 0; i < 3; i++) {
          const geo = new THREE.TorusGeometry(1.6 + i * 0.9, 0.004, 8, 100);
          const mat = new THREE.MeshBasicMaterial({
            color: 0xff6a37,
            transparent: true,
            opacity: 0.07 - i * 0.02,
          });
          const ring = new THREE.Mesh(geo, mat);
          ring.rotation.x = Math.PI / 3 + i * 0.2;
          ring.rotation.z = i * 0.4;
          scene.add(ring);
          rings.push(ring);
        }

        const animate = (time: number) => {
          animId = requestAnimationFrame(animate);
          if (!isVisible) return;
          if (time - lastTime < 33) return; // 30fps
          lastTime = time;
          rings.forEach((ring, i) => {
            ring.rotation.z += 0.004 + i * 0.001;
            ring.rotation.y += 0.002;
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

function AnimatedBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
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

export function CareersPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    message: '',
    resumeBase64: '',
    resumeFilename: '',
    resumeMimeType: '',
  });

  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds the 5MB limit.');
      setFileName('');
      setFormData((prev) => ({
        ...prev,
        resumeBase64: '',
        resumeFilename: '',
        resumeMimeType: '',
      }));
      return;
    }

    // Validate type
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      setFileError('Invalid file type. Please upload a PDF or Word document (.doc, .docx).');
      setFileName('');
      setFormData((prev) => ({
        ...prev,
        resumeBase64: '',
        resumeFilename: '',
        resumeMimeType: '',
      }));
      return;
    }

    setFileError('');
    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        resumeBase64: reader.result as string,
        resumeFilename: file.name,
        resumeMimeType: file.type,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.resumeBase64) {
      setFileError('Please upload your resume.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        alert(`Error: ${data.error || 'Failed to submit application.'}`);
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to send application. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    'Software Engineering',
    'UI/UX Design',
    'Mobile Development',
    'Product Management',
    'Marketing & Strategy',
    'General Application / Other',
  ];

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <CustomCursor />
      <Navigation />

      <main style={{ background: '#0a0a0a', paddingTop: 80 }}>
        {/* Hero Section */}
        <section
          style={{
            position: 'relative',
            padding: '8rem 2rem 5rem',
            overflow: 'hidden',
            minHeight: '40vh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ThreeBackground />
          <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
            <AnimatedBlock>
              <div
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#ff6a37',
                  marginBottom: '1rem',
                }}
              >
                Careers at Sitarahub
              </div>
              <h1
                style={{
                  fontSize: 'clamp(3rem, 8vw, 7.5rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.9,
                  color: '#f5f0e9',
                  marginBottom: '2rem',
                }}
              >
                JOIN THE
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #ff6a37, #ff9e70)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  ENGINE
                </span>
              </h1>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(245,240,233,0.42)', maxWidth: 520, margin: 0 }}>
                We are always looking for ambitious developers, designers, and thinkers who want to build high-performance products and create exceptional digital experiences.
              </p>
            </AnimatedBlock>
          </div>
        </section>

        {/* Culture Section */}
        <section style={{ padding: '4rem 2rem', background: '#080808', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="culture-grid">
              {[
                { title: 'Exciting Challenges', desc: 'Work on cutting-edge ERP systems, next-gen web apps, and automated marketing flows for global clients.' },
                { title: 'Aesthetic Focus', desc: 'We value motion-first, high-fidelity layouts. If you care deeply about premium design, you will thrive here.' },
                { title: 'Remote Autonomy', desc: 'We trust our developers to build, test, and ship. Clean architectures, modern stacks, and extreme ownership.' }
              ].map((c, i) => (
                <AnimatedBlock key={c.title} delay={i * 0.12}>
                  <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 4, height: '100%' }}>
                    <div style={{ color: '#ff6a37', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>{c.title}</div>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(245,240,233,0.45)', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                  </div>
                </AnimatedBlock>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section style={{ padding: '6rem 0 8rem', background: '#0a0a0a', position: 'relative' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem' }}>
            <AnimatedBlock>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ff6a37', marginBottom: '1rem' }}>
                  Apply Now
                </div>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#f5f0e9', margin: 0 }}>
                  SUBMIT APPLICATION
                </h2>
              </div>
            </AnimatedBlock>

            <AnimatedBlock delay={0.15}>
              {submitted ? (
                <div
                  style={{
                    padding: '4rem 3rem',
                    border: '1px solid rgba(255,106,55,0.2)',
                    borderRadius: 4,
                    textAlign: 'center',
                    background: 'rgba(255,106,55,0.04)',
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
                    Application Received!
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(245,240,233,0.5)', lineHeight: 1.65 }}>
                    Thank you for applying to Sitarahub. Our engineering and design teams will review your profile and resume. We will contact you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-grid-2">
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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-grid-2">
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
                    <div>
                      <label
                        style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,233,0.4)', marginBottom: '0.5rem' }}
                      >
                        Expected Department *
                      </label>
                      <select
                        required
                        className="form-input"
                        value={formData.department}
                        onChange={(e) => setFormData((p) => ({ ...p, department: e.target.value }))}
                        style={{ cursor: 'none', appearance: 'none' }}
                      >
                        <option value="">Select a department...</option>
                        {departments.map((d) => (
                          <option key={d} value={d} style={{ background: '#111' }}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Resume Upload Box */}
                  <div>
                    <label
                      style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,233,0.4)', marginBottom: '0.5rem' }}
                    >
                      Resume / CV *
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      style={{ display: 'none' }}
                    />
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        padding: '2rem 1.5rem',
                        border: fileError ? '1px dashed #ef4444' : fileName ? '1px solid rgba(255,106,55,0.4)' : '1px dashed rgba(255,255,255,0.15)',
                        borderRadius: 4,
                        textAlign: 'center',
                        background: fileName ? 'rgba(255,106,55,0.02)' : 'rgba(255,255,255,0.01)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!fileName) e.currentTarget.style.borderColor = '#ff6a37';
                      }}
                      onMouseLeave={(e) => {
                        if (!fileName && !fileError) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={fileName ? '#ff6a37' : 'rgba(245,240,233,0.4)'}
                        strokeWidth="1.5"
                        style={{ marginBottom: '0.75rem' }}
                      >
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>
                      {fileName ? (
                        <div>
                          <div style={{ fontSize: '0.875rem', color: '#f5f0e9', fontWeight: 600 }}>{fileName}</div>
                          <div style={{ fontSize: '0.75rem', color: '#ff6a37', marginTop: '0.25rem' }}>File loaded successfully. Click to replace.</div>
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontSize: '0.875rem', color: '#f5f0e9' }}>
                            Upload PDF or Word Document
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'rgba(245,240,233,0.3)', marginTop: '0.25rem' }}>
                            Max file size: 5MB (Format: .pdf, .doc, .docx)
                          </div>
                        </div>
                      )}
                    </div>
                    {fileError && (
                      <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                        {fileError}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,233,0.4)', marginBottom: '0.5rem' }}
                    >
                      Tell us about yourself *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Why do you want to join Sitarahub? Summarize your skills and background..."
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
                    <span>{loading ? 'SENDING APPLICATION...' : 'SUBMIT APPLICATION'}</span>
                    {!loading && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </AnimatedBlock>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .culture-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .form-grid-2 {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </>
  );
}
