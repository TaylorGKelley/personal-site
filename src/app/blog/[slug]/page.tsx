import RenderMarkdown from "@/src/components/markdown/render-markdown";
import { fetchPost, fetchPostSlugs } from "@/src/utils/fetchPosts";
import formatDate from "@/src/utils/formatDate";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300; // Revalidate every 5 minutes

export async function generateStaticParams(): Promise<
  Awaited<PostPageProps["params"]>[]
> {
  try {
    const slugs = await fetchPostSlugs("TaylorGKelley", "personal-blog", {
      branch: "main",
      path: "posts",
      token: process.env.GITHUB_ACCESS_TOKEN,
    });

    return slugs.map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await fetchPost("TaylorGKelley", "personal-blog", `${slug}.md `);

  return !post ? (
    <>404</>
  ) : (
    <div className="mx-auto conainer">
      <section
        id="title"
        className="min-h-[40dvh] py-16 flex flex-col justify-center items-center"
      >
        <h2 className="text-6xl font-black font-mono text-gray-900 mt-8 text-center mb-6">
          {post.title}
        </h2>
        <h3 className="text-gray-600 text-2xl mb-6">{post.description}</h3>
        <h4 className="text-gray-600 text-xl mb-8 text-center">
          {formatDate(post.date)}
        </h4>
      </section>
      <section id="heading" className="mb-24">
        {post.youtube_url && (
          <div className="mx-auto w-min shadow rounded-2xl overflow-hidden">
            <iframe
              width="720"
              height="405"
              src={post.youtube_url}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </section>
      <section id="flex gap-8">
        <aside>
          <nav></nav>
        </aside>
        <article id="post" className="container mx-auto max-w-4xl">
          <RenderMarkdown>{post.content}</RenderMarkdown>
        </article>
      </section>
    </div>
  );
}
