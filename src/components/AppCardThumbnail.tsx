import React, { useState } from 'react';
import {
  LucideIcon,
  CheckCircle2,
  User,
  Truck,
  Video,
  KeyRound,
  ShieldCheck,
  Check,
  Zap,
  Sparkles,
  MapPin,
  Layers,
  Cpu,
  Navigation,
  QrCode,
  Receipt,
  ShoppingCart,
  Home,
  Activity,
  Handshake,
  BarChart2,
  Lock,
  Radio,
  FileCheck,
  Code2,
} from 'lucide-react';
import { JacSLogo } from './JacSLogo';

interface AppCardThumbnailProps {
  appId?: string;
  src?: string;
  alt: string;
  Icon?: LucideIcon;
  heightClass?: string;
  marginClass?: string;
  className?: string;
}

export const AppCardThumbnail: React.FC<AppCardThumbnailProps> = ({
  appId,
  src,
  alt,
  Icon,
  heightClass = 'h-[70px] max-h-[70px]',
  marginClass = 'mb-1',
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  // 1. SEKOLAHKITA-V2 (ERP Pendidikan) - Compact 3D Glassmorphism "Smart ID Card & Presensi QR"
  if (appId === 'sekolahkita') {
    return (
      <div
        className={`relative w-full ${heightClass} ${marginClass} rounded-lg overflow-hidden border border-emerald-500/30 group-hover:border-emerald-400/80 shadow-xs group-hover:shadow-[0_0_16px_rgba(16,185,129,0.3)] transition-all duration-300 ${className}`}
      >
        {/* Ambient Mesh Background with Deep Radial Glow */}
        <div className="absolute inset-0 bg-[#050d0a] overflow-hidden pointer-events-none">
          <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-emerald-500/25 blur-xl" />
          <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-cyan-500/20 blur-xl" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:8px_8px]" />
        </div>

        {/* Micro Showcase Content (h-[70px] True-Fit) */}
        <div className="relative z-10 w-full h-full p-1.5 flex items-stretch gap-1.5 select-none">
          {/* Left: 3D Holographic ID Card */}
          <div className="flex-1 h-full bg-white/[0.06] backdrop-blur-md border border-emerald-400/40 rounded p-1 flex items-center gap-1.5 justify-between shadow-xs overflow-hidden">
            <div className="w-6 h-6 rounded bg-emerald-950/90 border border-emerald-400/60 flex items-center justify-center shrink-0 relative overflow-hidden shadow-inner">
              <User className="w-3.5 h-3.5 text-emerald-300" />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-black" />
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex items-center justify-between gap-1 leading-none">
                <span className="text-[7.5px] font-extrabold text-white truncate">
                  ADITYA PRATAMA
                </span>
                <span className="text-[6px] font-mono text-emerald-300/80 shrink-0">
                  NISN 0089421
                </span>
              </div>
              <div className="text-[6.5px] text-emerald-300 font-mono truncate leading-none mt-0.5">
                XII-MIPA 1 • SMA 1
              </div>
              <div className="flex items-center gap-1 mt-1 leading-none">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 text-[6px] px-1 py-0.2 rounded font-mono font-bold flex items-center gap-0.5">
                  <CheckCircle2 className="w-2 h-2 text-emerald-400" />
                  HADIR • 06:48 WIB
                </span>
              </div>
            </div>
          </div>

          {/* Right: Dynamic Holographic QR Scanner */}
          <div className="w-16 h-full bg-white/[0.06] backdrop-blur-md border border-cyan-400/40 rounded p-1 flex flex-col justify-between items-center shrink-0 shadow-xs">
            <div className="flex items-center justify-between w-full leading-none">
              <span className="text-[6px] font-mono font-bold text-cyan-300">QR DINAMIS</span>
              <span className="text-[5.5px] font-mono text-slate-400">30s</span>
            </div>

            {/* Glowing QR Box with Scanning Laser */}
            <div className="relative w-6 h-6 bg-black/80 rounded border border-cyan-400/50 p-0.5 flex flex-col justify-between overflow-hidden shadow-inner">
              <div className="flex justify-between w-full">
                <div className="w-1.5 h-1.5 border border-cyan-400 p-[0.5px]">
                  <div className="w-full h-full bg-cyan-400" />
                </div>
                <div className="w-1.5 h-1.5 border border-cyan-400 p-[0.5px]">
                  <div className="w-full h-full bg-cyan-400" />
                </div>
              </div>
              <div className="flex justify-around items-center w-full px-0.5">
                <div className="w-1 h-1 bg-cyan-300 rounded-[0.5px]" />
                <div className="w-1 h-1 bg-emerald-400 rounded-[0.5px]" />
              </div>
              <div className="flex justify-between items-end w-full">
                <div className="w-1.5 h-1.5 border border-cyan-400 p-[0.5px]">
                  <div className="w-full h-full bg-cyan-400" />
                </div>
                <div className="w-2 h-0.5 bg-cyan-300" />
              </div>
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent top-1/2 -translate-y-1/2 animate-pulse shadow-[0_0_6px_#22d3ee]" />
            </div>

            <span className="text-[5.5px] font-mono font-bold text-cyan-300 flex items-center gap-0.5 leading-none">
              <Check className="w-1.5 h-1.5 text-cyan-400" strokeWidth={3} />
              VALIDATED
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 1b. JacS App PRO (v2.5) - "Google Gems AI Shell" Micro-UI
  if (appId === 'jacs-app-pro') {
    return (
      <div
        className={`relative w-full ${heightClass} ${marginClass} rounded-lg overflow-hidden border border-cyan-500/40 group-hover:border-cyan-400/90 shadow-xs group-hover:shadow-[0_0_18px_rgba(6,182,212,0.35)] transition-all duration-300 ${className}`}
      >
        {/* Ambient Multi-Agent Mesh Glow with Cyan & Purple theme */}
        <div className="absolute inset-0 bg-[#070814] overflow-hidden pointer-events-none">
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-cyan-500/25 blur-xl" />
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-purple-500/25 blur-xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-indigo-500/20 blur-xl" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:8px_8px]" />
        </div>

        {/* 2-Core Google Gem Shell Content */}
        <div className="relative z-10 w-full h-full p-1.5 flex flex-col justify-between select-none font-mono">
          {/* Header Mini */}
          <div className="flex items-center justify-between border-b border-white/10 pb-0.5 leading-none">
            <div className="flex items-center gap-1">
              <Cpu className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
              <span className="text-[6.5px] font-extrabold text-white tracking-wider">
                JacS App PRO • Google Gems
              </span>
            </div>
            <div className="flex items-center gap-1 text-[5.5px] font-bold text-cyan-300 bg-cyan-950/70 px-1 py-0.2 rounded border border-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.3)]">
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
              <span>2 GEMS CONNECTED ●</span>
            </div>
          </div>

          {/* 2 Eksklusif Google Gem Module Cards dengan Neon Cyan-Ungu Glow */}
          <div className="grid grid-cols-2 gap-1.5 my-auto">
            {/* Gem #1: EduCore & Kurikulum AI (Pendidikan & Kurikulum Sekolah) */}
            <a
              href="https://gemini.google.com/gem/1fipy01GNfQUDdZd-o20CfPmTh6udrCR1?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-r from-cyan-950/90 to-blue-950/70 hover:from-cyan-900 hover:to-blue-900 border border-cyan-400/70 hover:border-cyan-300 rounded px-1.5 py-1 flex flex-col justify-between shadow-[0_0_12px_rgba(6,182,212,0.3)] hover:shadow-[0_0_18px_rgba(6,182,212,0.6)] transition-all cursor-pointer group/m1"
              title="Buka Gem #1: JacS EduCore & Kurikulum AI (Pendidikan & Kurikulum Sekolah) di tab baru"
            >
              <div className="flex items-center justify-between leading-none mb-0.5">
                <span className="text-[6px] font-extrabold text-cyan-300 truncate flex items-center gap-0.5">
                  <span>🎓</span> EduCore AI
                </span>
                <span className="text-[5px] text-cyan-200 group-hover/m1:translate-x-0.5 transition-transform">↗</span>
              </div>
              <span className="text-[4.5px] text-cyan-200/80 truncate font-sans">
                Modul Ajar & Kurikulum
              </span>
            </a>

            {/* Gem #2: Enterprise & Logic Co-Pilot (Sistem & Arkitektur Enterprise) */}
            <a
              href="https://gemini.google.com/gem/1I8o6xug5WjRo-r738HLhXFTx_21bmQ_p?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-r from-purple-950/90 to-fuchsia-950/70 hover:from-purple-900 hover:to-fuchsia-900 border border-purple-400/70 hover:border-purple-300 rounded px-1.5 py-1 flex flex-col justify-between shadow-[0_0_12px_rgba(168,85,247,0.3)] hover:shadow-[0_0_18px_rgba(168,85,247,0.6)] transition-all cursor-pointer group/m2"
              title="Buka Gem #2: JacS Enterprise & Logic Co-Pilot (Sistem & Arkitektur Enterprise) di tab baru"
            >
              <div className="flex items-center justify-between leading-none mb-0.5">
                <span className="text-[6px] font-extrabold text-purple-300 truncate flex items-center gap-0.5">
                  <span>🏛️</span> Logic Co-Pilot
                </span>
                <span className="text-[5px] text-purple-200 group-hover/m2:translate-x-0.5 transition-transform">↗</span>
              </div>
              <span className="text-[4.5px] text-purple-200/80 truncate font-sans">
                SOP & Logik Bisnis
              </span>
            </a>
          </div>

          {/* Bagian Bawah: Telemetri Mini */}
          <div className="flex items-center justify-between text-[5.5px] text-slate-300 pt-0.5 border-t border-white/5 leading-none">
            <span className="text-cyan-300 font-bold truncate">🎓 EduCore AI Active</span>
            <span className="text-purple-300 font-bold shrink-0">🏛️ Enterprise Co-Pilot</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. JacS RetailOS ERP (Retail & POS) - Compact 3D Glassmorphism "Keyboard POS & Kuitansi Struk Thermal"
  if (appId === 'retail-os') {
    return (
      <div
        className={`relative w-full ${heightClass} ${marginClass} rounded-lg overflow-hidden border border-rose-500/30 group-hover:border-rose-400/80 shadow-xs group-hover:shadow-[0_0_16px_rgba(244,63,94,0.3)] transition-all duration-300 ${className}`}
      >
        <div className="absolute inset-0 bg-[#0c0609] overflow-hidden pointer-events-none">
          <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-rose-500/25 blur-xl" />
          <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-amber-500/20 blur-xl" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:8px_8px]" />
        </div>

        <div className="relative z-10 w-full h-full p-1.5 flex items-stretch gap-1.5 select-none font-mono">
          {/* Left: Thermal Slip */}
          <div className="flex-1 h-full bg-white/[0.07] backdrop-blur-md border border-rose-400/40 rounded p-1 flex flex-col justify-between shadow-xs overflow-hidden">
            <div className="text-[5.5px] text-slate-400 text-center tracking-wider border-b border-dashed border-rose-500/30 pb-0.2">
              *** JACS POS STORE ***
            </div>
            <div className="space-y-0.2 text-[6px]">
              <div className="flex justify-between text-slate-300 leading-tight">
                <span className="truncate">1x ARABICA</span>
                <span className="font-bold">28K</span>
              </div>
              <div className="flex justify-between text-amber-300 font-extrabold border-t border-dashed border-rose-500/30 pt-0.2 leading-tight">
                <span>TOTAL [QRIS]</span>
                <span>62.000</span>
              </div>
            </div>
            {/* Barcode */}
            <div className="border-t border-dashed border-rose-500/20 pt-0.5 flex items-center justify-center gap-[1px] h-1.5 w-full opacity-80">
              <span className="w-[1.5px] h-full bg-slate-300" />
              <span className="w-[1px] h-full bg-slate-300" />
              <span className="w-[2px] h-full bg-slate-300" />
              <span className="w-[1px] h-full bg-slate-300" />
              <span className="w-[2px] h-full bg-slate-300" />
              <span className="w-[1px] h-full bg-slate-300" />
            </div>
          </div>

          {/* Right: Tactile POS Keys & Cash Drawer */}
          <div className="w-22 h-full flex flex-col justify-between gap-1 shrink-0">
            <div className="space-y-0.5">
              <div className="bg-white/[0.08] backdrop-blur-md border border-cyan-400/50 text-cyan-300 text-[6px] px-1 py-0.5 rounded font-bold flex items-center justify-between shadow-xs">
                <span className="text-white bg-cyan-950 px-0.5 rounded border border-cyan-600 text-[5.5px]">
                  [F2]
                </span>
                <span className="truncate">CARI ITEM</span>
              </div>
              <div className="bg-white/[0.08] backdrop-blur-md border border-amber-400/50 text-amber-300 text-[6px] px-1 py-0.5 rounded font-bold flex items-center justify-between shadow-xs">
                <span className="text-white bg-amber-950 px-0.5 rounded border border-amber-600 text-[5.5px]">
                  [F10]
                </span>
                <span className="truncate">BAYAR QRIS</span>
              </div>
            </div>

            <div className="bg-emerald-950/70 border border-emerald-400/50 text-emerald-300 text-[5.5px] px-1 py-0.2 rounded font-bold flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-0.5">
                <KeyRound className="w-2 h-2 text-emerald-400" />
                <span>DRAWER</span>
              </div>
              <span className="flex items-center gap-0.5 text-emerald-400 font-bold">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                READY
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. KosKita Property ERP (Manajemen Kos) - Compact 3D Glassmorphism "Denah Kamar Interaktif & CCTV"
  if (appId === 'koskita') {
    return (
      <div
        className={`relative w-full ${heightClass} ${marginClass} rounded-lg overflow-hidden border border-amber-500/30 group-hover:border-amber-400/80 shadow-xs group-hover:shadow-[0_0_16px_rgba(245,158,11,0.3)] transition-all duration-300 ${className}`}
      >
        <div className="absolute inset-0 bg-[#0d0905] overflow-hidden pointer-events-none">
          <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-amber-500/25 blur-xl" />
          <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-emerald-500/20 blur-xl" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:8px_8px]" />
        </div>

        <div className="relative z-10 w-full h-full p-1.5 flex items-stretch gap-1.5 select-none font-mono">
          {/* Left: 4 Rooms Grid */}
          <div className="flex-1 grid grid-cols-2 gap-1 h-full">
            <div className="bg-emerald-950/50 border border-emerald-400/60 rounded px-1 py-0.5 flex items-center justify-between text-[6px]">
              <span className="font-bold text-white">101 ADIT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="bg-emerald-950/50 border border-emerald-400/60 rounded px-1 py-0.5 flex items-center justify-between text-[6px]">
              <span className="font-bold text-white">102 DIMAS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="bg-cyan-950/50 border border-cyan-400/60 rounded px-1 py-0.5 flex items-center justify-between text-[6px]">
              <span className="font-bold text-cyan-300">103 BOOKED</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
            <div className="bg-white/[0.05] border border-slate-700/80 rounded px-1 py-0.5 flex items-center justify-between text-[6px]">
              <span className="font-bold text-slate-400">104 READY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            </div>
          </div>

          {/* Right: CCTV Beacon & Smart Lock */}
          <div className="w-20 h-full bg-white/[0.06] backdrop-blur-md border border-rose-400/40 rounded p-1 flex flex-col justify-between shrink-0 shadow-xs">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-0.5 leading-none">
              <div className="flex items-center gap-0.5 text-[6px] font-bold text-rose-400">
                <Video className="w-2 h-2 text-rose-400" />
                <span>CCTV</span>
              </div>
              <span className="flex items-center gap-0.5 text-[5.5px] text-rose-300 font-bold">
                <span className="w-1 h-1 rounded-full bg-rose-500 animate-ping" />
                REC
              </span>
            </div>
            <div className="text-[5.5px] text-slate-300 leading-tight">
              <div>KORIDOR LT.1</div>
              <div className="text-amber-400 font-bold">2.4 kWh</div>
            </div>
            <div className="bg-emerald-950/70 border border-emerald-400/50 text-emerald-300 text-[5.5px] px-1 py-0.2 rounded text-center font-bold">
              LOCK OK
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. JacS DepoHub PRO (Logistik & Armada) - Compact 3D Glassmorphism "GPS Dispatch & Peta Radar"
  if (appId === 'depohub') {
    return (
      <div
        className={`relative w-full ${heightClass} ${marginClass} rounded-lg overflow-hidden border border-sky-500/30 group-hover:border-sky-400/80 shadow-xs group-hover:shadow-[0_0_16px_rgba(2,132,199,0.3)] transition-all duration-300 ${className}`}
      >
        <div className="absolute inset-0 bg-[#040a14] overflow-hidden pointer-events-none">
          <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-sky-500/25 blur-xl" />
          <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-cyan-500/20 blur-xl" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:8px_8px]" />
        </div>

        <div className="relative z-10 w-full h-full p-1.5 flex items-stretch gap-1.5 select-none font-mono">
          {/* Left: Vector Route */}
          <div className="flex-1 h-full bg-white/[0.06] backdrop-blur-md border border-sky-400/40 rounded p-1 relative overflow-hidden flex flex-col justify-between shadow-xs">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 45">
              <path
                d="M 12 32 Q 45 8 90 18"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="3 1.5"
              />
              <circle cx="12" cy="32" r="3" fill="#10b981" />
              <circle cx="90" cy="18" r="3" fill="#f59e0b" />
            </svg>

            <div className="relative z-10 flex items-center justify-between text-[5.5px]">
              <span className="text-emerald-400 font-bold bg-black/60 px-1 rounded">[A] CAKUNG</span>
              <span className="text-amber-400 font-bold bg-black/60 px-1 rounded">[B] PUSAT</span>
            </div>

            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 flex items-center">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-5 h-5 rounded-full bg-cyan-400/40 animate-ping" />
                <div className="w-4 h-4 rounded-full bg-sky-950 border border-sky-400 flex items-center justify-center shadow-xs">
                  <Truck className="w-2 h-2 text-cyan-300" />
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[5.5px] text-slate-300">
              <span>GPS LIVE</span>
              <span className="text-sky-300 font-bold">ARMADA #04</span>
            </div>
          </div>

          {/* Right: Dispatch Real-time Card */}
          <div className="w-22 h-full bg-white/[0.06] backdrop-blur-md border border-sky-400/40 rounded p-1 flex flex-col justify-between shrink-0 shadow-xs">
            <div className="border-b border-sky-500/20 pb-0.5 leading-none">
              <div className="text-[6.5px] text-sky-300 font-extrabold flex items-center gap-0.5">
                <span className="w-1 h-1 rounded-full bg-sky-400 animate-pulse" />
                RUTE LIVE
              </div>
              <div className="text-[5.5px] text-slate-300 mt-0.5">ETA: 14 MENIT</div>
            </div>

            <div className="text-[5.5px] text-slate-300 leading-tight">
              <div className="text-white font-bold">42 km/h</div>
              <div className="text-amber-300">18 Koli • FEFO</div>
            </div>

            <div className="bg-emerald-950/60 border border-emerald-400/50 text-emerald-300 text-[5.5px] px-1 py-0.2 rounded text-center font-bold">
              e-POD OK ✓
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. JacS Builder Studio (Arsitektur AI & UI) - Compact 3D Glassmorphism "AI Engine & Prompt Studio"
  if (appId === 'studio-suite') {
    return (
      <div
        className={`relative w-full ${heightClass} ${marginClass} rounded-lg overflow-hidden border border-cyan-500/30 group-hover:border-cyan-400/80 shadow-xs group-hover:shadow-[0_0_16px_rgba(6,182,212,0.3)] transition-all duration-300 ${className}`}
      >
        <div className="absolute inset-0 bg-[#050b14] overflow-hidden pointer-events-none">
          <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-cyan-500/25 blur-xl" />
          <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-indigo-500/20 blur-xl" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:8px_8px]" />
        </div>

        <div className="relative z-10 w-full h-full p-1.5 flex items-stretch gap-1.5 select-none font-mono">
          {/* Prompt Box */}
          <div className="flex-1 h-full bg-white/[0.06] backdrop-blur-md border border-cyan-400/40 rounded p-1 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-0.5 text-[5.5px] leading-none">
              <div className="flex items-center gap-0.5 text-cyan-400 font-bold">
                <Code2 className="w-2 h-2" />
                <span>PROMPT STUDIO</span>
              </div>
              <span className="text-slate-400">0.2s</span>
            </div>

            <div className="text-[6.5px] text-slate-200 truncate leading-tight">
              <span className="text-cyan-400">&gt;</span> orchestrate_erp()
            </div>

            <div className="flex items-center justify-between border-t border-cyan-500/20 pt-0.5 text-[5.5px] text-emerald-300 leading-none">
              <span className="flex items-center gap-0.5">
                <Sparkles className="w-2 h-2 text-emerald-400 animate-pulse" />
                <span>120 Tokens/s</span>
              </span>
              <span className="text-cyan-300 font-bold">v3.2</span>
            </div>
          </div>

          {/* Neural Hub Node */}
          <div className="w-18 h-full bg-white/[0.06] backdrop-blur-md border border-indigo-400/40 rounded p-1 flex flex-col justify-between items-center shrink-0 shadow-xs">
            <div className="relative flex items-center justify-center my-auto">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500/30 to-indigo-500/30 border border-cyan-400/80 flex items-center justify-center shadow-xs">
                <Cpu className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              </div>
              <span className="absolute -inset-1 rounded-full border border-cyan-400/30 animate-ping pointer-events-none" />
            </div>
            <span className="text-[6px] font-mono font-bold text-cyan-300 tracking-tight text-center leading-none">
              GEMINI 3.8
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 6. MasterPro Enterprise (Tata Kelola) - Compact 3D Glassmorphism "Papan Kanban Proyek"
  if (appId === 'master-pro') {
    return (
      <div
        className={`relative w-full ${heightClass} ${marginClass} rounded-lg overflow-hidden border border-violet-500/30 group-hover:border-violet-400/80 shadow-xs group-hover:shadow-[0_0_16px_rgba(139,92,246,0.3)] transition-all duration-300 ${className}`}
      >
        <div className="absolute inset-0 bg-[#090514] overflow-hidden pointer-events-none">
          <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-violet-500/25 blur-xl" />
          <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-fuchsia-500/20 blur-xl" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:8px_8px]" />
        </div>

        <div className="relative z-10 w-full h-full p-1.5 grid grid-cols-3 gap-1 select-none font-mono">
          {/* Column 1: TO DO */}
          <div className="h-full bg-white/[0.06] backdrop-blur-md border border-slate-700/80 rounded p-1 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-700/50 pb-0.2 leading-none">
              <span className="text-[6px] font-bold text-amber-400">TO DO (3)</span>
              <span className="w-1 h-1 rounded-full bg-amber-400" />
            </div>
            <div className="bg-black/40 border border-slate-700/80 rounded px-1 py-0.5 relative overflow-hidden my-auto">
              <div className="w-0.5 absolute left-0 top-0 bottom-0 bg-rose-500" />
              <div className="text-[6px] font-bold text-white truncate pl-0.5">Audit ISO</div>
            </div>
            <span className="text-[5px] text-slate-400 text-center leading-none">P1 High</span>
          </div>

          {/* Column 2: PROGRESS */}
          <div className="h-full bg-white/[0.06] backdrop-blur-md border border-cyan-500/40 rounded p-1 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-0.2 leading-none">
              <span className="text-[6px] font-bold text-cyan-400">PROGRESS</span>
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <div className="bg-black/40 border border-cyan-500/40 rounded px-1 py-0.5 relative overflow-hidden my-auto">
              <div className="w-0.5 absolute left-0 top-0 bottom-0 bg-cyan-400" />
              <div className="text-[6px] font-bold text-cyan-200 truncate pl-0.5">API Sync</div>
            </div>
            <span className="text-[5px] text-cyan-300 text-center font-bold leading-none">75% Done</span>
          </div>

          {/* Column 3: DONE */}
          <div className="h-full bg-white/[0.06] backdrop-blur-md border border-emerald-500/40 rounded p-1 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-0.2 leading-none">
              <span className="text-[6px] font-bold text-emerald-400">DONE (12)</span>
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
            </div>
            <div className="bg-black/40 border border-emerald-500/40 rounded px-1 py-0.5 relative overflow-hidden my-auto">
              <div className="w-0.5 absolute left-0 top-0 bottom-0 bg-emerald-500" />
              <div className="text-[6px] font-bold text-emerald-200 truncate pl-0.5">SPJ Q3</div>
            </div>
            <span className="text-[5px] text-emerald-400 text-center font-bold leading-none">Valid ✓</span>
          </div>
        </div>
      </div>
    );
  }

  // 6 & 7. JacS Enterprise Suite & Kemitraan - Compact 3D Glassmorphism "Topology Mesh Node"
  const isKemitraan = appId === 'kemitraan' || alt.toLowerCase().includes('kemitraan');
  if (appId === 'enterprise-suite' || isKemitraan) {
    return (
      <div
        className={`relative w-full ${heightClass} ${marginClass} rounded-lg overflow-hidden border ${isKemitraan ? 'border-teal-500/30 group-hover:border-teal-400/80 shadow-xs group-hover:shadow-[0_0_16px_rgba(20,184,166,0.3)]' : 'border-purple-500/30 group-hover:border-purple-400/80 shadow-xs group-hover:shadow-[0_0_16px_rgba(168,85,247,0.3)]'} transition-all duration-300 ${className}`}
      >
        <div className="absolute inset-0 bg-[#070512] overflow-hidden pointer-events-none">
          <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-purple-500/25 blur-xl" />
          <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-teal-500/20 blur-xl" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:8px_8px]" />
        </div>

        <div className="relative z-10 w-full h-full p-1.5 flex flex-col justify-between overflow-hidden shadow-xs select-none">
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 45">
              <line x1="50" y1="22" x2="16" y2="10" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.8" />
              <line x1="50" y1="22" x2="84" y2="10" stroke="#f43f5e" strokeWidth="1.5" strokeOpacity="0.8" />
              <line x1="50" y1="22" x2="16" y2="36" stroke="#0284c7" strokeWidth="1.5" strokeOpacity="0.8" />
              <line x1="50" y1="22" x2="84" y2="36" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.8" />

              <circle cx="33" cy="16" r="1.5" fill="#34d399" className="animate-ping" />
              <circle cx="67" cy="16" r="1.5" fill="#fb7185" className="animate-ping" />
            </svg>

            {/* Satellite 1: EDU */}
            <div className="absolute top-0.5 left-1 flex items-center gap-0.5 bg-emerald-950/90 border border-emerald-500/60 px-1 py-0.2 rounded shadow-xs z-10">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span className="text-[5.5px] font-mono font-bold text-emerald-300">EDU</span>
            </div>

            {/* Satellite 2: RETAIL */}
            <div className="absolute top-0.5 right-1 flex items-center gap-0.5 bg-rose-950/90 border border-rose-500/60 px-1 py-0.2 rounded shadow-xs z-10">
              <span className="w-1 h-1 rounded-full bg-rose-400" />
              <span className="text-[5.5px] font-mono font-bold text-rose-300">RETAIL</span>
            </div>

            {/* Central Node */}
            <div className="relative z-20 flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-7 h-7 rounded-full bg-purple-500/30 animate-ping pointer-events-none" />
                <div className="w-6 h-6 rounded-full bg-[#180e2b] border border-purple-400 flex flex-col items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                  {isKemitraan ? (
                    <Handshake className="w-3 h-3 text-purple-300" strokeWidth={2} />
                  ) : (
                    <ShieldCheck className="w-3 h-3 text-purple-300" strokeWidth={2} />
                  )}
                </div>
              </div>
              <span className="text-[5.5px] font-mono font-extrabold text-white mt-0.5 tracking-tight bg-purple-950/90 px-1 py-0.2 rounded border border-purple-600 shadow-xs">
                {isKemitraan ? 'API MESH' : 'CORE SSO'}
              </span>
            </div>

            {/* Satellite 3: LOGISTICS */}
            <div className="absolute bottom-0.5 left-1 flex items-center gap-0.5 bg-sky-950/90 border border-sky-500/60 px-1 py-0.2 rounded shadow-xs z-10">
              <span className="w-1 h-1 rounded-full bg-sky-400" />
              <span className="text-[5.5px] font-mono font-bold text-sky-300">LOGISTICS</span>
            </div>

            {/* Satellite 4: PROPERTY */}
            <div className="absolute bottom-0.5 right-1 flex items-center gap-0.5 bg-amber-950/90 border border-amber-500/60 px-1 py-0.2 rounded shadow-xs z-10">
              <span className="w-1 h-1 rounded-full bg-amber-400" />
              <span className="text-[5.5px] font-mono font-bold text-amber-300">PROPERTY</span>
            </div>
          </div>

          <div className="bg-[#0e0a1c] border-t border-purple-900/50 py-0.2 px-1 flex items-center justify-between text-[5.5px] font-mono text-purple-300/90 shrink-0">
            <span className="text-cyan-400 font-bold">0.2ms Bus</span>
            <span>AES-256</span>
            <span className="text-emerald-400 font-bold">99.99%</span>
          </div>
        </div>
      </div>
    );
  }

  // 8. Default High-Fidelity Photographic Banner with JacS Brand Glassmorphism Overlay
  return (
    <div
      className={`relative w-full ${heightClass} ${marginClass} rounded-lg overflow-hidden border border-slate-200/80 dark:border-white/10 group-hover:border-cyan-400/80 transition-all duration-300 bg-gradient-to-br from-slate-800 to-slate-900 shadow-xs ${className}`}
    >
      <div className="absolute top-1 left-1.5 z-10 flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-black/75 backdrop-blur-md border border-white/15 shadow-xs pointer-events-none">
        <JacSLogo size="xs" className="scale-[0.6] origin-center -ml-0.5" />
        <span className="text-[8px] font-bold font-display text-white tracking-tight">JacS</span>
      </div>

      {!hasError && src ? (
        <>
          <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-cyan-400 select-none">
          <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 shadow-inner group-hover:border-cyan-400/50 transition-all duration-300">
            {Icon && (
              <Icon
                className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300"
                strokeWidth={1.8}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
