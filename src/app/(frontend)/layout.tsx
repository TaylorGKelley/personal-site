import React from 'react'
import type { Metadata } from 'next'
import { Header } from '@/components/globals/Header'
import { Footer } from '@/components/globals/Footer'
import { Fira_Code } from 'next/font/google';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils'
import '../global.css'

const satoshi = localFont({
  src: '../../fonts/Satoshi-Variable.ttf',
  variable: '--font-satoshi',
})

const firaCode = Fira_Code({
  variable: '--font-fira-code',
})

export const metadata: Metadata = {
  description: '',
  title: 'Portfolio and Blog of Taylor Kelley',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn('font-sans flex flex-col min-h-screen', satoshi.variable, firaCode.variable)}>
        <Header />

        <main className='flex-1'>{children}</main>

        <Footer />
      </body>
    </html>
  )
}
