"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[0.8rem] font-medium text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-[#1b1b1d] dark:text-gray-400 dark:hover:bg-[#242426] dark:hover:text-gray-100 border border-gray-200 dark:border-[#313135] transition-colors cursor-pointer print:hidden"
    >
      <Printer className="w-4 h-4" />
      PDF Olarak Kaydet / Yazdır
    </button>
  );
}
