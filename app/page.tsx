"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const searchIndex = [
  { label: "eBA EBYS Eğitim Dokümanı", href: "/docs/eba/kullanim-dokumanlari/eba-ebys-egitim", category: "eBA" },
  { label: "eBA - Başlangıç", href: "/docs/eba/baslangic", category: "eBA" },
  { label: "eBA - Sık Sorulan Sorular", href: "/docs/eba/sik-sorulan-sorular", category: "eBA" },
  { label: "eBA - Mobil", href: "/docs/eba/mobil", category: "eBA" },
  { label: "eBA - Hata Giderme", href: "/docs/eba/hata-giderme", category: "eBA" },
  { label: "eBA - İleri Uygulamalar", href: "/docs/eba/ileri-uygulamalar", category: "eBA" },
  { label: "Synergy - Başlangıç", href: "/docs/synergy/synergy-low-code-platform/baslangic", category: "Synergy" },
  { label: "Synergy - Geliştirme Ortamı", href: "/docs/synergy/synergy-low-code-platform/gelistirme-ortami", category: "Synergy" },
  { label: "ENSEMBLE - Başlangıç", href: "/docs/ensemble/baslangic", category: "ENSEMBLE" },
  { label: "QGRC - Başlangıç", href: "/docs/qgrc/baslangic", category: "QGRC" },
  { label: "QDMS - Başlangıç", href: "/docs/qdms/baslangic", category: "QDMS" },
  { label: "BEAM - Başlangıç", href: "/docs/beam/baslangic", category: "BEAM" },
  { label: "Dijital Dönüşüm Yol Arkadaşınız!", href: "/docs", category: "Genel" },
  { label: "Faydalı Bilgiler", href: "/docs/faydali-bilgiler", category: "Genel" },
];

const products = [
  { name: "synergy", desc: "Yeni Nesil İçerik Servisleri LowCode Platformu", subDesc: "Yeni Nesil sıfatını hak edecek kadar güçlü ilk İçerik Servisleri Platformu, Karşınızda!", href: "/docs/synergy/synergy-low-code-platform/baslangic" },
  { name: "eba", desc: "Süreç Odaklı Doküman Yönetim Sistemi", subDesc: "Tüm kurum süreçlerinizi ve süreçlerinizin girdi-çıktıları olan dokümanlarınızı Bimser eBA ile dijital platformda etkin ve verimli yönetin.", href: "/docs/eba/kullanim-dokumanlari/eba-ebys-egitim" },
  { name: "ensemble", desc: "Akıllı Süreç ve Performans Yönetimi", subDesc: "Dijital Dönüşüm'e doğru yerden, doğru yatırımlar başlayın.", href: "/docs/ensemble/baslangic" },
  { name: "qgrc", desc: "Yönetim, Risk ve Uyumluluk", subDesc: "Akıllı iç kontrol ve kurumsal risk yönetim sistemi ile organizasyonel mükemmelliğinizi bir üst seviyeye taşıyın.", href: "/docs/qgrc/baslangic" },
  { name: "qdms", desc: "Risk ve Süreç Odaklı Entegre Yönetim Sistemi", subDesc: "Entegre Yönetim Sistemleri kapsamında takip edilmesi gereken tüm işlerinizi planlı ve efektif bir şekilde yönetin.", href: "/docs/qdms/baslangic" },
  { name: "beam", desc: "Gerçek Zaman Odaklı Varlık ve Bakım Yönetim Sistemi", subDesc: "Varlıklarınızla ilgili tüm envanter ve bakım süreçlerinizin tek platformda yönetilmesini sağlar.", href: "/docs/beam/baslangic" },
];

function ProductLogo({ name }: { name: string }) {
  return (
    <img 
      src={`/logos/${name}.svg`} 
      alt={`${name} logo`} 
      className="max-h-[320px] max-w-full object-contain"
    />
  );
}

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof searchIndex>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) { setResults([]); setOpen(false); return; }
    const filtered = searchIndex.filter(
      (item) => item.label.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );
    setResults(filtered);
    setOpen(filtered.length > 0);
  }, [query]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (href: string) => {
    setQuery(""); setOpen(false); router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") { setOpen(false); setQuery(""); }
    if (e.key === "Enter" && results.length > 0) handleSelect(results[0].href);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-3xl" id="home-search-wrapper">
      {/* Search box */}
      <div className={`flex items-center bg-white rounded-md px-4 gap-2.5 border-2 transition-all duration-150 ${open ? "border-blue-400 shadow-[0_0_0_3px_rgba(77,163,255,0.2)]" : "border-transparent focus-within:border-blue-400 focus-within:shadow-[0_0_0_3px_rgba(77,163,255,0.2)]"}`}>
        <svg className="w-[18px] h-[18px] text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          ref={inputRef}
          id="home-search-input"
          type="search"
          placeholder="Bimser ürünleri için aratın"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          autoComplete="off"
          aria-label="Dokümantasyon ara"
          aria-expanded={open}
          className="flex-1 border-0 outline-none bg-transparent text-base text-gray-900 py-3.5 placeholder:text-gray-400"
        />
        {query && (
          <button type="button" id="search-clear-btn" aria-label="Temizle"
            onClick={() => { setQuery(""); setOpen(false); inputRef.current?.focus(); }}
            className="text-gray-400 hover:text-gray-600 text-xs px-1 py-0.5 rounded-full hover:bg-gray-100 cursor-pointer bg-transparent border-0 transition-colors">
            ✕
          </button>
        )}
      </div>

      {open && (
        <ul role="listbox" id="search-results"
          className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white border border-gray-200 rounded-md shadow-[0_8px_30px_rgba(0,0,0,0.15)] z-[300] max-h-80 overflow-y-auto p-1.5 list-none m-0">
          {results.map((item, i) => (
            <li key={i} role="option">
              <button type="button" id={`search-result-${i}`}
                onClick={() => handleSelect(item.href)}
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded cursor-pointer bg-transparent border-0 text-left hover:bg-gray-50 transition-colors">
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.05em] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded flex-shrink-0">
                  {item.category}
                </span>
                <span className="text-[0.875rem] text-gray-800">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
  <>
      <Navbar />
      <main>
        <section className="bg-[#1b1b29] px-6 py-16 flex flex-col items-center text-center">
          <img src="/logos/bimser_beyaz.svg" alt="Bimser Logo"  height="200" width="200"/>
          <SearchBar />
        </section>

        <section className="px-6 py-12 bg-white dark:bg-[#1b1b1d]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 max-w-[960px] mx-auto">
            {products.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                id={`home-product-${p.name}`}
                className="flex flex-col items-center text-center px-4 py-6 rounded-lg no-underline cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors"
              >
                <div className="h-[70px] flex items-center justify-center mb-5">
                  <ProductLogo name={p.name} />
                </div>
                <h2 className="text-[0.9375rem] font-bold text-gray-900 dark:text-gray-100 mb-2 leading-snug">
                  {p.desc}
                </h2>
                <p className="text-[0.8125rem] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                  {p.subDesc}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
 );
}
