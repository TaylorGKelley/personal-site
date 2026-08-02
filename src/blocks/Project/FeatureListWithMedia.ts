import type { Block } from "payload";
import { iconField } from "payload-icon-picker";

export const FeatureListWithMedia: Block = {
  slug: 'feature-list-with-media',
  interfaceName: 'FeatureListWithMediaBlock',
  labels: {
    singular: 'Feature List With Media Block',
    plural: 'Feature List With Media Blocks',
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
        {
          name: 'media',
          type: 'relationship',
          relationTo: 'media',
        }
      ],
    }
  ],
}
