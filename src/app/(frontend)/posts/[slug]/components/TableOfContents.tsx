'use client';

import React, { useEffect, useState } from 'react';
import { ParsedHeading } from '@/utils/posts';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  headings: ParsedHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setActiveIds((prev) => {
            const next = new Set(prev);
            if (entry.isIntersecting) {
              next.add(entry.target.id);
            } else {
              next.delete(entry.target.id);
            }
            return next;
          });
        });
      },
      { rootMargin: '0px 0px -30px 0px' }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav className="sticky top-12 space-y-3 font-sans">
      <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-neutral-400">
        In this article
      </h3>
      <ul className="space-y-3 text-xs">
        {headings.map((heading) => {
          const isActive = activeIds.has(heading.id);
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                style={{ marginLeft: `${8 + (heading.level - 2) * 12}px` }}
className={cn(
  'block py-0.5 transition-colors',
  isActive
    ? 'text-neutral-950 hover:text-neutral-900'
    : 'text-neutral-500 hover:text-neutral-900'
)}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
