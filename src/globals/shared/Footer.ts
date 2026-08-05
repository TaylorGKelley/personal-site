import { revalidateLayout } from '@/lib/revalidate'
import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  hooks: {
    afterChange: [() => revalidateLayout()],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Taylor Kelley',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© ' + new Date().getFullYear() + ' Taylor Kelley',
      required: true,
    },
    {
      name: 'navigationLinks',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'connectLinks',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
      required: true,
    },
  ],
}
