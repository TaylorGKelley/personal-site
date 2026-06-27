import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { RenderBlocks } from '@/components/RenderBlocks'

async function getHomePageData() {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.findGlobal({
    slug: 'home-page',
  })

  return data
}

export default async function HomePage({
  searchParams
}: { searchParams: Promise<{ preview?: string }> }) {
  const {preview} = await searchParams
  const homeData = await getHomePageData()

  // Gracefully fallback if the home page wasn't built yet
  if (!homeData || homeData.layout.length === 0) {
    return (
      <div className="py-24 text-center">
        <p>Please log in to the admin panel and add blocks to your Home Global config.</p>
      </div>
    )
  }

  return (
    <main>
      <RenderBlocks initialLayout={homeData.layout} isPreview={preview === 'true'} />
    </main>
  )
}
