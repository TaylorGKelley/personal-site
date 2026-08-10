import type { Post } from '@/payload-types'
import { BlogFilters } from './components/Filters'
import { LoadMoreButton } from './components/LoadMoreButton'
import { getCategoryName } from '@/utils/categories'
import { getPayload } from '@/lib/payload'
import { ArrowRightIcon, PlayCircleIcon } from 'lucide-react'
import { calculateReadTimeAsync } from '@/utils/posts'
import Link from 'next/link'
import { getPostsPage } from '@/actions/pages.globals'
import { ErrorState } from '@/components/ErrorState'
import { draftMode } from 'next/headers'
import type { Where } from 'payload'

const PER_PAGE = 6

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

type PaginationSearchParams = {
  q?: string
  category?: string
  page?: string
}

type BlogPageProps = {
  searchParams: Promise<PaginationSearchParams>
}

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {
  const { q = '', category, page: pageParam } = await searchParams
  const { isEnabled: preview } = await draftMode();

  const { data: page, error: pageError } = await getPostsPage({ draft: preview });
  if (pageError && !page) {
    return (
      <main className="mx-auto container max-w-6xl px-5 pt-12 pb-24">
        <ErrorState message={pageError} />
      </main>
    )
  }

  let loadError: string | undefined
  let payload: Awaited<ReturnType<typeof getPayload>>
  try {
    payload = await getPayload();
  } catch (error) {
    loadError = error instanceof Error ? error.message : String(error)
    return (
      <main className="mx-auto container max-w-6xl px-5 pt-12 pb-24">
        <ErrorState message={loadError} />
      </main>
    )
  }

  const selectedCategories: string[] =
    category == null
      ? []
      : (Array.isArray(category) ? category : category.split(','))
          .map((c) => c.trim())
          .filter(Boolean)

  const isFiltered = q.trim() !== '' || selectedCategories.length > 0

  const currentPage = Math.max(1, Number(pageParam) || 1)

  const publishedConditions: Where[] = [
    { _status: { equals: 'published' } },
    { publishedAt: { less_than_equal: new Date().toISOString() } },
  ]

  let featuredPost: Post | null = null
  let featuredId: number | null = null

  if (!isFiltered) {
    if (page?.featured && typeof page.featured === 'object') {
      featuredPost = page.featured
      featuredId = featuredPost.id
    } else {
      try {
        const { docs: featuredDocs } = await payload.find({
          collection: 'posts',
          sort: '-publishedAt',
          draft: preview,
          depth: 2,
          limit: 1,
          where: { and: publishedConditions },
        })
        featuredPost = featuredDocs[0] ?? null
        featuredId = featuredPost?.id ?? null
      } catch (error) {
        loadError = error instanceof Error ? error.message : String(error)
      }
    }
  }

  const conditions: Where[] = [...publishedConditions]

  if (q.trim() !== '') {
    conditions.push({
      or: [
        { title: { contains: q } },
        { excerpt: { contains: q } },
      ],
    })
  }

  if (selectedCategories.length > 0) {
    conditions.push({
      or: selectedCategories.map((cat) => ({ 'category.name': { equals: cat } })),
    })
  }

  if (featuredId != null) {
    conditions.push({ id: { not_equals: featuredId } })
  }

  let posts: Post[] = []
  let totalDocs = 0

  try {
    const res = await payload.find({
      collection: 'posts',
      sort: '-publishedAt',
      draft: preview,
      depth: 2,
      limit: PER_PAGE * currentPage,
      page: 1,
      where: { and: conditions },
    })
    posts = res.docs
    totalDocs = res.totalDocs
  } catch (error) {
    loadError = error instanceof Error ? error.message : String(error)
  }

  const hasNext = currentPage * PER_PAGE < totalDocs

  let allCategoryNames: string[] = []
  try {
    const { docs: categories } = await payload.find({
      collection: 'categories',
      limit: 0,
      sort: 'name',
    })
    allCategoryNames = categories.map((c) => c.name)
  } catch (error) {
    loadError = error instanceof Error ? error.message : String(error)
  }

  const nextPageHref = `?${new URLSearchParams({
    ...(q ? { q } : {}),
    ...(selectedCategories.length
      ? { category: selectedCategories.join(',') }
      : {}),
    page: String(currentPage + 1),
  }).toString()}`

  if (loadError) {
    return (
      <main className="mx-auto container max-w-6xl px-5 pt-12 pb-24">
        <ErrorState message={loadError} />
      </main>
    )
  }

  return (
    <main className="mx-auto container max-w-6xl px-5 pt-12 pb-24">
      {/* Page header */}
      <header className="mb-12">
        <h1 className="mb-3 font-serif text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          {page?.title}
        </h1>
        <p className="max-w-[52ch] text-base leading-relaxed text-gray-500">
          {page?.subtitle}
        </p>
      </header>

      <div className="mb-12">
        <BlogFilters
          allCategories={allCategoryNames}
          selectedCategories={selectedCategories}
          searchQuery={q}
        />
      </div>

      {featuredPost && <FeaturedPost post={featuredPost} />}

      <p className="mb-8 text-[0.65rem] font-semibold uppercase tracking-widest text-gray-400">
        {isFiltered ? 'Results' : 'Recent Posts'}
      </p>

      {posts.length > 0 ? (
        <ol className="m-0 list-none p-0">
          {posts.map((post, i) => (
            <li key={post.id}>
              <PostCard post={post} isLast={i === posts.length - 1} />
            </li>
          ))}
        </ol>
      ) : (
        <div className="py-16 text-center text-sm text-gray-500">
          <p className="mb-3">No articles match your search.</p>
          <Link href="/posts" className="text-xs text-gray-900 underline">
            Clear filters
          </Link>
        </div>
      )}

      {posts.length > 0 && (
        <div className="mt-16 text-center">
          {hasNext ? (
            <LoadMoreButton href={nextPageHref} />
          ) : null}
        </div>
      )}
    </main>
  )
}

