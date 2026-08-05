import { getHomePage } from "@/actions/pages.globals"
import { RenderBlocks } from "@/components/blocks/Home";

type HomePageProps = {
  searchParams: Promise<{ preview?: string }>
};

export default async function HomePage({
  searchParams,
}: HomePageProps) {
  const { preview } = await searchParams;
  const { data } = await getHomePage({ preview });

  return <main>
    {data && <RenderBlocks blocks={data.content} />}
  </main>
}
