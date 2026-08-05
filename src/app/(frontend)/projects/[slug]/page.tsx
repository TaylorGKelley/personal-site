import { getProject } from "@/actions/project.collections";
import { RenderBlocks } from "@/components/blocks/Projects";
import { PayloadIcon } from "@/components/PayloadIcon";
import { PayloadImage } from "@/components/PayloadImage";
import { Button } from "@/components/ui/button";
import { getPayload } from '@/lib/payload';
import { draftMode } from 'next/headers';
import Link from "next/link";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    select: { slug: true },
  })

  return docs.map((doc) => ({ slug: doc.slug }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();

  const { data: project, error } = await getProject(slug, { draft: preview });

  if (!project) {
    return (
      <main>
        <section className="w-full max-w-6xl mx-auto px-6 pt-16 pb-12 flex flex-col items-center text-center">
          <h3 className='text-4xl font-serif tracking-tight font-medium texto-neutral-900'>404</h3>
          <p>{error || 'Project not found'}</p>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="w-full max-w-6xl mx-auto px-6 pt-16 pb-12 flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-7xl font-serif tracking-tight font-medium text-neutral-900 max-w-4xl leading-[1.1] mb-6">
              {project.title}
            </h1>

            <div className="relative w-full aspect-4/3 md:aspect-video rounded-2xl overflow-hidden shadow-2xl p-8 mb-10">
              <PayloadImage
                media={project?.coverImage}
                className="object-cover rounded-xl"
              />
            </div>

            {(project.primaryCallToAction || project.secondaryCallToAction) && (
              <div className="flex flex-wrap items-center justify-center gap-4">
                {project.primaryCallToAction && (
                  <Link href={project.primaryCallToAction.link} target="_blank" className="cursor-pointer">
                    <Button className='px-8 py-6 rounded-full bg-neutral-950 text-white font-medium text-sm'>
                      <PayloadIcon name={project.primaryCallToAction.icon.name} />
                      {project.primaryCallToAction.text}
                    </Button>
                  </Link>
                )}
                {project.secondaryCallToAction && (
                  <Link href={project.secondaryCallToAction.link} target="_blank" className="cursor-pointer">
                    <Button className='px-8 py-6 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200 font-medium text-sm transition-colors hover:bg-neutral-200'>
                      <PayloadIcon name={project.secondaryCallToAction.icon.name} />
                      {project.secondaryCallToAction.text}
                    </Button>
                  </Link>
                )}
              </div>
            )}
      </section>
      <RenderBlocks blocks={project.layout} />
    </main>
  )
}
