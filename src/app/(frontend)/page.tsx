import { getHomePage } from "@/actions/pages.globals"
import { RenderBlocks } from "@/components/blocks/Home";
import { ErrorState } from "@/components/ErrorState";
import { draftMode } from 'next/headers';
import type { Metadata } from 'next';
import { buildMetadata, getSeo } from "@/lib/metadata";
import type { HeroBlock } from "@/payload-types";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo()
  const { data } = await getHomePage({ draft: false })
  const hero = data?.content?.find((block): block is HeroBlock => block.blockType === 'hero')

  return buildMetadata({
    title: 'Portfolio | Taylor Kelley',
    description: hero?.subheading || seo?.description || undefined,
    url: '/',
  })
}

export default async function HomePage() {
  const { isEnabled } = await draftMode();
  const { data, error } = await getHomePage({ draft: isEnabled });

  return <main>
    {data ? <RenderBlocks blocks={data.content} /> : <ErrorState message={error} />}
  </main>
}
