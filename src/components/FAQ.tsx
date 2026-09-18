import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Apa itu AgxPOS?',
      answer:
        'AgxPOS adalah platform POS dan operasional toko untuk UMKM Indonesia yang menggabungkan kasir, transaksi, stok, multi-cabang, supplier, Purchase Order (PO), promo, pelanggan, member, laporan, pembayaran QRIS, hingga Asisten AI dalam satu tempat.',
    },
    {
      question: 'Apakah ada trial gratis?',
      answer:
        'Ya. AgxPOS menyediakan trial gratis selama 7 hari. Anda dapat mencoba seluruh fitur operasional tanpa harus memasukkan kartu kredit.',
    },
    {
      question: 'Berapa harga AgxPOS?',
      answer:
        'AgxPOS memiliki 3 paket resmi: Standar seharga Rp99.000/bulan (1 cabang), Pro seharga Rp199.000/bulan (2 cabang), dan Premium seharga Rp299.000/bulan (3 cabang). Anda juga dapat memilih periode langganan 3 bulan (diskon 10%), 6 bulan (diskon 20%), atau 12 bulan (diskon 35%).',
    },
    {
      question: 'Berapa jumlah cabang yang dapat digunakan?',
      answer:
        'Jumlah cabang disesuaikan dengan paket yang Anda pilih: Paket Standar untuk 1 cabang, Paket Pro untuk 2 cabang, dan Paket Premium untuk 3 cabang.',
    },
    {
      question: 'Bagaimana pembayaran langganan?',
      answer:
        'Pembayaran langganan menggunakan QRIS. Anda dapat membayar dengan cepat menggunakan mobile banking atau dompet digital apa pun yang mendukung QRIS nasional.',
    },
    {
      question: 'Apakah AgxPOS mendukung kebutuhan UMKM Indonesia?',
      answer:
        'Ya, AgxPOS dirancang dengan mempertimbangkan kebutuhan operasional UMKM di Indonesia, seperti pengaturan PPN, pembayaran QRIS, pengiriman bukti transaksi via WhatsApp, printer struk thermal (Bluetooth/USB), antarmuka berbahasa Indonesia, pembagian shift kasir, dan penutupan harian Z-Report.',
    },
    {
      question: 'Apa yang dapat dilakukan Asisten AI?',
      answer:
        'Asisten AI membantu membaca dan menjelaskan data operasional toko Anda, seperti tren omzet mingguan/bulanan, identifikasi produk terlaris, peringatan produk dengan stok yang mulai menipis, analisis pelanggan dormant yang sudah lama tidak berkunjung, rekomendasi kombinasi produk untuk cross-sell, serta ringkasan pendapatan dan pengeluaran.',
    },
    {
      question: 'Apakah AI dapat mengubah data toko secara otomatis?',
      answer:
        'Tidak. Asisten AI bersifat advisory. AI tidak otomatis mengubah stok, membuat PO, mengirim pesan, atau melakukan transaksi. Seluruh tindakan dan keputusan eksekusi tetap berada di tangan pemilik toko.',
    },
    {
      question: 'Apakah AgxPOS merupakan software akuntansi lengkap?',
      answer:
        'AgxPOS berfokus pada POS dan operasional toko. AgxPOS bukan software akuntansi lengkap, melainkan platform yang mencatat transaksi kasir, inventaris stok, pembukuan pendapatan dan pengeluaran harian, serta laporan operasional toko.',
    },
    {
      question: 'Apakah tersedia offline mode?',
      answer:
        'AgxPOS dirancang berbasis cloud untuk memastikan sinkronisasi data antar perangkat dan cabang berjalan konsisten. Untuk kasir, sistem dilengkapi penanganan antrean transaksi lokal saat jaringan internet terputus sesaat, lalu data akan otomatis diperbarui ke server saat koneksi internet kembali stabil.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600 mb-2">
            Pertanyaan Umum
          </h2>
          <p className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </p>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Jawaban jelas dan transparan seputar AgxPOS untuk bisnis Anda.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200/90 overflow-hidden transition-all bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  aria-expanded={isOpen}
                  id={`faq-btn-${index}`}
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-content-${index}`}
                    className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
