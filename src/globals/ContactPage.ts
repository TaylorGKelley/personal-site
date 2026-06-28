import { HeroBlock } from "@/blocks/Home/Hero";
import { RecentPostsBlock } from "@/blocks/Home/RecentPosts";
import { RecentProjectsBlock } from "@/blocks/Home/RecentProjects";
import type { GlobalConfig } from "payload";

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
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
      defaultValue: 'Get in touch.',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        }
      ]
    }
  ]
}
