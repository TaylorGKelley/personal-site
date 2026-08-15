
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPubished'
import { revalidateProject } from '@/lib/revalidate'
import { ArchitectureDiagram } from '@/blocks/Project/ArchitectureDiagram'
import { CodeBlock } from '@/blocks/Project/CodeBlock'
import { FeatureGrid } from '@/blocks/Project/FeatureGrid'
import { Solution } from '@/blocks/Project/Solution'
import { Gallery } from '@/blocks/Project/Gallery'
import { Overview } from '@/blocks/Project/Overview'
import { RichText } from '@/blocks/Project/RichText'
import type { CollectionConfig } from 'payload'
import { iconField } from 'payload-icon-picker'

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
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        const url = data?.slug ? `/projects/${data.slug}` : '/projects'
        return `${baseUrl}/next/preview?url=${encodeURIComponent(url)}`
      },
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 500
      }
    }, // Enables save-as-draft capability
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateProject(doc.slug)
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateProject(doc.slug)
      },
    ],
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
      name: 'primaryCallToAction',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        iconField({
          name: 'icon',
          displayMode: 'select',
          required: true,
        })
      ],
    },
    {
      name: 'secondaryCallToAction',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        iconField({
          name: 'icon',
          displayMode: 'select',
          required: true,
        })
      ],
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
      blocks: [
        Overview,
        FeatureGrid,
        Solution,
        Gallery,
        CodeBlock,
        ArchitectureDiagram,
        RichText,
        ],
      required: true,
    },
  ],
}
