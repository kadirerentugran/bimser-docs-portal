"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

interface CodeBlockProps {
  language?: string;
  code: string;
}

export default function CodeBlock({ language = "bash", code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative my-6 rounded-xl overflow-hidden bg-[#1e1e1e] border border-gray-200 dark:border-[#313135] shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#3e3e42]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-gray-400" />
          <span className="text-[0.75rem] font-mono font-medium text-gray-400 uppercase tracking-wider">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#3e3e42] hover:bg-[#4e4e52] text-gray-300 text-[0.7rem] font-medium transition-colors cursor-pointer border-0"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Kopyalandı</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Kopyala
            </>
          )}
        </button>
      </div>
      
      {/* Code */}
      <div className="p-4 overflow-x-auto text-[0.875rem] font-mono leading-relaxed text-gray-300">
        <pre className="m-0">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
