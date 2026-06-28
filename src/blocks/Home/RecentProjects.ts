import { Block } from 'payload'

export const RecentProjectsBlock: Block = {
  slug: 'recentProjects',
  labels: {
    singular: 'Recent Projects',
    plural: 'Recent Projects Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Featured Work',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'viewAll',
      type: 'group',
      interfaceName: 'projectViewAllLink',
      fields: [
        {
          name: 'displayText',
          type: 'text',
          required: true,
          defaultValue: 'View Archive'
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          defaultValue: '/projects'
        }
      ]
    }
  ],
}
