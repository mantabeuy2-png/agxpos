import React from 'react';
import { Store, SlidersHorizontal, ShoppingCart, BarChart3, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenAuth: (tab: 'trial' | 'login') => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenAuth }) => {
  const steps = [
    {
      step: '01',
      title: 'Daftarkan Toko',
      desc: 'Buat akun trial gratis 7 hari dalam hitungan menit tanpa kartu kredit.',
      icon: Store,
      color: 'bg-blue-600 text-white',
    },
    {
      step: '02',
      title: 'Atur Produk & Operasional',
      desc: 'Masukkan katalog barang, tentukan batas stok minimum, dan sambungkan printer kasir Anda.',
      icon: SlidersHorizontal,
      color: 'bg-cyan-600 text-white',
    },
    {
      step: '03',
      title: 'Mulai Berjualan',
      desc: 'Layani transaksi pelanggan dengan cepat, terima QRIS toko, dan kelola shift kasir harian.',
      icon: ShoppingCart,
      color: 'bg-emerald-600 text-white',
    },
    {
      step: '04',
      title: 'Pantau & Pahami Data',
      desc: 'Lihat omzet harian, cetak Z-Report, dan tanyakan performa toko kepada Asisten AI.',
      icon: BarChart3,
      color: 'bg-indigo-600 text-white',
    },
  ];

  return (
    <section id="cara-kerja" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600 mb-2">
            Langkah Praktis
          </h2>
          <p className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cara Kerja AgxPOS
          </p>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Hanya 4 langkah mudah untuk mulai menjalankan operasional toko yang lebih rapi dan terkontrol.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-3xl bg-slate-50 border border-slate-200/80 p-6 flex flex-col justify-between hover:bg-blue-50/40 hover:border-blue-200 transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-extrabold text-slate-300 group-hover:text-blue-600 transition-colors">
                      {item.step}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center shadow-md shadow-slate-900/5 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-blue-600">
                  <span>Tahap {index + 1}</span>
                  {index < 3 && <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => onOpenAuth('trial')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all"
          >
            <span>Mulai Langkah Pertama Anda Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
