import type { Block } from "payload";

export const Overview: Block = {
  slug: 'overview',
  interfaceName: 'OverviewBlock',
  labels: {
    singular: 'Overview Block',
    plural: 'Overview Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'The Brief',
      required: true,
    },
    {
      name: 'summaryTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'summaryText',
      type: 'textarea',
      required: true,
    },
    {
      name: 'metadata',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
