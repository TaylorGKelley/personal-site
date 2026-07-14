import { type Block } from "payload";

export const Experience: Block = {
  slug: 'experience',
  labels: {
    singular: 'Experience Block',
    plural: 'Experience Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Trajectory',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Selected Experience',
    },
    {
      name: 'jobs',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'company',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'startDate',
          type: 'date',
          required: true,
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            condition: (data) => !data.current,
          }
        },
        {
          name: 'current',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
