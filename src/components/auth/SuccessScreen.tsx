import React from 'react';
import { CheckCircle2, ArrowRight, Store, Calendar, ShieldCheck } from 'lucide-react';
import { UserSession } from '../../types';

interface SuccessScreenProps {
  type: 'trial' | 'login';
  session: UserSession;
  onOpenDashboard: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  type,
  session,
  onOpenDashboard,
}) => {
  const isTrial = type === 'trial';

  return (
    <div className="py-4 text-center space-y-6">
      {/* Success Icon */}
      <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {isTrial ? 'Trial 7 Hari Aktif!' : 'Selamat datang kembali!'}
        </h3>
        <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
          {isTrial
            ? 'Akun Anda berhasil dibuat. Anda dapat mulai menggunakan AgxPOS.'
            : 'Anda berhasil masuk ke AgxPOS.'}
        </p>
      </div>

      {/* Session summary badge */}
      <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-left text-xs space-y-2 max-w-sm mx-auto">
        <div className="flex items-center justify-between text-slate-500">
          <span>Toko Terdaftar:</span>
          <span className="font-bold text-slate-900 flex items-center gap-1">
            <Store className="w-3.5 h-3.5 text-blue-600" />
            {session.storeName}
          </span>
        </div>
        <div className="flex items-center justify-between text-slate-500">
          <span>Pemilik:</span>
          <span className="font-semibold text-slate-800">{session.name}</span>
        </div>
        <div className="flex items-center justify-between text-slate-500">
          <span>Paket Terpilih:</span>
          <span className="font-bold text-blue-600 uppercase">
            Paket {session.plan}
          </span>
        </div>
        {isTrial && (
          <div className="flex items-center justify-between text-slate-500 pt-1 border-t border-slate-200/60">
            <span>Masa Berlaku Trial:</span>
            <span className="font-semibold text-emerald-700 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> 7 Hari Penuh
            </span>
          </div>
        )}
      </div>

      {/* Action Button to Dashboard */}
      <div>
        <button
          id="btn-open-dashboard"
          type="button"
          onClick={onOpenDashboard}
          className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 group"
        >
          <span>Buka Dashboard</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-[11px] text-slate-400 mt-2 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Sesi terotentikasi & tersimpan secara aman
        </p>
      </div>
    </div>
  );
};
