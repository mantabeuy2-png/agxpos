import React, { useState } from 'react';
import { TabletKasirApp } from './TabletKasirApp';
import { Sparkles, Maximize2, Minimize2, Tablet, Touchpad, CheckCircle2 } from 'lucide-react';

interface TabletDeviceFrameProps {
  onTrialClick?: () => void;
}

export const TabletDeviceFrame: React.FC<TabletDeviceFrameProps> = ({ onTrialClick }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Interactive Helper Banner on Top */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold shadow-2xs border border-blue-200">
            <Tablet className="w-3.5 h-3.5 text-blue-600" />
            <span>Mockup Tablet Kasir Interaktif Real-Time</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
            <Touchpad className="w-3.5 h-3.5 text-slate-400" />
            Sentuh produk, ubah jumlah, & coba bayar QRIS / Tunai
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:bg-slate-50"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-slate-600" />
                <span>Keluar Layar Penuh</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Perbesar Layar Penuh</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Fullscreen Overlay Mode */}
      {isFullscreen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md p-2 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2 px-2 text-white">
            <div className="flex items-center gap-2 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AgxPOS Tablet Kasir System — Mode Layar Penuh</span>
            </div>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Tutup Layar Penuh</span>
            </button>
          </div>

          <div className="flex-1 w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <TabletKasirApp
              isEmbedded={false}
              isFullscreen={true}
              onFullscreenToggle={() => setIsFullscreen(false)}
              onTrialClick={onTrialClick}
            />
          </div>
        </div>
      ) : (
        /* Realistic Physical Tablet Hardware Casing Frame */
        <div className="relative mx-auto">
          {/* Ambient Glow behind tablet */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-600/20 rounded-[44px] blur-xl -z-10 opacity-70" />

          {/* Physical Tablet Outer Bezel (Sleek Dark Slate Aluminum) */}
          <div className="relative rounded-[36px] sm:rounded-[44px] bg-[#0c1424] p-3 sm:p-4 shadow-2xl shadow-blue-950/25 ring-1 ring-slate-800/80 border border-slate-700/60">
            {/* Top Center Camera Notch Dot */}
            <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-800 ring-1 ring-slate-700 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-sky-950" />
            </div>

            {/* Inner Screen Display */}
            <div className="w-full h-[620px] sm:h-[680px] lg:h-[720px] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-white shadow-inner border border-slate-300/40 relative">
              <TabletKasirApp
                isEmbedded={true}
                isFullscreen={false}
                onFullscreenToggle={() => setIsFullscreen(true)}
                onTrialClick={onTrialClick}
              />
            </div>
          </div>

          {/* Tablet Stand Base Shadow (Adds depth and physical presence) */}
          <div className="w-3/4 mx-auto h-5 bg-gradient-to-b from-slate-400/20 to-transparent blur-md rounded-full mt-1" />

          {/* Feature Highlight Badges below the Tablet Frame */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Kasir Cepat & Responsif</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Sentuh untuk tambah nota instan
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                <span>QRIS Dinamis Terhubung</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Verifikasi otomatis tanpa mesin EDC
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                <span>Multi-Cabang Terpadu</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Pindah cabang dalam 1 klik
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                <span>Printer Thermal 58/80mm</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Cetak struk Bluetooth & USB
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
