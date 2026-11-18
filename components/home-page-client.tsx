import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { ServicesSection } from '@/components/services-section';
import { AboutSection } from '@/components/about-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export function HomePageClient() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <div className="wrap"><hr className="rule" /></div>
        <ProjectsSection />
        <ServicesSection />
        <AboutSection />
        <div className="wrap"><hr className="rule" /></div>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
