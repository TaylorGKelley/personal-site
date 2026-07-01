import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { RenderBlocks } from '@/components/RenderBlocks'

async function getProjectsPageData() {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.findGlobal({
    slug: 'projects-page',
  })

  return data
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>
}) {
  const { preview } = await searchParams
  const projectsData = await getProjectsPageData()

  // Gracefully fallback if the projects page wasn't built yet
  if (!projectsData) {
    return (
      <div className="py-24 text-center">
        <p>Please log in to the admin panel and add blocks to your Projects Global config.</p>
      </div>
    )
  }

  return (
    <main className="pt-32 pb-40">
      <header className="max-w-[1200px] mx-auto px-margin-mobile md:px-gutter mb-20 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-end">
          <div className="md:col-span-8">
            <h1 className="font-display text-[60px] md:text-display leading-none mb-6">
              Selected
              <br />
              Works
            </h1>
          </div>
          <div className="md:col-span-4 md:pb-4">
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              A curated archive of software engineering projects exploring architectural systems,
              distributed infrastructure, and high-performance UI.
            </p>
          </div>
        </div>
        <div className="hairline-divider mt-16"></div>
      </header>
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          <article className="project-card group cursor-pointer">
            <div className="aspect-video mb-8 overflow-hidden rounded-xl bg-surface-container border border-outline-variant transition-all duration-500">
              <img
                className="project-image w-full h-full object-cover transition-transform duration-700 ease-out"
                data-alt="A clean high-fidelity mockup of a sophisticated cloud infrastructure dashboard on a sleek dark-mode monitor. The interface features complex data visualizations, server health nodes, and real-time traffic graphs in a monochromatic charcoal and primary black palette. The lighting is soft and studio-like, emphasizing the minimalist hardware design of the workstation. The overall aesthetic is professional, architectural, and premium."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC89oJ3QkKsT30XME-OKC9XN8vrmpW8kF0SVR9ocBxVl4oV6eLa5Ak8Gfm80WJQGCfC1ptxPwmwCwqyajqV8fu6_jKkxnl6SDD4BwQ8Bgt9wmyBYXR5i_WaEvDKJOeTMQFCfF-WmFzIyt9k-pBRQyTybxqESVXgNnrEPVIBiKiX-2tyV6ORZJYxWj238IXvRqAgYP_ytZAXDR5lKCcey-etFEXfXxg6GcWzug_GDuTcZT-uFqxIU2sW7rtUb77ji6EFGow9HMWVS4c"
              />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-1">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
                  01 / Infrastructure
                </span>
                <h3 className="font-headline-md text-headline-md">Nexus Core</h3>
              </div>
              <span className="font-code text-code text-on-surface-variant">2024</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-md">
              A proprietary distributed system orchestrator designed for ultra-low latency
              transaction processing. Built with Rust and Kubernetes for high-scale financial
              environments.
            </p>
            <div className="flex gap-2">
              <span className="bg-surface-container-high px-3 py-1 rounded text-[12px] font-semibold text-secondary uppercase tracking-tight">
                Rust
              </span>
              <span className="bg-surface-container-high px-3 py-1 rounded text-[12px] font-semibold text-secondary uppercase tracking-tight">
                GRPC
              </span>
              <span className="bg-surface-container-high px-3 py-1 rounded text-[12px] font-semibold text-secondary uppercase tracking-tight">
                WASM
              </span>
            </div>
          </article>
          <article className="project-card group cursor-pointer md:mt-32">
            <div className="aspect-video mb-8 overflow-hidden rounded-xl bg-surface-container border border-outline-variant transition-all duration-500">
              <img
                className="project-image w-full h-full object-cover transition-transform duration-700 ease-out"
                data-alt="A macro close-up of a high-end mobile application showing an elegant financial trading interface on an iPhone 15 Pro. The screen displays minimal typography and fluid glassmorphic cards representing asset portfolios. The surrounding environment is a soft-focus, neutral gray workspace with professional studio lighting. The color scheme is strictly soft warm grays and deep charcoal text, reflecting a premium engineering aesthetic."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRPFGnhkogHFpZAWzhhNwn3sIhnICvSsgboiQFPXZ1mwk4OUmKXX8EK6io6wz6nrHClNSW-1UPXQ3vBnEfrV8xbPgsNpV078GngHDnfn1Ci1I8vYLUp9zRV_5olDn0aH6P64qX6Hk9e4f7eXcbUVgealohPgrPijuhAtwckmvYNFCJSgBDboddpirqkIrVENG9B3VicO4XNnuMnUSUzJCqBLk7qz8arxKmtZJZ_VUoSzevSvwctpV7RPXVyQWzAViHQSzA12eOpzg"
              />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-1">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
                  02 / FinTech
                </span>
                <h3 className="font-headline-md text-headline-md">Lumen Finance</h3>
              </div>
              <span className="font-code text-code text-on-surface-variant">2023</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-md">
              Re-engineering the core ledger for a global neo-bank. Implemented event-sourcing
              patterns to ensure 100% data consistency across regional shards.
            </p>
            <div className="flex gap-2">
              <span className="bg-surface-container-high px-3 py-1 rounded text-[12px] font-semibold text-secondary uppercase tracking-tight">
                Go
              </span>
              <span className="bg-surface-container-high px-3 py-1 rounded text-[12px] font-semibold text-secondary uppercase tracking-tight">
                Kafka
              </span>
              <span className="bg-surface-container-high px-3 py-1 rounded text-[12px] font-semibold text-secondary uppercase tracking-tight">
                PostgreSQL
              </span>
            </div>
          </article>
          <div className="md:col-span-2 hairline-divider my-12"></div>
          <article className="project-card group cursor-pointer">
            <div className="aspect-video mb-8 overflow-hidden rounded-xl bg-surface-container border border-outline-variant transition-all duration-500">
              <img
                className="project-image w-full h-full object-cover transition-transform duration-700 ease-out"
                data-alt="A minimalist architectural visualization of a server farm rack represented as glowing abstract 3D boxes in a dark void. The lighting is focused and dramatic, using subtle blue and white tones to highlight precision and scale. This represents a backend system architecture project. The style is modernist and editorial, fitting for a high-end engineering portfolio."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmGq86SdtPMo6JBcm164MGz8a81laTjNDyakf1eHxgEc7Ni14UzMoIe21UgBBJgN7ILx5pJ53E5xO6sENxAMTYZkrLagJ4U6uNswO5iZWClRufD2GthbU5zwqJh6xL7BJFdL5hB-qGmOcTVu0Su2ZxlQyEDu4TZdU865H_wV62_8BMg7goHkWMWIYKS6dn_0aS2ZZn0NoelygkBA2fOBic7IrP3xphvimtYxwutxnJcO46cH8PQhx4xC-IRk53oVc6mNZrBk2wc-k"
              />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-1">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
                  03 / Platform
                </span>
                <h3 className="font-headline-md text-headline-md">Aura API</h3>
              </div>
              <span className="font-code text-code text-on-surface-variant">2023</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-md">
              A developer-first API gateway focusing on declarative routing and automatic
              documentation generation. Used by over 500 internal microservices.
            </p>
            <div className="flex gap-2">
              <span className="bg-surface-container-high px-3 py-1 rounded text-[12px] font-semibold text-secondary uppercase tracking-tight">
                TypeScript
              </span>
              <span className="bg-surface-container-high px-3 py-1 rounded text-[12px] font-semibold text-secondary uppercase tracking-tight">
                Next.js
              </span>
              <span className="bg-surface-container-high px-3 py-1 rounded text-[12px] font-semibold text-secondary uppercase tracking-tight">
                GraphQL
              </span>
            </div>
          </article>
          <article className="project-card group cursor-pointer md:mt-32">
            <div className="aspect-video mb-8 overflow-hidden rounded-xl bg-surface-container border border-outline-variant transition-all duration-500">
              <img
                className="project-image w-full h-full object-cover transition-transform duration-700 ease-out"
                data-alt="An editorial layout showcasing a high-end desktop application for 3D engineering analysis. The screen shows complex wireframe models of mechanical parts with clean, thin-line annotations and a minimalist sidebar of tools. The ambient lighting is warm and neutral, creating a sophisticated workspace feel. The UI design follows the Modernist philosophy with heavy whitespace and deliberate typographic hierarchy."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe43agMNnp6TGO0V8uXjCCWQOnqjg9lp6oXUkQWYr0V4AW_LY8atJew-iSfkqSQlWASmZ_4wf9eQFOAaxy-u-Sj8D5K8Lscsh0cygnhSBQhBUt09IafRpqOtHAseR5UgseXpwOYf_Cs7p1uETiNdY6dI2-UGcOvA4euJ3m0fyMj4ukaQLZFJJJLBIzpch5HCHjCPmMc-hwmcCKQktc4DssCJrGSlhZX2hwGWf5hIc-Usc8q3cBa-KMa15rfB5fWcbdL5QphMltgEY"
              />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-1">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
                  04 / Tools
                </span>
                <h3 className="font-headline-md text-headline-md">Draft Engine</h3>
              </div>
              <span className="font-code text-code text-on-surface-variant">2022</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-md">
              A custom WebGL-based rendering engine for architectural blueprints. Optimized for
              handling 10M+ vertices with real-time shadow projection.
            </p>
            <div className="flex gap-2">
              <span className="bg-surface-container-high px-3 py-1 rounded text-[12px] font-semibold text-secondary uppercase tracking-tight">
                C++
              </span>
              <span className="bg-surface-container-high px-3 py-1 rounded text-[12px] font-semibold text-secondary uppercase tracking-tight">
                WebGL
              </span>
              <span className="bg-surface-container-high px-3 py-1 rounded text-[12px] font-semibold text-secondary uppercase tracking-tight">
                Three.js
              </span>
            </div>
          </article>
        </div>
      </section>
      <section className="mt-40 max-w-[1200px] mx-auto px-margin-mobile md:px-gutter">
        <div className="hairline-divider mb-20"></div>
        <div className="flex flex-col items-center text-center">
          <h2 className="font-headline-lg text-headline-lg mb-8 max-w-2xl">
            Have a complex technical challenge? Let's architect the solution.
          </h2>
          <a
            className="inline-flex items-center gap-2 font-body-lg text-body-lg text-primary border-b-2 border-primary pb-1 hover:opacity-60 transition-opacity"
            href="#"
          >
            Start a conversation
            <span className="material-symbols-outlined">north_east</span>
          </a>
        </div>
      </section>
    </main>
  )
}
