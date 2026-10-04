import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
