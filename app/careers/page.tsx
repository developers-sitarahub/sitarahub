import type { Metadata } from 'next';
import { CareersPageClient } from '@/components/careers-page-client';

export const metadata: Metadata = {
  title: 'Careers | Sitarahub · Premium Software Development Studio',
  description:
    'Join the team at Sitarahub. Explore high-impact roles and submit your application to build world-class digital products, ERP solutions, and web platforms.',
  alternates: {
    canonical: '/careers',
  },
  openGraph: {
    title: 'Careers | Sitarahub · Premium Software Studio',
    description: 'Join the team at Sitarahub. Apply now to design, build, and deploy world-class enterprise software and digital applications.',
    url: 'https://sitarahub.com/careers',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Careers at Sitarahub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers | Sitarahub · Premium Software Studio',
    description: 'Join the team at Sitarahub. Apply now to engineer world-class software.',
    images: ['/og-image.png'],
  },
};

export default function CareersPage() {
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
                'name': 'Careers',
                'item': 'https://sitarahub.com/careers'
              }
            ]
          })
        }}
      />
      <CareersPageClient />
    </>
  );
}
