import { getFooter } from "@/actions/globals"
import Link from "next/link"

export async function Footer() {
  const { data, error } = await getFooter()

  if (error) console.error('[Footer]', error);

  if (!data) return null;

  return (
    <footer className="bg-background text-foreground py-16 border-t border-t-sidebar-border/10 max-sm:text-center">
      <div className="container px-4 mx-auto flex flex-col md:flex-row md:justify-between items-center gap-8">
        <div className='grid gap-6 max-w-sm'>
          <h4 className="text-2xl">{data?.title}</h4>
          {data?.subtitle && <p className='text-muted-foreground'>{data.subtitle}</p>}
          {data?.copyright && <p className='text-muted-foreground'>{data.copyright}</p>}
        </div>
        <div className='grid md:grid-cols-2 gap-5 md:gap-24'>
          <div className='grid gap-4'>
            <h5 className='uppercase font-mono font-semibold text-sm tracking-wide'>Navigation</h5>
            <ul className='grid gap-2'>
              {data?.navigationLinks.map((link) => {
                if (link.linkType === 'custom') {
                  return (
                    <li key={link.id}>
                      <Link href={link.url!}>{link.name}</Link>
                    </li>
                  )
                } else {
                  return (
                    <li key={link.id}>
                      <Link href={(link.fileDoc as any).url!}>{link.name}</Link>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
          <div className='grid gap-4'>
            <h5 className='uppercase font-mono font-semibold text-sm{ $} tracking-wide'>Connect</h5>
            <ul className='grid gap-2'>
              {data?.connectLinks.map((link) => (
                <li key={link.id}>
                      <Link href={link.url}>{link.name}</Link>
                </li>))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
