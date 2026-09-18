import React, { useState } from 'react';
import { Mail, Lock, AlertCircle, Loader2, Info } from 'lucide-react';
import { UserSession } from '../../types';
import { authService } from '../../services/authService';

interface LoginFormProps {
  onSuccess: (session: UserSession) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotNotice, setForgotNotice] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Alamat email tidak valid.';
    }

    if (!password) {
      newErrors.password = 'Password wajib diisi.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setGeneralError(null);
    setForgotNotice(false);

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await authService.login({
        email,
        password,
      });

      if (res.success && res.session) {
        onSuccess(res.session);
      } else {
        setGeneralError(res.error || 'Kredensial salah.');
      }
    } catch {
      setGeneralError('Koneksi gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('demo@agxpos.id');
    setPassword('password123');
    setErrors({});
    setGeneralError(null);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 pt-1">
      {/* Demo helper badge */}
      <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/60 flex items-center justify-between text-xs text-blue-900">
        <div className="flex items-center gap-1.5 truncate pr-2">
          <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="truncate">Akun Demo Siap Pakai:</span>
        </div>
        <button
          type="button"
          onClick={handleFillDemo}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 underline shrink-0"
        >
          Gunakan Demo
        </button>
      </div>

      {/* General error alert */}
      {generalError && (
        <div
          role="alert"
          className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label
          htmlFor="login-email"
          className="block text-xs font-semibold text-slate-700 mb-1"
        >
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Mail className="w-4 h-4" />
          </div>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
            }}
            placeholder="nama@email.com"
            disabled={isLoading}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.email
                ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/20'
                : 'border-slate-200 focus:border-blue-600 focus:ring-blue-600/20 bg-white'
            }`}
          />
        </div>
        {errors.email && (
          <p id="login-email-error" role="alert" className="text-xs text-rose-600 mt-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label
            htmlFor="login-password"
            className="block text-xs font-semibold text-slate-700"
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => setForgotNotice(true)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Lupa password?
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Lock className="w-4 h-4" />
          </div>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
            }}
            placeholder="••••••••"
            disabled={isLoading}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'login-pass-error' : undefined}
            className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.password
                ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/20'
                : 'border-slate-200 focus:border-blue-600 focus:ring-blue-600/20 bg-white'
            }`}
          />
        </div>
        {errors.password && (
          <p id="login-pass-error" role="alert" className="text-xs text-rose-600 mt-1">
            {errors.password}
          </p>
        )}

        {forgotNotice && (
          <div className="mt-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-tight">
            Instruksi reset password dikirimkan ke email terdaftar Anda atau silakan gunakan akun demo jika sedang menguji aplikasi.
          </div>
        )}
      </div>

      {/* Submit button */}
      <div className="pt-2">
        <button
          id="btn-submit-login"
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
            <span>Masuk ke AgxPOS</span>
          )}
        </button>
      </div>
    </form>
  );
};
