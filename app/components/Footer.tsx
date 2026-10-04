const footerLinks = {
  "Çözüm Ailesi": [
    { label: "Synergy", href: "https://bimser.com/bimser-synergy/" },
    { label: "eBA", href: "https://bimser.com/eba-belge-dokuman-is-akisi/" },
    { label: "Ensemble", href: "https://bimser.com/ensemble-surec-strateji-performans/" },
    { label: "QGRC", href: "https://bimser.com/qgrc/" },
    { label: "QDMS", href: "https://bimser.com/qdms-entegre-yonetim-sistemi/" },
    { label: "BEAM", href: "https://bimser.com/beam-kurumsal-varlik-yonetim-sistemi/" },
  ],
  Social: [
    { label: "YouTube", href: "https://www.youtube.com/channel/UCX_4PkXrhcp9Cweo5KTDCMQ" },
    { label: "Instagram", href: "https://www.instagram.com/bimsercozum/" },
    { label: "Twitter", href: "https://twitter.com/Bimser_" },
    { label: "Facebook", href: "https://www.facebook.com/bmsercozum/" },
  ],
  More: [
    { label: "Hakkımızda", href: "https://bimser.com/hakkimizda/" },
    { label: "Bimser", href: "https://bimser.com/" },
  ],
};

function ExternalIcon() {
  return (
    <svg className="ml-1 w-[11px] h-[11px] opacity-50 flex-shrink-0"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-[#1b1b29] border-t border-white/[0.08] px-6 py-10">
      <div className="flex gap-12 max-w-[1200px] mx-auto flex-wrap">
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category} className="min-w-[110px]">
            <div className="text-sm font-bold text-white mb-3">{category}</div>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`footer-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    className="inline-flex items-center text-[0.8125rem] text-white/60 hover:text-white transition-colors no-underline"
                  >
                    {link.label}
                    <ExternalIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
