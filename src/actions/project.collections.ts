'use server';

import { getPayload } from "@/lib/payload";
import { type FetchAction } from "./types";
import type { Project } from "@/payload-types";

export const getProject: (slug: string, options?: { preview: string }) => ReturnType<FetchAction<Project>> = async (slug: string, options?: { preview: string }) => {
  try {
    const payload = await getPayload();
    const { docs: [data] } = await payload.find({
      collection: 'projects',
      draft: options?.preview === 'true',
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    if (!data) throw new Error('Project not found')

    return { data }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
