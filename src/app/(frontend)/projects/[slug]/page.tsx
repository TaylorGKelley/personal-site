import { getPayload } from 'payload'
import configPromise from '@/payload.config'

async function getProjectPageData(slug: string) {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return data
}

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string }>
}) {
  const { preview } = await searchParams
  const { slug } = await params
  const projectData = await getProjectPageData(slug)

  if (!projectData) {
    return (
      <div>
        <h2>404</h2>
        <p>Project not found</p>
      </div>
    )
  }

  return <main>{JSON.stringify(projectData)}</main>
}
