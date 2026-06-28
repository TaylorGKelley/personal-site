import { Block } from 'payload'

export const RecentPostsBlock: Block = {
  slug: 'recentPosts',
  labels: {
    singular: 'Recent Posts',
    plural: 'Recent Posts Sections',
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
    },
  ],
}
