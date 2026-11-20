import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { Manifesto } from '@/components/manifesto';
import { ProcessCircuit } from '@/components/process-circuit';
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
        <Manifesto />
        <ProjectsSection />
        <ServicesSection />
        <ProcessCircuit />
        <AboutSection />
        <div className="wrap"><hr className="rule" /></div>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
