import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ProjectsSection } from '@/components/projects-section';
import { principles } from '@/components/about-section';

const facts = [
  { label: 'Company', value: 'Sitarahub Private Limited' },
  { label: 'Founded', value: '18 June 2025' },
  { label: 'Registered', value: 'RoC Mumbai, Maharashtra' },
  { label: 'CIN', value: 'U46901MH2025PTC450939' },
];

export function AboutPageClient() {
  return (
    <>
      <Navigation />
      <main>
        <section style={{ paddingTop: 'clamp(4.5rem, 10vw, 8rem)', paddingBottom: '4rem' }}>
          <div className="wrap">
            <p className="label" style={{ marginBottom: '2rem' }}>
              About
            </p>
            <h1 className="display" style={{ maxWidth: '12em' }}>
              A software studio in Mumbai, <em>founded in 2025.</em>
            </h1>
            <p className="lede" style={{ marginTop: '2rem' }}>
              Sitarahub designs and builds web platforms, ERP systems, marketplaces and automation tools for companies
              in India and abroad. We also run two products of our own, GPSERP and Mail by GPSERP, which keeps us honest
              about what it takes to run software every day.
            </p>

            <dl className="facts" style={{ marginTop: '4rem' }}>
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="label">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '3rem' }}>
          <div className="wrap">
            <div className="prose-cols" style={{ borderTop: 0, paddingTop: 0 }}>
              <p className="label">Why we exist</p>
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                <p>
                  A lot of businesses run on software that was rushed out, handed over and then left alone. It works
                  until it doesn&apos;t, and nobody who built it is around to fix it.
                </p>
                <p>
                  We want to be the opposite of that: a team that plans carefully, builds things that are easy to
                  change, and stays on after launch. Good software should make a business faster and calmer, not more
                  fragile.
                </p>
              </div>
            </div>

            <div className="prose-cols">
              <p className="label">How we work</p>
              <div className="principles" style={{ gridTemplateColumns: '1fr', gap: '2.5rem' }}>
                {principles.map((p, i) => (
                  <div key={p.title} style={{ display: 'grid', gridTemplateColumns: '2.5rem minmax(0, 1fr)', gap: '0.5rem' }}>
                    <span className="num" style={{ paddingTop: '0.55rem' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h2 className="h3" style={{ fontSize: '1.6rem', marginBottom: '0.6rem' }}>
                        {p.title}
                      </h2>
                      <p className="body" style={{ maxWidth: '38em' }}>
                        {p.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="wrap">
          <hr className="rule" />
        </div>
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}
