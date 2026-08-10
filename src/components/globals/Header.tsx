import { getHeader } from "@/actions/globals";
import Link from "next/link";
import { Button } from "../ui/button";
import { NavLink } from "./NavLink";
import { File } from "@/payload-types";

export async function Header() {
  const { data, error } = await getHeader();

  if (error) console.error('[Header]', error);
  if (!data) return <></>; // Just don't render the header if there is not data filled out

  return (
    <header className="container mx-auto px-4 h-20 flex items-center bg-sidebar text-sidebar-foreground  border-b border-b-sidebar-border/10">
      <div className='grid grid-cols-[auto_1fr_auto] items-center flex-1'>
        <Link href="/" className="font-mono font-semibold text-xl">{data.logo}</Link>

        <nav className="flex justify-center items-center gap-8">
          {data.links.map((link) => (
            <NavLink key={link.id} link={link} />
          ))}
        </nav>

        {data.resume ?
          <Link href={(data.resume as File).url || "/about"} target="_blank">
            <Button size="lg" className='px-6 py-2 rounded-full bg-sidebar-primary cursor-pointer'>
            {/*<DownloadIcon />*/}
            <span>Resume</span>
          </Button>
        </Link> : <></>}
      </div>
    </header>
  )
}
