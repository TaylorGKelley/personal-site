import React from 'react'
import type { Metadata } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { Header } from '@/components/globals/Header'
import { Footer } from '@/components/globals/Footer'
import { Fira_Code } from 'next/font/google';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils'
import { buildMetadata } from '@/lib/metadata'
import '../global.css'
import { Toaster } from '@/components/ui/sonner';

const satoshi = localFont({
  src: '../../fonts/Satoshi-Variable.ttf',
  variable: '--font-satoshi',
})

const firaCode = Fira_Code({
  variable: '--font-fira-code',
})

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata()
}

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn('font-sans flex flex-col min-h-screen', satoshi.variable, firaCode.variable)}>
        <Header />

        <main className='flex-1'>{children}</main>
        <Toaster position='bottom-right' />

        <Footer />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
