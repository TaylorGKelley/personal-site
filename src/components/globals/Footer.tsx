import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
// Import the generated Global type from your payload-types file
import { Footer } from '@/payload-types'

export async function FooterComponent() {
  const payload = await getPayload({ config })
  const footerData = (await payload.findGlobal({
    slug: 'footer',
  })) as Footer

  if (!footerData) return null

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-100 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2 space-y-3">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">{footerData.title}</h2>
            {footerData.subtitle && (
              <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                {footerData.subtitle}
              </p>
            )}
          </div>

          {footerData.navigation?.links && (
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                {footerData.navigation.title}
              </h3>
              <ul className="space-y-2.5">
                {footerData.navigation.links.map((link) => (
                  <li key={link.id}>
                    <Link href={link.url} className="text-sm hover:text-gray-900 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {footerData.connect?.links && (
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                {footerData.connect.title}
              </h3>
              <ul className="space-y-2.5">
                {footerData.connect.links.map((link) => (
                  <li key={link.id}>
                    {link.url.startsWith('http') ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:text-gray-900 transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.url}
                        className="text-sm hover:text-gray-900 transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
