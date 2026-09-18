import React from 'react';
import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      before: 'Stok Sulit Dipantau',
      beforeDesc: 'Sering kehabisan barang tanpa sadar atau menumpuk barang kadaluarsa.',
      after: 'Informasi Stok dalam Satu Sistem',
      afterDesc: 'AgxPOS membantu memberikan informasi stok dalam satu sistem dengan peringatan stok menipis.',
    },
    {
      before: 'Data Penjualan Terpisah',
      beforeDesc: 'Nota manual tercecer, catatan kasir tidak sinkron dengan rekap harian.',
      after: 'Kasir & Laporan di Satu Platform',
      afterDesc: 'Kasir dan laporan berada dalam satu platform terintegrasi tanpa rekap ganda.',
    },
    {
      before: 'Cabang Sulit Dikontrol',
      beforeDesc: 'Harus mendatangi tiap toko fisik untuk mengecek omzet dan sisa inventaris.',
      after: 'Kontrol Cabang Sesuai Paket',
      afterDesc: 'Informasi operasional cabang dapat dikelola sesuai paket yang Anda pilih.',
    },
    {
      before: 'Supplier & Pembelian Tidak Teratur',
      beforeDesc: 'Catatan utang dan pemesanan barang ke supplier berantakan tanpa riwayat jelas.',
      after: 'Kelola Supplier & Purchase Order',
      afterDesc: 'Buat Purchase Order terstruktur dan pantau pesanan barang masuk dengan rapi.',
    },
    {
      before: 'Pemilik Toko Sulit Membaca Data',
      beforeDesc: 'Tenggelam dalam angka spreadsheet yang rumit tanpa tahu langkah apa yang perlu diambil.',
      after: 'Asisten AI Menjelaskan Data',
      afterDesc: 'Gunakan Asisten AI untuk menjelaskan data toko dengan bahasa yang mudah dipahami.',
    },
    {
      before: 'Pelanggan Lama Tidak Terpantau',
      beforeDesc: 'Tidak tahu siapa pelanggan setia yang sudah berminggu-minggu tidak kembali belanja.',
      after: 'Identifikasi Pelanggan Dormant',
      afterDesc: 'Gunakan data pelanggan dan riwayat transaksi untuk memahami pelanggan dormant.',
    },
  ];

  return (
    <section id="masalah" className="py-16 md:py-24 bg-slate-50/80 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600 mb-2">
            Transformasi Operasional
          </h2>
          <p className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Masalah Operasional yang Sering Terjadi di Toko
          </p>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Lihat bagaimana AgxPOS menyederhanakan alur kerja toko yang sebelumnya memakan waktu dan rentan keliru.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-slate-200/80 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              {/* Before Box */}
              <div className="rounded-2xl bg-rose-50/60 border border-rose-100 p-4 mb-4">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider mb-1">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Sebelumnya</span>
                </div>
                <div className="text-slate-900 font-bold text-sm sm:text-base mb-1">
                  {item.before}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.beforeDesc}
                </p>
              </div>

              {/* Solution Arrow */}
              <div className="flex items-center justify-center my-1 text-slate-400">
                <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0 text-blue-600" />
              </div>

              {/* After Box */}
              <div className="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-4 mt-4">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Dengan AgxPOS</span>
                </div>
                <div className="text-slate-900 font-bold text-sm sm:text-base mb-1">
                  {item.after}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.afterDesc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
