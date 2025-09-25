import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Scratchie Onboarding - Interactive Mockup',
  description: 'Experience the new user onboarding flow for Scratchie - the safety gamification app that rewards safe work and gets you noticed.',
  keywords: 'Scratchie, onboarding, safety, construction, gamification, rewards',
  authors: [{ name: 'Scratchie' }],
  openGraph: {
    title: 'Scratchie Onboarding Flow',
    description: 'Interactive demonstration of Scratchie\'s user onboarding experience',
    type: 'website',
    locale: 'en_US',
    siteName: 'Scratchie Onboarding',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scratchie Onboarding Flow',
    description: 'Interactive demonstration of Scratchie\'s user onboarding experience',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#F97115',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}