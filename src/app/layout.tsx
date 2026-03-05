import type { Metadata } from 'next'
import './globals.css'
import { getMuseumConfig } from '@/lib/config'

const config = getMuseumConfig()

export const metadata: Metadata = {
  title: config.name,
  description: config.description,
  openGraph: {
    title: config.name,
    description: config.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: config.name,
    description: config.description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
