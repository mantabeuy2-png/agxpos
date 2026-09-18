import React from 'react';
import { Zap, ShieldCheck, BrainCircuit, QrCode, ClipboardList, LineChart } from 'lucide-react';

export const Pillars: React.FC = () => {
  const pillars = [
    {
      badge: 'Pilar 1',
      title: 'Jual Lebih Cepat',
      desc: 'Proses transaksi lebih praktis dengan kasir, pembayaran QRIS, shift kasir, dan perangkat yang umum digunakan toko.',
      icon: Zap,
      accentBg: 'bg-blue-50',
      accentText: 'text-blue-600',
      badgeBg: 'bg-blue-100 text-blue-800',
      tags: ['Kasir Cepat', 'QRIS Toko', 'Shift Kasir', 'Printer Thermal'],
      subIcon: QrCode,
    },
    {
      badge: 'Pilar 2',
      title: 'Operasional Terkendali',
      desc: 'Pantau stok, supplier, Purchase Order, cabang, promo, pelanggan, dan laporan dari satu tempat.',
      icon: ShieldCheck,
      accentBg: 'bg-cyan-50',
      accentText: 'text-cyan-600',
      badgeBg: 'bg-cyan-100 text-cyan-800',
      tags: ['Stok & PO', 'Multi-Cabang', 'Data Pelanggan', 'Laporan Lengkap'],
      subIcon: ClipboardList,
    },
    {
      badge: 'Pilar 3',
      title: 'Keputusan Berbasis AI',
      desc: 'Gunakan Asisten AI untuk memahami kondisi toko berdasarkan data yang tersedia.',
      icon: BrainCircuit,
      accentBg: 'bg-emerald-50',
      accentText: 'text-emerald-600',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      tags: ['Insight Omzet', 'Tren Produk', 'Stok Rendah', 'Advisory'],
      subIcon: LineChart,
    },
  ];

  return (
    <section id="pilar-section" className="py-16 md:py-24 bg-[#E3FAFF] border-y border-sky-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600 mb-2">
            Fondasi Bisnis Kuat
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            3 Pilar AgxPOS untuk Membantu UMKM Maju
          </p>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Kombinasi efisiensi kasir, keteraturan manajemen toko, dan kecerdasan data dalam genggaman Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="relative rounded-3xl bg-white border border-slate-200/90 p-6 lg:p-8 hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-300/80 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${pillar.accentBg} ${pillar.accentText} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${pillar.badgeBg}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 font-medium border border-slate-200/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
