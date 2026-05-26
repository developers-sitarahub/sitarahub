'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Logo } from './logo';

const navItems = [
  { label: 'WORK', href: '/#projects' },
  { label: 'SERVICES', href: '/#services' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CAREERS', href: '/careers' },
  { label: 'CONTACT', href: '/#contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 40);
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change (hash link click)
  const handleNavClick = () => setMobileOpen(false);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
          background: scrolled || mobileOpen ? 'rgba(10, 10, 10, 0.97)' : 'transparent',
          backdropFilter: scrolled || mobileOpen ? 'blur(20px)' : 'none',
          borderBottom: scrolled || mobileOpen
            ? '1px solid rgba(255,255,255,0.05)'
            : '1px solid transparent',
          willChange: 'background',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '1.25rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Logo & Wordmark */}
          <Link
            href="/"
            onClick={handleNavClick}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', cursor: 'none' }}
          >
            <Logo iconSize={40} fontSize="1.25rem" showSubtitle={false} />
          </Link>

          {/* Desktop nav — hidden on mobile */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  color: 'rgba(245, 240, 233, 0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.25s ease',
                  cursor: 'none',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#ff6a37'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(245, 240, 233, 0.55)'; }}
              >
                {item.label}
              </a>
            ))}

            <a
              href="/#contact"
              className="btn-primary"
              style={{ borderRadius: 4, fontSize: '0.65rem', padding: '0.6rem 1.25rem', cursor: 'none' }}
            >
              <span>START A PROJECT</span>
            </a>
          </div>

          {/* Mobile hamburger — hidden on desktop */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            style={{
              display: 'none', // overridden in CSS for mobile
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Three-line hamburger → X on open */}
            <span
              style={{
                display: 'block',
                width: 22,
                height: 1.5,
                background: '#f5f0e9',
                borderRadius: 1,
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: 22,
                height: 1.5,
                background: '#f5f0e9',
                borderRadius: 1,
                transition: 'opacity 0.3s ease',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: 22,
                height: 1.5,
                background: '#f5f0e9',
                borderRadius: 1,
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className="nav-mobile-menu"
          style={{
            maxHeight: mobileOpen ? '400px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            background: 'rgba(10,10,10,0.97)',
            borderTop: mobileOpen ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}
        >
          <div style={{ padding: '1.5rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {navItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleNavClick}
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(245, 240, 233, 0.7)',
                  textDecoration: 'none',
                  padding: '1rem 0',
                  borderBottom: i < navItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  transition: 'color 0.2s ease',
                  display: 'block',
                }}
                onTouchStart={(e) => { (e.currentTarget as HTMLElement).style.color = '#ff6a37'; }}
                onTouchEnd={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(245, 240, 233, 0.7)'; }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={handleNavClick}
              className="btn-primary"
              style={{ marginTop: '1.5rem', borderRadius: 4, textAlign: 'center', justifyContent: 'center', fontSize: '0.75rem' }}
            >
              <span>START A PROJECT</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 499,
            background: 'rgba(0,0,0,0.5)',
          }}
        />
      )}

      <style>{`
        /* Desktop: show full nav, hide hamburger */
        @media (min-width: 769px) {
          .nav-desktop { display: flex !important; }
          .nav-hamburger { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
        /* Mobile: hide full nav, show hamburger */
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
