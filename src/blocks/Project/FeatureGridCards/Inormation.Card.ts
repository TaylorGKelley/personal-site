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
