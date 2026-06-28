import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Header } from '@/payload-types'

export async function HeaderComponent() {
  // Fetching the global data server-side
  const payload = await getPayload({ config })
  const headerData = (await payload.findGlobal({
    slug: 'header',
    depth: 1, // Depth 1 ensures the 'resume' upload object is populated with its URL
  })) as unknown as Header

  if (!headerData) return null

  // Safeguard if resume is just an ID string, though depth: 1 usually handles this
  const resumeUrl = typeof headerData.resume === 'object' ? headerData.resume?.url : ''

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 tracking-tight hover:opacity-80 transition-opacity"
        >
          {headerData.logo}
        </Link>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {headerData.links?.map((link) => (
              <li key={link.id || link.url}>
                <Link
                  href={link.url}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Action Button (Resume) */}
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
            >
              Resume
            </a>
          )}
        </nav>
      </div>
    </header>
  )
}
