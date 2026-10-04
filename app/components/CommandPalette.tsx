"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, FileText, X } from "lucide-react";
import sidebarData from "../../sidebar_menu_items.json";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

// Flatten sidebar data
type SearchItem = { title: string; category: string; href: string };
const items: SearchItem[] = [];

const flatten = (node: any, currentPath: string[], category: string) => {
  if (typeof node === "string") {
    items.push({
      title: node,
      category: category,
      href: "/docs/" + [...currentPath, slugify(node)].join("/")
    });
  } else if (Array.isArray(node)) {
    node.forEach(item => flatten(item, currentPath, category));
  } else if (typeof node === "object") {
    Object.entries(node).forEach(([key, val]) => {
      if (Array.isArray(val) && val.length === 0) {
        if (key !== "Dijital Dönüşüm Yol Arkadaşınız!") {
          items.push({
            title: key,
            category: category || "Genel",
            href: "/docs/" + [...currentPath, slugify(key)].join("/")
          });
        }
      } else {
        flatten(val, [...currentPath, slugify(key)], category || key);
      }
    });
  }
}

// Initialize parsing
const root = (sidebarData as any)["Bimser Dokümantasyon"];
if (Array.isArray(root)) {
  root.forEach(obj => flatten(obj, [], ""));
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.code === "KeyK" || e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    const customOpen = () => setOpen(true);
    
    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", customOpen);
    
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", customOpen);
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] sm:pt-[20vh] bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-[600px] bg-white dark:bg-[#1b1b1d] rounded-xl shadow-2xl border border-gray-200 dark:border-[#313135] overflow-hidden animate-in fade-in zoom-in-95 duration-200 mx-4">
        
        <Command label="Command Menu" className="w-full flex flex-col h-full max-h-[450px]">
          <div className="flex items-center border-b border-gray-100 dark:border-[#313135] px-3">
            <Search className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
            <Command.Input 
              autoFocus
              placeholder="Dokümanlarda arayın... (Örn: Başlangıç)" 
              className="flex-1 h-14 bg-transparent border-0 outline-none focus:ring-0 text-[0.95rem] text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
            />
            <button 
              onClick={() => setOpen(false)}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#242426] rounded-md text-gray-400 transition-colors border-0 cursor-pointer bg-transparent"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <Command.List className="overflow-y-auto p-2 scroll-smooth">
            <Command.Empty className="py-6 text-center text-[0.9rem] text-gray-500">
              Sonuç bulunamadı. Farklı bir terim deneyin.
            </Command.Empty>
            
            {items.map((item, i) => (
              <Command.Item
                key={i}
                value={item.title + " " + item.category}
                onSelect={() => {
                  router.push(item.href);
                  setOpen(false);
                }}
                className="flex items-center px-3 py-2.5 rounded-lg cursor-pointer aria-selected:bg-blue-50 dark:aria-selected:bg-[#242426] aria-selected:text-blue-600 dark:aria-selected:text-blue-400 text-gray-700 dark:text-gray-300 transition-colors gap-3 mb-0.5"
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-md bg-gray-50 dark:bg-black/30 border border-gray-100 dark:border-[#313135] shrink-0">
                   <FileText className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[0.9rem] font-medium truncate">{item.title}</span>
                  <span className="text-[0.7rem] text-gray-400 font-medium tracking-wide uppercase">{item.category}</span>
                </div>
              </Command.Item>
            ))}
          </Command.List>
          
          <div className="border-t border-gray-100 dark:border-[#313135] px-4 py-2.5 flex items-center justify-between bg-gray-50 dark:bg-[#151516]">
             <div className="text-[0.7rem] text-gray-400 font-medium">
               Gezinmek için <kbd className="font-sans px-1 py-0.5 rounded bg-gray-200 dark:bg-[#242426] border border-gray-300 dark:border-[#3e3e42] mx-1">↑</kbd> <kbd className="font-sans px-1 py-0.5 rounded bg-gray-200 dark:bg-[#242426] border border-gray-300 dark:border-[#3e3e42] mx-1">↓</kbd> tuşlarını kullanın.
             </div>
             <div className="text-[0.7rem] text-gray-400 font-medium">
               Aç/Kapat <kbd className="font-sans px-1.5 py-0.5 rounded bg-gray-200 dark:bg-[#242426] border border-gray-300 dark:border-[#3e3e42] mx-1">Cmd + K</kbd>
             </div>
          </div>
        </Command>
      </div>
    </div>
  );
}
