import { type Block } from "payload";
import { iconField } from "payload-icon-picker";

export const Hobbies: Block = {
  slug: 'hobbies',
  interfaceName: 'HobbiesBlock',
  labels: {
    singular: 'Hobbies Block',
    plural: 'Hobbies Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Off-Duty',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Beyond the screen',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        iconField({
          name: 'icon',
          displayMode: 'drawer',
          required: true,
        }),
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'firstImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'secondImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    }
  ],
}
