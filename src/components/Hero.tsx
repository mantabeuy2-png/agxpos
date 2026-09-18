import React from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  QrCode,
  ShieldCheck,
  Play,
} from 'lucide-react';
import { TabletDeviceFrame } from './TabletDeviceFrame';

interface HeroProps {
  onOpenAuth: (tab: 'trial' | 'login') => void;
  onOpenDemo?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth, onOpenDemo }) => {
  const scrollToFeatures = () => {
    const el = document.getElementById('fitur');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero-section" className="relative pt-6 pb-20 md:py-24 overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-12 left-1/4 w-96 h-96 bg-blue-300/25 rounded-full blur-3xl" />
        <div className="absolute top-8 right-1/4 w-80 h-80 bg-cyan-300/25 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-medium shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Platform POS & Operasional Toko untuk UMKM Indonesia</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Kelola Toko Lebih Mudah, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600">
              Jual Lebih Cepat
            </span>{' '}
            dengan AgxPOS
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Kasir, stok, cabang, pelanggan, laporan, hingga Asisten AI dalam satu platform yang dibuat untuk UMKM Indonesia.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              id="hero-trial-cta"
              type="button"
              onClick={() => onOpenAuth('trial')}
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Coba Gratis 7 Hari</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {onOpenDemo && (
              <button
                id="hero-demo-cta"
                type="button"
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-7 py-4 text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
                <span>Buka Demo Kasir Interaktif</span>
              </button>
            )}

            <button
              id="hero-features-cta"
              type="button"
              onClick={scrollToFeatures}
              className="w-full sm:w-auto px-7 py-4 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-2xl shadow-xs transition-all flex items-center justify-center"
            >
              Pelajari Fitur
            </button>
          </div>

          {/* Trust Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Trial gratis 7 hari</span>
            </div>
            <div className="flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-blue-600" />
              <span>Pembayaran langganan via QRIS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-600" />
              <span>Dibuat untuk UMKM Indonesia</span>
            </div>
          </div>
        </div>

        {/* Hero Illustrative Interactive Tablet Kasir Hardware Mockup */}
        <div className="mt-12 relative max-w-6xl mx-auto">
          <TabletDeviceFrame onTrialClick={() => onOpenAuth('trial')} />
        </div>
      </div>
    </section>
  );
};
