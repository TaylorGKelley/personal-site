import type { GlobalConfig } from "payload";

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
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
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [], // TODO: Add about section blocks
    }
  ]
}
