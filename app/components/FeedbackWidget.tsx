"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, CheckCircle2 } from "lucide-react";

export default function FeedbackWidget() {
  const [submitted, setSubmitted] = useState<"yes" | "no" | null>(null);
  const [showThanks, setShowThanks] = useState(false);

  const handleFeedback = (type: "yes" | "no") => {
    setSubmitted(type);
    setShowThanks(true);
    // In a real app, send to API here: fetch('/api/feedback', { method: 'POST', body: JSON.stringify({ type }) })
    setTimeout(() => {
      setShowThanks(false);
    }, 4000);
  };

  return (
    <div className="mt-12 pt-6 border-t border-gray-100 dark:border-[#313135] print:hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 dark:bg-[#1b1b1d] border border-gray-100 dark:border-[#313135]">
        
        <div>
          <h4 className="text-[0.9rem] font-bold text-gray-900 dark:text-gray-100 mb-1">
            Bu doküman size yardımcı oldu mu?
          </h4>
          <p className="text-[0.8rem] text-gray-500 dark:text-gray-400">
            Geri bildiriminiz dokümantasyonumuzu geliştirmemize yardımcı olur.
          </p>
        </div>

        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => handleFeedback("yes")}
            disabled={submitted !== null}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.8rem] font-medium border transition-colors ${
              submitted === "yes" 
                ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900" 
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-[#242426] dark:text-gray-300 dark:border-[#3e3e42] dark:hover:bg-[#2a2a2c] cursor-pointer"
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            Evet
          </button>
          
          <button
            onClick={() => handleFeedback("no")}
            disabled={submitted !== null}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.8rem] font-medium border transition-colors ${
              submitted === "no" 
                ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900" 
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-[#242426] dark:text-gray-300 dark:border-[#3e3e42] dark:hover:bg-[#2a2a2c] cursor-pointer"
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
            Hayır
          </button>

          {/* Thanks Toast */}
          <div className={`absolute top-full mt-2 right-0 flex items-center gap-2 px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[0.8rem] rounded shadow-lg transition-all duration-300 ${showThanks ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
             <CheckCircle2 className="w-4 h-4 text-green-400 dark:text-green-600" />
             Geri bildiriminiz için teşekkürler!
          </div>
        </div>
      </div>
    </div>
  );
}
