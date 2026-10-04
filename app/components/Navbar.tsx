"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      id="main-navbar"
      className="sticky top-0 z-50 h-[60px] bg-[#1b1b29] border-b border-white/[0.07] print:hidden"
    >
      <div className="flex items-center max-w-[1400px] mx-auto px-4 sm:px-5 h-full gap-2">

        <div className="flex items-center flex-shrink-0 mr-4 md:mr-8 gap-3">
          <button
            onClick={() => window.dispatchEvent(new Event('toggle-sidebar'))}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors bg-transparent border-0 cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <Link href="/" id="navbar-logo" className="flex items-center gap-2 no-underline">
            <img
              src="/logos/bimser_beyaz.svg"
              alt="Bimser Logo"
              className="h-32 w-auto"
            />
          </Link>
        </div>

        <div className="hidden sm:flex items-center gap-0 flex-1">
          <Link
            href="/docs"
            id="nav-docs"
            className="px-3 py-1.5 rounded text-[0.875rem] font-medium text-white/85 hover:text-white hover:bg-white/[0.08] transition-colors no-underline"
          >
            Dokümantasyon
          </Link>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">

          <div className="relative">
            <button
              id="navbar-lang-btn"
              aria-haspopup="listbox"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[0.8125rem] font-medium text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer bg-transparent border-0"
            >
              Türkçe
            </button>


          </div>

          <a
            href="https://bimser.com"
            id="navbar-bimser-link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[0.8125rem] font-medium text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors no-underline"
          >
            Bimser
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>

          {/* Search Toggle */}
          <button
            id="navbar-search-toggle"
            onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
            aria-label="Arama Yap (Cmd+K)"
            title="Arama Yap (Cmd+K)"
            className="flex items-center justify-center w-8 h-8 rounded text-[0.9rem] text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer bg-transparent border-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Theme toggle */}
          <button
            id="navbar-theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Aydınlık moda geç" : "Karanlık moda geç"}
            title={theme === "dark" ? "Aydınlık mod" : "Karanlık mod"}
            className="flex items-center justify-center w-8 h-8 rounded text-[0.9rem] text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer bg-transparent border-0"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}
