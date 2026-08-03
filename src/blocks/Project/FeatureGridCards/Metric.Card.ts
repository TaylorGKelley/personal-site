import type { Block } from "payload";

export const MetricCard: Block = {
  slug: 'metric-card',
  interfaceName: 'MetricFeatureCardBlock',
  labels: {
    singular: 'Metric Card Block',
    plural: 'Metric Card Blocks',
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
      name: 'amount',
      type: 'text',
      required: true,
    },
    {
      name: 'label',
      type: 'text',
      required: true,
    },
  ],
}
