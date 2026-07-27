import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Category, Media } from '@/payload-types'
import Image from 'next/image'

export default async function PostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string }>
}) {
  const { slug } = await params
  const { preview } = await searchParams

  const payload = await getPayload({ config: configPromise })
  const now = new Date().toISOString()

  const { docs: posts } = await payload.find({
    collection: 'posts',
    limit: 1,
    draft: false,
    depth: 2,
    where: {
      _status: { equals: 'published' },
      publishedAt: { less_than_equal: now },
      slug: { equals: slug },
    },
  })

  const post = posts[0]
  if (!post) notFound()

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : ''

  const coverImage = post.coverImage as Media

  return (
    <article className="w-full max-w-3xl mx-auto px-6 py-16">
      <div className="mb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">
          {(post.category as Category).name}
          {formattedDate && <span> — {formattedDate}</span>}
        </div>

        <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-4">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-gray-600 text-lg leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </div>

      {coverImage?.url && (
        <div className="relative aspect-video mb-12 overflow-hidden rounded-lg">
          <Image
            src={coverImage.url}
            alt={coverImage.alt || post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="prose prose-gray max-w-none">
        <RichText data={post.content} />
      </div>
    </article>
  )
}
