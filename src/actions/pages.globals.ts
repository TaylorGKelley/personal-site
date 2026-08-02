'use server';

import { getPayload } from "@/lib/payload";
import { type FetchAction } from "./types";
import type { AboutPage, HomePage, Post, PostsPage} from "@/payload-types";

export const getHomePage: FetchAction<HomePage> = async () => {
  try {
    const payload = await getPayload();
    const data = await payload.findGlobal({
      slug: 'home-page',
    })

    return { data }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

export const getAboutPage: FetchAction<AboutPage> = async () => {
  try {
    const payload = await getPayload();
    const data = await payload.findGlobal({
      slug: 'about-page',
    })

    return { data }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

export const getPostsPage: FetchAction<PostsPage> = async () => {
  try {
    const payload = await getPayload();
    const data = await payload.findGlobal({
      slug: 'posts-page',
    });

    return { data }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
