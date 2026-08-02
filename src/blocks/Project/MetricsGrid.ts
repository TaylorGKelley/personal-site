import type { Block } from "payload";
import { iconField } from "payload-icon-picker";

export const MetricsGrid: Block = {
  slug: 'metrics-grid',
  interfaceName: 'MetricsGridBlock',
  labels: {
    singular: 'Metrics Grid Block',
    plural: 'Metrics Grid Blocks',
  },
  fields: [
    {
      name: 'metrics',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'context',
          type: 'text',
          required: true,
        },
      ],
    }
  ],
}
