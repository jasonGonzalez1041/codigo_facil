"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  className?: string;
}

export default function TableOfContents({ headings, className }: TableOfContentsProps) {
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
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    );

    // Observe all headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("sticky top-24", className)}
    >
      <div className="border rounded-lg p-4 bg-card">
        <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-4">
          Tabla de Contenidos
        </h3>
        
        <nav aria-label="Tabla de contenidos">
          <ul className="space-y-1">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={cn(
                    "block w-full text-left text-sm py-1.5 px-2 rounded transition-colors hover:bg-muted",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                    {
                      "pl-2": heading.level === 2,
                      "pl-6": heading.level === 3,
                      "pl-10": heading.level === 4,
                      "bg-muted text-foreground font-medium": activeId === heading.id,
                      "text-muted-foreground": activeId !== heading.id
                    }
                  )}
                  aria-current={activeId === heading.id ? 'true' : 'false'}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.div>
  );
}