import React from 'react';
import { ArrowRight, CheckCircle2, QrCode, ShieldCheck } from 'lucide-react';

interface FinalCTAProps {
  onOpenAuth: (tab: 'trial' | 'login') => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenAuth }) => {
  return (
    <section id="final-cta" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 px-6 py-14 sm:px-12 sm:py-20 text-white shadow-2xl shadow-blue-900/20 text-center">
          {/* Subtle background circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-300/15 blur-2xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Siap Mengelola Toko dengan Lebih Terarah?
            </h2>

            <p className="text-blue-100 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Mulai trial gratis 7 hari dan lihat bagaimana AgxPOS membantu Anda memahami operasional toko.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <button
                id="final-cta-trial"
                type="button"
                onClick={() => onOpenAuth('trial')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                <span>Coba Gratis 7 Hari</span>
                <ArrowRight className="w-5 h-5 text-blue-700 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="final-cta-login"
                type="button"
                onClick={() => onOpenAuth('login')}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-blue-800/40 hover:bg-blue-800/60 border border-white/25 text-white font-semibold text-base transition-all flex items-center justify-center"
              >
                Masuk ke AgxPOS
              </button>
            </div>

            {/* Trust Points */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-blue-100 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Tanpa kartu kredit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-200" />
                <span>Trial 7 hari</span>
              </div>
              <div className="flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-blue-200" />
                <span>Pembayaran langganan via QRIS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
