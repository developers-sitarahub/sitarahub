import Link from 'next/link';
import { Logo } from './logo';
import { projects } from '@/lib/projects-data';

const EMAIL = 'developers@sitarahub.com';

const columns: { heading: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    heading: 'Studio',
    links: [
      { label: 'Work', href: '/#projects' },
      { label: 'Services', href: '/#services' },
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
  {
    heading: 'Projects',
    links: projects.map((p) => ({ label: p.name, href: `/projects/${p.slug}` })),
  },
  {
    heading: 'Elsewhere',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/sitarahub-private-limited/', external: true },
      { label: 'GitHub', href: 'https://github.com/developers-sitarahub', external: true },
      { label: 'WhatsApp', href: 'https://wa.me/919119436661', external: true },
      { label: 'Email', href: `mailto:${EMAIL}` },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap" style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
        <div className="footer-grid">
          <div>
            <Link href="/" aria-label="Sitarahub — home" style={{ display: 'inline-flex' }}>
              <Logo iconSize={34} fontSize="1.2rem" showSubtitle={false} tone="light" />
            </Link>
            <p style={{ marginTop: '1.5rem', maxWidth: '24em', color: '#bdb7aa', lineHeight: 1.65 }}>
              A software studio in Mumbai. We design, build and look after web platforms and business software.
            </p>
            <p style={{ marginTop: '1.25rem' }}>
              <a href={`mailto:${EMAIL}`} style={{ textDecoration: 'underline', textUnderlineOffset: 4, textDecorationColor: '#5c5850' }}>
                {EMAIL}
              </a>
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="footer-heading">{col.heading}</h2>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.6rem' }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          style={{
            marginTop: '4.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #2e2c28',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '0.5rem 2rem',
            fontSize: '0.85rem',
            color: '#8f897d',
          }}
        >
          <span>© {year} Sitarahub Private Limited</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem' }}>CIN U46901MH2025PTC450939 · Mumbai</span>
        </div>
      </div>
    </footer>
  );
}
