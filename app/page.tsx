import type { Metadata } from 'next';
import { HomePageClient } from '@/components/home-page-client';

export const metadata: Metadata = {
  title: 'Sitarahub | Premium Software Development & Web Studio',
  description:
    'Branding, custom web development, enterprise ERP systems, and digital innovation built as one system. Sitarahub helps ambitious companies launch, scale, and stand out.',
  keywords: [
    'web development',
    'ERP solutions',
    'software development studio',
    'enterprise software development',
    'premium web design',
    'WhatsApp marketing automation',
    'AI cold email marketing',
    'custom CRM development',
    'e-commerce development',
    'Sitarahub',
    'Sitarahub Private Limited',
    'premium software studio India',
    'Mumbai software company',
    'custom ERP developer',
    'SaaS development agency'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sitarahub | Premium Software Development & Web Studio',
    description:
      'Branding, custom web development, enterprise ERP systems, and digital innovation built as one system. Sitarahub helps ambitious companies launch, scale, and stand out.',
    url: 'https://sitarahub.com',
    siteName: 'Sitarahub',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sitarahub - Premium Software Development Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sitarahub | Premium Software Development & Web Studio',
    description:
      'Branding, custom web development, enterprise ERP systems, and digital innovation built as one system. Sitarahub helps ambitious companies launch, scale, and stand out.',
    images: ['/og-image.png'],
  },
};

export default function HomePage() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://sitarahub.com/#website',
    'url': 'https://sitarahub.com',
    'name': 'Sitarahub',
    'description': 'Premium Software Development & Web Studio',
    'publisher': {
      '@id': 'https://sitarahub.com/#organization'
    }
  };

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://sitarahub.com/#service',
    'name': 'Sitarahub Private Limited',
    'url': 'https://sitarahub.com',
    'logo': 'https://sitarahub.com/icon.png',
    'image': 'https://sitarahub.com/og-image.png',
    'description': 'Sitarahub is a premium software development studio, building web platforms, custom ERP systems, and AI outreach automations.',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Mumbai',
      'addressRegion': 'Maharashtra',
      'addressCountry': 'IN'
    },
    'priceRange': '$$$',
    'telephone': '+919119436661',
    'openingHours': 'Mo-Fr 09:00-18:00',
    'areaServed': ['IN', 'US', 'AE', 'GB'],
    'knowsAbout': ['Web Development', 'ERP Solutions', 'Software Engineering', 'AI Automation', 'WhatsApp Marketing Automation']
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([websiteSchema, professionalServiceSchema])
        }}
      />
      <HomePageClient />
    </>
  );
}
