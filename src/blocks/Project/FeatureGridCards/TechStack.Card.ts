import type { Block } from "payload";
import { iconField } from "payload-icon-picker";

export const TechStackCard: Block = {
  slug: 'tech-stack-card',
  interfaceName: 'TechStackFeatureCardBlock',
  labels: {
    singular: 'Tech Stack Card Block',
    plural: 'Tech Stack Card Blocks',
  },
  fields: [
    // iconField({
    //   name: 'icon',
    //   displayMode: 'select',
    //   required: true,
    // }),
    // {
    //   name: 'heading',
    //   type: 'text',
    //   required: true,
    // },
    {
      name: 'frameworks',
      type: 'relationship',
      hasMany: true,
      relationTo: 'frameworks',
    }
  ],
}
