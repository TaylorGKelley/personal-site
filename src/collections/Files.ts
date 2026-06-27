import { anyone } from '@/access/anyone'
import type { CollectionConfig } from 'payload'

export const Files: CollectionConfig = {
  slug: 'files',
  access: {
    read: anyone
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    }
  ],
  upload: {
    staticDir: 'files',
    mimeTypes: ['application/pdf']
  },
}
