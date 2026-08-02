'use client';

import React, { useEffect, useState } from 'react';
import { ParsedHeading } from '@/utils/posts';

interface TableOfContentsProps {
  headings: ParsedHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -60% 0px' }
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
      <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-400">
        In this article
      </h3>
      <ul className="space-y-2 text-xs">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}>
              <a
                href={`#${heading.id}`}
                className={`block transition-colors py-0.5 ${
                  isActive
                    ? 'font-medium text-indigo-600'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
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
