import { getHeader } from "@/actions/globals";
import Link from "next/link";
import { Button } from "../ui/button";
import { getUser } from "@/actions/auth";
import { NavLink } from "./NavLink";

export async function Header() {
  const { data } = await getHeader();
  const { data: user } = await getUser();

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

        {!user ?
        <Link href="/">
          <Button size="lg" className='px-6 py-2 rounded-full bg-sidebar-primary cursor-pointer'>
            {/*<DownloadIcon />*/}
            <span>Resume</span>
          </Button>
        </Link> : <></>}
      </div>
    </header>
  )
}
