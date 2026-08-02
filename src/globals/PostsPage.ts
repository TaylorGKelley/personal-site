import type { GlobalConfig } from 'payload'

export const PostsPage: GlobalConfig = {
  slug: 'posts-page',
  admin: {
    group: 'Navigation & Pages',
    livePreview: {
      url: () => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}?preview=true`
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      // Leaving empty will highlight the latest post
      name: 'featured',
      type: 'relationship',
      relationTo: 'posts',
      label: 'Featured Post (leave empty to highlight most recent)'
    },
    {
      name: 'postCount',
      type: 'number',
      defaultValue: 5,
      required: true,
    },
  ],
}
