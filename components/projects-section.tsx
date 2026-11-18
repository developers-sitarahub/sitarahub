import Image from 'next/image';
import Link from 'next/link';
import { projects, projectImage } from '@/lib/projects-data';

export function ProjectsSection({ heading = true }: { heading?: boolean }) {
  return (
    <section id="projects" className="section" style={{ paddingTop: heading ? undefined : '3rem' }}>
      <div className="wrap">
        {heading && (
          <div className="section-head">
            <p className="label">Selected work</p>
            <div>
              <h2 className="h2" style={{ maxWidth: '16em' }}>
                Products we’ve planned, built and shipped since 2025.
              </h2>
            </div>
          </div>
        )}

        <div className="work-grid">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`work-item${i === 0 ? ' is-wide' : ''}`}
            >
              <div className="work-shot">
                <Image
                  src={projectImage(project)}
                  alt={`Screenshot of the ${project.name} website`}
                  fill
                  sizes={i === 0 ? '(max-width: 760px) 100vw, 1160px' : '(max-width: 760px) 100vw, 580px'}
                  priority={i < 2}
                />
              </div>

              <div className="work-meta">
                <h3 className="work-title">
                  {project.name}
                  <span className="arrow" aria-hidden="true">→</span>
                </h3>
                <span className="num">{project.year}</span>
                <p className="small" style={{ gridColumn: '1 / -1', marginTop: '0.1rem' }}>
                  {project.category}
                </p>
                {i === 0 && <p className="work-desc">{project.description}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
