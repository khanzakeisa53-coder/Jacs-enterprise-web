import React, { useState } from 'react';
import {
  Activity,
  Users,
  DollarSign,
  ShoppingCart,
  Package,
  CreditCard,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Server,
  Zap,
} from 'lucide-react';
import { JacSLogo } from './JacSLogo';

interface RetailOsConsolePreviewProps {
  compact?: boolean;
  className?: string;
}

export const RetailOsConsolePreview: React.FC<RetailOsConsolePreviewProps> = ({
  compact = false,
  className = '',
}) => {
  const [activeDivision, setActiveDivision] = useState<number | null>(null);

  const divisions = [
    {
      id: 'exec',
      name: 'Executive',
      subtitle: 'Dasbor & KPI',
      metric: '98.4%',
      metricLabel: 'On-Track',
      icon: Activity,
      neonColor: 'border-cyan-500/70 text-cyan-400 bg-cyan-950/40 shadow-cyan-500/20',
      dotColor: 'bg-cyan-400',
    },
    {
      id: 'hr',
      name: 'HR',
      subtitle: 'SDM & Presensi',
      metric: '42 Staf',
      metricLabel: 'Hadir 100%',
      icon: Users,
      neonColor: 'border-emerald-500/70 text-emerald-400 bg-emerald-950/40 shadow-emerald-500/20',
      dotColor: 'bg-emerald-400',
    },
    {
      id: 'fin',
      name: 'Finance',
      subtitle: 'Buku Kas BKU',
      metric: 'Rp 84.5M',
      metricLabel: 'Kas Rekonsil',
      icon: DollarSign,
      neonColor: 'border-amber-500/70 text-amber-400 bg-amber-950/40 shadow-amber-500/20',
      dotColor: 'bg-amber-400',
    },
    {
      id: 'pur',
      name: 'Purchasing',
      subtitle: 'PO & Pengadaan',
      metric: '12 PO',
      metricLabel: 'Terkonfirmasi',
      icon: ShoppingCart,
      neonColor: 'border-purple-500/70 text-purple-400 bg-purple-950/40 shadow-purple-500/20',
      dotColor: 'bg-purple-400',
    },
    {
      id: 'inv',
      name: 'Inventory',
      subtitle: 'Gudang & FIFO',
      metric: '1,240',
      metricLabel: 'SKU Aman',
      icon: Package,
      neonColor: 'border-blue-500/70 text-blue-400 bg-blue-950/40 shadow-blue-500/20',
      dotColor: 'bg-blue-400',
    },
    {
      id: 'pos',
      name: 'POS',
      subtitle: 'Kasir Kilat [F2]',
      metric: '< 5 Detik',
      metricLabel: '3 Loket Aktif',
      icon: CreditCard,
      neonColor: 'border-rose-500/70 text-rose-400 bg-rose-950/40 shadow-rose-500/20',
      dotColor: 'bg-rose-400',
    },
  ];

  if (compact) {
    return (
      <div
        className={`w-full h-full bg-[#080B10] flex flex-col font-sans select-none overflow-hidden rounded-lg border border-slate-700/60 shadow-inner group-hover:border-cyan-500/60 transition-colors ${className}`}
      >
        {/* Compact Console Top Bar */}
        <div className="bg-[#0e131d] px-2 py-0.5 border-b border-slate-800 flex items-center justify-between text-[8px] font-mono text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <JacSLogo size="xs" className="scale-75 origin-left -mr-1" />
            <span className="font-bold text-slate-200 tracking-wider truncate">
              JacS RetailOS ERP • 6 Core Divisions
            </span>
          </div>
          <span className="text-[7.5px] px-1 py-0.2 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-800/60 font-semibold shrink-0">
            LIVE POS
          </span>
        </div>

        {/* Compact 6-Division Grid with sleek mini sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Mini black sidebar */}
          <div className="w-4 bg-[#0a0d14] border-r border-slate-800/80 flex flex-col items-center py-1 gap-1 shrink-0">
            <div className="w-2 h-2 rounded bg-cyan-500/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <div className="mt-auto w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* 6 Neon Division Cards (2 rows of 3) */}
          <div className="flex-1 p-1 grid grid-cols-3 gap-1 content-center">
            {divisions.map((div) => {
              const Icon = div.icon;
              return (
                <div
                  key={div.id}
                  className={`p-1 rounded bg-[#0e1420] border ${div.neonColor} border-opacity-60 flex flex-col justify-between overflow-hidden shadow-xs hover:border-opacity-100 transition-all`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] font-bold font-mono tracking-tight text-slate-200 truncate">
                      {div.name}
                    </span>
                    <span className={`w-1 h-1 rounded-full ${div.dotColor}`} />
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Icon className="w-2.5 h-2.5 shrink-0 opacity-80" strokeWidth={2} />
                    <span className="text-[6.5px] font-mono font-bold text-slate-300 truncate">
                      {div.metric}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compact Bottom Ticker */}
        <div className="bg-[#0a0d14] px-1.5 py-0.5 border-t border-slate-800/70 flex items-center justify-between text-[7px] font-mono text-slate-500 shrink-0">
          <span className="truncate">FIFO Sync • Thermal POS • WA Bot</span>
          <span className="text-emerald-400 font-bold">OK</span>
        </div>
      </div>
    );
  }

  // Full Expanded Banner for Modal
  return (
    <div
      className={`w-full rounded-2xl bg-[#080B10] border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 overflow-hidden flex flex-col font-sans text-slate-200 select-none ${className}`}
    >
      {/* Console Window Top Title Bar */}
      <div className="bg-[#0D121C] px-4 py-2.5 border-b border-slate-800/90 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mac/Console traffic dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono font-bold tracking-wider text-slate-100">
              System Operational & Managerial — 6 Core Operational Divisions
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE ECOSYSTEM ONLINE
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono text-slate-500">
            JacS RetailOS v3.2.0
          </span>
        </div>
      </div>

      {/* Main Console Body: Left Nav Sidebar + 6 Glowing Module Cards */}
      <div className="flex flex-col md:flex-row min-h-[220px]">
        {/* Left Navigation Sidebar */}
        <div className="w-full md:w-52 bg-[#090D15] p-3 border-b md:border-b-0 md:border-r border-slate-800/80 flex md:flex-col justify-between shrink-0 text-xs">
          <div className="space-y-2 w-full">
            {/* Sudut Kiri Atas Sidebar: Identitas Logo JacS RetailOS ERP */}
            <div className="flex items-center gap-2 px-1 pb-2.5 mb-1.5 border-b border-slate-800/80">
              <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                <JacSLogo size="xs" withGlow={true} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-[12px] text-white tracking-tight leading-tight font-display truncate">
                  JacS RetailOS ERP
                </span>
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider font-semibold truncate">
                  Enterprise Suite
                </span>
              </div>
            </div>

            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-2 pb-1">
              Navigasi Divisi
            </div>
            {divisions.map((div, i) => {
              const Icon = div.icon;
              const isSelected = activeDivision === i;
              return (
                <button
                  key={div.id}
                  onClick={() => setActiveDivision(isSelected ? null : i)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg font-mono text-[11px] transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />
                    <span className="truncate">{div.name}</span>
                  </div>
                  <span className={`w-1.5 h-1.5 rounded-full ${div.dotColor} shrink-0`} />
                </button>
              );
            })}
          </div>

          <div className="hidden md:block pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
            <div className="flex items-center justify-between py-0.5">
              <span>Database Sync</span>
              <span className="text-emerald-400 font-semibold">Aktif</span>
            </div>
            <div className="flex items-center justify-between py-0.5">
              <span>Loket Kasir</span>
              <span className="text-cyan-400 font-semibold">3 Mesin</span>
            </div>
          </div>
        </div>

        {/* 6 Core Operational Division Cards with Neon Glows */}
        <div className="flex-1 p-4 bg-gradient-to-br from-[#080B10] via-[#0B0F17] to-[#0E1420] flex flex-col justify-between">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {divisions.map((div, i) => {
              const Icon = div.icon;
              const isSelected = activeDivision === i;
              return (
                <div
                  key={div.id}
                  onClick={() => setActiveDivision(isSelected ? null : i)}
                  className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between relative group ${div.neonColor} ${
                    isSelected
                      ? 'ring-2 ring-cyan-400/80 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'hover:scale-[1.01]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">
                        {div.name}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${div.dotColor} shadow-[0_0_8px] shadow-current`} />
                    </div>
                    <div className="text-xs font-semibold text-slate-100 flex items-center gap-1.5 mb-1">
                      <Icon className="w-4 h-4 shrink-0 opacity-90" strokeWidth={1.8} />
                      <span className="truncate">{div.subtitle}</span>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-white/10 flex items-baseline justify-between">
                    <span className="text-sm font-extrabold font-mono text-white tracking-tight">
                      {div.metric}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 font-medium">
                      {div.metricLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Operational Telemetry Status Bar */}
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
            <div className="flex items-center gap-2">
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              <span>FIFO Real-Time Engine: <strong className="text-slate-200">100% Akurat</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Thermal Printer Ready
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                WhatsApp Auto-Receipt
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
