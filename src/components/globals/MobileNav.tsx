'use client';

import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type MobileNavLink = {
  id?: string | null | undefined;
  name: string;
  url: string;
};

type MobileNavProps = {
  links: MobileNavLink[];
  resume?: string | null;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.15 },
  },
};

export function MobileNav({ links, resume }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pendingHref = useRef<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const closeMenu = () => {
    pendingHref.current = null;
    setClosing(false);
    setNavigating(false);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (navigating && !isPending) {
      pendingHref.current = null;
      setNavigating(false);
      setClosing(false);
      setIsOpen(false);
    }
  }, [navigating, isPending]);

  useEffect(() => {
    if (!closing || !isOpen || !pendingHref.current) return;
    const href = pendingHref.current;
    const timer = setTimeout(() => {
      startTransition(() => {
        setNavigating(true);
        router.push(href);
      });
    }, 250);
    return () => clearTimeout(timer);
  }, [closing, isOpen, router]);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    if (href === pathname) {
      closeMenu();
      return;
    }
    pendingHref.current = href;
    setClosing(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        className="md:hidden inline-flex items-center justify-center rounded-lg p-1 text-sidebar-foreground hover:text-sidebar-primary transition-colors cursor-pointer"
      >
        <span className="relative block size-6">
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="size-6" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="size-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>

      <AnimatePresence>
        {isOpen &&
          (
            <motion.div
              className="fixed inset-0 top-20 z-40 flex flex-col justify-center overflow-y-auto bg-sidebar text-sidebar-foreground md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                className="flex flex-col -mt-20 gap-18"
                variants={containerVariants}
                initial="hidden"
                animate={closing ? "exit" : "visible"}
              >
              <nav className="flex flex-col items-center gap-8 pt-8">
                {links.map((link) => {
                  const isActive = pathname === link.url;
                  return (
                    <motion.span key={link.id} variants={itemVariants}>
                      <Link
                        href={link.url}
                        onClick={(event) => handleLinkClick(event, link.url)}
                        className={cn(
                          "text-2xl transition-colors",
                          isActive
                            ? "text-sidebar-primary"
                            : "text-sidebar-primary/70 hover:text-sidebar-primary",
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.span>
                  );
                })}
              </nav>

              {resume && (
                <motion.div variants={itemVariants} className="mt-auto flex justify-center pb-10">
                  <Link href={resume} target="_blank">
                    <Button size="lg" className="px-12 py-6 rounded-full bg-sidebar-primary cursor-pointer">
                      <span>Resume</span>
                    </Button>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
          )}
      </AnimatePresence>
    </>
  );
}
