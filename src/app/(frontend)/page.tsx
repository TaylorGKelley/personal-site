import { getHomePage } from "@/actions/pages.globals"
import { RenderBlocks } from "@/components/blocks/Home";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>
}) {
  const { preview } = await searchParams
  const { data } = await getHomePage();

  return <main>
    {data && <RenderBlocks blocks={data.content} />}
  </main>
}
