import { getHomePage } from "@/actions/pages.globals"
import { RenderBlocks } from "@/components/blocks/Home";
import { draftMode } from 'next/headers';

export default async function HomePage() {
  const { isEnabled } = await draftMode();
  const { data } = await getHomePage({ draft: isEnabled });

  return <main>
    {data && <RenderBlocks blocks={data.content} />}
  </main>
}
