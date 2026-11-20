'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from './logo';
import { magnetic } from '@/lib/magnetic';

const navItems = [
  { label: 'Work', href: '/#projects' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [away, setAway] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // Hide while reading down the page, bring back on any scroll up.
      if (Math.abs(y - lastY) > 6) setAway(y > lastY && y > 160);
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-nav${scrolled || open ? ' is-scrolled' : ''}${away && !open ? ' is-away' : ''}`}>
      <div className="wrap site-nav-inner">
        <Link href="/" aria-label="Sitarahub — home" style={{ display: 'flex', textDecoration: 'none' }}>
          <Logo iconSize={34} fontSize="1.2rem" showSubtitle={false} />
        </Link>

        <nav className="site-nav-links" aria-label="Main">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-item"
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
          <a href="/#contact" className="btn magnetic" {...magnetic} style={{ padding: '0.65rem 1.05rem', fontSize: '0.9rem' }}>
            Get in touch
          </a>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">
          <div className="wrap">
            {[...navItems, { label: 'Get in touch', href: '/#contact' }].map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
