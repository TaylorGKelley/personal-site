import { getHomePage } from "@/actions/pages.globals"
import { RenderBlocks } from "@/components/blocks/Home";
import { ErrorState } from "@/components/ErrorState";
import { draftMode } from 'next/headers';

export default async function HomePage() {
  const { isEnabled } = await draftMode();
  const { data, error } = await getHomePage({ draft: isEnabled });

  return <main>
    {data ? <RenderBlocks blocks={data.content} /> : <ErrorState message={error} />}
  </main>
}
