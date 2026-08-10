'use server';

import { getPayload } from "@/lib/payload";
import { type FetchAction } from "./types";
import type { Project } from "@/payload-types";

export const getProject: (slug: string, options?: { draft?: boolean }) => ReturnType<FetchAction<Project>> = async (slug, options) => {
  try {
    const payload = await getPayload();
    const { docs: [data] } = await payload.find({
      collection: 'projects',
      draft: options?.draft,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    if (!data) throw new Error('Project not found')

    return { data }
  } catch (error) {
    console.error('[getProject]', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
