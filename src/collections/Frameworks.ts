import { anyone } from '@/access/anyone'
import type { CollectionConfig } from 'payload'

export const Frameworks: CollectionConfig = {
  slug: 'frameworks',
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
