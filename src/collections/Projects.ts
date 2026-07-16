
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPubished'
import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'subtitle', 'updatedAt'],
  },
  versions: {
    drafts: true, // Enables save-as-draft capability
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
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
      name: 'frameworks', // Tags
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
      blocks: [], // TODO: add blocks for building
      required: true,
    },
  ],
}
