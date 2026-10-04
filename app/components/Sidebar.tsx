"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import sidebarData from "../../sidebar_menu_items.json";

type LeafItem = string;
type NestedGroupItem = Record<string, LeafItem[]>;
type SubItem = LeafItem | NestedGroupItem;
type ProductEntry = Record<string, SubItem[]>;

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function buildPath(...parts: string[]) {
  return "/docs/" + parts.map(slugify).join("/");
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function LeafLink({ label, href, depth = 0 }: { label: string; href: string; depth?: number }) {
  const pathname = usePathname();
  const active = pathname === href;
  const pl = depth === 0 ? "pl-6" : "pl-10";

  return (
    <li>
      <Link
        href={href}
        id={`sidebar-leaf-${slugify(label)}`}
        className={`
          block py-[5px] pr-3 ${pl} text-[0.8125rem] leading-snug
          border-l-2 transition-colors duration-100 no-underline
          ${active
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-medium"
            : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/[0.04]"
          }
        `}
      >
        {label}
      </Link>
    </li>
  );
}

function SidebarNode({ 
  node, pathPrefix, currentPath, depth 
}: { 
  node: any; pathPrefix: string[]; currentPath: string; depth: number 
}) {
  if (typeof node === "string") {
    const slug = slugify(node);
    const href = "/docs/" + [...pathPrefix, slug].join("/");
    return <LeafLink label={node} href={href} depth={depth} />;
  }

  // node is an object: { "Group Title": [ children ] }
  const [title, children] = Object.entries(node)[0] as [string, any[]];
  const groupSlug = slugify(title);
  const newPathPrefix = [...pathPrefix, groupSlug];
  
  const groupUrlPrefix = "/docs/" + newPathPrefix.join("/");
  const anyActive = currentPath.startsWith(groupUrlPrefix + "/") || currentPath === groupUrlPrefix;
  
  const [open, setOpen] = useState(anyActive || depth === 0);

  if (depth === 0) {
    if (!children || children.length === 0) {
      return (
        <div
          id={`sidebar-product-${groupSlug}`}
          className={`
            flex items-center justify-between px-4 py-2.5
            border-b border-gray-100 dark:border-[#313135]
            text-[0.875rem] font-semibold
            ${anyActive
              ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40"
              : "text-gray-700 dark:text-gray-300"
            }
          `}
        >
          <span>{title}</span>
        </div>
      );
    }
    return (
      <div className="border-b border-gray-100 dark:border-[#313135]">
        <button
          onClick={() => setOpen((o) => !o)}
          id={`sidebar-product-${groupSlug}`}
          aria-expanded={open}
          className={`
            flex items-center justify-between w-full px-4 py-2.5
            text-[0.875rem] font-semibold text-left cursor-pointer bg-transparent border-0
            transition-colors duration-100
            ${anyActive
              ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.04] hover:text-gray-900 dark:hover:text-gray-100"
            }
          `}
        >
          <span>{title}</span>
          <Chevron open={open} />
        </button>
  
        {open && (
          <ul className="list-none p-0 m-0 bg-white dark:bg-[#1b1b1d]">
            {children.map((child: any, idx: number) => (
              <SidebarNode key={idx} node={child} pathPrefix={newPathPrefix} currentPath={currentPath} depth={1} />
            ))}
          </ul>
        )}
      </div>
    );
  }

  // Depth > 0
  const pl = depth === 1 ? "pl-6" : depth === 2 ? "pl-10" : "pl-14";
  
  return (
    <li>
      <button
        onClick={() => setOpen((o) => !o)}
        id={`sidebar-group-${groupSlug}`}
        aria-expanded={open}
        className={`
          flex items-center justify-between w-full ${pl} pr-3 py-[5px]
          text-[0.8125rem] font-medium text-left cursor-pointer bg-transparent border-0
          transition-colors duration-100
          ${open
            ? "text-gray-900 dark:text-gray-100"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          }
          hover:bg-gray-100 dark:hover:bg-white/[0.04]
        `}
      >
        <span className="flex-1">{title}</span>
        <Chevron open={open} />
      </button>
      {open && (
        <ul className="list-none p-0 m-0">
          {children.map((child: any, idx: number) => (
             <SidebarNode key={idx} node={child} pathPrefix={newPathPrefix} currentPath={currentPath} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const root = sidebarData["Bimser Dokümantasyon"] as unknown as ProductEntry[];
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const toggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-sidebar', toggle);
    return () => window.removeEventListener('toggle-sidebar', toggle);
  }, []);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[100] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        id="docs-sidebar"
        aria-label="Dokümantasyon menüsü"
        className={`
          fixed inset-y-0 left-0 z-[110] transform transition-transform duration-300 ease-in-out
          md:sticky md:top-[60px] md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          w-[270px] h-[100vh] md:h-[calc(100vh-60px)] flex-shrink-0
          bg-gray-50 dark:bg-[#1f1f22]
          border-r border-gray-200 dark:border-[#313135]
          overflow-y-auto
        `}
      >
        <nav role="navigation" className="py-1">
          {root.map((productObj, idx) => (
            <SidebarNode
              key={idx}
              node={productObj}
              pathPrefix={[]}
              currentPath={pathname}
              depth={0}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}
