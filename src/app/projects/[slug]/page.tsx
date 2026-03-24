import RenderMarkdown from "@/src/components/markdown/render-markdown";
import matter from "gray-matter";
import { ArrowLeftIcon, ExternalLinkIcon, GithubIcon } from "lucide-react";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "public", "projects"));
  return files.map((file) => ({ slug: file.replace(".md", "") }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const raw = fs
    .readFileSync(path.join(process.cwd(), "public", "projects", `${slug}.md`))
    .toString("utf-8");
  const { data, content } = matter(raw);

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <section className="flex flex-col py-8">
        <Link
          href="/"
          className="flex gap-2 items-center text-gray-600 hover:gap-3 transition-[gap] mb-4"
        >
          <ArrowLeftIcon className="size-5" />
          <span>Back Home</span>
        </Link>
        <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
          {data.title}
        </h1>
        <div className="flex gap-2">
          <Link
            href={data.preview_url}
            className="flex gap-2 px-4 py-3 rounded-xl bg-gray-800 text-gray-50 transition-colors hover:bg-gray-700"
          >
            <ExternalLinkIcon />
            <span>Preview</span>
          </Link>
          <Link
            href={data.github_url}
            className="flex gap-2 px-4 py-3 rounded-xl bg-transparent text-gray-700 border border-gray-700 transition-colors hover:bg-gray-400/10"
          >
            <GithubIcon />
            <span>View source code</span>
          </Link>
        </div>
      </section>
      <section>
        <RenderMarkdown>{content}</RenderMarkdown>
      </section>
    </main>
  );
}
