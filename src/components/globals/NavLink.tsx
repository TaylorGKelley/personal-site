'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  link: {
    id?: string | null | undefined;
    name: string;
    url: string;
  }
}

export function NavLink({ link }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === link.url;

  return (
    <Link key={link.id} href={link.url} className={cn("text-sidebar-accent-foreground hover:text-sidebar-primary border-b-2 border-b-transparent transition-[border-bottom]", {
      "text-sidebar-primary pb-1 border-b-sidebar-primary": isActive,
      // "hover:border-b-sidebar-": !isActive,
    })}>
      <span>{link.name}</span>
    </Link>
  )
}
