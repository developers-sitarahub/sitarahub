'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { projects, projectImage, type Project } from '@/lib/projects-data';
import { Reveal } from '@/components/reveal';

function StackCard({ project, i, progress }: { project: Project; i: number; progress: MotionValue<number> }) {
  const n = projects.length;
  // Shrink and dim each card as the ones after it slide over the top.
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.04]);
  const dim = useTransform(progress, [i / n, 1], [0, (n - 1 - i) * 0.08]);

  return (
    <div className="stack-slot" style={{ top: `calc(96px + ${i * 22}px)` }}>
      <motion.div style={{ scale }} className="stack-card">
        <div className="stack-link">
          <div className="stack-info">
            <div className="stack-top">
              <span className="num">{project.number}</span>
              <span className="num">{project.year}</span>
            </div>
            <h3 className="stack-title">
              <Link href={`/projects/${project.slug}`}>{project.name}</Link>
            </h3>
            <p className="small">{project.category}</p>
            <p className="body" style={{ marginTop: '1rem' }}>{project.description}</p>
            <div className="stack-foot">
              <div>
                <span className="stack-stat">{project.stat}</span>
                <span className="small">{project.statLabel}</span>
              </div>
              <ul className="service-chips" style={{ padding: 0, margin: 0 }}>
                {project.tags.slice(0, 3).map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
            <div className="stack-actions">
              <Link href={`/projects/${project.slug}`} className="btn">
                Case study <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Visit site <span className="arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="stack-shot"
            aria-label={`Open ${project.name} live site in a new tab`}
          >
            <Image
              src={projectImage(project)}
              alt={`Screenshot of the ${project.name} website`}
              fill
              sizes="(max-width: 860px) 100vw, 640px"
              priority={i < 2}
            />
            <span className="stack-url">{project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗</span>
          </a>
        </div>
        <motion.div className="stack-dim" style={{ opacity: dim }} aria-hidden="true" />
      </motion.div>
    </div>
  );
}

export function ProjectsSection({ heading = true }: { heading?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <section id="projects" className="section" style={{ paddingTop: heading ? undefined : '3rem' }}>
      <div className="wrap">
        {heading && (
          <Reveal className="section-head">
            <p className="label">Selected work</p>
            <div>
              <h2 className="h2" style={{ maxWidth: '16em' }}>
                Products we’ve planned, built and shipped since 2025.
              </h2>
            </div>
          </Reveal>
        )}

        <div ref={ref} className="work-stack">
          {projects.map((project, i) => (
            <StackCard key={project.slug} project={project} i={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
