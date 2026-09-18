import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Lock, Mail, Store, User, AlertCircle, Loader2 } from 'lucide-react';
import { PlanType, UserSession } from '../../types';
import { authService } from '../../services/authService';

interface TrialFormProps {
  initialPlan?: PlanType;
  onSuccess: (session: UserSession) => void;
}

export const TrialForm: React.FC<TrialFormProps> = ({ initialPlan = 'standar', onSuccess }) => {
  const [targetPlan, setTargetPlan] = useState<PlanType>(initialPlan);
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  // Form error state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const planOptions: { id: PlanType; label: string; branches: string }[] = [
    { id: 'standar', label: 'Standar', branches: '1 cabang' },
    { id: 'pro', label: 'Pro', branches: '2 cabang' },
    { id: 'premium', label: 'Premium', branches: '3 cabang' },
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi.';
    }

    if (!storeName.trim()) {
      newErrors.storeName = 'Nama toko/bisnis wajib diisi.';
    }

    if (!email.trim()) {
      newErrors.email = 'Alamat email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Alamat email tidak valid.';
    }

    if (!password) {
      newErrors.password = 'Password wajib diisi.';
    } else if (password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter.';
    }

    if (!agreed) {
      newErrors.agreed = 'Anda harus menyetujui Syarat & Ketentuan dan Kebijakan Privasi.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // Prevent double submit

    setGeneralError(null);

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await authService.register({
        name,
        storeName,
        email,
        password,
        targetPlan,
        agreedToTerms: agreed,
      });

      if (res.success && res.session) {
        onSuccess(res.session);
      } else {
        setGeneralError(res.error || 'Pendaftaran gagal. Silakan periksa data Anda.');
      }
    } catch {
      setGeneralError('Koneksi gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 pt-1">
      {/* Target Plan Selector */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
          Paket Incaran:
        </label>
        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Pilihan paket incaran">
          {planOptions.map((opt) => {
            const isSelected = targetPlan === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setTargetPlan(opt.id)}
                className={`py-2 px-1 text-center rounded-xl border transition-all text-xs flex flex-col items-center justify-center ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{opt.label}</span>
                <span className="text-[10px] text-slate-500 font-normal mt-0.5">
                  {opt.branches}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-slate-500 leading-tight pt-1">
          Trial dimulai dari paket Standar. Paket yang dipilih adalah paket yang ingin Anda tuju dan dapat dipilih kembali saat berlangganan.
        </p>
      </div>

      {/* General Error Banner */}
      {generalError && (
        <div
          role="alert"
          className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label
          htmlFor="trial-name"
          className="block text-xs font-semibold text-slate-700 mb-1"
        >
          Nama Lengkap
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <User className="w-4 h-4" />
          </div>
          <input
            id="trial-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            placeholder="Contoh: Budi Santoso"
            disabled={isLoading}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'trial-name-error' : undefined}
            className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.name
                ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/20'
                : 'border-slate-200 focus:border-blue-600 focus:ring-blue-600/20 bg-white'
            }`}
          />
        </div>
        {errors.name && (
          <p id="trial-name-error" role="alert" className="text-xs text-rose-600 mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* Store Name */}
      <div>
        <label
          htmlFor="trial-store-name"
          className="block text-xs font-semibold text-slate-700 mb-1"
        >
          Nama Toko / Bisnis
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Store className="w-4 h-4" />
          </div>
          <input
            id="trial-store-name"
            type="text"
            value={storeName}
            onChange={(e) => {
              setStoreName(e.target.value);
              if (errors.storeName) setErrors((prev) => ({ ...prev, storeName: '' }));
            }}
            placeholder="Contoh: Toko Kopi Sejahtera"
            disabled={isLoading}
            aria-invalid={!!errors.storeName}
            aria-describedby={errors.storeName ? 'trial-store-error' : undefined}
            className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.storeName
                ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/20'
                : 'border-slate-200 focus:border-blue-600 focus:ring-blue-600/20 bg-white'
            }`}
          />
        </div>
        {errors.storeName && (
          <p id="trial-store-error" role="alert" className="text-xs text-rose-600 mt-1">
            {errors.storeName}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="trial-email"
          className="block text-xs font-semibold text-slate-700 mb-1"
        >
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Mail className="w-4 h-4" />
          </div>
          <input
            id="trial-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
            }}
            placeholder="nama@email.com"
            disabled={isLoading}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'trial-email-error' : undefined}
            className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.email
                ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/20'
                : 'border-slate-200 focus:border-blue-600 focus:ring-blue-600/20 bg-white'
            }`}
          />
        </div>
        {errors.email && (
          <p id="trial-email-error" role="alert" className="text-xs text-rose-600 mt-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="trial-password"
          className="block text-xs font-semibold text-slate-700 mb-1"
        >
          Password (minimal 8 karakter)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Lock className="w-4 h-4" />
          </div>
          <input
            id="trial-password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
            }}
            placeholder="••••••••"
            disabled={isLoading}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'trial-pass-error' : undefined}
            className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.password
                ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/20'
                : 'border-slate-200 focus:border-blue-600 focus:ring-blue-600/20 bg-white'
            }`}
          />
        </div>
        {errors.password && (
          <p id="trial-pass-error" role="alert" className="text-xs text-rose-600 mt-1">
            {errors.password}
          </p>
        )}
      </div>

      {/* Agreement Checkbox */}
      <div className="pt-1">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            id="trial-agree"
            type="checkbox"
            checked={agreed}
            onChange={(e) => {
              setAgreed(e.target.checked);
              if (errors.agreed) setErrors((prev) => ({ ...prev, agreed: '' }));
            }}
            disabled={isLoading}
            className="mt-0.5 w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-600"
          />
          <span className="text-xs text-slate-600 leading-tight">
            Saya menyetujui <span className="text-blue-600 font-medium">Syarat & Ketentuan</span> dan{' '}
            <span className="text-blue-600 font-medium">Kebijakan Privasi</span>.
          </span>
        </label>
        {errors.agreed && (
          <p role="alert" className="text-xs text-rose-600 mt-1 pl-6">
            {errors.agreed}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          id="btn-submit-trial"
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Memproses...</span>
            </>
          ) : (
            <span>Mulai Trial Gratis</span>
          )}
        </button>
      </div>

      {/* Trust Badges under button */}
      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium border-t border-slate-100 px-1">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Tanpa kartu kredit
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Trial 7 hari
        </span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" /> Data toko aman
        </span>
      </div>
    </form>
  );
};
