import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPubished'
import { revalidatePost } from '@/lib/revalidate'
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'publishedAt', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        const url = data?.slug ? `/posts/${data.slug}` : '/posts'
        return `${baseUrl}/next/preview?url=${encodeURIComponent(url)}`
      },
    },
  },
  versions: {
    drafts: true, // Enables save-as-draft capability
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidatePost(doc.slug)
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidatePost(doc.slug)
      },
    ],
    beforeChange: [
      ({ data, originalDoc }) => {
        if (data._status === 'published' && !data.publishedAt && !originalDoc?.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
    beforeValidate: [
      ({ data }) => {
        if (!data?.slug || data?.slug === '') {
          data!.slug = data!.title.replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase();
        }
        return data;
      },
      // ({ data, req: { user } }) => {
      //   if (!data?.author) {
      //     data!.author = user?.id;
      //   }
      //   return data;
      // }
    ]
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      defaultValue: ({ user }) => user?.id,
      admin: {
        // readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
        placeholder: 'https://www.youtube.com/watch?v=XXXXXX'
      }
    },
    {
      name: 'xUrl',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
        placeholder: 'https://x.com/username/status/13412341234'
      }
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
