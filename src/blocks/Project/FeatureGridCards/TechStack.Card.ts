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
    {
      name: 'columns',
      type: 'select',
      options: [
        {label: '1 Column', value: '1'},
        {label: '2 Columns', value: '2'},
        {label: '3 Columns', value: '3'},
      ],
      defaultValue: '1',
      required: true,
    },
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
