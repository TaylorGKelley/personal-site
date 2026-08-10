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
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'linkType',
          type: 'select',
          defaultValue: 'custom',
          options: [
            { label: 'Custom URL', value: 'custom' },
            { label: 'File Upload (e.g., Resume)', value: 'file' },
          ],
          admin: {
            width: '50%',
          },
        },
        {
          name: 'url',
          type: 'text',
          // Only required and visible if linkType is 'custom'
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === 'custom',
          },
        },
        {
          name: 'fileDoc',
          type: 'relationship',
          relationTo: 'files',
          // Only required and visible if linkType is 'file'
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === 'file',
          },
        },
      ],
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
