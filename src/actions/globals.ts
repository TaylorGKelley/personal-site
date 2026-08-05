'use server';

import { getPayload } from "@/lib/payload";
import { type FetchAction } from "./types";
import { type Footer, type Header } from "@/payload-types";

export const getHeader: FetchAction<Header> = async () => {
  try {
    const payload = await getPayload();
    const data = await payload.findGlobal({
      slug: 'header',
    })

    return { data }
  } catch (error) {
    console.error('[getHeader]', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

export const getFooter: FetchAction<Footer> = async () => {
  try {
    const payload = await getPayload();
    const data = await payload.findGlobal({
      slug: 'footer',
    })

    return { data }
  } catch (error) {
    console.error('[getFooter]', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
