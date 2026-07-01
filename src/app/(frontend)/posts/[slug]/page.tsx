import { getPayload } from 'payload'
import configPromise from '@/payload.config'

async function getPostPageData(slug: string) {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return data
}

export default async function PostsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string }>
}) {
  const { preview } = await searchParams
  const { slug } = await params
  const postData = await getPostPageData(slug)

  if (!postData) {
    return (
      <div>
        <h2>404</h2>
        <p>Post not found</p>
      </div>
    )
  }

  return <main>{JSON.stringify(postData)}</main>
}
