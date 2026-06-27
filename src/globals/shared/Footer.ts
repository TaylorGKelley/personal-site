import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Taylor Kelley',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© ' + new Date().getFullYear() + ' Taylor Kelley',
      required: true,
    },
    {
      name: 'navigation',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
          required: true,
        }
      ]
    },
    {
      name: 'connect',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
          required: true,
        }
      ]
    },
  ],
}
