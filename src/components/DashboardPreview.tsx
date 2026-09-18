import React, { useState } from 'react';
import {
  Store,
  LogOut,
  ArrowLeft,
  Calendar,
  Building,
  CreditCard,
  Package,
  TrendingUp,
  Bot,
  Sparkles,
  QrCode,
  Users,
  CheckCircle2,
  Clock,
  Send,
  Tablet,
  BarChart2,
} from 'lucide-react';
import { UserSession } from '../types';
import { TabletKasirApp } from './TabletKasirApp';

interface DashboardPreviewProps {
  session: UserSession;
  onLogout: () => void;
  onBackToLanding: () => void;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({
  session,
  onLogout,
  onBackToLanding,
}) => {
  const [activeTab, setActiveTab] = useState<'kasir' | 'overview'>('kasir');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const branchesCount =
    session.plan === 'premium' ? '3 Cabang' : session.plan === 'pro' ? '2 Cabang' : '1 Cabang';

  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    setIsAiLoading(true);
    setTimeout(() => {
      setIsAiLoading(false);
      setAiResponse(
        `Berdasarkan data toko ${session.storeName}, omzet hari ini stabil di angka Rp3.850.000 dengan 42 transaksi. Terdapat 2 produk dengan stok rendah yang disarankan untuk dibuatkan draft Purchase Order.`
      );
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToLanding}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-semibold"
              title="Kembali ke Landing Page"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Landing Page</span>
            </button>
            <div className="h-5 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#072545] text-white flex items-center justify-center font-bold">
                <Store className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>{session.storeName}</span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 uppercase">
                    Paket {session.plan} ({branchesCount})
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Pemilik: {session.name} • {session.email}
                </div>
              </div>
            </div>
          </div>

          {/* Center Tabs: Kasir Tablet vs Overview */}
          <div className="hidden md:flex p-1 rounded-xl bg-slate-100 border border-slate-200 gap-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('kasir')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'kasir'
                  ? 'bg-white text-sky-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Kasir Tablet</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'overview'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Laporan & AI</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
              <Calendar className="w-3.5 h-3.5" />
              <span>Trial Aktif 7 Hari</span>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation for Tabs */}
        <div className="md:hidden flex border-t border-slate-200 p-2 bg-slate-50 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('kasir')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 ${
              activeTab === 'kasir' ? 'bg-sky-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Kasir Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 ${
              activeTab === 'overview' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Laporan & AI</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      {activeTab === 'kasir' ? (
        /* Fullscreen Tablet POS View */
        <div className="flex-1 w-full max-w-7xl mx-auto p-2 sm:p-4 md:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Store className="w-4 h-4 text-sky-600" />
                <span>Terminal Kasir Operasional Toko (AgxPOS Tablet)</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] text-slate-500">
                • Mode layar sentuh aktif
              </span>
            </div>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Sinkronisasi Cloud Aktif
            </span>
          </div>

          <div className="flex-1 w-full bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-300/80 min-h-[720px] flex flex-col">
            <TabletKasirApp
              isEmbedded={false}
              isFullscreen={false}
            />
          </div>
        </div>
      ) : (
        /* Overview, Stats, and AI advisory tab */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Trial banner */}
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-5 sm:p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-100">
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Workspace Operasional AgxPOS</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">
                Toko Anda siap beroperasi secara terpadu!
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 max-w-2xl">
                Akun Anda telah terkonfigurasi dengan paket <strong>{session.plan.toUpperCase()}</strong> ({branchesCount}).
                Semua transaksi kasir tablet otomatis terhubung ke laporan keuangan dan analisa stok.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 text-xs">
              <span className="px-3.5 py-2 rounded-xl bg-white/20 text-white font-semibold backdrop-blur-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                QRIS Siap Digunakan
              </span>
            </div>
          </div>

          {/* 4 Stat Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                <span>Omzet Toko Hari Ini</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  +12%
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900">Rp3.850.000</div>
              <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" /> 42 Transaksi tercatat
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                <span>Status Stok</span>
                <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">
                  2 Menipis
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900">128 Produk</div>
              <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-amber-600" /> Periksa Sirup & Kopi
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                <span>Cabang Toko</span>
                <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
                  Aktif
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{branchesCount}</div>
              <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-indigo-600" /> Sesuai paket {session.plan}
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                <span>Pelanggan & Member</span>
                <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded">
                  14 Member
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900">38 Transaksi</div>
              <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-cyan-600" /> Poin loyalty aktif
              </div>
            </div>
          </div>

          {/* Operational Modules & Interactive Advisory AI Assistant */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Operational modules status */}
            <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200/90 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Modul Operasional Toko
                  </h2>
                  <p className="text-xs text-slate-500">
                    Semua modul terintegrasi dalam satu sistem untuk toko Anda.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  Sistem Online
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Kasir & Transaksi</div>
                      <div className="text-[11px] text-slate-500">Shift Pagi Aktif</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Stok & PO</div>
                      <div className="text-[11px] text-slate-500">Katalog Tersinkron</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">QRIS & Pembayaran</div>
                      <div className="text-[11px] text-slate-500">Terhubung Nasional</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Z-Report & Tutup Kasir</div>
                      <div className="text-[11px] text-slate-500">Siap Cetak Otomatis</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Bahasa Sistem: Bahasa Indonesia</span>
                <span>Dukungan Printer: Thermal 58mm / 80mm</span>
              </div>
            </div>

            {/* Right: AI Advisory Panel */}
            <div className="lg:col-span-5 rounded-3xl bg-slate-900 text-white p-6 shadow-md flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>Asisten AI Toko</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-900/80 text-blue-300 font-medium">
                          Advisory
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">Analisis Data Toko Anda</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/70 text-xs text-slate-300 leading-relaxed">
                    <span className="text-cyan-400 font-semibold block mb-1">
                      Insight AI Hari Ini:
                    </span>
                    "Kopi Susu Gula Aren memiliki frekuensi pembelian tertinggi di jam istirahat. Segera periksa stok Sirup Karamel yang tersisa 3 botol."
                  </div>

                  {aiResponse && (
                    <div className="p-3 rounded-2xl bg-blue-950/60 border border-blue-800/60 text-xs text-blue-200 leading-relaxed">
                      <span className="text-cyan-300 font-semibold block mb-1">Jawaban AI:</span>
                      {aiResponse}
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={handleAskAI} className="pt-2">
                <div className="relative">
                  <input
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    placeholder="Tanyakan performa toko ke AI..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 pr-10"
                  />
                  <button
                    type="submit"
                    disabled={isAiLoading}
                    className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                    aria-label="Kirim pertanyaan ke Asisten AI"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  AI memberi insight. Keputusan operasional tetap di tangan Anda.
                </p>
              </form>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

