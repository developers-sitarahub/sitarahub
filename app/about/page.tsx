import type { Metadata } from 'next';
import { AboutPageClient } from '@/components/about-page-client';

export const metadata: Metadata = {
  title: 'About Sitarahub | Premium Software Development Studio · India',
  description:
    'Sitarahub Private Limited — CIN U46901MH2025PTC450939. A premium software development studio incorporated in June 2025 in Maharashtra, India. Building web platforms, ERP systems, and digital products.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
