import { type Block } from "payload";
import { iconField } from "payload-icon-picker";

export const Skills: Block = {
  slug: 'skills',
  interfaceName: 'SkillsBlock',
  labels: {
    singular: 'Skills Block',
    plural: 'Skills Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Competencies'
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Technical Knowledge',
      required: true,
    },
    {
      name: 'skills',
      type: 'array',
      fields: [
        iconField({
          name: 'icon',
          displayMode: 'drawer',
          required: true,
        }),
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Section Title'
        },
        {
          name: 'technologies',
          type: 'array',
          required: true,
          fields: [
            iconField({
              name: 'icon',
              displayMode: 'drawer',
            }),
            {
              name: 'name',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    }
  ],
}
