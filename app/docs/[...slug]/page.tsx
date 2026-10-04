import { notFound } from 'next/navigation';
import Breadcrumb from '@/app/components/Breadcrumb';
import PrintButton from '@/app/components/PrintButton';
import FeedbackWidget from '@/app/components/FeedbackWidget';
import CodeBlock from '@/app/components/CodeBlock';
import { JSX } from 'react/jsx-runtime';

type Props = {
  params: Promise<{ slug: string[] }>
}

export default async function DynamicDocPage({ params }: Props) {
  const { slug } = await params;
  
  const docSlug = slug.join('-');
  
  let data;
  try {
    const res = await fetch(`http://localhost:8000/db/documents/by-slug/${docSlug}`, {
      cache: 'no-store'
    });
    if (!res.ok) {
      notFound();
    }
    data = await res.json();
  } catch (error) {
    notFound();
  }
  
  const breadcrumbs = [
    { label: '', href: '/' }, 
    { label: 'Dokümantasyon', href: '/docs' }
  ];
  let currentPath = '/docs';
  slug.forEach((part, i) => {
    currentPath += '/' + part;
    if (i === slug.length - 1) {
      breadcrumbs.push({
        label: data.title,
        href: ''
      });
    } else {
      breadcrumbs.push({ label: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '), href: currentPath });
    }
  });

  return (
    <div className="flex min-h-[calc(100vh-60px)]">
      <div className="flex-1 min-w-0 max-w-[780px] px-8 py-7 pb-16">
        <Breadcrumb items={breadcrumbs} />
        
        {/* Başlık Alanı */}
        <div className="mt-4 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-block px-2 py-0.5  text-blue-600 dark:text-blue-400 text-[1rem] font-bold uppercase   mb-3"> {/* KATEGORİ BAZEN RENDERLANMIYOR NEDEN OLDUĞUNU BUL*/}
                {data.parent || "NULL Değer "}
              </span>
              <h1 className="text-[1.875rem] font-extrabold text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight">
                {data.title}
              </h1>
            </div>
            <PrintButton />
          </div>
          <p className="text-[0.9375rem] text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mb-3">
            {data.description}
          </p>
          <div className="flex items-center flex-wrap gap-2 text-[0.8125rem] text-gray-400 dark:text-gray-500">
            <span> {data.lastUpdated}</span>
          </div>
        </div>

        <hr className="border-0 border-t border-gray-100 dark:border-[#313135] mb-6" />

        <div className="p-6 bg-white dark:bg-[#1b1b1d] border border-gray-100 dark:border-[#313135] rounded-xl shadow-sm">
          
          {data.sections && data.sections.length > 0 ? (
            <div className="flex flex-col gap-6">
              {data.sections.map((section: any, index: number) => {
                switch (section.type) {
                  case "heading":
                    const Htag = `h${section.level || 2}` as keyof JSX.IntrinsicElements;
                    return (
                      <Htag
                        key={index} 
                        className={`font-bold text-gray-900 dark:text-gray-100 mt-6 mb-2 ${
                          section.level === 3 ? 'text-[1.25rem]' : 'text-[1.5rem] border-b border-gray-100 dark:border-[#313135] pb-2'
                        }`}
                      >
                        {section.content}
                      </Htag>
                    );
                  case "text":
                    return (
                      <p key={index} className="text-[0.9375rem] text-gray-600 dark:text-gray-300 leading-[1.8]">
                        {section.content}
                      </p>
                    );
                  case "warning":
                    return (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50">
                        <span className="text-yellow-600 dark:text-yellow-500 text-lg">⚠️</span>
                        <p className="text-[0.9rem] text-yellow-800 dark:text-yellow-200 font-medium leading-relaxed m-0">
                          {section.content}
                        </p>
                      </div>
                    );
                  case "code":
                    return (
                      <CodeBlock 
                        key={index} 
                        language={section.language || "bash"} 
                        code={section.code} 
                      />
                    );
                  case "image":
                    return (
                      <div key={index} className="my-4">
                        <div className="rounded-lg border border-gray-100 dark:border-[#313135] bg-gray-50 dark:bg-black/20 p-2 overflow-hidden flex justify-center items-center">
                          <img 
                            src={section.src} 
                            alt={section.alt || "Görsel"} 
                            className="max-w-full h-auto max-h-[400px] object-contain rounded"
                          />
                        </div>
                        {section.caption && (
                          <p className="text-center text-[0.75rem] text-gray-400 mt-2 italic">
                            {section.caption}
                          </p>
                        )}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          ) : (
            <>
              <h2 className="text-[1.375rem] font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-[#313135] pb-2">
                İçerik
              </h2>
              <p className="text-[0.9375rem] text-gray-600 dark:text-gray-400 leading-[1.75]">
                {data.content}
              </p>
            </>
          )}
          
          <div className="mt-10 pt-4 border-t border-gray-100 dark:border-[#313135]">
            <p className="text-sm text-gray-400 italic">
              * Bu içerik dinamik olarak PostgreSQL veritabanından okundu. ({docSlug})
            </p>
          </div>
        </div>

        <FeedbackWidget />
        
      </div>
    </div>
  );
}
