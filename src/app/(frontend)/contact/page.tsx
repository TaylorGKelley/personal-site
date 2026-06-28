import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { RenderBlocks } from '@/components/RenderBlocks'

async function getContactPageData() {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.findGlobal({
    slug: 'contact-page',
  })

  return data
}

export default async function ContactPage({
  searchParams
}: { searchParams: Promise<{ preview?: string }> }) {
  const {preview} = await searchParams
  const contactData = await getContactPageData()

  // Gracefully fallback if the contact page wasn't built yet
  if (!contactData) {
    return (
      <div className="py-24 text-center">
        <p>Please log in to the admin panel and add blocks to your Contact Global config.</p>
      </div>
    )
  }

  return (
    <main>
      {JSON.stringify(contactData)}
    </main>
  )
}
