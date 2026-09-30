import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Users,
  Zap,
  Sparkles,
  Check,
  Bookmark,
  Share2,
  Layout,
  Cpu,
  GraduationCap,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkle,
  FileText,
  Palette,
  BookOpen,
  Send,
  Code2,
} from 'lucide-react';
import { WebApp } from '../types';
import { JacSLogo } from './JacSLogo';
import { RetailOsConsolePreview } from './RetailOsConsolePreview';
import { BuilderStudioConsolePreview } from './BuilderStudioConsolePreview';
import { useN8nConfig } from '../context/N8nConfigContext';

interface AppDetailModalProps {
  app: WebApp | null;
  onClose: () => void;
}

export const AppDetailModal: React.FC<AppDetailModalProps> = ({ app, onClose }) => {
  const { isConnected: isN8nConnected, openN8nConfig } = useN8nConfig();
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [launchSuccess, setLaunchSuccess] = useState<boolean>(false);
  const [activeJacsAppProTab, setActiveJacsAppProTab] = useState<'content' | 'design' | 'doc' | 'learning'>('content');

  // Keyboard shortcut listener: Escape key closes modal instantly
  useEffect(() => {
    if (!app) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [app, onClose]);

  // Lock body scroll while modal is active to prevent background scrolling
  useEffect(() => {
    if (!app) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [app]);

  if (!app) return null;

  const handleShare = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 dark:bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-modal-title"
    >
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-[#111419] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh] animate-in zoom-in-95 duration-200 cursor-default transition-colors text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Sticky Top Navigation Bar */}
        <div className="sticky top-0 z-50 bg-white/95 dark:bg-[#111419]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between transition-colors shadow-xs">
          {/* Left: Tombol '← Kembali ke Portal' dengan neon cyan border & Esc badge */}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border border-cyan-500/40 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/10 transition-colors group shadow-xs active:scale-95 cursor-pointer"
            title="Kembali ke Portal (Esc)"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-cyan-600 dark:text-cyan-400" />
            <span>← Kembali ke Portal</span>
            <span className="hidden sm:inline-block ml-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              Esc
            </span>
          </button>

          {/* Center: Suite & Version Badge */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/25 font-bold uppercase tracking-wider font-mono">
              {app.suite || 'JacS Enterprise Suite'}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-semibold">
              {app.version}
            </span>
          </div>

          {/* Right: Bookmark, Share & High-Contrast Circular Close Button */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                bookmarked
                  ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/40'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 border-slate-200 dark:border-slate-800'
              }`}
              title="Bookmark aplikasi"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 transition-colors flex items-center gap-1 text-xs cursor-pointer"
              title="Bagikan tautan"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all flex items-center justify-center active:scale-90 cursor-pointer"
              aria-label="Tutup modal"
              title="Tutup (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Header Modal: Blok Identitas Developer Resmi, Kategori, Status, Nama Aplikasi & Aksi Langsung */}
        <div className="p-5 sm:p-7 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-[#15181F] dark:via-[#111419] dark:to-[#15181F] border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex-1 space-y-3 min-w-0">
              {/* Sudut Kiri Atas Modal (di atas nama aplikasi): Blok Identitas Developer Resmi JacS Enterprise */}
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/80 dark:border-slate-800/80">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <JacSLogo size="sm" withGlow={true} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-extrabold text-slate-950 dark:text-white tracking-tight text-sm leading-none font-display">
                    JacS Enterprise
                  </span>
                  <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-mono uppercase tracking-wider font-semibold mt-0.5 truncate">
                    {app.suite || 'JacS Enterprise Suite'}
                  </span>
                </div>
              </div>

              {/* Detail Aplikasi: Badges, Nama, & Ringkasan */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/25 font-bold uppercase tracking-wider font-mono">
                    {app.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wide border flex items-center gap-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {app.status}
                  </span>
                </div>
                <h2
                  id="app-modal-title"
                  className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight font-display"
                >
                  {app.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                  {app.summary || app.tagline}
                </p>
              </div>
            </div>

            {/* Direct Action Button: Buka Aplikasi */}
            <div className="self-stretch sm:self-auto flex-shrink-0">
              <a
                href={app.liveUrl && app.liveUrl !== '#' ? app.liveUrl : undefined}
                onClick={(e) => {
                  if (!app.liveUrl || app.liveUrl === '#') {
                    e.preventDefault();
                    setLaunchSuccess(true);
                    setTimeout(() => setLaunchSuccess(false), 2500);
                  }
                }}
                target={app.liveUrl && app.liveUrl !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>{launchSuccess ? 'Sesi Terbuka di Portal' : 'Buka Aplikasi ↗'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 3. Modal Scrollable Content: 3 Clean Focused Sections */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 max-h-[60vh]">
          {/* Bagian 1: Transformasi & Nilai Modernisasi */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Transformasi & Nilai Modernisasi
              </h3>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {app.description}
              </p>
            </div>
          </div>

          {/* Bagian 2: Kesesuaian & Sasaran Pengguna */}
          {app.suitableFor && app.suitableFor.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Kesesuaian & Sasaran Pengguna
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {app.suitableFor.map((target, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 flex items-center gap-3 shadow-xs hover:border-cyan-500/40 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0" />
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {target}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bagian Khusus: Pratinjau Antarmuka Asli (Live UI Console) untuk RetailOS & Builder Studio */}
          {app.id === 'retail-os' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                    <Layout className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Pratinjau Antarmuka Asli (Live UI Console)
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 font-bold">
                  System Operational & Managerial
                </span>
              </div>
              <RetailOsConsolePreview compact={false} />
            </div>
          )}

          {app.id === 'studio-suite' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    <Layout className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Pratinjau Antarmuka Asli (Live UI Console)
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-cyan-700 dark:text-cyan-300 border border-blue-500/20 font-bold">
                  AI App Architecture Workbench
                </span>
              </div>
              <BuilderStudioConsolePreview compact={false} />
            </div>
          )}

          {/* Bagian Khusus: JacS App PRO — 4-Core AI Workspace Shell, Live Bridge SekolahKita, & Telemetri */}
          {app.id === 'jacs-app-pro' && (
            <div className="space-y-4">
              {/* Telemetri Efisiensi Kerja Mingguan */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-cyan-500/10 border border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/40 text-orange-400 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                      Telemetri Efisiensi Kerja Mingguan
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      Otomatisasi 4-Core Asisten otonom Gemini 3.8 Flash Engine
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-stretch sm:self-auto justify-around sm:justify-end">
                  <div className="text-center px-3 py-1 rounded-lg bg-white/70 dark:bg-black/40 border border-orange-500/20">
                    <div className="text-xs sm:text-sm font-extrabold text-orange-600 dark:text-orange-400 font-mono">
                      1,720
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">
                      Tugas Selesai
                    </div>
                  </div>
                  <div className="text-center px-3 py-1 rounded-lg bg-white/70 dark:bg-black/40 border border-emerald-500/20">
                    <div className="text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                      42.5 Jam
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">
                      Waktu Dihemat
                    </div>
                  </div>
                  <div className="text-center px-3 py-1 rounded-lg bg-white/70 dark:bg-black/40 border border-cyan-500/20">
                    <div className="text-xs sm:text-sm font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
                      99.9%
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">
                      SLA Akurasi
                    </div>
                  </div>
                </div>
              </div>

              {/* 1. Banner Interaktif 4 Modul Spesialisasi AI */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      4 Modul Spesialisasi AI Workspace
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href="https://gemini.google.com/gem/1fipy01GNfQUDdZd-o20CfPmTh6udrCR1?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-bold flex items-center gap-1 transition-colors"
                      title="Buka Gem #1: JacS EduCore & Kurikulum AI di tab baru"
                    >
                      <span>🎓 EduCore AI</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    <a
                      href="https://gemini.google.com/gem/1I8o6xug5WjRo-r738HLhXFTx_21bmQ_p?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 font-bold flex items-center gap-1 transition-colors"
                      title="Buka Gem #2: JacS Enterprise & Logic Co-Pilot di tab baru"
                    >
                      <span>🏛️ Enterprise Co-Pilot</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                {/* Tabs Selector 4 Modul */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-[#0c0f14] rounded-xl border border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setActiveJacsAppProTab('content')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeJacsAppProTab === 'content'
                        ? 'bg-orange-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400'
                    }`}
                  >
                    <Send className="w-3 h-3" />
                    <span>AI Content</span>
                  </button>
                  <button
                    onClick={() => setActiveJacsAppProTab('design')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeJacsAppProTab === 'design'
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400'
                    }`}
                  >
                    <Palette className="w-3 h-3" />
                    <span>AI Design</span>
                  </button>
                  <button
                    onClick={() => setActiveJacsAppProTab('doc')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeJacsAppProTab === 'doc'
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400'
                    }`}
                  >
                    <FileText className="w-3 h-3" />
                    <span>AI Document</span>
                  </button>
                  <button
                    onClick={() => setActiveJacsAppProTab('learning')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeJacsAppProTab === 'learning'
                        ? 'bg-purple-500 text-white font-bold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-400'
                    }`}
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>AI Learning</span>
                  </button>
                </div>

                {/* Tab Content Display */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#0c0f14] border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
                  {activeJacsAppProTab === 'content' && (
                    <div className="space-y-2 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
                          <Send className="w-3.5 h-3.5" />
                          Modul Spesialis: AI Content & Copywriting
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Template Siap Pakai</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Menghasilkan materi komunikasi berkonversi tinggi, mulai dari headline persuasif, konten media sosial, naskah video reels, hingga broadcast WhatsApp resmi sekolah/bisnis.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                        <div className="p-2 rounded-lg bg-orange-500/5 border border-orange-500/20 text-xs">
                          <div className="font-bold text-orange-600 dark:text-orange-400">Copywriting Pemasaran</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">Hook, Story, Offer & CTA</div>
                        </div>
                        <div className="p-2 rounded-lg bg-orange-500/5 border border-orange-500/20 text-xs">
                          <div className="font-bold text-orange-600 dark:text-orange-400">Naskah Video Script</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">Storyboard 60 detik YouTube/IG</div>
                        </div>
                        <div className="p-2 rounded-lg bg-orange-500/5 border border-orange-500/20 text-xs">
                          <div className="font-bold text-orange-600 dark:text-orange-400">WA Broadcast Massal</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">Pengumuman SPP & Undangan</div>
                        </div>
                      </div>
                      <div className="pt-2 flex justify-end">
                        <a
                          href="https://gemini.google.com/gem/1fipy01GNfQUDdZd-o20CfPmTh6udrCR1?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-600 dark:text-orange-400 text-xs font-semibold transition-all cursor-pointer"
                        >
                          <span>Buka di JacS AI Architecture Gem (Gem #1)</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}

                  {activeJacsAppProTab === 'design' && (
                    <div className="space-y-2 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5" />
                          Modul Spesialis: AI Design & UI Architecture
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Design Token Engine</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Otomasi perancangan aset grafis, palet token Tailwind CSS, mockup antarmuka pengguna interaktif, dan materi publikasi visual PPDB sekolah terstandarisasi.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                        <div className="p-2 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-xs">
                          <div className="font-bold text-cyan-600 dark:text-cyan-400">Design Tokens Tailwind</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">Color, Spacing & Elevation</div>
                        </div>
                        <div className="p-2 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-xs">
                          <div className="font-bold text-cyan-600 dark:text-cyan-400">Mockup UI Komponen</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">Glassmorphism & Responsive</div>
                        </div>
                        <div className="p-2 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-xs">
                          <div className="font-bold text-cyan-600 dark:text-cyan-400">Poster Publikasi PPDB</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">Aset Banner & Infografis</div>
                        </div>
                      </div>
                      <div className="pt-2 flex justify-end">
                        <a
                          href="https://gemini.google.com/gem/1fipy01GNfQUDdZd-o20CfPmTh6udrCR1?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-semibold transition-all cursor-pointer"
                        >
                          <span>Buka di JacS AI Architecture Gem (Gem #1)</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}

                  {activeJacsAppProTab === 'doc' && (
                    <div className="space-y-2 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" />
                          Modul Spesialis: AI Document & Technical Specification
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Standar ISO & Kemdikbud</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Generator dokumen administratif dan teknis presisi tinggi, termasuk Product Requirement Document (PRD), proposal pengajuan anggaran dana BOS/RAB, dan modul Kurikulum Merdeka.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                        <div className="p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs">
                          <div className="font-bold text-emerald-600 dark:text-emerald-400">PRD & User Stories</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">Spesifikasi Arsitektur Sistem</div>
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs">
                          <div className="font-bold text-emerald-600 dark:text-emerald-400">Proposal BOS & RAB</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">Kalkulasi Anggaran BOSP</div>
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs">
                          <div className="font-bold text-emerald-600 dark:text-emerald-400">Modul Kurikulum Merdeka</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">Alur Capaian Pembelajaran</div>
                        </div>
                      </div>
                      <div className="pt-2 flex justify-end">
                        <a
                          href="https://gemini.google.com/gem/1I8o6xug5WjRo-r738HLhXFTx_21bmQ_p?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold transition-all cursor-pointer"
                        >
                          <span>Buka di JacS Pro Specialist Gem (Gem #2)</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}

                  {activeJacsAppProTab === 'learning' && (
                    <div className="space-y-2 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          Modul Spesialis: AI Learning & Coding Tutor
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">HOTS & AST Refactoring</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Asisten kognitif untuk guru dan pengembang piranti lunak: menyusun silabus KBM, menciptakan bank soal berstandar Higher Order Thinking Skills (HOTS), serta audit dan refactoring kode.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                        <div className="p-2 rounded-lg bg-purple-500/5 border border-purple-500/20 text-xs">
                          <div className="font-bold text-purple-600 dark:text-purple-400">Silabus & RPP KBM</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">Rencana Pembelajaran 16 Minggu</div>
                        </div>
                        <div className="p-2 rounded-lg bg-purple-500/5 border border-purple-500/20 text-xs">
                          <div className="font-bold text-purple-600 dark:text-purple-400">Bank Soal HOTS</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">Rubrik Asesmen & Pembahasan</div>
                        </div>
                        <div className="p-2 rounded-lg bg-purple-500/5 border border-purple-500/20 text-xs">
                          <div className="font-bold text-purple-600 dark:text-purple-400">Code Refactoring Engine</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">Optimasi Algoritma & Debug</div>
                        </div>
                      </div>
                      <div className="pt-2 flex justify-end">
                        <a
                          href="https://gemini.google.com/gem/1I8o6xug5WjRo-r738HLhXFTx_21bmQ_p?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs font-semibold transition-all cursor-pointer"
                        >
                          <span>Buka di JacS Pro Specialist Gem (Gem #2)</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. Koneksi Live Deployment & Direct Bridge ke SEKOLAHKITA V2 */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-emerald-950/40 border border-emerald-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/50 text-emerald-400 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display flex items-center gap-1.5">
                        <span>Direct Bridge ke SEKOLAHKITA V2</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/50">
                          LIVE BRIDGE ACTIVE
                        </span>
                      </h4>
                      <p className="text-[11px] text-emerald-200/80">
                        Sinkronisasi dua arah otomatis dengan 11 Role RBAC & 22 Modul Operasional Sekolah
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-400 font-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>0.18ms Pipeline</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-mono">
                  <div className="p-2 rounded bg-black/40 border border-emerald-500/20 text-slate-300">
                    <div className="text-emerald-400 font-bold">Sinkronisasi Bank Soal</div>
                    <div className="text-[9.5px] text-slate-400">Direct CBT Push</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-emerald-500/20 text-slate-300">
                    <div className="text-emerald-400 font-bold">Modul Ajar KBM</div>
                    <div className="text-[9.5px] text-slate-400">Portal Guru & GTK</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-emerald-500/20 text-slate-300">
                    <div className="text-emerald-400 font-bold">RAB BOSP Auto-Sync</div>
                    <div className="text-[9.5px] text-slate-400">Buku Kas BKU Tripartit</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-emerald-500/20 text-slate-300">
                    <div className="text-emerald-400 font-bold">WA Broadcast e-Kwitansi</div>
                    <div className="text-[9.5px] text-slate-400">Auto-Dispatch Wali Murid</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bagian 3: Pilar Keunggulan Digital (4-5 Pilar Transformasi Digital Utama) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Pilar Keunggulan Digital ({app.features.length} Pilar Utama)
                </h3>
              </div>
              <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hidden sm:inline">
                Standar Otomatisasi JacS
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {app.features.map((feat, idx) => {
                const isObject = typeof feat !== 'string';
                const featTitle = isObject ? feat.title : feat;
                const featModule = isObject ? feat.module : `Pilar ${idx + 1}`;
                const featDesc = isObject ? feat.description : '';

                return (
                  <div
                    key={isObject ? feat.id : idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-all flex items-start gap-3.5 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs font-mono shrink-0 group-hover:scale-105 transition-transform">
                      0{idx + 1}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-600">
                          {featModule}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Otomatis
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                        {featTitle}
                      </h4>
                      {featDesc && (
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                          {featDesc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dampak Langsung Efisiensi (Jika ada data advantages) */}
          {app.advantages && app.advantages.length > 0 && (
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Dampak Langsung Efisiensi</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                {app.advantages.map((adv, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{adv}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Integrasi Trio Otomasi Mandiri Klien (BYO) Dedicated Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 via-[#FF6A00]/10 to-purple-500/10 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-md bg-[#FF6A00]/20 text-[#FF6A00]">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white font-display">
                  Integrasi Trio Otomasi Mandiri (n8n • Make • Zapier)
                </h4>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  isN8nConnected
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {isN8nConnected ? '🟢 BYO Terhubung' : '⚪ Setup Mandiri'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Tautkan webhook n8n, Make.com, atau Zapier Catch Hook instansi Anda untuk memproses event {app.name} tanpa biaya kuota platform tambahan.
              </p>
            </div>
            <button
              type="button"
              onClick={openN8nConfig}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{isN8nConnected ? 'Kelola Otomasi BYO' : 'Setup Otomasi BYO'}</span>
            </button>
          </div>
        </div>

        {/* 4. Footer Modal */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-50 dark:bg-[#0c0e12] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <JacSLogo size="xs" />
            <span className="hidden sm:inline font-mono">JacS Enterprise • Modernisasi Digital & Ekosistem Solusi Cerdas</span>
            <span className="sm:hidden font-mono">JacS Enterprise</span>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium text-xs transition-colors active:scale-95 cursor-pointer"
            title="Kembali ke Portal (Esc)"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Portal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
