import { Experience } from "@/blocks/About/Experience";
import { Hobbies } from "@/blocks/About/Hobbies";
import { Skills } from "@/blocks/About/Skills";
import { Values } from "@/blocks/About/Values";
import { revalidateGlobal } from '@/lib/revalidate'
import type { GlobalConfig } from "payload";

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  hooks: {
    afterChange: [() => revalidateGlobal('/about')],
  },
  admin: {
      group: 'Navigation & Pages',
      livePreview: {
        url: () => {
          const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
          return `${baseUrl}/next/preview?url=${encodeURIComponent('/about')}`
        },
      },
    },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'blocks',
      unique: true,
      blocks: [Values, Skills, Experience, Hobbies],
    }
  ]
}
