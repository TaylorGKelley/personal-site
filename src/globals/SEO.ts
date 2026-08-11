import { revalidateGlobal } from '@/lib/revalidate'
import type { GlobalConfig } from 'payload'

export const SEO: GlobalConfig = {
  slug: 'seo',
  hooks: {
    afterChange: [() => revalidateGlobal('/')],
  },
  admin: {
    group: 'Site',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Portfolio and Blog of Taylor Kelley',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Portfolio and blog of Taylor Kelley, a full-stack developer specializing in high-performance, clean and maintainable code, and user focused web applications.',
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile / Share Image',
      admin: {
        description: 'Used as the Open Graph share image for the Home and About pages.',
      },
    },
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Taylor Kelley',
    },
    {
      name: 'xHandle',
      type: 'text',
      admin: {
        description: 'Twitter/X handle without the @, e.g. taylorgkelley',
        placeholder: 'taylorgkelley',
      },
    },
  ],
}
