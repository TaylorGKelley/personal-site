'use server';

import { getPayload } from "@/lib/payload";
import { type FetchAction } from "./types";
import type { Project } from "@/payload-types";

export const getProject: (slug: string) => ReturnType<FetchAction<Project>> = async (slug: string) => {
  try {
    const payload = await getPayload();
    const { docs: [data] } = await payload.find({
      collection: 'projects',
      where: {
        slug: {
          equals: slug,
        },
        _status: {
          equals: 'published',
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
