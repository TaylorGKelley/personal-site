import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="container mx-auto">
      <section className="h-[40dvh] flex items-center justify-center bg-gray-100 rounded-3xl shadow-inner">
        <h2 className="text-6xl font-bold font-mono text-center">Blog</h2>
      </section>
      <section id="posts">
        <ul>
          <li>
            <Link href="/blog/posts/test-post">test post</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
