import { Block } from 'payload'

export const RecentPosts: Block = {
  slug: 'recent-posts',
  interfaceName: 'RecentPostsBlock',
  labels: {
    singular: 'Recent Posts Section',
    plural: 'Recent Posts Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Latest Thoughts',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'viewAllText',
      type: 'text',
      defaultValue: 'View More',
      required: true,
    },
    {
      name: 'displayCount',
      type: 'number',
      required: true,
      defaultValue: 3,
    }
  ],
}
