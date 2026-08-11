import type { MetadataRoute } from 'next'
import { getServerUrl } from '@/lib/metadata'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${getServerUrl()}/sitemap.xml`,
  }
}
