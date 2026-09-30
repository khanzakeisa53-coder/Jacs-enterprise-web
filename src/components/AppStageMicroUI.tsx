import React from 'react';
import {
  User,
  CheckCircle2,
  Check,
  Zap,
  Sparkles,
  Truck,
  Video,
  KeyRound,
  ShieldCheck,
  Receipt,
  Cpu,
  Code2,
  DollarSign,
  Activity,
  Layers,
  Lock,
  ArrowUpRight,
  Terminal,
  Server,
  FileCheck,
  Wifi,
  ExternalLink,
} from 'lucide-react';

interface AppStageMicroUIProps {
  appId: string;
}

export const AppStageMicroUI: React.FC<AppStageMicroUIProps> = ({ appId }) => {
  // 1. SEKOLAHKITA-V2 (ERP Pendidikan)
  if (appId === 'sekolahkita') {
    return (
      <div className="w-full h-full flex flex-col justify-between gap-3 p-3.5 rounded-xl bg-slate-950/60 backdrop-blur-xl border border-emerald-500/40 shadow-inner relative overflow-hidden select-none font-mono">
        {/* Ambient Glow */}
        <div className="absolute -top-10 -left-10 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Telemetry */}
        <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-bold text-white tracking-wider">
              PRESENSI DIGITAL & KEUANGAN BOSP
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
            ARKAS / BKU SYNCED
          </span>
        </div>

        {/* Center Grid: Smart ID Card + Dynamic QR Scanner + Kas BOSP */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 my-auto relative z-10">
          {/* Smart ID Holographic Card (5 cols) */}
          <div className="sm:col-span-5 bg-white/[0.05] border border-emerald-400/40 rounded-lg p-2.5 flex items-center gap-2.5 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/90 border border-emerald-400/60 flex items-center justify-center shrink-0 relative overflow-hidden shadow-inner">
              <User className="w-5 h-5 text-emerald-300" />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-black" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-white truncate">ADITYA PRATAMA</span>
                <span className="text-[9px] text-emerald-400">NISN 0089421</span>
              </div>
              <div className="text-[10px] text-emerald-300/80 truncate">XII-MIPA 1 • SMA NEGERI 1</div>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  HADIR • 06:48 WIB
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Holographic QR Scanner (3 cols) */}
          <div className="sm:col-span-3 bg-white/[0.05] border border-cyan-400/40 rounded-lg p-2 flex flex-col items-center justify-between text-center shadow-sm">
            <div className="flex items-center justify-between w-full text-[9px] text-cyan-300">
              <span className="font-bold">QR DINAMIS</span>
              <span className="text-slate-400">30s</span>
            </div>
            <div className="relative w-11 h-11 bg-black/90 rounded border border-cyan-400/60 p-1 flex flex-col justify-between my-1 overflow-hidden shadow-inner">
              <div className="flex justify-between w-full">
                <div className="w-2 h-2 border border-cyan-400 p-[0.5px]">
                  <div className="w-full h-full bg-cyan-400" />
                </div>
                <div className="w-2 h-2 border border-cyan-400 p-[0.5px]">
                  <div className="w-full h-full bg-cyan-400" />
                </div>
              </div>
              <div className="flex justify-around items-center w-full">
                <div className="w-1.5 h-1.5 bg-cyan-300 rounded-[0.5px]" />
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-[0.5px]" />
              </div>
              <div className="flex justify-between items-end w-full">
                <div className="w-2 h-2 border border-cyan-400 p-[0.5px]">
                  <div className="w-full h-full bg-cyan-400" />
                </div>
                <div className="w-3 h-0.5 bg-cyan-300" />
              </div>
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent top-1/2 -translate-y-1/2 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            </div>
            <span className="text-[9px] font-bold text-cyan-300 flex items-center gap-1">
              <Check className="w-2.5 h-2.5 text-cyan-400" strokeWidth={3} />
              VALIDATED ✓
            </span>
          </div>

          {/* Kas BOSP & Pembukuan Tripartit (4 cols) */}
          <div className="sm:col-span-4 bg-white/[0.05] border border-emerald-400/40 rounded-lg p-2.5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-[9.5px]">
              <span className="text-slate-300 font-bold">KAS BOSP Q3</span>
              <span className="text-emerald-400 font-bold">Rp 124.500.000</span>
            </div>
            <div className="space-y-1 my-1 text-[9px] text-slate-300">
              <div className="flex justify-between">
                <span>• Kas Bank BOSP:</span>
                <span className="font-bold text-white">Rp 118.250.000</span>
              </div>
              <div className="flex justify-between">
                <span>• Kas Tunai BKU:</span>
                <span className="font-bold text-white">Rp 6.250.000</span>
              </div>
            </div>
            <div className="text-[8.5px] text-emerald-300/90 flex items-center justify-between border-t border-emerald-500/20 pt-1">
              <span>Auto-Dispatch WA Kwitansi</span>
              <span className="font-bold text-emerald-400">100% Terkirim</span>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1 border-t border-emerald-500/20 relative z-10">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            Integrasi Juknis BOSP Kemdikbudristek
          </span>
          <span className="text-slate-400">Otomatisasi Pembukuan & Presensi Real-Time</span>
        </div>
      </div>
    );
  }

  // 2. JacS RetailOS ERP (Retail & POS)
  if (appId === 'retail-os') {
    return (
      <div className="w-full h-full flex flex-col justify-between gap-3 p-3.5 rounded-xl bg-slate-950/60 backdrop-blur-xl border border-rose-500/40 shadow-inner relative overflow-hidden select-none font-mono">
        <div className="absolute -top-10 -left-10 w-36 h-36 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Telemetry */}
        <div className="flex items-center justify-between border-b border-rose-500/30 pb-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span className="text-[11px] font-bold text-white tracking-wider">
              KASIR KILAT KEYBOARD-FIRST & MANAJEMEN STOK FIFO
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-500/40">
            DRAWER OPEN [F11]
          </span>
        </div>

        {/* Center Grid: Thermal Slip + Keyboard Shortcuts + Cash Drawer */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 my-auto relative z-10">
          {/* Thermal Slip (4 cols) */}
          <div className="sm:col-span-4 bg-white/[0.05] border border-rose-400/40 rounded-lg p-2.5 flex flex-col justify-between shadow-sm">
            <div className="text-[8px] text-slate-400 text-center tracking-widest border-b border-dashed border-rose-500/40 pb-1">
              *** JACS RETAIL STORE ***
            </div>
            <div className="space-y-1 my-1.5 text-[9.5px]">
              <div className="flex justify-between text-slate-200">
                <span>1x ARABICA ROASTED</span>
                <span className="font-bold text-white">28.000</span>
              </div>
              <div className="flex justify-between text-slate-200">
                <span>2x CROISSANT BUTTER</span>
                <span className="font-bold text-white">34.000</span>
              </div>
              <div className="flex justify-between text-amber-300 font-extrabold border-t border-dashed border-rose-500/40 pt-1 text-[10px]">
                <span>TOTAL [QRIS]</span>
                <span>Rp 62.000</span>
              </div>
            </div>
            <div className="border-t border-dashed border-rose-500/30 pt-1 flex items-center justify-between text-[8px] text-emerald-400 font-bold">
              <span>LUNAS • QRIS INSTAN</span>
              <span>KASIR #01</span>
            </div>
          </div>

          {/* Keyboard Shortcuts [F2]-[F10] (5 cols) */}
          <div className="sm:col-span-5 bg-white/[0.05] border border-cyan-400/40 rounded-lg p-2.5 flex flex-col justify-between shadow-sm">
            <span className="text-[9.5px] font-bold text-cyan-300 mb-1 flex items-center gap-1">
              <Terminal className="w-3 h-3 text-cyan-400" />
              TOMBOL PINTAS KASIR KILAT
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[9px]">
              <div className="bg-cyan-950/60 border border-cyan-400/40 px-2 py-1 rounded flex items-center justify-between">
                <span className="text-white font-bold">[F2]</span>
                <span className="text-cyan-200">CARI ITEM</span>
              </div>
              <div className="bg-amber-950/60 border border-amber-400/40 px-2 py-1 rounded flex items-center justify-between">
                <span className="text-white font-bold">[F8]</span>
                <span className="text-amber-200">DISKON %</span>
              </div>
              <div className="bg-emerald-950/60 border border-emerald-400/40 px-2 py-1 rounded flex items-center justify-between">
                <span className="text-white font-bold">[F10]</span>
                <span className="text-emerald-200">BAYAR QRIS</span>
              </div>
              <div className="bg-purple-950/60 border border-purple-400/40 px-2 py-1 rounded flex items-center justify-between">
                <span className="text-white font-bold">[F12]</span>
                <span className="text-purple-200">CETAK STRUK</span>
              </div>
            </div>
            <div className="text-[8.5px] text-slate-300 mt-1 flex items-center justify-between border-t border-cyan-500/20 pt-1">
              <span>Kecepatan Checkout:</span>
              <span className="font-bold text-emerald-400">&lt; 5 Detik / Nota</span>
            </div>
          </div>

          {/* Drawer & FIFO Stok (3 cols) */}
          <div className="sm:col-span-3 bg-white/[0.05] border border-amber-400/40 rounded-lg p-2.5 flex flex-col justify-between shadow-sm">
            <div className="text-[9.5px] font-bold text-amber-300 flex items-center gap-1">
              <KeyRound className="w-3 h-3 text-amber-400" />
              STATUS DRAWER
            </div>
            <div className="bg-emerald-950/80 border border-emerald-400/60 text-emerald-300 text-[10px] px-2 py-1 rounded font-bold text-center flex items-center justify-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              DRAWER READY
            </div>
            <div className="text-[8.5px] text-slate-300 space-y-0.5 border-t border-amber-500/20 pt-1">
              <div>FIFO Stok: <span className="text-cyan-300 font-bold">Auto-Cut</span></div>
              <div>Mutasi: <span className="text-white font-bold">Real-Time</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1 border-t border-rose-500/20 relative z-10">
          <span className="text-rose-400 font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-rose-400" />
            6 Divisi: Executive, HR, Finance, Purchasing, Inventory, POS
          </span>
          <span className="text-slate-400">Offline-First Synchronizer Active</span>
        </div>
      </div>
    );
  }

  // 3. KosKita Property ERP (Manajemen Kos)
  if (appId === 'koskita') {
    return (
      <div className="w-full h-full flex flex-col justify-between gap-3 p-3.5 rounded-xl bg-slate-950/60 backdrop-blur-xl border border-amber-500/40 shadow-inner relative overflow-hidden select-none font-mono">
        <div className="absolute -top-10 -left-10 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Telemetry */}
        <div className="flex items-center justify-between border-b border-amber-500/30 pb-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-[11px] font-bold text-white tracking-wider">
              SMART PROPERTY CO-LIVING & KONTROL HUNIAN
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40">
            OKUPANSI 88%
          </span>
        </div>

        {/* Center Grid: Smart Room Grid 101-104 + CCTV Live + Smart Lock */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 my-auto relative z-10">
          {/* Smart Rooms Grid 101-104 (6 cols) */}
          <div className="sm:col-span-6 bg-white/[0.05] border border-amber-400/40 rounded-lg p-2.5 flex flex-col justify-between shadow-sm">
            <span className="text-[9.5px] font-bold text-amber-300 mb-1">
              DENAH KAMAR PINTAR (LANTAI 1)
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[9.5px]">
              <div className="bg-emerald-950/60 border border-emerald-400/60 rounded px-2 py-1 flex items-center justify-between">
                <span className="font-bold text-white">101 ADITYA</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="Terisi" />
              </div>
              <div className="bg-emerald-950/60 border border-emerald-400/60 rounded px-2 py-1 flex items-center justify-between">
                <span className="font-bold text-white">102 DIMAS</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="Terisi" />
              </div>
              <div className="bg-cyan-950/60 border border-cyan-400/60 rounded px-2 py-1 flex items-center justify-between">
                <span className="font-bold text-cyan-300">103 BOOKED</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400" title="Reservasi" />
              </div>
              <div className="bg-slate-900/80 border border-slate-700 rounded px-2 py-1 flex items-center justify-between">
                <span className="font-bold text-slate-400">104 READY</span>
                <span className="w-2 h-2 rounded-full bg-slate-500" title="Siap Huni" />
              </div>
            </div>
            <div className="text-[8.5px] text-slate-300 flex items-center justify-between border-t border-amber-500/20 pt-1 mt-1">
              <span>Auto-Billing WhatsApp:</span>
              <span className="font-bold text-emerald-400">H-7 Otomatis</span>
            </div>
          </div>

          {/* CCTV Live Feed Simulation (3 cols) */}
          <div className="sm:col-span-3 bg-white/[0.05] border border-rose-400/40 rounded-lg p-2.5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-1 text-[9.5px] text-rose-400 font-bold">
              <div className="flex items-center gap-1">
                <Video className="w-3 h-3 text-rose-400" />
                <span>CCTV LIVE</span>
              </div>
              <span className="flex items-center gap-1 text-[8.5px] text-rose-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                REC
              </span>
            </div>
            <div className="my-1.5 bg-black/80 rounded p-1.5 border border-rose-500/30 text-center">
              <span className="text-[9px] text-slate-300 font-mono">KORIDOR LT.1</span>
              <div className="text-[8px] text-emerald-400 mt-0.5">30 FPS • NIGHT VISION</div>
            </div>
            <div className="text-[8.5px] text-slate-400 text-center">
              Motion Sensor: <span className="text-emerald-400 font-bold">Normal</span>
            </div>
          </div>

          {/* Smart kWh Meter & Lock (3 cols) */}
          <div className="sm:col-span-3 bg-white/[0.05] border border-emerald-400/40 rounded-lg p-2.5 flex flex-col justify-between shadow-sm">
            <div className="text-[9.5px] font-bold text-emerald-300">
              SMART TELEMETRY
            </div>
            <div className="text-center my-1 bg-black/60 rounded p-1 border border-emerald-500/30">
              <div className="text-xs font-bold text-amber-400">2.4 kWh</div>
              <div className="text-[8px] text-slate-400">220V STABIL</div>
            </div>
            <div className="bg-emerald-950/80 border border-emerald-400/50 text-emerald-300 text-[9px] px-2 py-1 rounded text-center font-bold">
              LOCK OK ✓
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1 border-t border-amber-500/20 relative z-10">
          <span className="text-amber-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            Integrasi Tagihan WA Ber-QRIS & Tiket Perbaikan Fasilitas
          </span>
          <span className="text-slate-400">Multi-Cabang Hub Active</span>
        </div>
      </div>
    );
  }

  // 4. JacS DepoHub PRO (Logistik & WMS)
  if (appId === 'depohub') {
    return (
      <div className="w-full h-full flex flex-col justify-between gap-3 p-3.5 rounded-xl bg-slate-950/60 backdrop-blur-xl border border-sky-500/40 shadow-inner relative overflow-hidden select-none font-mono">
        <div className="absolute -top-10 -left-10 w-36 h-36 bg-sky-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Telemetry */}
        <div className="flex items-center justify-between border-b border-sky-500/30 pb-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span className="text-[11px] font-bold text-white tracking-wider">
              RADAR RUTE ARMADA GPS & DISPATCH LOGISTIK
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-500/40">
            RADAR ACTIVE
          </span>
        </div>

        {/* Center Grid: GPS Route Vector + Dispatch Telemetry + e-POD */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 my-auto relative z-10">
          {/* Animated Route Vector Map (7 cols) */}
          <div className="sm:col-span-7 bg-white/[0.05] border border-sky-400/40 rounded-lg p-2.5 relative overflow-hidden flex flex-col justify-between shadow-sm min-h-[95px]">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 90">
              <path
                d="M 25 65 Q 90 15 175 40"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeDasharray="5 3"
              />
              <circle cx="25" cy="65" r="4.5" fill="#10b981" />
              <circle cx="175" cy="40" r="4.5" fill="#f59e0b" />
            </svg>

            <div className="relative z-10 flex items-center justify-between text-[9px]">
              <span className="text-emerald-400 font-bold bg-black/75 px-1.5 py-0.5 rounded border border-emerald-500/40">
                [A] CAKUNG DC
              </span>
              <span className="text-amber-400 font-bold bg-black/75 px-1.5 py-0.5 rounded border border-amber-500/40">
                [B] PUSAT LOGISTIK
              </span>
            </div>

            {/* Pulsing Moving Truck */}
            <div className="absolute top-[42%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-10 flex items-center">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-cyan-400/40 animate-ping" />
                <div className="w-7 h-7 rounded-full bg-sky-950 border border-sky-400 flex items-center justify-center shadow-lg">
                  <Truck className="w-3.5 h-3.5 text-cyan-300" />
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[9px] text-slate-300">
              <span className="bg-black/60 px-1 rounded">GPS SINKRON LIVE</span>
              <span className="text-sky-300 font-bold bg-black/60 px-1 rounded">ARMADA #04 • EN-ROUTE</span>
            </div>
          </div>

          {/* Dispatch Metrics & e-POD (5 cols) */}
          <div className="sm:col-span-5 bg-white/[0.05] border border-sky-400/40 rounded-lg p-2.5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between border-b border-sky-500/20 pb-1 text-[9.5px]">
              <span className="text-sky-300 font-bold">TELEMETRI DISPATCH</span>
              <span className="text-emerald-400 font-bold">ETA: 14 MENIT</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 my-1 text-[9px]">
              <div className="bg-black/60 p-1 rounded border border-slate-700">
                <div className="text-slate-400">Kecepatan:</div>
                <div className="text-white font-bold">42 km/h</div>
              </div>
              <div className="bg-black/60 p-1 rounded border border-slate-700">
                <div className="text-slate-400">Muatan:</div>
                <div className="text-amber-300 font-bold">18 Koli • FEFO</div>
              </div>
            </div>
            <div className="bg-emerald-950/80 border border-emerald-400/50 text-emerald-300 text-[9px] px-2 py-1 rounded text-center font-bold flex items-center justify-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" />
              e-POD TERVERIFIKASI QR ✓
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1 border-t border-sky-500/20 relative z-10">
          <span className="text-sky-400 font-bold flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-sky-400" />
            FEFO Lot Tracking, WMS Slotting & Auto-Replenish RetailOS
          </span>
          <span className="text-slate-400">Surat Jalan Digital Terenkripsi</span>
        </div>
      </div>
    );
  }

  // 5. JacS Builder Studio (Arsitektur AI & UI)
  if (appId === 'studio-suite') {
    return (
      <div className="w-full h-full flex flex-col justify-between gap-3 p-3.5 rounded-xl bg-slate-950/60 backdrop-blur-xl border border-cyan-500/40 shadow-inner relative overflow-hidden select-none font-mono">
        <div className="absolute -top-10 -left-10 w-36 h-36 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Telemetry */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[11px] font-bold text-white tracking-wider">
              AI APP ARCHITECTURE WORKBENCH & PROMPT STUDIO
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
            ENGINE: GEMINI 3.8
          </span>
        </div>

        {/* Center Grid: Prompt Terminal + Telemetry Meters + AI Hub */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 my-auto relative z-10">
          {/* Prompt Terminal (7 cols) */}
          <div className="sm:col-span-7 bg-white/[0.05] border border-cyan-400/40 rounded-lg p-2.5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1 text-[9px]">
              <span className="text-cyan-400 font-bold flex items-center gap-1">
                <Code2 className="w-3 h-3" />
                TERMINAL PROMPT GENERATIVE
              </span>
              <span className="text-slate-400">Latensi 0.2s</span>
            </div>
            <div className="bg-black/80 rounded p-2 my-1 text-[10px] text-cyan-200 border border-cyan-500/30">
              <span className="text-cyan-400">&gt;</span> orchestrate_erp_blueprint(mode="reactive", lang="ts")
              <div className="text-[9px] text-slate-400 mt-1">
                // Generating 8 Modules, 24 Schema Tables, Realtime Sync...
              </div>
            </div>
            <div className="flex items-center justify-between text-[9px] text-emerald-300 border-t border-cyan-500/20 pt-1">
              <span className="flex items-center gap-1 font-bold">
                <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
                120 Tokens/s Output
              </span>
              <span className="text-cyan-300 font-bold">v3.4 Production</span>
            </div>
          </div>

          {/* AI Neural Hub Node & Telemetry (5 cols) */}
          <div className="sm:col-span-5 bg-white/[0.05] border border-indigo-400/40 rounded-lg p-2.5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-[9.5px] border-b border-indigo-500/20 pb-1">
              <span className="text-indigo-300 font-bold">TELEMETRI SISTEM</span>
              <span className="text-emerald-400 font-bold">ONLINE ●</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 my-1 text-[9px]">
              <div className="bg-black/60 p-1.5 rounded border border-indigo-500/30">
                <div className="text-slate-400">Schema Relasi:</div>
                <div className="text-cyan-300 font-bold">24 Tabel</div>
              </div>
              <div className="bg-black/60 p-1.5 rounded border border-indigo-500/30">
                <div className="text-slate-400">Token Teroptimasi:</div>
                <div className="text-indigo-300 font-bold">12.4k Token</div>
              </div>
            </div>
            <div className="bg-indigo-950/80 border border-indigo-400/50 text-indigo-200 text-[9px] px-2 py-0.5 rounded text-center font-bold">
              AI Engine Synced
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1 border-t border-cyan-500/20 relative z-10">
          <span className="text-cyan-400 font-bold flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            AI App Architecture, Database Schema Designer & Prompt Optimizer
          </span>
          <span className="text-slate-400">Accelerated GPU WebGL</span>
        </div>
      </div>
    );
  }

  // 6. MasterPro Enterprise (Tata Kelola)
  if (appId === 'master-pro') {
    return (
      <div className="w-full h-full flex flex-col justify-between gap-3 p-3.5 rounded-xl bg-slate-950/60 backdrop-blur-xl border border-violet-500/40 shadow-inner relative overflow-hidden select-none font-mono">
        <div className="absolute -top-10 -left-10 w-36 h-36 bg-violet-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-fuchsia-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Telemetry */}
        <div className="flex items-center justify-between border-b border-violet-500/30 pb-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
            <span className="text-[11px] font-bold text-white tracking-wider">
              PAPAN KANBAN PROYEK & KEPATUHAN AUDIT ISO
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-violet-950/80 text-violet-300 border border-violet-500/40">
            OKR TRACKER 94%
          </span>
        </div>

        {/* Center Grid: 3-Column Kanban Board */}
        <div className="grid grid-cols-3 gap-2 my-auto relative z-10">
          {/* TO DO (Col 1) */}
          <div className="bg-white/[0.05] border border-slate-700/80 rounded-lg p-2 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-700/50 pb-1 text-[9px] font-bold text-amber-400">
              <span>TO DO (3)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>
            <div className="bg-black/50 border border-slate-700/80 rounded p-1.5 my-1 relative overflow-hidden">
              <div className="w-1 absolute left-0 top-0 bottom-0 bg-rose-500" />
              <div className="text-[9.5px] font-bold text-white pl-1">Audit ISO 27001</div>
              <div className="text-[8px] text-slate-400 pl-1 mt-0.5">P1 High • Compliance</div>
            </div>
            <span className="text-[8px] text-slate-400 text-center">Menunggu Review</span>
          </div>

          {/* PROGRESS (Col 2) */}
          <div className="bg-white/[0.05] border border-cyan-500/40 rounded-lg p-2 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1 text-[9px] font-bold text-cyan-400">
              <span>PROGRESS (5)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <div className="bg-black/50 border border-cyan-500/40 rounded p-1.5 my-1 relative overflow-hidden">
              <div className="w-1 absolute left-0 top-0 bottom-0 bg-cyan-400" />
              <div className="text-[9.5px] font-bold text-cyan-200 pl-1">API Sync Enterprise</div>
              <div className="text-[8px] text-cyan-300/80 pl-1 mt-0.5">Progress 75% • Active</div>
            </div>
            <span className="text-[8px] text-cyan-300 text-center font-bold">Sedang Dikerjakan</span>
          </div>

          {/* DONE (Col 3) */}
          <div className="bg-white/[0.05] border border-emerald-500/40 rounded-lg p-2 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1 text-[9px] font-bold text-emerald-400">
              <span>DONE (12)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="bg-black/50 border border-emerald-500/40 rounded p-1.5 my-1 relative overflow-hidden">
              <div className="w-1 absolute left-0 top-0 bottom-0 bg-emerald-500" />
              <div className="text-[9.5px] font-bold text-emerald-200 pl-1">SPJ Q3 Keuangan</div>
              <div className="text-[8px] text-emerald-300/80 pl-1 mt-0.5">Valid • Tervalidasi ✓</div>
            </div>
            <span className="text-[8px] text-emerald-400 text-center font-bold">Selesai Diverifikasi</span>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1 border-t border-violet-500/20 relative z-10">
          <span className="text-violet-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
            Alur Persetujuan Digital Cepat, Gantt Chart & Transparansi Anggaran
          </span>
          <span className="text-slate-400">SOP Berjenjang Valid</span>
        </div>
      </div>
    );
  }

  // 7. JacS Enterprise Suite (Sistem Terintegrasi)
  if (appId === 'enterprise-suite') {
    return (
      <div className="w-full h-full flex flex-col justify-between gap-3 p-3.5 rounded-xl bg-slate-950/60 backdrop-blur-xl border border-purple-500/40 shadow-inner relative overflow-hidden select-none font-mono">
        <div className="absolute -top-10 -left-10 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Telemetry */}
        <div className="flex items-center justify-between border-b border-purple-500/30 pb-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span className="text-[11px] font-bold text-white tracking-wider">
              CORE SINGLE SIGN-ON (SSO) & ZERO-TRUST MESH
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/40">
            UPTIME 99.99%
          </span>
        </div>

        {/* Center Grid: Topology Mesh SVG + Telemetry */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 my-auto relative z-10">
          {/* Topology Architecture Diagram (7 cols) */}
          <div className="sm:col-span-7 bg-white/[0.05] border border-purple-400/40 rounded-lg p-2.5 relative overflow-hidden flex flex-col justify-between shadow-sm min-h-[95px]">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 90">
              <line x1="100" y1="45" x2="30" y2="20" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.8" />
              <line x1="100" y1="45" x2="170" y2="20" stroke="#f43f5e" strokeWidth="1.5" strokeOpacity="0.8" />
              <line x1="100" y1="45" x2="30" y2="70" stroke="#0284c7" strokeWidth="1.5" strokeOpacity="0.8" />
              <line x1="100" y1="45" x2="170" y2="70" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.8" />

              <circle cx="65" cy="32" r="2.5" fill="#34d399" className="animate-ping" />
              <circle cx="135" cy="32" r="2.5" fill="#fb7185" className="animate-ping" />
              <circle cx="65" cy="58" r="2.5" fill="#38bdf8" className="animate-ping" />
              <circle cx="135" cy="58" r="2.5" fill="#fbbf24" className="animate-ping" />

              {/* Central Core Hub */}
              <circle cx="100" cy="45" r="14" fill="#581c87" stroke="#c084fc" strokeWidth="2" />
            </svg>

            <div className="relative z-10 flex items-center justify-between text-[8.5px]">
              <span className="text-emerald-400 font-bold bg-black/70 px-1 rounded">EduCore Node</span>
              <span className="text-rose-400 font-bold bg-black/70 px-1 rounded">RetailOS Node</span>
            </div>

            <div className="relative z-10 text-center">
              <span className="text-[9px] font-extrabold text-white bg-purple-950/90 px-2 py-0.5 rounded border border-purple-400 shadow-md">
                CORE SSO MESH
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[8.5px]">
              <span className="text-sky-400 font-bold bg-black/70 px-1 rounded">Logistik Node</span>
              <span className="text-amber-400 font-bold bg-black/70 px-1 rounded">Property Node</span>
            </div>
          </div>

          {/* Zero-Trust Telemetry (5 cols) */}
          <div className="sm:col-span-5 bg-white/[0.05] border border-purple-400/40 rounded-lg p-2.5 flex flex-col justify-between shadow-sm">
            <div className="text-[9.5px] font-bold text-purple-300 border-b border-purple-500/20 pb-1 flex items-center justify-between">
              <span>ZERO-TRUST TELEMETRY</span>
              <span className="text-emerald-400">TLS 1.3</span>
            </div>
            <div className="space-y-1 my-1 text-[9px] text-slate-300">
              <div className="flex justify-between">
                <span>• Enkripsi Data:</span>
                <span className="font-bold text-white">AES-256 GCM</span>
              </div>
              <div className="flex justify-between">
                <span>• Multi-Tenant:</span>
                <span className="font-bold text-cyan-300">Isolated Mesh</span>
              </div>
              <div className="flex justify-between">
                <span>• Audit Forensik:</span>
                <span className="font-bold text-emerald-400">Active ✓</span>
              </div>
            </div>
            <div className="bg-purple-950/80 border border-purple-400/50 text-purple-200 text-[8.5px] px-1.5 py-0.5 rounded text-center font-bold">
              Identity Authenticated
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1 border-t border-purple-500/20 relative z-10">
          <span className="text-purple-400 font-bold flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            Gerbang Autentikasi Tunggal, Pertukaran Data & Kepatuhan Korporasi
          </span>
          <span className="text-slate-400">Single Sign-On Shield Active</span>
        </div>
      </div>
    );
  }

  // 8. JacS App PRO (Google Gems AI Shell)
  if (appId === 'jacs-app-pro') {
    return (
      <div className="w-full h-full flex flex-col justify-between gap-3 p-3.5 rounded-xl bg-slate-950/60 backdrop-blur-xl border border-cyan-500/40 shadow-inner relative overflow-hidden select-none font-mono">
        <div className="absolute -top-10 -left-10 w-36 h-36 bg-cyan-500/25 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-purple-500/25 blur-2xl pointer-events-none" />

        {/* Top Header Telemetry */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[11px] font-bold text-white tracking-wider">
              GOOGLE GEMS MULTI-ASSISTANT WORKSPACE
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
            <span>2 GEMS CONNECTED ●</span>
          </div>
        </div>

        {/* Center Grid: 2 Exclusive Interactive Google Gem Pill Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto relative z-10">
          {/* Gem #1: EduCore & Kurikulum AI */}
          <a
            href="https://gemini.google.com/gem/1fipy01GNfQUDdZd-o20CfPmTh6udrCR1?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="group/gem1 bg-gradient-to-br from-cyan-950/90 via-blue-950/80 to-[#0c1a2e] hover:from-cyan-900 hover:to-blue-900 border-2 border-cyan-400/80 hover:border-cyan-300 rounded-xl p-3 flex flex-col justify-between shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_28px_rgba(6,182,212,0.65)] transition-all cursor-pointer"
            title="Buka Gem #1: JacS EduCore & Kurikulum AI di tab baru"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                <span className="text-base">🎓</span>
                <span>EduCore & Kurikulum AI</span>
              </span>
              <ExternalLink className="w-4 h-4 text-cyan-300 group-hover/gem1:translate-x-0.5 group-hover/gem1:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-[10px] text-cyan-100/90 font-sans leading-relaxed mb-2">
              Asisten pintar khusus penyusunan modul ajar, bank soalan kurikulum, dan administrasi sekolah terpadu.
            </p>
            <div className="flex items-center justify-between text-[9px] pt-1.5 border-t border-cyan-400/30 text-cyan-300 font-bold">
              <span>[ 🎓 Buka EduCore Gem ↗ ]</span>
              <span className="text-emerald-400">Siap Digunakan</span>
            </div>
          </a>

          {/* Gem #2: Enterprise & Logic Co-Pilot */}
          <a
            href="https://gemini.google.com/gem/1I8o6xug5WjRo-r738HLhXFTx_21bmQ_p?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="group/gem2 bg-gradient-to-br from-purple-950/90 via-indigo-950/80 to-[#180a2b] hover:from-purple-900 hover:to-indigo-900 border-2 border-purple-400/80 hover:border-purple-300 rounded-xl p-3 flex flex-col justify-between shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_28px_rgba(168,85,247,0.65)] transition-all cursor-pointer"
            title="Buka Gem #2: JacS Enterprise & Logic Co-Pilot di tab baru"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black text-purple-300 flex items-center gap-1.5">
                <span className="text-base">🏛️</span>
                <span>Enterprise & Logic Co-Pilot</span>
              </span>
              <ExternalLink className="w-4 h-4 text-purple-300 group-hover/gem2:translate-x-0.5 group-hover/gem2:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-[10px] text-purple-100/90 font-sans leading-relaxed mb-2">
              Asisten pintar perancangan dokumen formal, SOP operasi, PRD teknis, dan struktur logik bisnis.
            </p>
            <div className="flex items-center justify-between text-[9px] pt-1.5 border-t border-purple-400/30 text-purple-300 font-bold">
              <span>[ 🏛️ Buka Logic Co-Pilot ↗ ]</span>
              <span className="text-cyan-400">Siap Digunakan</span>
            </div>
          </a>
        </div>

        {/* Bottom Status Bar */}
        <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1 border-t border-cyan-500/20 relative z-10">
          <span className="text-cyan-400 font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Google Gem Multimodal • Direct Bridge ke SEKOLAHKITA V2 & MasterPro
          </span>
          <span className="text-purple-400 font-bold">Dual Co-Pilot Active</span>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="w-full h-full p-4 rounded-xl bg-slate-950/60 border border-slate-700 text-slate-300 flex items-center justify-center font-mono text-xs">
      Pratinjau Antarmuka Solusi Aktif
    </div>
  );
};
