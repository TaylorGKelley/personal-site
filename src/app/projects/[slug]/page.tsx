import RenderMarkdown from "@/src/components/markdown/render-markdown";
import fs from "node:fs";
import path from "node:path";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const content = fs
    .readFileSync(path.join(process.cwd(), "public", "projects", `${slug}.md`))
    .toString("utf-8");

  return (
    <main className="p-4">
      <RenderMarkdown>{content}</RenderMarkdown>
    </main>
  );
}
