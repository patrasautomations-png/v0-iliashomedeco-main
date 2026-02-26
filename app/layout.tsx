import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ['latin', 'greek'] })
const _playfair = Playfair_Display({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ILIAS HOME DECO | Luxury Furniture & Interior Design in Kefalonia',
  description:
    'Discover premium furniture collections, bespoke interior design services, and luxury home solutions for your Kefalonian home. Furniture, curtains, hanging systems, and mattresses.',
  generator: 'v0.app',
  keywords: [
    'luxury furniture Kefalonia',
    'interior design Greece',
    'home decoration',
    'curtains',
    'mattresses',
    'ILIAS HOME DECO',
  ],
  openGraph: {
    title: 'ILIAS HOME DECO | Luxury Furniture & Interior Design in Kefalonia',
    description:
      'Discover premium furniture collections and bespoke interior design services for your Kefalonian home.',
    type: 'website',
    locale: 'en_US',
    siteName: 'ILIAS HOME DECO',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#B8860B',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
