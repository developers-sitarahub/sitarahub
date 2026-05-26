import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sitarahub.com'),
  title: 'Sitarahub | Premium Software Development & Web Studio',
  description: 'Branding, web development, ERP systems, and digital innovation built as one system. Sitarahub helps ambitious companies launch, scale, and stand out.',
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
    'Sitarahub Private Limited'
  ],
  generator: 'Next.js',
  applicationName: 'Sitarahub',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Sitarahub Team', url: 'https://sitarahub.com' }],
  creator: 'Sitarahub Private Limited',
  publisher: 'Sitarahub Private Limited',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Sitarahub | Premium Software Development & Web Studio',
    description: 'Branding, web development, ERP systems, and digital innovation built as one system. Sitarahub helps ambitious companies launch, scale, and stand out.',
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
    description: 'Branding, web development, ERP systems, and digital innovation built as one system. Sitarahub helps ambitious companies launch, scale, and stand out.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ background: '#0a0a0a' }}>
      <body className={`${inter.variable} antialiased`} style={{ background: '#0a0a0a' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                '@id': 'https://sitarahub.com/#organization',
                'name': 'Sitarahub Private Limited',
                'legalName': 'Sitarahub Private Limited',
                'url': 'https://sitarahub.com',
                'logo': {
                  '@type': 'ImageObject',
                  'url': 'https://sitarahub.com/icon.png',
                  'caption': 'Sitarahub Logo'
                },
                'sameAs': [
                  'https://www.linkedin.com/company/sitarahub-private-limited/posts/?feedView=all',
                  'https://wa.me/919119436661'
                ],
                'description': 'A premium software development studio specializing in enterprise ERP solutions, custom web applications, mobile platforms, and AI-driven workflow marketing automation.',
                'foundingDate': '2025-06-18',
                'address': {
                  '@type': 'PostalAddress',
                  'addressLocality': 'Mumbai',
                  'addressRegion': 'Maharashtra',
                  'addressCountry': 'IN'
                },
                'iso6523': 'CIN U46901MH2025PTC450939'
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': 'https://sitarahub.com/#website',
                'url': 'https://sitarahub.com',
                'name': 'Sitarahub',
                'description': 'Premium Software Development & Web Studio',
                'publisher': {
                  '@id': 'https://sitarahub.com/#organization'
                }
              },
              {
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
                'telephone': '+919119436661'
              }
            ])
          }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
