import Link from 'next/link';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { RichText } from '@payloadcms/richtext-lexical/react';

import type { Media, Post, User } from '@/payload-types';
import { lexicalToMarkdownAsync, extractHeadingsFromMarkdown, calculateReadTimeAsync } from '@/utils/posts';
import { customConverters } from '@/components/rich-text';
import { ActionButtons } from './components/ActionButtons';
import { TableOfContents } from './components/TableOfContents';
import { getPayload } from '@/lib/payload';
import { ErrorState } from '@/components/ErrorState';
import { PayloadImage } from '@/components/PayloadImage';
import { Button } from '@/components/ui/button';
import { VideoEmbed } from '@/components/VideoEmbed';

type BlogPostPage = {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    where: {
      _status: { equals: 'published' },
      publishedAt: { less_than_equal: new Date().toISOString() },
    },
    select: { slug: true },
  })

  return docs.map((doc) => ({ slug: doc.slug }))
}

export default async function BlogPostPage({params}: BlogPostPage) {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();

  const payload = await getPayload();
  let allPosts: Post[] = []
  try {
    const { docs } = await payload.find({
      collection: 'posts',
      sort: '-publishedAt',
      draft: preview,
      depth: 2,
      where: preview
        ? { slug: { equals: slug } }
        : {
            slug: { equals: slug },
            _status: { equals: 'published' },
            publishedAt: { less_than_equal: new Date().toISOString() },
          },
    })
    allPosts = docs
  } catch (error) {
    return (
      <main className="min-h-screen bg-neutral-50/50 py-12 text-neutral-900 antialiased">
        <div className="container mx-auto max-w-6xl px-6 sm:px-8">
          <ErrorState message={error instanceof Error ? error.message : String(error)} />
        </div>
      </main>
    )
  }

  const post = allPosts[0];
  if (!post) notFound();
  const categoryName = typeof post.category === 'object' ? post.category.name : 'Article';

  const markdownText = await lexicalToMarkdownAsync(post.content);
  const headings = extractHeadingsFromMarkdown(markdownText);

  return (
    <main className="min-h-screen bg-neutral-50/50 py-12 text-neutral-900 antialiased">
      <div className="container mx-auto max-w-6xl px-6 sm:px-8">
        <Link
          href="/posts"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Back to Blog
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-neutral-400 mb-4">
            <span className="rounded bg-neutral-200/60 px-2 py-0.5 text-[11px] font-semibold text-neutral-700">
              {categoryName}
            </span>
            <span>•</span>
            <time>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</time>
            <span>•</span>
            <span>{await calculateReadTimeAsync(post.content)} min read</span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl leading-[1.15] mb-8">
            {post.title}
          </h1>
          <div className="flex items-center justify-between border-t border-b border-neutral-200/60 py-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-neutral-200">
                {(post.author as User).avatar && <PayloadImage media={(post.author as User).avatar as Media} />}
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-neutral-900">{(post.author as User).name}</p>
                {(post.author as User).title && <p className="font-mono text-xs text-neutral-400">{(post.author as User).title}</p>}
              </div>
            </div>

            <ActionButtons markdownContent={markdownText} />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <TableOfContents headings={headings} />
          </aside>
          <article className="lg:col-span-9 max-w-none">
            <VideoEmbed youtubeUrl={post.youtubeUrl || null} />

            <RichText
              data={post.content}
              converters={customConverters}
            />

            {post.xUrl && post.xUrl !== '' &&
            <div className="mt-12 text-center">
              <Link
                href={`https://x.com/intent/tweet?text=${encodeURIComponent(`"${post.title}" by ${(post.author as User).name}`)}&url=${encodeURIComponent(`https://taylorgkelley.com/posts/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="gap-2.5 px-6 py-3 h-auto border-neutral-400 hover:border-neutral-600"
              >
                Discuss this post on
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Button>
              </Link>
            </div>
            }
          </article>
        </div>
      </div>
    </main>
  );
}
