import BlogNavbar from "@/src/components/blog-navbar";
import Link from "next/link";

export default function BlogLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    <>
      <header className="flex justify-between items-center py-4 px-8">
        <h1 className="text-xl font-mono">
          <Link href="/">taylor_kelley</Link>
        </h1>
        <BlogNavbar />
      </header>
      <main className="flex flex-col p-8">{children}</main>
    </>
  );
}
