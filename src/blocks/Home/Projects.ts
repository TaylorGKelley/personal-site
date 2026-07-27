import { Block } from 'payload'

export const Projects: Block = {
  slug: 'projects',
  interfaceName: 'ProjectBlock',
  labels: {
    singular: 'Projects Section',
    plural: 'Projects Sections',
  },
  fields: [
    {
      name: 'projects',
      type: 'array',
      fields: [
        {
          name: 'project',
          type: 'relationship',
          relationTo: 'projects',
        }
      ]
    }
  ],
}
