import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Konum" id="breadcrumb-nav" className="mb-4">
      <ol className="flex items-center flex-wrap gap-0 list-none p-0 m-0">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const isHome = item.label === "🏠";

          return (
            <li key={idx} className="flex items-center">
              {!isLast ? (
                <>
                  {item.href ? (
                    <Link
                      href={item.href}
                      id={`breadcrumb-${idx}`}
                      className="flex items-center text-[0.8125rem] text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors no-underline"
                    >
                      {isHome ? (
                        <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                      ) : item.label}
                    </Link>
                  ) : (
                    <span className="text-[0.8125rem] text-gray-400 dark:text-gray-500">{item.label}</span>
                  )}
                  <svg className="w-3 h-3 mx-0.5 text-gray-300 dark:text-gray-600 opacity-60"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </>
              ) : (
                <span className="text-[0.8125rem] text-gray-600 dark:text-gray-400">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
