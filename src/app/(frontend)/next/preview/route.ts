import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from '@/lib/payload'

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) {
    return new Response('Missing url param', { status: 400 })
  }

  const payload = await getPayload()
  const { user } = await payload.auth({ headers: req.headers })

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  ;(await draftMode()).enable()

  redirect(url)
}
