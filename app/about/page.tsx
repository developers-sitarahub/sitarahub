import type { Metadata } from 'next';
import { AboutPageClient } from '@/components/about-page-client';

export const metadata: Metadata = {
  title: 'About Sitarahub | Premium Software Development Studio · India',
  description:
    'Sitarahub Private Limited (CIN: U46901MH2025PTC450939). A premium software development studio building world-class web applications, ERP platforms, and digital experiences.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Sitarahub | Premium Software Development Studio',
    description: 'Sitarahub Private Limited is a premium software development studio incorporated in Maharashtra, India. We engineer bespoke web apps, ERP software, and marketing engines.',
    url: 'https://sitarahub.com/about',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'About Sitarahub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Sitarahub | Premium Software Development Studio',
    description: 'Sitarahub Private Limited is a premium software development studio. We build bespoke web platforms, ERPs, and automation suites.',
    images: ['/og-image.png'],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://sitarahub.com'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'About Us',
                'item': 'https://sitarahub.com/about'
              }
            ]
          })
        }}
      />
      <AboutPageClient />
    </>
  );
}
