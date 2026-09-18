import React, { useState } from 'react';
import { ShieldCheck, FileText, X } from 'lucide-react';
import { AgxLogo } from './AgxLogo';

export const Footer: React.FC = () => {
  const [legalModalContent, setLegalModalContent] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openTerms = () => {
    setLegalModalContent({
      title: 'Syarat & Ketentuan AgxPOS',
      content:
        'Dengan mendaftar atau menggunakan AgxPOS, Anda menyetujui ketentuan pemanfaatan platform untuk operasional toko Anda. Layanan trial gratis berlaku selama 7 hari tanpa pemotongan biaya. Layanan langganan dibayarkan melalui QRIS resmi. AgxPOS berfokus pada penyediaan perangkat lunak POS dan operasional toko.',
    });
  };

  const openPrivacy = () => {
    setLegalModalContent({
      title: 'Kebijakan Privasi AgxPOS',
      content:
        'AgxPOS menghargai privasi data bisnis Anda. Seluruh informasi toko, katalog produk, data pelanggan, dan rekaman transaksi disimpan secara aman dan terenkripsi. Kami tidak membagikan data operasional toko Anda kepada pihak ketiga yang tidak berwenang.',
    });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 md:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-slate-800">
          {/* Logo & Tagline */}
          <div className="max-w-md">
            <div className="flex items-center gap-2.5 mb-3">
              <AgxLogo className="w-8 h-8" primaryColor="#38BDF8" accentColor="#DE1153" />
              <span className="text-xl font-bold tracking-tight text-white">
                Agx<span className="text-blue-500">POS</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Platform POS dan operasional toko untuk UMKM Indonesia.
            </p>
          </div>

          {/* Navigation links */}
          <div className="flex flex-wrap gap-6 sm:gap-8 text-sm font-medium">
            <a
              href="#fitur"
              onClick={(e) => handleLinkClick(e, '#fitur')}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Fitur
            </a>
            <a
              href="#cara-kerja"
              onClick={(e) => handleLinkClick(e, '#cara-kerja')}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Cara Kerja
            </a>
            <a
              href="#harga"
              onClick={(e) => handleLinkClick(e, '#harga')}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Harga
            </a>
            <a
              href="#faq"
              onClick={(e) => handleLinkClick(e, '#faq')}
              className="text-slate-300 hover:text-white transition-colors"
            >
              FAQ
            </a>
          </div>
        </div>

        {/* Bottom row with Legal links & copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} AgxPOS. Seluruh hak cipta dilindungi.
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={openTerms}
              className="hover:text-slate-300 transition-colors underline-offset-4 hover:underline"
            >
              Syarat & Ketentuan
            </button>
            <button
              type="button"
              onClick={openPrivacy}
              className="hover:text-slate-300 transition-colors underline-offset-4 hover:underline"
            >
              Kebijakan Privasi
            </button>
          </div>
        </div>
      </div>

      {/* Simple Legal Informational Modal if clicked */}
      {legalModalContent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              type="button"
              onClick={() => setLegalModalContent(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {legalModalContent.title}
              </h3>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {legalModalContent.content}
            </p>

            <button
              type="button"
              onClick={() => setLegalModalContent(null)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
