import Link from 'next/link';

export const principles = [
  {
    title: 'You talk to the people building it.',
    body: 'No account managers in between. The designers and engineers on your project join your calls and your WhatsApp group, so questions get answered by someone who knows the code.',
  },
  {
    title: 'Clear scope before we start.',
    body: 'Before any code is written we agree in writing on what we’re building, what it costs and when it ships. If something needs to change, we decide it together.',
  },
  {
    title: 'Launch is not the finish line.',
    body: 'We keep monitoring, fixing and improving what we built for as long as you need us. Most of what we learn after launch goes straight back into the product.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <div className="section-head">
          <p className="label">How we work</p>
          <div>
            <h2 className="h2" style={{ maxWidth: '15em' }}>
              We take on fewer projects and look after each one properly.
            </h2>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              Sitarahub Private Limited was founded in Mumbai in June 2025. We take on a handful of projects at a
              time and work on them closely, from planning through to support.{' '}
              <Link href="/about" className="link">
                More about us
              </Link>
            </p>
          </div>
        </div>

        <div className="principles">
          {principles.map((p, i) => (
            <div key={p.title} className="principle">
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h3" style={{ fontSize: '1.55rem', margin: '0.9rem 0 0.75rem' }}>
                {p.title}
              </h3>
              <p className="body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
