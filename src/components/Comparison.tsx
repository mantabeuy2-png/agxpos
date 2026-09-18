import React from 'react';
import { Check, Building2 } from 'lucide-react';
import { PlanType } from '../types';

interface ComparisonProps {
  onSelectPlan: (plan: PlanType) => void;
}

export const Comparison: React.FC<ComparisonProps> = ({ onSelectPlan }) => {
  const comparisonRows = [
    {
      feature: 'Jumlah Cabang Toko',
      standar: '1 cabang',
      pro: '2 cabang',
      premium: '3 cabang',
      isHighlight: true,
    },
    {
      feature: 'Kasir & Transaksi Toko',
      standar: true,
      pro: true,
      premium: true,
    },
    {
      feature: 'Manajemen Stok & Peringatan Menipis',
      standar: true,
      pro: true,
      premium: true,
    },
    {
      feature: 'Supplier & Purchase Order (PO)',
      standar: true,
      pro: true,
      premium: true,
    },
    {
      feature: 'Manajemen Promo Penjualan',
      standar: true,
      pro: true,
      premium: true,
    },
    {
      feature: 'Pelanggan & Member',
      standar: true,
      pro: true,
      premium: true,
    },
    {
      feature: 'Laporan Omzet, Pendapatan & Pengeluaran',
      standar: true,
      pro: true,
      premium: true,
    },
    {
      feature: 'Dukungan Pembayaran QRIS',
      standar: true,
      pro: true,
      premium: true,
    },
    {
      feature: 'Manajemen Shift Kasir',
      standar: true,
      pro: true,
      premium: true,
    },
    {
      feature: 'Z-Report Penutupan Harian',
      standar: true,
      pro: true,
      premium: true,
    },
    {
      feature: 'Asisten AI (Advisory Data Toko)',
      standar: true,
      pro: true,
      premium: true,
    },
    {
      feature: 'Integrasi Lokal (PPN, WhatsApp, Printer Thermal)',
      standar: true,
      pro: true,
      premium: true,
    },
  ];

  return (
    <section id="komparasi-paket" className="py-16 md:py-24 bg-slate-50/80 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600 mb-2">
            Perbandingan Detail
          </h2>
          <p className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Perbandingan Fitur Antar Paket
          </p>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Seluruh fitur esensial toko tersedia di semua paket. Anda hanya memilih berdasarkan jumlah cabang yang ingin dikelola.
          </p>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto rounded-3xl bg-white border border-slate-200/90 shadow-sm">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="py-5 px-6 text-sm font-bold text-slate-900 w-2/5">
                  Fitur AgxPOS
                </th>
                <th className="py-5 px-4 text-center text-sm font-bold text-slate-900 w-1/5">
                  <div>Standar</div>
                  <div className="text-xs font-normal text-slate-500 mt-0.5">Rp99.000/bln</div>
                </th>
                <th className="py-5 px-4 text-center text-sm font-bold text-blue-600 w-1/5 bg-blue-50/40">
                  <div>Pro</div>
                  <div className="text-xs font-normal text-slate-500 mt-0.5">Rp199.000/bln</div>
                </th>
                <th className="py-5 px-4 text-center text-sm font-bold text-slate-900 w-1/5">
                  <div>Premium</div>
                  <div className="text-xs font-normal text-slate-500 mt-0.5">Rp299.000/bln</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {comparisonRows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-slate-50/60 transition-colors ${
                    row.isHighlight ? 'bg-blue-50/20 font-semibold' : ''
                  }`}
                >
                  <td className="py-4 px-6 text-slate-800">
                    <span className={row.isHighlight ? 'font-bold text-slate-900' : ''}>
                      {row.feature}
                    </span>
                  </td>

                  {/* Standar Col */}
                  <td className="py-4 px-4 text-center">
                    {typeof row.standar === 'string' ? (
                      <span className="inline-flex items-center gap-1 font-bold text-slate-900 px-2.5 py-1 rounded-md bg-slate-100 text-xs">
                        <Building2 className="w-3.5 h-3.5 text-blue-600" />
                        {row.standar}
                      </span>
                    ) : (
                      <div className="flex justify-center">
                        <Check className="w-5 h-5 text-emerald-600 stroke-[2.5]" />
                      </div>
                    )}
                  </td>

                  {/* Pro Col */}
                  <td className="py-4 px-4 text-center bg-blue-50/20">
                    {typeof row.pro === 'string' ? (
                      <span className="inline-flex items-center gap-1 font-bold text-blue-700 px-2.5 py-1 rounded-md bg-blue-100 text-xs">
                        <Building2 className="w-3.5 h-3.5 text-blue-600" />
                        {row.pro}
                      </span>
                    ) : (
                      <div className="flex justify-center">
                        <Check className="w-5 h-5 text-emerald-600 stroke-[2.5]" />
                      </div>
                    )}
                  </td>

                  {/* Premium Col */}
                  <td className="py-4 px-4 text-center">
                    {typeof row.premium === 'string' ? (
                      <span className="inline-flex items-center gap-1 font-bold text-slate-900 px-2.5 py-1 rounded-md bg-slate-100 text-xs">
                        <Building2 className="w-3.5 h-3.5 text-blue-600" />
                        {row.premium}
                      </span>
                    ) : (
                      <div className="flex justify-center">
                        <Check className="w-5 h-5 text-emerald-600 stroke-[2.5]" />
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {/* Table Action Row */}
              <tr className="bg-slate-50/40">
                <td className="py-5 px-6 text-xs text-slate-500 font-medium">
                  Semua paket dilengkapi trial gratis 7 hari
                </td>
                <td className="py-5 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => onSelectPlan('standar')}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    Pilih Standar
                  </button>
                </td>
                <td className="py-5 px-4 text-center bg-blue-50/30">
                  <button
                    type="button"
                    onClick={() => onSelectPlan('pro')}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-2xs"
                  >
                    Pilih Pro
                  </button>
                </td>
                <td className="py-5 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => onSelectPlan('premium')}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    Pilih Premium
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
