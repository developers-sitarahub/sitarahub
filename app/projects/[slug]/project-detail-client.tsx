import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { getNextProject, projectImage, projectMobileImage, type Project } from '@/lib/projects-data';

export function ProjectDetailClient({ project }: { project: Project }) {
  const next = getNextProject(project.slug);
  const domain = project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  return (
    <>
      <Navigation />
      <main>
        {/* Header */}
        <section style={{ paddingTop: 'clamp(3rem, 7vw, 5.5rem)', paddingBottom: '3rem' }}>
          <div className="wrap">
            <Link href="/#projects" className="link-arrow small" style={{ color: 'var(--ink-3)' }}>
              <span aria-hidden="true">←</span> All work
            </Link>

            <p className="label" style={{ margin: '2.5rem 0 1.25rem' }}>
              Case study {project.number}
            </p>
            <h1 className="display">{project.name}</h1>
            <p className="lede" style={{ marginTop: '1.5rem' }}>
              {project.description}
            </p>

            <dl className="facts" style={{ marginTop: '3rem' }}>
              <div>
                <dt className="label">Type</dt>
                <dd>{project.category}</dd>
              </div>
              <div>
                <dt className="label">Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt className="label">Headline result</dt>
                <dd>
                  {project.stat} {project.statLabel.toLowerCase()}
                </dd>
              </div>
              <div>
                <dt className="label">Live site</dt>
                <dd>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="link">
                    {domain} ↗
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Screens */}
        <section style={{ paddingBottom: '2rem' }}>
          <div className="wrap">
            <div className="screens">
              <figure className="screen-desktop">
                <div className="work-shot" style={{ aspectRatio: '16 / 10' }}>
                  <Image
                    src={projectImage(project)}
                    alt={`${project.name} website on desktop`}
                    fill
                    priority
                    sizes="(max-width: 760px) 100vw, 900px"
                  />
                </div>
              </figure>
              <figure className="screen-mobile">
                <div className="work-shot" style={{ aspectRatio: '390 / 844', borderRadius: 14 }}>
                  <Image
                    src={projectMobileImage(project)}
                    alt={`${project.name} website on mobile`}
                    fill
                    sizes="(max-width: 760px) 50vw, 260px"
                  />
                </div>
              </figure>
            </div>
            <p className="small" style={{ marginTop: '0.9rem' }}>
              {domain}, on desktop and mobile.
            </p>
          </div>
        </section>

        {/* Write-up */}
        <section className="section" style={{ paddingTop: '4rem' }}>
          <div className="wrap">
            <div className="prose-cols">
              <h2 className="label">The brief</h2>
              <p>{project.challenge}</p>
            </div>
            <div className="prose-cols">
              <h2 className="label">What we built</h2>
              <p>{project.solution}</p>
            </div>
            <div className="prose-cols">
              <h2 className="label">Results</h2>
              <ol className="results">
                {project.impact.map((item, i) => (
                  <li key={item}>
                    <span className="num" style={{ paddingTop: '0.3rem' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="prose-cols" style={{ borderBottom: '1px solid var(--line)' }}>
              <h2 className="label">Stack</h2>
              <div className="stack">
                {project.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Next */}
        <section style={{ paddingBottom: '7rem' }}>
          <div className="wrap">
            <Link href={`/projects/${next.slug}`} className="work-item next-project">
              <div>
                <p className="label" style={{ marginBottom: '1rem' }}>
                  Next project
                </p>
                <p className="h2 work-title" style={{ display: 'inline-flex' }}>
                  {next.name}
                  <span className="arrow" aria-hidden="true" style={{ fontSize: '1.5rem' }}>
                    →
                  </span>
                </p>
                <p className="small" style={{ marginTop: '0.5rem' }}>
                  {next.category}
                </p>
              </div>
              <div className="work-shot">
                <Image src={projectImage(next)} alt="" fill sizes="(max-width: 760px) 100vw, 480px" />
              </div>
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .screens {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 240px;
          gap: 1.5rem;
          align-items: end;
        }
        .screens figure { margin: 0; }
        .next-project {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 420px);
          gap: 2rem;
          align-items: center;
        }
        @media (max-width: 760px) {
          .screens { grid-template-columns: 1fr; }
          .screen-mobile { max-width: 220px; }
          .next-project { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
