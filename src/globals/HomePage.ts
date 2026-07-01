import { HeroBlock } from '@/blocks/Home/Hero'
import { RecentPostsBlock } from '@/blocks/Home/RecentPosts'
import { RecentProjectsBlock } from '@/blocks/Home/RecentProjects'
import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
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
      defaultValue: 'Home',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, RecentProjectsBlock, RecentPostsBlock],
      required: true,
    },
  ],
}
