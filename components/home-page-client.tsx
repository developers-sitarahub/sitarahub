'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { LoadingScreen } from '@/components/loading-screen';
import { Navigation } from '@/components/navigation';
import { ProjectsSection } from '@/components/projects-section';
import { Footer } from '@/components/footer';
import { CustomCursor } from '@/components/custom-cursor';

const HeroSection = dynamic(() => import('@/components/hero-section').then((m) => m.HeroSection), { ssr: false });
const AboutSection = dynamic(() => import('@/components/about-section').then((m) => m.AboutSection), { ssr: false });
const ServicesSection = dynamic(() => import('@/components/services-section').then((m) => m.ServicesSection), { ssr: false });
const TestimonialsSection = dynamic(() => import('@/components/testimonials-section').then((m) => m.TestimonialsSection), { ssr: false });
const ContactSection = dynamic(() => import('@/components/contact-section').then((m) => m.ContactSection), { ssr: false });

export function HomePageClient() {
  // Start false to avoid hydration mismatch; check sessionStorage client-side
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only show loader on first-ever visit (per session)
    if (!sessionStorage.getItem('sitarahub_visited')) {
      setIsLoading(true);
    }
  }, []);

  const handleLoadComplete = () => {
    sessionStorage.setItem('sitarahub_visited', '1');
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      if (hash) {
        const id = hash.replace('#', '');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500); // 500ms delay to ensure dynamic sections have fully mounted
      }
    }
  }, [isLoading]);

  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Loading screen — first visit only */}
      {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* Main site — always rendered (hidden by loader overlay on first visit) */}
      <main
        style={{
          background: '#0a0a0a',
          minHeight: '100vh',
          visibility: isLoading ? 'hidden' : 'visible',
        }}
      >
        <Navigation />
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
