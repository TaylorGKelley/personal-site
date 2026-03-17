import RenderMarkdown from "@/src/components/markdown/render-markdown";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
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
    <main className="p-4 max-w-5xl mx-auto">
      <Link
        href="/"
        className="flex gap-2 items-center text-gray-600 hover:gap-3 transition-[gap] mb-4"
      >
        <ArrowLeftIcon />
        <span>Back Home</span>
      </Link>
      <RenderMarkdown>{content}</RenderMarkdown>
    </main>
  );
}
