import Link from 'next/link';
import { projects } from '@/lib/projects-data';

const latest = projects[projects.length - 1];

export function HeroSection() {
  return (
    <section id="home" style={{ paddingTop: 'clamp(4.5rem, 10vw, 8.5rem)', paddingBottom: '4.5rem' }}>
      <div className="wrap">
        <p className="label" style={{ marginBottom: '2rem' }}>
          Sitarahub — software studio, Mumbai
        </p>

        <h1 className="display" style={{ maxWidth: '13em' }}>
          We design and build the software <em>businesses run on.</em>
        </h1>

        <p className="lede" style={{ marginTop: '2rem' }}>
          Web platforms, ERP and CRM systems, marketplaces and marketing automation. Planned, designed and
          engineered in Mumbai for companies in India and abroad.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem 2rem', marginTop: '2.5rem' }}>
          <a href="#projects" className="btn">
            See our work <span className="arrow" aria-hidden="true">→</span>
          </a>
          <a href="mailto:developers@sitarahub.com" className="link">
            developers@sitarahub.com
          </a>
        </div>

        <dl
          className="hero-facts"
          style={{
            marginTop: 'clamp(4rem, 8vw, 6.5rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '1.5rem',
            borderTop: '1px solid var(--line)',
            paddingTop: '1.25rem',
          }}
        >
          <div>
            <dt className="label">Founded</dt>
            <dd style={{ margin: '0.3rem 0 0' }}>June 2025</dd>
          </div>
          <div>
            <dt className="label">Based in</dt>
            <dd style={{ margin: '0.3rem 0 0' }}>Mumbai, India</dd>
          </div>
          <div>
            <dt className="label">We reply</dt>
            <dd style={{ margin: '0.3rem 0 0' }}>Within 24 hours</dd>
          </div>
          <div>
            <dt className="label">Latest launch</dt>
            <dd style={{ margin: '0.3rem 0 0' }}>
              <Link href={`/projects/${latest.slug}`} className="link">
                {latest.name}, {latest.year}
              </Link>
            </dd>
          </div>
        </dl>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .hero-facts { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; row-gap: 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}
