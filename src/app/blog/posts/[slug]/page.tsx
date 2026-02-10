import RenderMarkdown from "@/src/components/markdown/render-markdown";
import { fetchPost, fetchPostSlugs } from "@/src/utils/fetchPosts";
import formatDate from "@/src/utils/formatDate";
import ReactMarkdown from "react-markdown";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

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
      slug: slug.replace(/\.md$/, "").replace("/posts/", ""),
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
      <section>
        {post.youtube_url && (
          <div className="mx-auto w-min shadow-xl rounded-2xl overflow-hidden">
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
        <h2 className="text-8xl font-medium text-gray-900 mt-8 mb-4 text-center">
          {post.title}
        </h2>
        <h3 className="text-gray-600 text-xl mb-8 text-center">
          {formatDate(post.date)}
        </h3>
      </section>
      <section className="container mx-auto max-w-4xl">
        <RenderMarkdown>{post.content}</RenderMarkdown>
      </section>
    </div>
  );
}
