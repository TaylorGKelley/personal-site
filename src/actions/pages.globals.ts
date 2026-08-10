'use server';

import { getPayload } from "@/lib/payload";
import { type FetchAction } from "./types";
import type { AboutPage, HomePage, Post, PostsPage} from "@/payload-types";

export const getHomePage: FetchAction<HomePage> = async (options) => {
  try {
    const payload = await getPayload();
    const data = await payload.findGlobal({
      slug: 'home-page',
      draft: options?.draft
    })

    return { data }
  } catch (error) {
    console.error('[getHomePage]', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

export const getAboutPage: FetchAction<AboutPage> = async (options) => {
  try {
    const payload = await getPayload();
    const data = await payload.findGlobal({
      slug: 'about-page',
      draft: options?.draft
    })

    return { data }
  } catch (error) {
    console.error('[getAboutPage]', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

export const getPostsPage: FetchAction<PostsPage> = async (options) => {
  try {
    const payload = await getPayload();
    const data = await payload.findGlobal({
      slug: 'posts-page',
      draft: options?.draft
    });

    return { data }
  } catch (error) {
    console.error('[getPostsPage]', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
