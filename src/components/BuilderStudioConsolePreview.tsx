import React, { useState } from 'react';
import {
  Boxes,
  Database,
  Link2,
  Cpu,
  Code2,
  Workflow,
  Sparkles,
  Layers,
  Terminal,
  CheckCircle2,
  ArrowRight,
  GitBranch,
} from 'lucide-react';
import { JacSLogo } from './JacSLogo';

interface BuilderStudioConsolePreviewProps {
  compact?: boolean;
  className?: string;
}

export const BuilderStudioConsolePreview: React.FC<BuilderStudioConsolePreviewProps> = ({
  compact = false,
  className = '',
}) => {
  const [activeTelemetry, setActiveTelemetry] = useState<number | null>(null);

  const telemetryMetrics = [
    {
      id: 'mod',
      title: 'Modul',
      value: '8 Aktif',
      detail: 'Core Components',
      icon: Boxes,
      glow: 'border-cyan-500/70 text-cyan-400 bg-cyan-950/40 shadow-cyan-500/20',
      dotColor: 'bg-cyan-400',
    },
    {
      id: 'tab',
      title: 'Tabel',
      value: '24 Relasi',
      detail: 'Schema Postgres',
      icon: Database,
      glow: 'border-blue-500/70 text-blue-400 bg-blue-950/40 shadow-blue-500/20',
      dotColor: 'bg-blue-400',
    },
    {
      id: 'med',
      title: 'Link Media',
      value: '142 Aset',
      detail: 'CDN Cloud Storage',
      icon: Link2,
      glow: 'border-emerald-500/70 text-emerald-400 bg-emerald-950/40 shadow-emerald-500/20',
      dotColor: 'bg-emerald-400',
    },
    {
      id: 'tok',
      title: 'Ukuran Prompt',
      value: '12.4k',
      detail: 'Optimasi Token',
      icon: Cpu,
      glow: 'border-purple-500/70 text-purple-400 bg-purple-950/40 shadow-purple-500/20',
      dotColor: 'bg-purple-400',
    },
  ];

  if (compact) {
    return (
      <div
        className={`w-full h-full bg-[#07090E] flex flex-col font-sans select-none overflow-hidden rounded-lg border border-slate-700/60 shadow-inner group-hover:border-cyan-500/60 transition-colors ${className}`}
      >
        {/* Compact Top Header */}
        <div className="bg-[#0D111A] px-2 py-0.5 border-b border-slate-800 flex items-center justify-between text-[8px] font-mono text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <JacSLogo size="xs" className="scale-75 origin-left -mr-1" />
            <span className="font-bold text-slate-200 tracking-wider truncate">
              JacS Builder Studio • AI Workbench
            </span>
          </div>
          <span className="text-[7.5px] px-1 py-0.2 rounded bg-purple-950/70 text-purple-300 border border-purple-800/60 font-semibold shrink-0">
            V3.4 AI
          </span>
        </div>

        {/* Compact Middle: Left dev rail + 4 Neon Telemetry Cards */}
        <div className="flex-1 flex overflow-hidden">
          {/* Vertical dev bar */}
          <div className="w-4 bg-[#090C13] border-r border-slate-800/80 flex flex-col items-center py-1 gap-1 shrink-0">
            <div className="w-2 h-2 rounded bg-purple-500/40" />
            <div className="w-1.5 h-1.5 rounded bg-slate-700" />
            <div className="w-1.5 h-1.5 rounded bg-slate-700" />
            <div className="mt-auto w-1 h-1 rounded-full bg-cyan-400" />
          </div>

          {/* 4 Neon Telemetry Cards in 2x2 grid */}
          <div className="flex-1 p-1 grid grid-cols-2 gap-1 content-center">
            {telemetryMetrics.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`p-1 rounded bg-[#0D121B] border ${item.glow} border-opacity-60 flex flex-col justify-between overflow-hidden shadow-xs hover:border-opacity-100 transition-all`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] font-bold font-mono text-slate-300 truncate">
                      {item.title}
                    </span>
                    <span className={`w-1 h-1 rounded-full ${item.dotColor}`} />
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Icon className="w-2.5 h-2.5 shrink-0 opacity-80" strokeWidth={2} />
                    <span className="text-[7px] font-mono font-extrabold text-white truncate">
                      {item.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compact Bottom Bar */}
        <div className="bg-[#090C13] px-1.5 py-0.5 border-t border-slate-800/70 flex items-center justify-between text-[7px] font-mono text-slate-500 shrink-0">
          <span className="truncate">Model: JacS-V4.2 • Latency: 14ms</span>
          <span className="text-cyan-400 font-bold">READY</span>
        </div>
      </div>
    );
  }

  // Full Expanded Banner for Modal
  return (
    <div
      className={`w-full rounded-2xl bg-[#07090E] border border-blue-500/40 shadow-2xl shadow-blue-950/50 overflow-hidden flex flex-col font-sans text-slate-200 select-none ${className}`}
    >
      {/* Console Window Top Title Bar */}
      <div className="bg-[#0C1019] px-4 py-2.5 border-b border-slate-800/90 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-mono font-bold tracking-wider text-slate-100">
              JacS App Architecture Studio — AI App Architecture Workbench
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/30 flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI ARCHITECTURE ENGINE V4.2
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono text-slate-500">
            JacS Builder Studio v3.4.0
          </span>
        </div>
      </div>

      {/* Main Console Body: Left Vertical Sidebar + Workbench Canvas */}
      <div className="flex flex-col md:flex-row min-h-[240px]">
        {/* Left Vertical Navigation Sidebar */}
        <div className="w-full md:w-52 bg-[#090C13] p-3 border-b md:border-b-0 md:border-r border-slate-800/80 flex md:flex-col justify-between shrink-0 text-xs">
          <div className="space-y-2 w-full">
            {/* Sudut Kiri Atas Sidebar: Identitas Logo JacS Builder Studio */}
            <div className="flex items-center gap-2 px-1 pb-2.5 mb-1.5 border-b border-slate-800/80">
              <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                <JacSLogo size="xs" withGlow={true} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-[12px] text-white tracking-tight leading-tight font-display truncate">
                  JacS Builder Studio
                </span>
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider font-semibold truncate">
                  AI Architecture
                </span>
              </div>
            </div>

            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-2 pb-1">
              Workbench Tools
            </div>
            {[
              { label: 'Identitas Aplikasi', icon: Code2, active: true },
              { label: 'Perencana Modul', icon: Workflow, active: false },
              { label: 'Schema & ERD', icon: Database, active: false },
              { label: 'Node Graph AI', icon: GitBranch, active: false },
              { label: 'Prompt Engine', icon: Terminal, active: false },
            ].map((tool, i) => {
              const Icon = tool.icon;
              return (
                <div
                  key={i}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg font-mono text-[11px] transition-all cursor-pointer ${
                    tool.active
                      ? 'bg-blue-500/20 text-cyan-300 border border-blue-500/40 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />
                  <span className="truncate">{tool.label}</span>
                </div>
              );
            })}
          </div>

          <div className="hidden md:block pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
            <div className="flex items-center justify-between py-0.5">
              <span>Token Budget</span>
              <span className="text-emerald-400 font-semibold">98% Efisien</span>
            </div>
            <div className="flex items-center justify-between py-0.5">
              <span>Response Rate</span>
              <span className="text-cyan-400 font-semibold">&lt; 14ms</span>
            </div>
          </div>
        </div>

        {/* Center Workbench Canvas: 4 Neon Telemetry Row + Split Workbench */}
        <div className="flex-1 p-4 bg-gradient-to-br from-[#07090E] via-[#0A0D15] to-[#0E131E] flex flex-col justify-between">
          {/* 4 Neon Telemetry Cards */}
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Realtime Telemetry Metrics</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {telemetryMetrics.map((item, i) => {
                const Icon = item.icon;
                const isSelected = activeTelemetry === i;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveTelemetry(isSelected ? null : i)}
                    className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between relative ${item.glow} ${
                      isSelected
                        ? 'ring-2 ring-blue-400 shadow-lg shadow-blue-500/20 scale-[1.02]'
                        : 'hover:scale-[1.01]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 truncate">
                        {item.title}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${item.dotColor} shadow-[0_0_8px] shadow-current`} />
                    </div>
                    <div className="flex items-center gap-1.5 my-1">
                      <Icon className="w-4 h-4 shrink-0 opacity-90" strokeWidth={1.8} />
                      <span className="text-sm font-extrabold font-mono text-white tracking-tight">
                        {item.value}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 truncate">
                      {item.detail}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Workbench Panels: Identitas Aplikasi & Perencana Modul */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {/* Panel 1: Identitas Aplikasi */}
            <div className="p-3 rounded-xl bg-[#090D15]/80 border border-slate-800 text-xs font-mono space-y-1.5">
              <div className="flex items-center justify-between text-cyan-400 font-bold text-[11px] pb-1 border-b border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  Identitas Aplikasi
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  READY
                </span>
              </div>
              <div className="text-slate-300 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Framework:</span>
                  <span className="font-semibold text-slate-200">React 18 + Vite SPA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Database:</span>
                  <span className="font-semibold text-slate-200">PostgreSQL (Drizzle ORM)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Architecture:</span>
                  <span className="font-semibold text-cyan-300">Clean Modular Mesh</span>
                </div>
              </div>
            </div>

            {/* Panel 2: Perencana Modul */}
            <div className="p-3 rounded-xl bg-[#090D15]/80 border border-slate-800 text-xs font-mono space-y-1.5">
              <div className="flex items-center justify-between text-purple-400 font-bold text-[11px] pb-1 border-b border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Workflow className="w-3.5 h-3.5" />
                  Perencana Modul (AI Logic)
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  OPTIMAL
                </span>
              </div>
              <div className="text-slate-300 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Node Pipeline:</span>
                  <span className="font-semibold text-emerald-400">8 Node Validated</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">State Matrix:</span>
                  <span className="font-semibold text-slate-200">Reactive Dispatcher</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Context Window:</span>
                  <span className="font-semibold text-purple-300">128k Safe Compression</span>
                </div>
              </div>
            </div>
          </div>

          {/* Workbench Status Footer */}
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Blueprint Status: <strong className="text-slate-200">Synchronized & Verified</strong></span>
            </div>
            <span className="text-[10px] text-cyan-400 font-semibold">
              Live Preview Engine Enabled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
