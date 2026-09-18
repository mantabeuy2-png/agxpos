import React, { useState } from 'react';
import { Check, QrCode, Sparkles, Building, ArrowRight } from 'lucide-react';
import { BillingCycle, PlanType } from '../types';

interface PricingProps {
  onSelectPlan: (plan: PlanType) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('1m');

  const cycles: { id: BillingCycle; label: string; discountText?: string }[] = [
    { id: '1m', label: 'Bulanan' },
    { id: '3m', label: '3 Bulan', discountText: 'Diskon 10%' },
    { id: '6m', label: '6 Bulan', discountText: 'Diskon 20%' },
    { id: '12m', label: '12 Bulan', discountText: 'Diskon 35%' },
  ];

  // Rumus perhitungan harga resmi tepat sesuai instruksi:
  // 3 bulan = 90%, 6 bulan = 80%, 12 bulan = 65%
  const calculatePlanPrice = (monthlyBase: number, cycle: BillingCycle) => {
    switch (cycle) {
      case '1m':
        return {
          total: monthlyBase,
          perMonth: monthlyBase,
          savings: 0,
        };
      case '3m': {
        const total = Math.round(monthlyBase * 3 * 0.9);
        return {
          total,
          perMonth: Math.round(total / 3),
          savings: monthlyBase * 3 - total,
        };
      }
      case '6m': {
        const total = Math.round(monthlyBase * 6 * 0.8);
        return {
          total,
          perMonth: Math.round(total / 6),
          savings: monthlyBase * 6 - total,
        };
      }
      case '12m': {
        const total = Math.round(monthlyBase * 12 * 0.65);
        return {
          total,
          perMonth: Math.round(total / 12),
          savings: monthlyBase * 12 - total,
        };
      }
    }
  };

  const formatIDR = (num: number) => {
    return 'Rp' + num.toLocaleString('id-ID');
  };

  const plans: {
    id: PlanType;
    name: string;
    monthlyBasePrice: number;
    branchesText: string;
    popular?: boolean;
    description: string;
    features: string[];
  }[] = [
    {
      id: 'standar',
      name: 'STANDAR',
      monthlyBasePrice: 99000,
      branchesText: '1 cabang',
      description: 'Solusi terintegrasi untuk toko tunggal yang ingin mulai menata operasional.',
      features: [
        '1 cabang toko',
        'Kasir & transaksi toko',
        'Manajemen stok & peringatan menipis',
        'Supplier & Purchase Order',
        'Promo penjualan',
        'Pelanggan & member',
        'Laporan omzet & pengeluaran',
        'Pembayaran QRIS',
        'Shift kasir & Z-Report',
        'Asisten AI (Advisory data toko)',
      ],
    },
    {
      id: 'pro',
      name: 'PRO',
      monthlyBasePrice: 199000,
      branchesText: '2 cabang',
      popular: true,
      description: 'Ideal untuk pemilik bisnis yang mulai berekspansi ke cabang kedua.',
      features: [
        '2 cabang toko',
        'Kasir & transaksi toko',
        'Manajemen stok & peringatan menipis',
        'Supplier & Purchase Order',
        'Promo penjualan',
        'Pelanggan & member',
        'Laporan omzet & pengeluaran',
        'Pembayaran QRIS',
        'Shift kasir & Z-Report',
        'Asisten AI (Advisory data toko)',
      ],
    },
    {
      id: 'premium',
      name: 'PREMIUM',
      monthlyBasePrice: 299000,
      branchesText: '3 cabang',
      description: 'Dukungan operasional terkoordinasi untuk bisnis dengan tiga cabang aktif.',
      features: [
        '3 cabang toko',
        'Kasir & transaksi toko',
        'Manajemen stok & peringatan menipis',
        'Supplier & Purchase Order',
        'Promo penjualan',
        'Pelanggan & member',
        'Laporan omzet & pengeluaran',
        'Pembayaran QRIS',
        'Shift kasir & Z-Report',
        'Asisten AI (Advisory data toko)',
      ],
    },
  ];

  return (
    <section id="harga" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Trial gratis 7 hari</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Mulai dari Toko Anda. Berkembang Sesuai Kebutuhan.
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Pilihan paket transparan yang dibedakan berdasarkan jumlah cabang yang Anda kelola.
          </p>

          {/* Billing Cycle Selector */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 shadow-inner flex-wrap justify-center gap-1">
            {cycles.map((cycle) => {
              const isSelected = billingCycle === cycle.id;
              return (
                <button
                  key={cycle.id}
                  type="button"
                  onClick={() => setBillingCycle(cycle.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{cycle.label}</span>
                  {cycle.discountText && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isSelected
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {cycle.discountText}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan) => {
            const pricingCalc = calculatePlanPrice(plan.monthlyBasePrice, billingCycle);

            return (
              <div
                key={plan.id}
                id={`pricing-card-${plan.id}`}
                className={`relative rounded-3xl bg-white border flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'border-blue-500 shadow-xl shadow-blue-500/10 lg:-translate-y-2 ring-2 ring-blue-500/20'
                    : 'border-slate-200/90 shadow-md hover:shadow-lg'
                } p-6 sm:p-8`}
              >
                {/* Popular Accent Ribbon (Desain penanda visual tanpa klaim superlatif) */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-bold tracking-wide shadow-sm flex items-center gap-1">
                    <span>Paling Populer</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      {plan.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/60">
                      <Building className="w-3.5 h-3.5" />
                      {plan.branchesText}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mb-6 min-h-[38px]">
                    {plan.description}
                  </p>

                  {/* Price display */}
                  <div className="pt-4 border-t border-slate-100 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {formatIDR(pricingCalc.perMonth)}
                      </span>
                      <span className="text-slate-500 text-xs sm:text-sm font-medium">
                        /bulan
                      </span>
                    </div>

                    {/* Total billing summary for multimonth */}
                    {billingCycle !== '1m' ? (
                      <div className="mt-2 text-xs text-slate-500 flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span>
                          Total {cycles.find((c) => c.id === billingCycle)?.label}:{' '}
                          <strong className="text-slate-900">{formatIDR(pricingCalc.total)}</strong>
                        </span>
                        <span className="text-emerald-600 font-semibold">
                          Hemat {formatIDR(pricingCalc.savings)}
                        </span>
                      </div>
                    ) : (
                      <div className="mt-2 text-xs text-slate-500">
                        Harga dasar bulanan resmi
                      </div>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Fitur Termasuk:
                    </div>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    id={`pricing-cta-${plan.id}`}
                    type="button"
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xs ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span>Coba Gratis 7 Hari</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-slate-500 mt-2">
                    Trial 7 hari tanpa kartu kredit
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment clarification notice */}
        <div className="mt-12 max-w-xl mx-auto rounded-2xl bg-blue-50/60 border border-blue-200/80 p-4 flex items-center justify-center gap-3 text-xs sm:text-sm text-blue-900 font-medium text-center">
          <QrCode className="w-5 h-5 text-blue-600 shrink-0" />
          <span>
            Pembayaran langganan menggunakan <strong>QRIS</strong>. Praktis dan mendukung seluruh aplikasi bank & e-wallet di Indonesia.
          </span>
        </div>
      </div>
    </section>
  );
};
