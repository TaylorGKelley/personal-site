import { cache } from 'react'
import type { Metadata } from 'next'
import type { Media, Post, Seo } from '@/payload-types'
import { getPayload } from '@/lib/payload'
import { extractYouTubeId, getYouTubeThumbnailUrl } from '@/utils/youtube'

export const getServerUrl = (): string =>
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const getSeo: () => Promise<Seo | null> = cache(async () => {
  try {
    const payload = await getPayload()
    return await payload.findGlobal({ slug: 'seo' })
  } catch (error) {
    console.error('[getSeo]', error)
    return null
  }
})

export function resolveMediaUrl(media: number | Media | null | undefined): string | null {
  if (!media || typeof media === 'number') return null
  const url = media.sizes?.hero?.url || media.url
  if (!url) return null
  if (/^https?:\/\//.test(url)) return url
  return new URL(url, getServerUrl()).toString()
}

const getYouTubeThumbnailQuality: (id: string) => Promise<'maxresdefault' | 'hqdefault'> = cache(
  async (id) => {
    try {
      const res = await fetch(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, { method: 'HEAD' })
      return res.ok ? 'maxresdefault' : 'hqdefault'
    } catch {
      return 'hqdefault'
    }
  },
)

export async function getYouTubeThumbnail(url?: string | null): Promise<string | null> {
  const id = extractYouTubeId(url)
  if (!id) return null
  const quality = await getYouTubeThumbnailQuality(id)
  return getYouTubeThumbnailUrl(url, quality)
}

type BuildMetadataOptions = {
  title?: string
  description?: string
  image?: string | null
  url?: string
  type?: 'website' | 'article'
  siteName?: string
  xHandle?: string
  publishedTime?: string
  authors?: string[]
  tags?: string[]
}

export async function buildMetadata(options: BuildMetadataOptions = {}): Promise<Metadata> {
  const seo = await getSeo()
  const baseUrl = getServerUrl()
  const canonical = new URL(options.url || '/', baseUrl).toString()
  const title = options.title || seo?.title || 'Taylor Kelley'
  const description = options.description || seo?.description || ''
  const image =
    options.image ?? (seo?.profileImage ? resolveMediaUrl(seo.profileImage) : null)
  const siteName = options.siteName || seo?.siteName || 'Taylor Kelley'
  const xHandle = options.xHandle || seo?.xHandle
  const type = options.type || 'website'

  const openGraph = {
    title,
    description,
    url: canonical,
    type,
    siteName,
    images: image ? [{ url: image }] : [],
    ...(type === 'article'
      ? {
          publishedTime: options.publishedTime,
          authors: options.authors,
          tags: options.tags,
        }
      : {}),
  }

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: { canonical },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      ...(xHandle ? { site: `@${xHandle}` } : {}),
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  }
}

export async function buildArticleJsonLd(post: Post): Promise<Record<string, unknown>> {
  const seo = await getSeo()
  const image = post.youtubeUrl
    ? await getYouTubeThumbnail(post.youtubeUrl)
    : resolveMediaUrl(post.coverImage)
  const author = typeof post.author === 'object' ? post.author : null
  const authorImage =
    author && author.avatar ? resolveMediaUrl(author.avatar as Media) : null

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: image ? [image] : undefined,
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || undefined,
    mainEntityOfPage: new URL(`/posts/${post.slug}`, getServerUrl()).toString(),
    author: {
      '@type': 'Person',
      name: author?.name || seo?.siteName || 'Taylor Kelley',
      ...(authorImage ? { image: authorImage } : {}),
    },
    publisher: {
      '@type': 'Person',
      name: seo?.siteName || 'Taylor Kelley',
    },
  }
}
