'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import { projects } from '@/lib/projects-data';

// ── Project Card ──────────────────────────────────────────────────────────────

function ProjectCard({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [previewMounted, setPreviewMounted] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeErrored, setIframeErrored] = useState(false);
  const router = useRouter();

  // Auto-mount preview as soon as card scrolls into view (staggered by index)
  useEffect(() => {
    if (!inView || previewMounted) return;
    const timer = setTimeout(() => setPreviewMounted(true), index * 200);
    return () => clearTimeout(timer);
  }, [inView, index, previewMounted]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('.external-live-link')) {
          return;
        }
        router.push(`/projects/${project.slug}`);
      }}
      style={{
        position: 'relative',
        background: '#0a0a0a',
        border: `1px solid ${hovered ? project.color + '40' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 6,
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 60px ${project.color}18` : '0 0 0 transparent',
        opacity: inView ? 1 : 0,
        willChange: 'transform, box-shadow',
        cursor: 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        textAlign: 'left',
      }}
    >
      {/* Accent top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(to right, ${project.color}, ${project.color}88)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Live site preview — top portion of card */}
      <div
        style={{
          position: 'relative',
          height: 180,
          overflow: 'hidden',
          background: '#0d0d0d',
          borderBottom: `1px solid ${hovered ? project.color + '20' : 'rgba(255,255,255,0.04)'}`,
          transition: 'border-color 0.3s ease',
        }}
      >
        {/* CASE 1: Static preview image (for embedBlocked sites like Shopify) */}
        {project.embedBlocked && project.previewImage ? (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <img
              src={project.previewImage}
              alt={`${project.name} website preview`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                display: 'block',
                filter: hovered ? 'brightness(1)' : 'brightness(0.85)',
                transition: 'filter 0.35s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                transform: hovered ? 'scale(1.04)' : 'scale(1)',
              }}
            />
            {/* Subtle overlay so it blends with the dark card */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: hovered
                  ? 'linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.7) 100%)'
                  : 'linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.6) 100%)',
                transition: 'background 0.35s ease',
              }}
            />
          </div>
        ) : (
          <>
            {/* Loading placeholder — shown while iframe is loading */}
            {(!previewMounted || (!iframeLoaded && !iframeErrored)) && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  background: `linear-gradient(160deg, ${project.color}10 0%, #0a0a0a 80%)`,
                }}
              >
                {/* Spinner (only once previewMounted — i.e. iframe is trying to load) */}
                {previewMounted && (
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      border: `1.5px solid ${project.color}33`,
                      borderTopColor: project.color,
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }}
                  />
                )}
              </div>
            )}

            {/* Stat badge — always visible for static previews or once iframe loads */}
            {((project.embedBlocked && project.previewImage) || (iframeLoaded && !iframeErrored)) && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '0.75rem',
                  left: '0.75rem',
                  zIndex: 2,
                  background: 'rgba(10,10,10,0.75)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 4,
                  padding: '0.3rem 0.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  border: `1px solid ${project.color}30`,
                }}
              >
                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: project.color, lineHeight: 1, fontFamily: 'monospace' }}>
                  {project.stat}
                </span>
                <span style={{ fontSize: '0.45rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,233,0.4)' }}>
                  {project.statLabel}
                </span>
              </div>
            )}

            {/* Fallback browser mockup if iframe errors */}
            {iframeErrored && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(160deg, ${project.color}08 0%, #0d0d0d 70%)`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                }}
              >
                <div style={{ width: '100%', maxWidth: 220 }}>
                  <div style={{ background: '#1a1a1a', borderRadius: '5px 5px 0 0', padding: '0.35rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                      <div key={c} style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />
                    ))}
                    <div style={{ flex: 1, background: '#111', borderRadius: 2, padding: '0.15rem 0.4rem', fontSize: '0.5rem', color: 'rgba(245,240,233,0.25)', marginLeft: '0.3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {project.url.replace('https://', '')}
                    </div>
                  </div>
                  <div style={{ background: '#111', borderRadius: '0 0 5px 5px', padding: '1.25rem 0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 900, color: project.color, lineHeight: 1 }}>{project.stat}</div>
                    <div style={{ fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(245,240,233,0.3)', textTransform: 'uppercase' }}>{project.statLabel}</div>
                    {[75, 55, 85].map((w, i) => (
                      <div key={i} style={{ width: `${w}%`, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.05)' }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Live iframe — desktop viewport (1280px wide) scaled to fit card */}
            {previewMounted && !iframeErrored && (
              <iframe
                src={project.url}
                title={`${project.name} preview`}
                onLoad={() => setIframeLoaded(true)}
                onError={() => setIframeErrored(true)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '1280px',
                  height: '800px',
                  transform: 'scale(0.285)',
                  transformOrigin: 'top left',
                  border: 'none',
                  opacity: iframeLoaded ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                  pointerEvents: 'none',
                }}
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
              />
            )}
          </>
        )}

        {/* Gradient fade bottom — shown for image previews too */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            background: 'linear-gradient(to bottom, transparent, #0a0a0a)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Card body */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Number + year row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
          <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', letterSpacing: '0.12em', color: hovered ? project.color : 'rgba(245,240,233,0.2)', transition: 'color 0.25s ease' }}>
            {project.number}
          </span>
          <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: 'rgba(245,240,233,0.18)', letterSpacing: '0.08em' }}>
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#f5f0e9', marginBottom: '0.3rem', lineHeight: 1.25 }}>
          {project.name}
        </h3>

        {/* Category */}
        <div style={{ fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: project.color, marginBottom: '0.875rem', opacity: 0.85 }}>
          {project.category}
        </div>

        {/* Description */}
        <p style={{ fontSize: '0.775rem', lineHeight: 1.65, color: 'rgba(245,240,233,0.4)', marginBottom: '1.25rem' }}>
          {project.description.slice(0, 120)}…
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.52rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,233,0.35)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 2,
                padding: '0.1rem 0.38rem',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: hovered ? project.color : 'rgba(245,240,233,0.3)',
              transition: 'color 0.25s ease',
            }}
          >
            <span>Read Case Study</span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.25s ease' }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="external-live-link"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.55rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,233,0.25)',
              textDecoration: 'none',
              transition: 'color 0.25s ease',
              cursor: 'none',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = project.color; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,240,233,0.25)'; }}
          >
            <span>Live Site</span>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function ProjectsSection() {
  const { ref, inView } = useInView({ threshold: 0.04, triggerOnce: true });

  return (
    <section
      id="projects"
      style={{ position: 'relative', padding: '8rem 0', background: '#080808', overflow: 'hidden' }}
    >
      {/* Pure CSS grid background — zero JS overhead */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,106,55,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,106,55,0.022) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }} ref={ref}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#ff6a37',
                marginBottom: '1rem',
                opacity: inView ? 1 : 0,
                transition: 'opacity 0.6s ease',
              }}
            >
              Selected Work · 2024–2025
            </div>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: '#f5f0e9',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
                margin: 0,
                willChange: 'opacity, transform',
              }}
            >
              OUR
              <br />
              PROJECTS
            </h2>
          </div>
          <a
            href="/about"
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,233,0.3)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(245,240,233,0.1)',
              paddingBottom: '0.2rem',
              transition: 'color 0.25s ease, border-color 0.25s ease',
              cursor: 'none',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#ff6a37'; (e.currentTarget as HTMLElement).style.borderBottomColor = '#ff6a37'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,240,233,0.3)'; (e.currentTarget as HTMLElement).style.borderBottomColor = 'rgba(245,240,233,0.1)'; }}
          >
            View All →
          </a>
        </div>

        {/* Card grid — 3 columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
          }}
          className="projects-card-grid"
        >
          {projects.map((project, i) => (
            <div
              key={project.number}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
                willChange: 'opacity, transform',
              }}
            >
              <ProjectCard project={project} index={i} inView={inView} />
            </div>
          ))}
        </div>

        {/* Hover hint */}
        <div
          style={{
            marginTop: '2.5rem',
            fontSize: '0.55rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,233,0.15)',
            textAlign: 'center',
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.8s ease 0.9s',
          }}
        >
          hover any card to preview the live site
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .projects-card-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .projects-card-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
