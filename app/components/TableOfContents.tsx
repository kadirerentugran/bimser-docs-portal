"use client";

import { useEffect, useState } from "react";

interface TocItem { id: string; text: string; level: number; }

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { rootMargin: "-60px 0% -70% 0%" }
    );
    items.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <aside
      id="table-of-contents"
      aria-label="İçindekiler"
      className="sticky top-[calc(60px+1.5rem)] w-[230px] h-fit max-h-[calc(100vh-60px-3rem)] overflow-y-auto flex-shrink-0 hidden xl:block px-2"
    >
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500 px-2 pb-2 mb-1 border-b border-gray-100 dark:border-[#313135]">
        Bu sayfada
      </div>
      <nav>
        <ul className="list-none p-0 m-0">
          {items.map((item) => {
            const pl = item.level === 2 ? "pl-2" : item.level === 3 ? "pl-5" : "pl-8";
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  id={`toc-${item.id}`}
                  className={`
                    block py-1 px-2 ${pl} text-[0.8rem] leading-snug
                    border-l-2 transition-colors duration-100 no-underline
                    ${activeId === item.id
                      ? "border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
                      : "border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
                    }
                  `}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
