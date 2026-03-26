import { fetchPost, fetchPostSlugs } from "@/src/utils/fetchPosts";
import Link from "next/link";
import { calculateTimeToRead } from "@/src/utils/helpers";
import PostThumbnail from "@/src/components/ui/post-thumbnail";
import formatDate from "@/src/utils/formatDate";

export const revalidate = 300; // Revalidate every 5 minutes

export default async function BlogPage() {
  const slugs = await fetchPostSlugs("TaylorGKelley", "personal-blog");
  const [recent, ...posts] = (
    await Promise.all(
      slugs.map(async (slug) => {
        const post = await fetchPost(
          "TaylorGKelley",
          "personal-blog",
          `${slug}.md`,
        );
        return post !== null ? { slug, ...post } : null;
      }),
    )
  ).filter((post) => post !== null);

  if (!recent) return <>No posts have been made yet!</>;

  return (
    <main className="container mx-auto">
      <section
        id="recent-post"
        className="py-24 flex justify-center items-center"
      >
        <Link
          href={`/blog/${recent.slug}`}
          className="grid lg:grid-cols-2 gap-8 justify-center items-center cursor-pointer"
        >
          <PostThumbnail youtubeUrl={recent.youtube_url} className="m-auto" />
          <div className="grid gap-4">
            <h1 className="font-mono font-black text-4xl lg:text-5xl">
              {recent.title}
            </h1>
            <p className="text-gray-600">{recent.description}</p>
            <div className="text-base flex gap-4 text-gray-700">
              <p>{`Posted on ${formatDate(recent.date, {
                day: "2-digit",
                month: "2-digit",
                // year: "numeric",
              })}`}</p>
              <span className="bg-gray-400 w-0.5 h-full block"></span>
              <p>{`${calculateTimeToRead(recent.content)} min read`}</p>
            </div>
          </div>
        </Link>
      </section>
      {posts.length > 0 && (
        <section id="posts" className="px-4">
          <h2 className="font-mono font-medium text-3xl mb-12">
            Previous Posts
          </h2>
          <ul className="grid gap-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex flex-wrap gap-6 items-center cursor-pointer"
                >
                  <PostThumbnail
                    youtubeUrl={post.youtube_url}
                    className="w-xs"
                  />
                  <div className="grid gap-4">
                    <h4 className="text-2xl font-mono font-semibold">
                      {post.title}
                    </h4>
                    <p className="text-gray-700">{post.description}</p>
                    <div className="text-base text-gray-700 flex gap-4">
                      <p>{`Posted on ${formatDate(recent.date, {
                        day: "2-digit",
                        month: "2-digit",
                        // year: "numeric",
                      })}`}</p>
                      <span className="bg-gray-400 w-0.5 h-full block"></span>
                      <p>{`${calculateTimeToRead(recent.content)} min read`}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
