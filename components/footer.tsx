'use client';

import Link from 'next/link';
import { Logo } from './logo';

const footerLinks = {
  Services: [
    { label: 'Web Development', href: '/#services' },
    { label: 'ERP Solutions', href: '/#services' },
    { label: 'Mobile Apps', href: '/#services' },
    { label: 'Marketing Automation', href: '/#services' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Work', href: '/#projects' },
    { label: 'Careers', href: '/careers' },
    { label: 'Testimonials', href: '/#testimonials' },
    { label: 'Contact', href: '/#contact' },
  ],
  Connect: [
    { label: 'WhatsApp', href: 'https://wa.me/919119436661' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/sitarahub-private-limited/posts/?feedView=all' },
    { label: 'Twitter', href: '#' },
    { label: 'Instagram', href: '#' },
  ],
};

const socialIcons = {
  WhatsApp: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
    </svg>
  ),
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        position: 'relative',
        background: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
      }}
    >
      {/* Big background text */}
      <div
        style={{
          position: 'absolute',
          bottom: '-2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 'clamp(6rem, 20vw, 18rem)',
          fontWeight: 900,
          letterSpacing: '-0.06em',
          color: 'rgba(255,255,255,0.015)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        SITARAHUB
      </div>


      {/* Main footer grid */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '4rem 2rem',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '3rem',
          position: 'relative',
          zIndex: 1,
        }}
        className="footer-grid"
      >
        {/* Brand column */}
        <div>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              marginBottom: '1.5rem',
              cursor: 'none'
            }}
          >
            <Logo iconSize={40} fontSize="1.25rem" showSubtitle={false} />
          </Link>

          <p
            style={{
              fontSize: '0.8rem',
              lineHeight: 1.75,
              color: 'rgba(245,240,233,0.35)',
              maxWidth: 280,
              marginBottom: '2rem',
            }}
          >
            Premium software development studio specializing in web development,
            ERP systems, and marketing automation. Building digital excellence
            since 2025.
          </p>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[
              { name: 'LinkedIn', href: 'https://www.linkedin.com/company/sitarahub-private-limited/posts/?feedView=all' },
              { name: 'Twitter', href: '#' },
              { name: 'Instagram', href: '#' }
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                style={{
                  width: 36,
                  height: 36,
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(245,240,233,0.35)',
                  fontSize: '0.65rem',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = '#ff6a37';
                  el.style.color = '#ff6a37';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(255,255,255,0.08)';
                  el.style.color = 'rgba(245,240,233,0.35)';
                }}
              >
                {social.name[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h4
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,233,0.3)',
                marginBottom: '1.5rem',
              }}
            >
              {heading}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="animated-underline"
                    style={{
                      fontSize: '0.8rem',
                      color: 'rgba(245,240,233,0.5)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = '#f5f0e9';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = 'rgba(245,240,233,0.5)';
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: '0.62rem',
            letterSpacing: '0.08em',
            color: 'rgba(245,240,233,0.2)',
          }}
        >
          © {year} Sitarahub Private Limited. All rights reserved.
        </span>
        <span
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.06em',
            color: 'rgba(245,240,233,0.15)',
            fontFamily: 'monospace',
          }}
        >
          CIN: U46901MH2025PTC450939 · RoC-Mumbai · Est. June 2025
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
