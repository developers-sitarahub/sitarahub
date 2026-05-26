'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CustomCursor } from '@/components/custom-cursor';

const ThreeVisualizer = dynamic(() => import('@/components/three-visualizers').then((m) => m.ThreeVisualizer), { ssr: false });
import { getNextProject, Project } from '@/lib/projects-data';

interface ProjectDetailClientProps {
  project: Project;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const nextProject = getNextProject(project.slug);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: custom * 0.1 },
    }),
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const projectThemeStyles = {
    '--accent': project.color,
    '--ring': project.color,
    '--accent-dark': `${project.color}cc`,
    '--accent-ring': `${project.color}80`,
    '--accent-selection': `${project.color}4d`,
  } as React.CSSProperties;

  return (
    <div style={projectThemeStyles}>
      <div className="noise-overlay" aria-hidden="true" />
      <CustomCursor />
      <Navigation />

      <main style={{ background: '#0a0a0a', overflow: 'hidden' }}>
        {/* ─── Hero Section with Three.js ─── */}
        <section
          style={{
            position: 'relative',
            height: '75vh',
            minHeight: '550px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 2rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Interactive Three.js Visualizer Background */}
          <ThreeVisualizer type={project.visualizer} color={project.color} />

          {/* Dark gradient mask overlay on the Three.js scene */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.85) 100%)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          {/* Hero Content Card */}
          <div
            style={{
              maxWidth: '1200px',
              width: '100%',
              margin: '0 auto',
              position: 'relative',
              zIndex: 10,
              textAlign: 'left',
            }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              style={{ maxWidth: '750px' }}
            >
              {/* Back to work link */}
              <motion.div custom={0} variants={fadeInUp}>
                <Link
                  href="/#projects"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.62rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,233,0.4)',
                    textDecoration: 'none',
                    marginBottom: '2rem',
                    cursor: 'none',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = project.color; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,240,233,0.4)'; }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  <span>Back to Selected Work</span>
                </Link>
              </motion.div>

              {/* Project Year and Number */}
              <motion.div
                custom={1}
                variants={fadeInUp}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem',
                  fontSize: '0.65rem',
                  fontFamily: 'monospace',
                  letterSpacing: '0.15em',
                  color: project.color,
                }}
              >
                <span>PROJECT {project.number}</span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                <span style={{ color: 'rgba(245,240,233,0.4)' }}>RELEASED IN {project.year}</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                custom={2}
                variants={fadeInUp}
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.0,
                  color: '#f5f0e9',
                  marginBottom: '1.25rem',
                }}
              >
                {project.name.toUpperCase()}
              </motion.h1>

              {/* Category Subtitle */}
              <motion.div
                custom={3}
                variants={fadeInUp}
                style={{
                  fontSize: 'clamp(0.8rem, 2vw, 1.1rem)',
                  letterSpacing: '0.05em',
                  color: 'rgba(245,240,233,0.65)',
                  marginBottom: '2.5rem',
                  borderLeft: `2px solid ${project.color}`,
                  paddingLeft: '1.25rem',
                }}
              >
                {project.category}
              </motion.div>

              {/* Hero Stats Dashboard */}
              <motion.div
                custom={4}
                variants={fadeInUp}
                style={{
                  display: 'flex',
                  gap: '3rem',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(12px)',
                  padding: '1.5rem 2rem',
                  borderRadius: 6,
                  width: 'fit-content',
                }}
              >
                <div>
                  <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 900, color: project.color, lineHeight: 1, fontFamily: 'monospace' }}>
                    {project.stat}
                  </div>
                  <div style={{ fontSize: '0.52rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,240,233,0.3)', marginTop: '0.35rem' }}>
                    {project.statLabel}
                  </div>
                </div>
                <div style={{ width: 1, height: '40px', background: 'rgba(255,255,255,0.08)' }} />
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    padding: '0.65rem 1.5rem',
                    borderRadius: 4,
                    fontSize: '0.65rem',
                    cursor: 'none',
                  }}
                >
                  <span>VIEW LIVE WEBSITE</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── Case Study Narrative Section ─── */}
        <section style={{ padding: '6rem 2rem', background: '#0a0a0a', position: 'relative' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '7fr 4fr',
                gap: '5rem',
              }}
              className="casestudy-grid"
            >
              {/* Left Column: Challenge & Solution */}
              <div>
                {/* Challenge */}
                <div style={{ marginBottom: '4.5rem' }}>
                  <div
                    style={{
                      fontSize: '0.6rem',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: project.color,
                      marginBottom: '1rem',
                    }}
                  >
                    01 · The Challenge
                  </div>
                  <h2
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      color: '#f5f0e9',
                      marginBottom: '1.5rem',
                    }}
                  >
                    IDENTIFYING THE PROBLEM
                  </h2>
                  <p
                    style={{
                      fontSize: '0.925rem',
                      lineHeight: 1.85,
                      color: 'rgba(245,240,233,0.48)',
                    }}
                  >
                    {project.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <div
                    style={{
                      fontSize: '0.6rem',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: project.color,
                      marginBottom: '1rem',
                    }}
                  >
                    02 · Our Solution
                  </div>
                  <h2
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      color: '#f5f0e9',
                      marginBottom: '1.5rem',
                    }}
                  >
                    ENGINEERING & CRAFT
                  </h2>
                  <p
                    style={{
                      fontSize: '0.925rem',
                      lineHeight: 1.85,
                      color: 'rgba(245,240,233,0.48)',
                    }}
                  >
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Right Column: Impact & Tech Stack */}
              <div>
                {/* Impact */}
                <div style={{ marginBottom: '4.5rem' }}>
                  <div
                    style={{
                      fontSize: '0.6rem',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: project.color,
                      marginBottom: '1.5rem',
                    }}
                  >
                    03 · Operational Impact
                  </div>
                  <h3 style={{ display: 'none' }}>Key Results</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {project.impact.map((metric, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        style={{
                          background: 'rgba(255,255,255,0.01)',
                          border: '1px solid rgba(255,255,255,0.04)',
                          borderRadius: 4,
                          padding: '1.25rem',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '1rem',
                        }}
                      >
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: project.color,
                            boxShadow: `0 0 10px ${project.color}`,
                            marginTop: '0.45rem',
                            flexShrink: 0,
                          }}
                        />
                        <div style={{ fontSize: '0.825rem', lineHeight: 1.6, color: 'rgba(245,240,233,0.6)' }}>
                          {metric}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <div
                    style={{
                      fontSize: '0.6rem',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: project.color,
                      marginBottom: '1.5rem',
                    }}
                  >
                    04 · Technology Stack
                  </div>
                  <h3 style={{ display: 'none' }}>Tech Stack Details</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {project.tech.map((tag, i) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        style={{
                          fontSize: '0.6rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: '#f5f0e9',
                          background: `${project.color}15`,
                          border: `1px solid ${project.color}35`,
                          borderRadius: 2,
                          padding: '0.35rem 0.75rem',
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Next Project Router Link ─── */}
        <section
          style={{
            background: '#080808',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '7rem 2rem',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <Link
              href={`/projects/${nextProject.slug}`}
              style={{
                textDecoration: 'none',
                display: 'block',
                cursor: 'none',
              }}
              role="button"
              className="next-project-link-card"
            >
              <div
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: '1rem',
                }}
              >
                Up Next
              </div>
              <h2
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  color: '#f5f0e9',
                  marginBottom: '0.5rem',
                  lineHeight: 1.1,
                  transition: 'color 0.3s ease',
                }}
                className="next-project-title"
              >
                {nextProject.name}
              </h2>
              <div
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,233,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>{nextProject.category}</span>
                <span>·</span>
                <span style={{ color: nextProject.color, fontWeight: 700 }}>EXPLORE →</span>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .next-project-link-card:hover .next-project-title {
          color: ${nextProject.color} !important;
        }
        @media (max-width: 850px) {
          .casestudy-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
        }
      `}</style>
    </div>
  );
}