function FeaturedPost({ post }: { post: Post }) {
  const categoryName = getCategoryName(post.category)
  const hasVideo = Boolean(post.youtubeUrl)

  return (
    <section
      aria-label="Featured article"
      className="mb-12 border-b border-gray-200 pb-12"
    >
      <div className="mb-2 flex items-center gap-2">
        {/*<span className="rounded bg-gray-900 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-white">
          Featured
        </span>*/}
        {categoryName && (
          <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-indigo-500">
            {categoryName}
          </span>
        )}
        {hasVideo && (
          <span className="inline-flex items-center gap-1 rounded border border-gray-200 bg-muted text-muted-foreground px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider">
            <PlayCircleIcon className="size-3" />
            Video
          </span>
        )}
        {post.publishedAt && (
          <span className="text-xs text-gray-400">{formatDate(post.publishedAt)}</span>
        )}
      </div>

      <h2 className="mb-3 font-serif text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
        {post.title}
      </h2>

      <p className="mb-5 max-w-[60ch] text-base leading-relaxed text-gray-500">
        {post.excerpt}
      </p>

      <Link
        href={`/posts/${post.slug}`}
        className="inline-flex items-center gap-1 hover:gap-1.5 transition-[gap] text-[0.78rem] font-semibold uppercase tracking-wider text-gray-900 no-underline"
      >
        <span>Read article</span>
        <ArrowRightIcon className="size-4" />
      </Link>
    </section>
  )
}

async function PostCard({ post, isLast }: { post: Post; isLast: boolean }) {
  const categoryName = getCategoryName(post.category)
  const hasVideo = Boolean(post.youtubeUrl)

  return (
    <article className={!isLast ? 'mb-10 border-b border-gray-200 pb-10' : undefined}>
      <div className="mb-2 flex items-center gap-2">
        {categoryName && (
          <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-indigo-500">
            {categoryName}
          </span>
        )}
        {hasVideo && (
          <span className="inline-flex items-center gap-1 rounded border border-gray-200 bg-muted text-muted-foreground px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider">
            <PlayCircleIcon className="size-3" />
            Video
          </span>
        )}
      </div>

      <h3 className="mb-2 font-serif text-2xl font-bold leading-snug tracking-tight text-gray-900 md:text-3xl">
        <Link href={`/posts/${post.slug}`} className="text-inherit no-underline">
          {post.title}
        </Link>
      </h3>

      <p className="max-w-[64ch] text-sm leading-relaxed text-gray-500">
        {post.excerpt}
      </p>

      <p className="mt-4 inline-flex gap-1 items-center text-xs text-gray-400 uppercase">
        <span>{`${await calculateReadTimeAsync(post.content)} min read`}</span>
        <span>&nbsp;&ndash;&nbsp;</span>
        <span>{formatDate(post.publishedAt!)}</span>
      </p>
    </article>
  )
}
