import type { Metadata } from 'next';
import { CareersPageClient } from '@/components/careers-page-client';

export const metadata: Metadata = {
  title: 'Careers | Sitarahub · Premium Software Development Studio',
  description:
    'Join the team at Sitarahub. Explore roles and submit your application to build world-class digital products and web solutions.',
};

export default function CareersPage() {
  return <CareersPageClient />;
}
