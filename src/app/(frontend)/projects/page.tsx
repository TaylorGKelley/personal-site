import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { RenderBlocks } from '@/components/RenderBlocks'

async function getProjectsPageData() {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.findGlobal({
    slug: 'projects-page',
  })

  return data
}

export default async function ProjectsPage({
  searchParams
}: { searchParams: Promise<{ preview?: string }> }) {
  const {preview} = await searchParams
  const projectsData = await getProjectsPageData()

  // Gracefully fallback if the projects page wasn't built yet
  if (!projectsData) {
    return (
      <div className="py-24 text-center">
        <p>Please log in to the admin panel and add blocks to your Projects Global config.</p>
      </div>
    )
  }

  return (
    <main>
      {JSON.stringify(projectsData)}
    </main>
  )
}
