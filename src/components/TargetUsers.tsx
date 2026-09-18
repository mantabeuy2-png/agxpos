import React from 'react';
import {
  ShoppingBag,
  Shirt,
  Utensils,
  Store,
  Sparkles,
  Wrench,
  GitBranch,
  Boxes,
} from 'lucide-react';

export const TargetUsers: React.FC = () => {
  const targets = [
    {
      title: 'Toko Retail',
      desc: 'Penjualan cepat dengan pencatatan kasir praktis dan cetak struk thermal.',
      icon: ShoppingBag,
    },
    {
      title: 'Fashion',
      desc: 'Pengelolaan variasi barang, label harga, dan riwayat transaksi pembeli.',
      icon: Shirt,
    },
    {
      title: 'Kuliner',
      desc: 'Dukungan kasir pesanan makanan & minuman serta pencatatan shift kasir harian.',
      icon: Utensils,
    },
    {
      title: 'Minimarket',
      desc: 'Ribuan produk tertata rapi dengan barcode scanner dan monitoring stok minimum.',
      icon: Store,
    },
    {
      title: 'Beauty & Salon',
      desc: 'Pencatatan layanan treatment, paket produk kecantikan, dan data member.',
      icon: Sparkles,
    },
    {
      title: 'Workshop',
      desc: 'Pencatatan suku cadang, inventaris peralatan, dan riwayat pembelian pelanggan.',
      icon: Wrench,
    },
    {
      title: 'Toko dengan Beberapa Cabang',
      desc: 'Kontrol transaksi dan stok terpusat di tiap lokasi cabang sesuai paket yang dipilih.',
      icon: GitBranch,
    },
    {
      title: 'Bisnis yang Membutuhkan Pengelolaan Stok',
      desc: 'Pengawasan stok menipis, pencatatan supplier, dan alur Purchase Order terstruktur.',
      icon: Boxes,
    },
  ];

  return (
    <section id="target-pengguna" className="py-16 md:py-24 bg-slate-50/70 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600 mb-2">
            Fleksibel & Relevan
          </h2>
          <p className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Dibuat untuk Berbagai Jenis UMKM
          </p>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Dirancang secara khusus untuk menjawab kebutuhan operasional nyata toko di Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {targets.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 hover:shadow-md hover:border-blue-300/80 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
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
