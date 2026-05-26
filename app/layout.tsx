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
  title: 'Sitarahub | Premium Software Development & Web Studio',
  description: 'Branding, web development, ERP systems, and digital innovation built as one system. Sitarahub helps ambitious companies launch, scale, and stand out.',
  keywords: 'web development, ERP solutions, software development, digital marketing, WhatsApp marketing, email marketing, mobile apps',
  generator: 'Next.js',
  openGraph: {
    title: 'Sitarahub | Premium Software Development',
    description: 'Transforming ambitious visions into exceptional digital experiences.',
    type: 'website',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sitarahub | Premium Software Development',
    description: 'Transforming ambitious visions into exceptional digital experiences.',
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
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
