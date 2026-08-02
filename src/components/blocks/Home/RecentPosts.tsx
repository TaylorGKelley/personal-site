import type { Category, RecentPostsBlock } from '@/payload-types';
import Link from 'next/link';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { ArrowUpRightIcon } from 'lucide-react';

export type RecentPostsProps = RecentPostsBlock;

export const RecentPosts: React.FC<RecentPostsProps> = async ({
  title,
  subtitle,
  viewAllText,
  displayCount,
}) => {
  const payload = await getPayload({ config: configPromise });
  const now = new Date().toISOString()
  const { docs: posts } = await payload.find({
    collection: 'posts',
    limit: displayCount || 3,
    sort: '-publishedAt',
    draft: false,
    where: {
      _status: { equals: 'published' },
      publishedAt: { less_than_equal: now },
    },
  });

  return (
    <section className="w-full px-6 md:px-12 py-20 bg-secondary text-secondary-foreground">
      <div className="container mx-auto grid gap-16 max-w-6xl">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between">
        <div className="grid gap-2">
          <h2 className="text-5xl md:text-5xl font-serif font-medium tracking-tight mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 text-sm md:text-base font-sans">
              {subtitle}
            </p>
          )}
        </div>

        <Link
          href="/posts"
          className="mt-6 sm:mt-0 inline-flex items-center gap-1 text-xs uppercase tracking-widest font-mono text-gray-800 hover:text-black hover:underline transition-colors whitespace-nowrap group"
        >
          <span>{viewAllText}</span>
          <ArrowUpRightIcon className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Posts List */}
      <div className="grid gap-10 divide-y divide-gray-200/60 group">
        {posts.map((post) => {
          // Format date (e.g., OCT 2024)
          const formattedDate = post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              }).toUpperCase()
            : '';

          return (
            <article key={post.id} className="pb-10 group cursor-pointer">
              <Link href={`/posts/${post.slug || post.id}`}>
                {/* Meta Category & Date */}
                <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">
                  {post.category && <span>{(post.category as Category).name}</span>}
                  {post.category && formattedDate && <span> — </span>}
                  {formattedDate && <span>{formattedDate}</span>}
                </div>

                {/* Post Title */}
                <h3 className="text-3xl md:text-4xl font-serif font-medium tracking-tight mb-3 group-hover:text-muted-foreground transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt / Description */}
                {post.excerpt && (
                  <p className="text-gray-600 text-sm md:text-base max-w-3xl leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            </article>
          );
        })}
        </div>
      </div>
    </section>
  );
}

export default RecentPosts;
