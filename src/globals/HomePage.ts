import { Hero } from '@/blocks/Home/Hero'
import { Projects } from '@/blocks/Home/Projects'
import { RecentPosts } from '@/blocks/Home/RecentPosts'
import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
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
      name: 'content',
      type: 'blocks',
      blocks: [Hero, Projects, RecentPosts],
      defaultValue: [
        // {
        //   type: 'hero',
        //   data: {
        //     heading: 'Taylor Kelley',
        //     subheading: 'A full-stack developer specializing in high-performance, clean and maintainable code, and user focused web applications.',
        //     actionText: 'Explore Projects',
        //   },
        // },
        // {
        //   type: 'projects',
        //   data: {

        //   }
        // },
        // {
        //   type: 'recent-posts',
        //   data: {
        //     title: 'Latest Thoughts',
        //     subtitle: 'Reflections on design, engineering, and craft.',
        //     viewAllText: 'View More',
        //   },
        // }
      ],
    }
  ],
}
