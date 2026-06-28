import React from 'react'
import './styles.css'
import { HeaderComponent } from '@/components/globals/Header'
import { FooterComponent } from '@/components/globals/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <HeaderComponent />

        <main>{children}</main>

        <FooterComponent />
      </body>
    </html>
  )
}
