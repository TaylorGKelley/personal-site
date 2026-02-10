"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { id: "home", href: "/", label: "Home" },
  { id: "about", href: "/about", label: "About" },
  { id: "contact", href: "/contact", label: "Contact" },
];

export default function BlogNavbar() {
  const [activeTab, setActiveTab] = useState<string>(navLinks[0].id!); // Usually from your router
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  // Determine which tab should have the background
  const displayedTab = hoveredTab || activeTab;

  return (
    <nav className="flex gap-2 p-2 bg-zinc-900 rounded-full w-fit">
      {navLinks.map((link) => (
        <Link
          href={link.href}
          key={link.id}
          onMouseEnter={() => setHoveredTab(link.id)}
          onMouseLeave={() => setHoveredTab(null)}
          onClick={() => setActiveTab(link.id)}
          className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 z-10"
          style={{ color: displayedTab === link.id ? "#fff" : "#a1a1aa" }}
        >
          {link.label}

          {/* This is the magic sliding background */}
          {displayedTab === link.id && (
            <motion.div
              layoutId="nav-pill"
              className="absolute inset-0 bg-white/10 rounded-full -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </Link>
      ))}
    </nav>
  );
}
