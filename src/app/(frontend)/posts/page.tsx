import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { RenderBlocks } from '@/components/RenderBlocks'

async function getPostsPageData() {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.findGlobal({
    slug: 'posts-page',
  })

  return data
}

export default async function PostsPage({
  searchParams
}: { searchParams: Promise<{ preview?: string }> }) {
  const {preview} = await searchParams
  const postsData = await getPostsPageData()

  // Gracefully fallback if the posts page wasn't built yet
  if (!postsData) {
    return (
      <div className="py-24 text-center">
        <p>Please log in to the admin panel and add blocks to your Posts Global config.</p>
      </div>
    )
  }

  return (
    <main>
      {JSON.stringify(postsData)}
    </main>
  )
}
