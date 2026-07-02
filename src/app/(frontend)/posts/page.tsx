import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { RenderBlocks } from '@/components/RenderBlocks'

async function getPostsPageData() {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.findGlobal({
    slug: 'posts-page',
  })

  return data
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>
}) {
  const { preview } = await searchParams
  const postsData = await getPostsPageData()

  // Gracefully fallback if the posts page wasn't built yet
  if (!postsData) {
    return (
      <div className="py-24 text-center">
        <p>Please log in to the admin panel and add blocks to your Posts Global config.</p>
      </div>
    )
  }

  return (
    <main className="pt-32 pb-20 max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
      <header className="mb-16">
        <h1 className="font-display text-display mb-8">Technical Blog</h1>
        <div className="max-w-2xl">
          <div className="search-focus flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-4 h-14 transition-all duration-300">
            <span className="material-symbols-outlined text-outline mr-3">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 w-full text-body-lg placeholder:text-outline/50"
              placeholder="Search architecture, systems, frontend..."
              type="text"
            />
            <kbd className="hidden md:block bg-surface-container-high text-outline text-[10px] px-1.5 py-0.5 rounded font-code">
              CMD+K
            </kbd>
          </div>
        </div>
      </header>
      <div className="flex items-center gap-8 mb-12 border-b border-outline-variant/30 pb-4 overflow-x-auto hide-scrollbar">
        <button className="whitespace-nowrap text-primary font-semibold border-b-2 border-primary pb-4 -mb-[18px]">
          All
        </button>
        <button className="whitespace-nowrap text-secondary hover:text-primary transition-colors pb-4">
          Architecture
        </button>
        <button className="whitespace-nowrap text-secondary hover:text-primary transition-colors pb-4">
          Frontend
        </button>
        <button className="whitespace-nowrap text-secondary hover:text-primary transition-colors pb-4">
          Distributed Systems
        </button>
        <button className="whitespace-nowrap text-secondary hover:text-primary transition-colors pb-4">
          Performance
        </button>
        <button className="whitespace-nowrap text-secondary hover:text-primary transition-colors pb-4">
          DevOps
        </button>
      </div>
      <div className="space-y-0">
        <article className="group relative py-12 border-b border-outline-variant/30 transition-all duration-500 hover:bg-white/40 -mx-4 px-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4">
                <time className="font-code text-label-md text-outline">Oct 14, 2024</time>
                <span className="h-1 w-1 rounded-full bg-outline/30"></span>
                <span className="font-code text-label-md text-outline uppercase tracking-wider">
                  Systems
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md group-hover:text-on-tertiary-container transition-colors">
                <a className="after:absolute after:inset-0" href="/posts/this-is-a-slug">
                  The Calculus of Distributed Consensus
                </a>
              </h2>
              <p className="text-body-lg text-secondary max-w-3xl leading-relaxed">
                An in-depth exploration of Paxos versus Raft in high-throughput environments,
                analyzing the mathematical trade-offs between availability and strict consistency.
              </p>
            </div>
            <div className="md:text-right">
              <span className="font-label-md text-label-md text-outline bg-surface-container-high px-3 py-1 rounded-full">
                12 min read
              </span>
            </div>
          </div>
        </article>
        <article className="group relative py-12 border-b border-outline-variant/30 transition-all duration-500 hover:bg-white/40 -mx-4 px-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4">
                <time className="font-code text-label-md text-outline">Sep 28, 2024</time>
                <span className="h-1 w-1 rounded-full bg-outline/30"></span>
                <span className="font-code text-label-md text-outline uppercase tracking-wider">
                  Frontend
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md group-hover:text-on-tertiary-container transition-colors">
                <a className="after:absolute after:inset-0" href="#">
                  Architecting Micro-Frontends with Module Federation
                </a>
              </h2>
              <p className="text-body-lg text-secondary max-w-3xl leading-relaxed">
                How we decoupled a monolithic React application into independently deployable
                modules while maintaining a unified design system and state synchronization.
              </p>
            </div>
            <div className="md:text-right">
              <span className="font-label-md text-label-md text-outline bg-surface-container-high px-3 py-1 rounded-full">
                18 min read
              </span>
            </div>
          </div>
        </article>
        <article className="group relative py-12 border-b border-outline-variant/30 transition-all duration-500 hover:bg-white/40 -mx-4 px-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4">
                <time className="font-code text-label-md text-outline">Aug 12, 2024</time>
                <span className="h-1 w-1 rounded-full bg-outline/30"></span>
                <span className="font-code text-label-md text-outline uppercase tracking-wider">
                  Performance
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md group-hover:text-on-tertiary-container transition-colors">
                <a className="after:absolute after:inset-0" href="#">
                  0ms Latency: Myth or Engineering Reality?
                </a>
              </h2>
              <p className="text-body-lg text-secondary max-w-3xl leading-relaxed">
                A deep dive into edge computing, predictive pre-fetching, and the physical limits of
                network transmission in global application architectures.
              </p>
            </div>
            <div className="md:text-right">
              <span className="font-label-md text-label-md text-outline bg-surface-container-high px-3 py-1 rounded-full">
                9 min read
              </span>
            </div>
          </div>
        </article>
        <article className="group relative py-12 border-b border-outline-variant/30 transition-all duration-500 hover:bg-white/40 -mx-4 px-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4">
                <time className="font-code text-label-md text-outline">Jul 05, 2024</time>
                <span className="h-1 w-1 rounded-full bg-outline/30"></span>
                <span className="font-code text-label-md text-outline uppercase tracking-wider">
                  Architecture
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md group-hover:text-on-tertiary-container transition-colors">
                <a className="after:absolute after:inset-0" href="#">
                  The Industrial Design of APIs
                </a>
              </h2>
              <p className="text-body-lg text-secondary max-w-3xl leading-relaxed">
                Treating API surfaces like physical hardware products. Applying principles of
                ergonomics, durability, and discoverability to REST and GraphQL endpoints.
              </p>
            </div>
            <div className="md:text-right">
              <span className="font-label-md text-label-md text-outline bg-surface-container-high px-3 py-1 rounded-full">
                15 min read
              </span>
            </div>
          </div>
        </article>
      </div>
      <footer className="mt-20 flex justify-center">
        <nav className="flex items-center gap-1">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-on-primary font-label-md text-label-md">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-secondary hover:bg-surface-container-high transition-colors font-label-md text-label-md">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-secondary hover:bg-surface-container-high transition-colors font-label-md text-label-md">
            3
          </button>
          <span className="px-2 text-outline">...</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-secondary hover:bg-surface-container-high transition-colors font-label-md text-label-md">
            8
          </button>
        </nav>
      </footer>
    </main>
  )
}
