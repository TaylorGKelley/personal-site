import { revalidateLayout } from '@/lib/revalidate'
import type { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
  slug: 'header',
  hooks: {
    afterChange: [() => revalidateLayout()],
  },
  fields: [
    {
      name: 'logo',
      type: 'text',
      defaultValue: 'Taylor Kelley',
      required: true,
    },
    {
      name: 'links',
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
      name: 'resume',
      type: 'upload',
      relationTo: 'files',
    }
  ],
}
