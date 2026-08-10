import type { Block } from "payload";

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections'
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Taylor Kelley',
      required: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'actionText',
      type: 'text',
      defaultValue: 'Explore Projects'
    }
  ],
}
