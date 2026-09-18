import React from 'react';
import {
  CreditCard,
  Package,
  Building2,
  Truck,
  FileSpreadsheet,
  Tag,
  Users2,
  BarChart3,
  QrCode,
  Clock,
  FileCheck2,
  Languages,
} from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  const features = [
    {
      icon: CreditCard,
      title: 'Kasir & Transaksi',
      desc: 'Kelola transaksi toko dengan alur kasir yang praktis.',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      icon: Package,
      title: 'Manajemen Stok',
      desc: 'Pantau stok produk dan identifikasi stok yang mulai menipis.',
      color: 'text-amber-600 bg-amber-50',
    },
    {
      icon: Building2,
      title: 'Multi-Cabang',
      desc: 'Kelola beberapa cabang sesuai paket yang dipilih.',
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      icon: Truck,
      title: 'Supplier',
      desc: 'Kelola data supplier dan kebutuhan pembelian toko.',
      color: 'text-cyan-600 bg-cyan-50',
    },
    {
      icon: FileSpreadsheet,
      title: 'Purchase Order',
      desc: 'Buat dan kelola kebutuhan Purchase Order.',
      color: 'text-teal-600 bg-teal-50',
    },
    {
      icon: Tag,
      title: 'Promo',
      desc: 'Kelola promo untuk mendukung penjualan.',
      color: 'text-rose-600 bg-rose-50',
    },
    {
      icon: Users2,
      title: 'Pelanggan & Member',
      desc: 'Kelola pelanggan dan member dalam satu tempat.',
      color: 'text-blue-700 bg-blue-50',
    },
    {
      icon: BarChart3,
      title: 'Laporan',
      desc: 'Pantau omzet, pendapatan, pengeluaran, produk, dan informasi operasional lainnya.',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      icon: QrCode,
      title: 'QRIS',
      desc: 'Gunakan QRIS untuk pembayaran langganan AgxPOS dan dukungan pembayaran toko sesuai fitur yang tersedia.',
      color: 'text-violet-600 bg-violet-50',
    },
    {
      icon: Clock,
      title: 'Shift Kasir',
      desc: 'Kelola aktivitas kasir berdasarkan shift.',
      color: 'text-sky-600 bg-sky-50',
    },
    {
      icon: FileCheck2,
      title: 'Z-Report',
      desc: 'Gunakan Z-Report untuk membantu penutupan dan evaluasi operasional harian.',
      color: 'text-emerald-700 bg-emerald-50',
    },
    {
      icon: Languages,
      title: 'Integrasi Lokal',
      desc: 'Dirancang dengan kebutuhan UMKM Indonesia seperti PPN, QRIS, WhatsApp, printer thermal, dan bahasa Indonesia.',
      color: 'text-slate-700 bg-slate-100',
    },
  ];

  return (
    <section id="fitur" className="py-16 md:py-24 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600 mb-2">
            Fitur Lengkap & Terintegrasi
          </h2>
          <p className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Semua yang Dibutuhkan untuk Mengelola Toko
          </p>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Fitur esensial operasional toko yang dirancang sederhana tanpa kerumitan yang tidak perlu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                id={`feature-card-${index + 1}`}
                className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 hover:shadow-lg hover:shadow-blue-900/5 hover:border-blue-200 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
