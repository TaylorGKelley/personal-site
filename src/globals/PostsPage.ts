import type { GlobalConfig } from "payload";

export const PostsPage: GlobalConfig = {
  slug: 'posts-page',
  admin: {
      group: 'Navigation & Pages',
      livePreview: {
        url: ({ locale }) => {
          const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
          return `${baseUrl}?preview=true`
        },
      },
    },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Technical Blog',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
  ]
}
