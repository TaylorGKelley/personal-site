import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import type { Category } from '@/payload-types'

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>
}) {
  const { preview } = await searchParams

  const payload = await getPayload({ config: configPromise })
  const now = new Date().toISOString()
  const { docs: posts } = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    draft: false,
    depth: 1,
    where: {
      _status: { equals: 'published' },
      publishedAt: { less_than_equal: now },
    },
  })

  return (
    <main className="w-full max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-12">
        Blog
      </h1>

      <div className="divide-y divide-gray-200/60">
        {posts.map((post) => {
          const formattedDate = post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : ''

          return (
            <article key={post.id} className="py-8 group">
              <Link href={`/posts/${post.slug}`} className="block">
                <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
                  {post.category && <span>{(post.category as Category).name}</span>}
                  {post.category && formattedDate && <span> — </span>}
                  {formattedDate && <span>{formattedDate}</span>}
                </div>

                <h2 className="text-2xl font-serif font-medium tracking-tight mb-2 group-hover:text-gray-600 transition-colors">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            </article>
          )
        })}
      </div>
    </main>
  )
}
