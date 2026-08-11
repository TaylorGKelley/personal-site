import { getHeader } from "@/actions/globals";
import Link from "next/link";
import { Button } from "../ui/button";
import { NavLink } from "./NavLink";
import { MobileNav } from "./MobileNav";
import { File } from "@/payload-types";

export async function Header() {
  const { data, error } = await getHeader();

  if (error) console.error('[Header]', error);
  if (!data) return <></>; // Just don't render the header if there is not data filled out

  const resumeUrl = (data.resume as File | null | undefined)?.url || "/about";

  return (
    <header className="relative z-50 container mx-auto px-4 h-20 flex items-center bg-sidebar text-sidebar-foreground  border-b border-b-sidebar-border/10">
      <div className='grid grid-cols-[auto_1fr_auto] items-center flex-1'>
        <Link href="/" className="font-mono font-semibold text-xl">{data.logo}</Link>

        <nav className="hidden md:flex justify-center items-center gap-8">
          {data.links.map((link) => (
            <NavLink key={link.id} link={link} />
          ))}
        </nav>

        <div className="flex items-center justify-end gap-4">
          {data.resume ?
            <Link href={resumeUrl} target="_blank" className="hidden md:inline-flex">
              <Button size="lg" className='px-6 py-2 rounded-full bg-sidebar-primary cursor-pointer'>
                <span>Resume</span>
              </Button>
            </Link> : <></>}
          <MobileNav links={data.links} resume={resumeUrl} />
        </div>
      </div>
    </header>
  )
}
