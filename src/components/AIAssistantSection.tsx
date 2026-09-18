import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  User,
  ShieldAlert,
  Info,
  ChevronRight,
  TrendingUp,
  Package,
  Users,
  DollarSign,
  Layers,
} from 'lucide-react';

interface ChatExample {
  id: string;
  category: string;
  icon: React.ElementType;
  question: string;
  answer: string;
  detailPoints?: string[];
}

export const AIAssistantSection: React.FC = () => {
  const chatExamples: ChatExample[] = [
    {
      id: 'omzet',
      category: 'Tren Omzet',
      icon: TrendingUp,
      question: 'Bagaimana omzet toko saya minggu ini?',
      answer:
        'Omzet minggu ini mencapai Rp18,4 juta, naik 12% dibanding minggu sebelumnya. Produk dengan kontribusi terbesar adalah Kopi Susu Gula Aren dengan total 142 cup terjual.',
      detailPoints: [
        'Total omzet: Rp18.400.000',
        'Pertumbuhan: +12% dibanding pekan lalu',
        'Waktu transaksi terpadat: Pukul 13:00 - 15:30 WIB',
      ],
    },
    {
      id: 'laku',
      category: 'Produk Terlaris',
      icon: Package,
      question: 'Produk apa yang paling laku?',
      answer:
        '3 produk dengan penjualan tertinggi minggu ini adalah Kopi Susu Gula Aren (142 cup), Roti Bakar Keju (84 porsi), dan Teh Melati Wangi (67 cup).',
      detailPoints: [
        'Kopi Susu Gula Aren berkontribusi 38% dari total pendapatan',
        'Roti Bakar Keju meningkat di jam istirahat siang',
      ],
    },
    {
      id: 'stok',
      category: 'Peringatan Stok',
      icon: Package,
      question: 'Stok apa yang mulai menipis?',
      answer:
        'Ada 7 produk yang perlu diperhatikan karena stoknya berada pada level rendah. Di antaranya Sirup Karamel (tersisa 3 botol) dan Biji Kopi Arabika (tersisa 1,2 kg).',
      detailPoints: [
        'Sirup Karamel: sisa 3 botol (batas minimum 5 botol)',
        'Saran: Segera siapkan draft Purchase Order kepada supplier terkait',
      ],
    },
    {
      id: 'dormant',
      category: 'Pelanggan Dormant',
      icon: Users,
      question: 'Ada pelanggan yang sudah lama tidak belanja?',
      answer:
        'Ya. Terdapat beberapa pelanggan yang masuk kategori dormant berdasarkan riwayat transaksi yang tersedia, yaitu member yang belum berkunjung kembali lebih dari 30 hari.',
      detailPoints: [
        '14 member belum berbelanja dalam 30 hari terakhir',
        'Saran: Anda dapat mempertimbangkan program promo berkala untuk menyapa kembali',
      ],
    },
    {
      id: 'cross-sell',
      category: 'Peluang Cross-Sell',
      icon: Layers,
      question: 'Produk apa yang bisa saya cross-sell?',
      answer:
        'Beberapa kombinasi produk yang sering dibeli bersama dapat menjadi kandidat cross-sell, seperti Paket Kopi Susu + Roti Bakar Keju yang sering muncul dalam satu nota kasir.',
      detailPoints: [
        '31% pembeli Kopi Susu juga memesan camilan',
        'Saran: Tawarkan bundling paket hemat di kasir',
      ],
    },
    {
      id: 'pengeluaran',
      category: 'Analisis Biaya',
      icon: DollarSign,
      question: 'Bagaimana pengeluaran toko saya?',
      answer:
        'Pengeluaran periode ini sebesar Rp6,2 juta berdasarkan data pencatatan pengeluaran operasional dan pembelian stok yang tersedia.',
      detailPoints: [
        'Pembelian bahan baku: Rp4.800.000',
        'Operasional & utilitas: Rp1.400.000',
      ],
    },
    {
      id: 'pendapatan',
      category: 'Ringkasan Pendapatan',
      icon: DollarSign,
      question: 'Berapa pendapatan saya?',
      answer:
        'Pendapatan periode ini sebesar Rp18,4 juta berdasarkan data transaksi kasir yang tercatat dalam sistem.',
      detailPoints: [
        'Semua transaksi tercatat rapi di laporan harian dan Z-Report',
      ],
    },
  ];

  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const activeChat = chatExamples[activeChatIndex];

  return (
    <section id="asisten-ai" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-24 -left-36 w-80 h-80 bg-cyan-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Asisten AI Toko AgxPOS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Jangan Hanya Melihat Angka.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              Pahami Apa yang Terjadi di Toko.
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            Asisten AI membantu membaca dan menjelaskan data toko agar pemilik bisnis lebih mudah memahami kondisi operasional.
          </p>
        </div>

        {/* Interactive Chat Mockup Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Sample Prompts / Questions list */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 px-1 flex items-center justify-between">
              <span>Pilih Pertanyaan Pemilik Toko:</span>
              <span className="text-[11px] font-normal text-blue-600">Klik untuk melihat jawaban</span>
            </div>

            <div className="space-y-2">
              {chatExamples.map((item, idx) => {
                const Icon = item.icon;
                const isActive = idx === activeChatIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveChatIndex(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                      isActive
                        ? 'bg-blue-50/80 border-blue-400/80 shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate pr-2">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          {item.category}
                        </div>
                        <div className={`text-xs sm:text-sm font-medium truncate ${isActive ? 'text-blue-950 font-bold' : 'text-slate-800'}`}>
                          "{item.question}"
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? 'text-blue-600 translate-x-0.5' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: AI Chat Simulator */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-7 shadow-xl border border-slate-800 relative">
              {/* Terminal header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-xs">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold flex items-center gap-2">
                      <span>Asisten AI Toko</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-semibold border border-emerald-800">
                        Advisory Online
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Membaca data: Transaksi, Stok & Pelanggan
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-400 hidden sm:block">
                  Mode: Penjelasan Data
                </div>
              </div>

              {/* Chat Thread */}
              <div className="space-y-4 min-h-[280px] flex flex-col justify-center">
                {/* User Bubble */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-blue-600 px-4 py-3 text-white text-sm shadow-xs">
                    <p className="font-medium">{activeChat.question}</p>
                    <span className="text-[10px] text-blue-200 block text-right mt-1">Pemilik Toko</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-300">
                    <User className="w-4 h-4" />
                  </div>
                </div>

                {/* AI Bubble */}
                <div className="flex items-start gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shrink-0 text-white shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="max-w-[90%] rounded-2xl rounded-tl-xs bg-slate-800 border border-slate-700/80 px-4 py-3.5 text-slate-200 text-sm space-y-2.5 shadow-xs">
                    <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Analisis Asisten AI</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed text-xs sm:text-sm">
                      {activeChat.answer}
                    </p>

                    {activeChat.detailPoints && activeChat.detailPoints.length > 0 && (
                      <div className="pt-2 border-t border-slate-700/60 space-y-1">
                        {activeChat.detailPoints.map((pt, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <span className="text-cyan-400 font-bold">•</span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="text-[10px] text-slate-400 pt-1 text-right">
                      Advisory insight berdasarkan data riwayat toko Anda
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CRITICAL NOTICE BADGE: Advisory Statement */}
            <div className="rounded-2xl bg-amber-50/80 border border-amber-200/90 p-4 flex items-start gap-3 text-amber-900 text-xs sm:text-sm shadow-xs">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <span>Asisten AI Bersifat Advisory (Penasihat)</span>
                </div>
                <p className="text-amber-800 leading-relaxed text-xs">
                  AI membantu memberikan analisis, menjelaskan data, insight, dan rekomendasi.
                  AI <span className="font-semibold underline">tidak</span> otomatis mengubah stok, membuat Purchase Order, mengirim pesan, melakukan transaksi, atau mengubah data toko Anda.
                </p>
                <div className="inline-block mt-1 font-semibold text-xs text-amber-900 bg-amber-100/90 px-2.5 py-1 rounded-md">
                  AI memberi insight. Keputusan tetap di tangan Anda.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
