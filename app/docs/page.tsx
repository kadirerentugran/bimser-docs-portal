import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "../components/Breadcrumb";
import TableOfContents from "../components/TableOfContents";

export const metadata: Metadata = {
  title: "Dijital Dönüşüm Yol Arkadaşınız!",
  description: "Bimser ürünleri için dokümantasyon, eğitim ve teknik belgeler.",
};

const tocItems = [{ id: "bimser-hakkinda", text: "Bimser Hakkında", level: 2 }];

export default function DocsIndexPage() {
  return (
    <div className="flex min-h-[calc(100vh-60px)]">

      <div className="flex-1 min-w-0 max-w-[780px] px-8 py-7 pb-16">

        <Breadcrumb items={[{ label: "🏠", href: "/" }, { label: "Dijital Dönüşüm Yol Arkadaşınız!" }]} />

       

        <h1 className="text-[1.875rem] font-extrabold text-gray-900 dark:text-gray-100 mb-1.5 leading-tight tracking-tight">
          Dijital Dönüşüm Yol Arkadaşınız!
        </h1>
        <p className="text-[0.9375rem] text-gray-400 dark:text-gray-500 mb-0">
          Çözümlerimiz ile Tanışın
        </p>

        <hr className="border-0 border-t border-gray-100 dark:border-[#313135] my-6" />

        <h2 id="bimser-hakkinda" className="text-[1.375rem] font-bold text-gray-900 dark:text-gray-100 mb-4 scroll-mt-20">
          Bimser Hakkında
        </h2>

        {[
          "1998 yılında kurulan BİMSER, bilgi teknolojileri alanında yazılım çözümleri üretmek üzere bir araya gelen kişilerle yolculuğuna başladı.",
          "BİMSER, uzun yıllardan beri farklı ölçekteki ve sektördeki firmalara yönelik olan yazılım paketlerinden, üzerinde çeşitli iş uygulamalarının tasarlanabileceği tam bir çözüm geliştirme platformuna kadar, birbiriyle ve başka ürünlerle entegre çalışabilen, geniş bir ürün yelpazesini kullanıcılarına sunmaktadır. BİMSER'in yazılım ürünleri, bugün Türkiye'nin 1800'den fazla seçkin şirketinde, milyonu aşkın profesyoneller tarafından kullanılıyor; sağladığı verimlilik ile bu şirketlere rekabet avantajı ve başarı getiriyor.",
          "BİMSER, yazılımlarını bugüne kadar 33'den fazla ülkeye ihraç etmiştir. Şirketin 2017 yılında hayata geçirdiği New York ve Rotterdam ofisleri de bu gelişimin devamı niteliğindedir.",
          "Tamamı Türk Mühendisler tarafından geliştirilen Bimser Synergy, eBA, ENSEMBLE, QGRC, QDMS, BEAM yazılım ürünleriyle Türkiye'deki şirketlerin dijitalleşmesinde ve rekabet güçlerinin artmasında önemli rol oynuyor. Özellikle iş akışı ve doküman yönetimi, süreç ve performans yönetimi, kalite yönetimi, bilgi güvenliği yönetimi, risk yönetimi, bakım yönetimi, varlık ve bilgi teknolojileri yönetimi alanlarında sunduğu çözümler ile sektöründe lider firmaların ilk tercihi olmaya devam ediyor.",
        ].map((text, i) => (
          <p key={i} className="text-[0.9375rem] text-gray-600 dark:text-gray-400 leading-[1.75] mb-4">
            {text}
          </p>
        ))}

        <div className="flex justify-between gap-4 mt-12 pt-6 border-t border-gray-100 dark:border-[#313135]">
          <Link
            href="/docs/synergy/synergy-low-code-platform/baslangic"
            id="prev-page"
            className="flex items-center gap-2.5 flex-1 max-w-[260px] px-5 py-3.5 border border-gray-100 dark:border-[#313135] rounded-lg no-underline text-gray-600 dark:text-gray-400 bg-white dark:bg-[#1b1b1d] hover:border-blue-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            <div>
              <div className="text-[0.7rem] uppercase tracking-[0.06em] text-gray-400 dark:text-gray-500 font-semibold mb-0.5">Önceki</div>
              <div className="text-[0.875rem] font-semibold text-gray-900 dark:text-gray-100">« Windows Kurulumu</div>
            </div>
          </Link>

          <Link
            href="/docs/ensemble/baslangic"
            id="next-page"
            className="flex items-center justify-end gap-2.5 flex-1 max-w-[260px] px-5 py-3.5 border border-gray-100 dark:border-[#313135] rounded-lg no-underline text-gray-600 dark:text-gray-400 bg-white dark:bg-[#1b1b1d] hover:border-blue-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors ml-auto text-right"
          >
            <div>
              <div className="text-[0.7rem] uppercase tracking-[0.06em] text-gray-400 dark:text-gray-500 font-semibold mb-0.5">Sonraki</div>
              <div className="text-[0.875rem] font-semibold text-gray-900 dark:text-gray-100">ENSEMBLE »</div>
            </div>
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  );
}
