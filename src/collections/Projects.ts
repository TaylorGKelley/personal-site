import { anyone } from '@/access/anyone'
import { TwoColumnBlock } from '@/blocks/Project/TwoColumn'
import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'frameworks',
      type: 'array',
      fields: [
        {
          name: 'framework',
          type: 'relationship',
          relationTo: 'frameworks',
          required: true,
        },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [TwoColumnBlock], // TODO: add blocks for building
      required: true,
    }
  ],
}
