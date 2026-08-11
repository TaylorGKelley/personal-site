import type { MetadataRoute } from 'next'
import { getPayload } from '@/lib/payload'
import { getServerUrl } from '@/lib/metadata'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getServerUrl()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/posts`, lastModified: new Date() },
  ]

  try {
    const payload = await getPayload()
    const [{ docs: posts }, { docs: projects }] = await Promise.all([
      payload.find({
        collection: 'posts',
        draft: false,
        limit: 1000,
        where: {
          _status: { equals: 'published' },
          publishedAt: { less_than_equal: new Date().toISOString() },
        },
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: 'projects',
        draft: false,
        limit: 1000,
        select: { slug: true, updatedAt: true },
      }),
    ])

    return [
      ...staticRoutes,
      ...posts.map((post) => ({
        url: `${baseUrl}/posts/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      })),
      ...projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
      })),
    ]
  } catch (error) {
    console.error('[sitemap]', error)
    return staticRoutes
  }
}
