import { Block } from 'payload'

export const Projects: Block = {
  slug: 'projects',
  labels: {
    singular: 'Projects Section',
    plural: 'Projects Sections',
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
  ],
}
