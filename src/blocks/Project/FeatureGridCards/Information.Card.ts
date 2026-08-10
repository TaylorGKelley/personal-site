import type { Block } from "payload";

export const InformationCard: Block = {
  slug: 'information-card',
  interfaceName: 'InformationFeatureCardBlock',
  labels: {
    singular: 'Information Card Block',
    plural: 'Information Card Blocks',
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
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'The Brief',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
  ],
}
