export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>
}) {
  const { preview } = await searchParams

  return <main>
    <h1 className="text-5xl">Welcome to my portfolio.</h1>
  </main>
}
