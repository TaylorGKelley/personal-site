import type { Block } from "payload";
import { iconField } from "payload-icon-picker";

export const Solution: Block = {
  slug: 'solution',
  interfaceName: 'SolutionBlock',
  labels: {
    singular: 'Solution Block',
    plural: 'Solution Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'The Brief',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        iconField({
          name: 'icon',
          displayMode: 'select',
          required: true,
        }),
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    }
  ],
}
