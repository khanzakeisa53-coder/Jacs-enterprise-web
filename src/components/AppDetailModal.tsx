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
  Boxes,
  Database,
  Layers,
  Target,
  Workflow,
  Terminal,
  Copy,
  FileCode,
  Command,
  FolderGit2,
  BarChart3,
  Sliders,
  Truck,
  MapPin,
  RotateCcw,
  FileSpreadsheet,
  AlertTriangle,
  Receipt,
  DollarSign,
  Store,
  Briefcase,
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
  const [copiedMasterPrompt, setCopiedMasterPrompt] = useState<boolean>(false);
  const [launchSuccess, setLaunchSuccess] = useState<boolean>(false);
  const [activeJacsAppProTab, setActiveJacsAppProTab] = useState<'content' | 'design' | 'doc' | 'learning'>('content');
  const [activeDepoHubTab, setActiveDepoHubTab] = useState<number>(0);
  const [activeMasterProTab, setActiveMasterProTab] = useState<number>(0);

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

  const handleCopyMasterPrompt = () => {
    const masterPromptText = `# JacS Builder Studio — Master Blueprint Prompt Package
## Identitas Aplikasi
- Nama: JacS Builder Studio
- Role: AI Application Architecture & Blueprint Studio
- Target Platform: Web SPA & Cloud Native Architecture
- Kategori: Arsitektur Sistem & AI (JacS Enterprise Suite)

---

### Ringkasan Aplikasi
JacS Builder Studio adalah ruang kerja arsitektur sistem cerdas (all-in-one architecture workspace) yang memfasilitasi perancangan fondasi aplikasi, pemetaan logika modul, dan penyusunan skema basis data sebelum tahap penulisan kode (coding) dimulai. Solusi ini menjembatani ide bisnis dengan realisasi teknis melalui standardisasi struktur data dan prompt engineering presisi untuk AI code generator.

---

### Tujuan Aplikasi
1. Mengeliminasi Ambiguitas Teknis: Menyediakan format baku untuk mendokumentasikan spesifikasi fungsional dan teknis aplikasi sebelum masuk ke proses pengembangan.
2. Akselerasi Pra-Produksi: Mempersingkat fase perancangan sistem dan prototyping menggunakan pendekatan modular yang terstruktur.
3. Optimasi AI Code Generation: Menghasilkan instruksi teknis (master prompt) yang terstandarisasi agar generator kode AI dapat membangun aplikasi dengan akurasi logika yang tinggi.

---

### Fungsi & Fitur Utama
- Application Blueprint & Metadata Foundation: Menetapkan identitas aplikasi, kategori sistem, target platform, serta batasan arsitektur secara terstruktur sejak awal.
- Module Engine & Logic Planner: Memecah alur kerja aplikasi yang kompleks menjadi modul-modul independen yang mudah dikembangkan, diuji, dan diintegrasikan.
- Database Schema & Relational Modeling: Merancang struktur tabel, tipe data kolom, dan pemetaan relasi antar-entitas data agar siap diimplementasikan oleh tim backend.
- Master Prompt Generator: Mengompilasi seluruh rancangan blueprint, logika modul, dan struktur data menjadi paket prompt terpadu yang siap dieksekusi langsung pada AI coding tools.

---

### Target Pengguna & Penerapan
- Software Architects & System Designers: Merancang dan memvalidasi kerangka kerja sistem sebelum didelegasikan ke tim engineer.
- Independent Developers & Solo Creators: Mempercepat perancangan alur aplikasi dari konsep awal hingga siap eksekusi tanpa kehilangan konteks teknis.
- Tech Lead & Tim Pengembang: Sebagai dokumen rujukan arsitektur resmi (single source of truth) untuk menjaga konsistensi pengembangan produk digital.`;

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(masterPromptText);
      setCopiedMasterPrompt(true);
      setTimeout(() => setCopiedMasterPrompt(false), 2500);
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
                  {app.id === 'studio-suite' && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30 font-bold uppercase">
                      Architecture Workspace
                    </span>
                  )}
                  {app.id === 'jacs-app-pro' && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-bold uppercase">
                      v2.5 Enterprise AI Suite
                    </span>
                  )}
                  {app.id === 'depohub' && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-bold uppercase">
                      v2.6.0 LOGISTIK & WMS
                    </span>
                  )}
                  {app.id === 'master-pro' && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold uppercase">
                      FINANSIAL & ORDER • v2.5
                    </span>
                  )}
                </div>
                <h2
                  id="app-modal-title"
                  className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight font-display"
                >
                  {app.name}
                </h2>
                {app.id === 'studio-suite' ? (
                  <p className="text-xs sm:text-sm font-semibold italic text-cyan-600 dark:text-cyan-400 font-sans tracking-wide">
                    *AI Application Architecture & Blueprint Studio*
                  </p>
                ) : app.id === 'jacs-app-pro' ? (
                  <p className="text-xs sm:text-sm font-semibold italic text-cyan-600 dark:text-cyan-400 font-sans tracking-wide">
                    *Multi-Assistant AI Workspace & Intelligent Computing Ecosystem*
                  </p>
                ) : app.id === 'depohub' ? (
                  <p className="text-xs sm:text-sm font-semibold italic text-amber-600 dark:text-amber-400 font-sans tracking-wide">
                    *Solusi Telemetri, Kasir POS & Manajemen Distribusi Air Mineral / Logistik Depo (v2.6.0)*
                  </p>
                ) : app.id === 'master-pro' ? (
                  <p className="text-xs sm:text-sm font-semibold italic text-emerald-600 dark:text-emerald-400 font-sans tracking-wide">
                    *Sistem Manajemen Pesanan, Piutang & Arus Kas Bisnis Terpadu (v2.5)*
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                    {app.summary || app.tagline}
                  </p>
                )}
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
                <span>{launchSuccess ? 'Sesi Terbuka di Portal' : app.id === 'studio-suite' ? 'Buka Google AI Studio ↗' : app.id === 'jacs-app-pro' ? 'Buka JacS AI Workspace ↗' : 'Buka Aplikasi ↗'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 3. Modal Scrollable Content: Dedicated Architecture Showcase for JacS Builder Studio, or Focused Standard Sections for other apps */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 max-h-[60vh]">
          {app.id === 'studio-suite' ? (
            /* ========================================================
               DEDICATED JACS BUILDER STUDIO ARCHITECTURE SHOWCASE
               Neon Glassmorphism Theme (Border Cyan Glow, Structured Typography)
               ======================================================== */
            <div className="space-y-6">
              {/* Top Banner: Sub-Identity, Blueprint Spec, & Action Buttons */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-slate-900/90 to-blue-950/70 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.18)] backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      ARSITEKTUR SISTEM & AI
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/40 font-bold uppercase tracking-wider">
                      ALL-IN-ONE WORKSPACE
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      v3.4.0 Production
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight font-display">
                    AI Application Architecture & Blueprint Studio
                  </h3>
                  <p className="text-xs text-slate-300 max-w-xl font-sans leading-relaxed">
                    Standardisasi fondasi sistem, perancangan modular logika, pemodelan skema basis data PostgreSQL, dan kompilasi master prompt terpadu untuk AI code generator.
                  </p>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyMasterPrompt}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-400 text-xs font-mono font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    title="Salin Master Blueprint Prompt ke clipboard"
                  >
                    {copiedMasterPrompt ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Blueprint Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Salin Master Prompt 📋</span>
                      </>
                    )}
                  </button>

                  <a
                    href="https://aistudio.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/25 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    title="Buka Google AI Studio di tab baru"
                  >
                    <span>Google AI Studio ↗</span>
                  </a>
                </div>
              </div>

              {/* 1. Ringkasan Aplikasi */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Ringkasan Aplikasi</span>
                    <span className="text-[10px] text-cyan-500 font-normal font-mono hidden sm:inline">| All-in-One Architecture Workspace</span>
                  </h3>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.12)] space-y-3">
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    JacS Builder Studio adalah ruang kerja arsitektur sistem cerdas (all-in-one architecture workspace) yang memfasilitasi perancangan fondasi aplikasi, pemetaan logika modul, dan penyusunan skema basis data sebelum tahap penulisan kode (coding) dimulai. Solusi ini menjembatani ide bisnis dengan realisasi teknis melalui standardisasi struktur data dan prompt engineering presisi untuk AI code generator.
                  </p>

                  {/* 4 Feature Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
                    <div className="p-2 rounded-lg bg-slate-950/60 border border-cyan-500/20 text-center">
                      <span className="text-[10px] font-mono text-cyan-300 font-bold block">Standardisasi Fondasi</span>
                      <span className="text-[9px] text-slate-400">Metadata & Arsitektur</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950/60 border border-cyan-500/20 text-center">
                      <span className="text-[10px] font-mono text-cyan-300 font-bold block">Modular Logic</span>
                      <span className="text-[9px] text-slate-400">Dekomposisi Sistem</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950/60 border border-cyan-500/20 text-center">
                      <span className="text-[10px] font-mono text-cyan-300 font-bold block">Schema Relasional</span>
                      <span className="text-[9px] text-slate-400">PostgreSQL Modeling</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950/60 border border-cyan-500/20 text-center">
                      <span className="text-[10px] font-mono text-cyan-300 font-bold block">Prompt Engine</span>
                      <span className="text-[9px] text-slate-400">AI Code Generator Ready</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Tujuan Aplikasi */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30">
                      <Target className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Tujuan Aplikasi</span>
                      <span className="text-[10px] text-blue-400 font-normal font-mono hidden sm:inline">| 3 Pilar Strategis</span>
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold hidden sm:inline">
                    High Logic Accuracy
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Tujuan 1 */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-xs hover:border-cyan-400/60 transition-all flex flex-col justify-between group">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center group-hover:scale-110 transition-transform">
                          01
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800">
                          Format Baku
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display leading-snug">
                        Mengeliminasi Ambiguitas Teknis
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        Menyediakan format baku untuk mendokumentasikan spesifikasi fungsional dan teknis aplikasi sebelum masuk ke proses pengembangan.
                      </p>
                    </div>
                  </div>

                  {/* Tujuan 2 */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-xs hover:border-cyan-400/60 transition-all flex flex-col justify-between group">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-400/40 text-blue-300 font-mono text-xs font-bold flex items-center justify-center group-hover:scale-110 transition-transform">
                          02
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800">
                          Rapid Prototyping
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display leading-snug">
                        Akselerasi Pra-Produksi
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        Mempersingkat fase perancangan sistem dan prototyping menggunakan pendekatan modular yang terstruktur.
                      </p>
                    </div>
                  </div>

                  {/* Tujuan 3 */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-xs hover:border-cyan-400/60 transition-all flex flex-col justify-between group">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-lg bg-purple-500/20 border border-purple-400/40 text-purple-300 font-mono text-xs font-bold flex items-center justify-center group-hover:scale-110 transition-transform">
                          03
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800">
                          Precision AI
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display leading-snug">
                        Optimasi AI Code Generation
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        Menghasilkan instruksi teknis (master prompt) yang terstandarisasi agar generator kode AI dapat membangun aplikasi dengan akurasi logika yang tinggi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Fungsi & Fitur Utama */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <Zap className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Fungsi & Fitur Utama</span>
                      <span className="text-[10px] text-emerald-400 font-normal font-mono hidden sm:inline">| 4 Modul Arsitektur Inti</span>
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold hidden sm:inline">
                    Arsitektur Standar Industri
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Fitur 1 */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-xs hover:border-cyan-400/60 transition-all flex items-start gap-3.5 group">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 flex items-center justify-center font-bold text-xs font-mono shrink-0 group-hover:scale-105 transition-transform">
                      <Boxes className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-800 font-bold uppercase">
                          Fondasi Arsitektur
                        </span>
                        <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                          Tersedia
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display">
                        Application Blueprint & Metadata Foundation
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        Menetapkan identitas aplikasi, kategori sistem, target platform, serta batasan arsitektur secara terstruktur sejak awal.
                      </p>
                    </div>
                  </div>

                  {/* Fitur 2 */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-xs hover:border-cyan-400/60 transition-all flex items-start gap-3.5 group">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-400/30 text-blue-300 flex items-center justify-center font-bold text-xs font-mono shrink-0 group-hover:scale-105 transition-transform">
                      <Workflow className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-blue-950/70 text-blue-300 border border-blue-800 font-bold uppercase">
                          Logika & Modul
                        </span>
                        <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                          Tersedia
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display">
                        Module Engine & Logic Planner
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        Memecah alur kerja aplikasi yang kompleks menjadi modul-modul independen yang mudah dikembangkan, diuji, dan diintegrasikan.
                      </p>
                    </div>
                  </div>

                  {/* Fitur 3 */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-xs hover:border-cyan-400/60 transition-all flex items-start gap-3.5 group">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 flex items-center justify-center font-bold text-xs font-mono shrink-0 group-hover:scale-105 transition-transform">
                      <Database className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-800 font-bold uppercase">
                          Pemodelan Data
                        </span>
                        <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                          Tersedia
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display">
                        Database Schema & Relational Modeling
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        Merancang struktur tabel, tipe data kolom, dan pemetaan relasi antar-entitas data agar siap diimplementasikan oleh tim backend.
                      </p>
                    </div>
                  </div>

                  {/* Fitur 4 */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-xs hover:border-cyan-400/60 transition-all flex items-start gap-3.5 group">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-400/30 text-purple-300 flex items-center justify-center font-bold text-xs font-mono shrink-0 group-hover:scale-105 transition-transform">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-purple-950/70 text-purple-300 border border-purple-800 font-bold uppercase">
                          AI Prompt Engineering
                        </span>
                        <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                          Tersedia
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display">
                        Master Prompt Generator
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        Mengompilasi seluruh rancangan blueprint, logika modul, dan struktur data menjadi paket prompt terpadu yang siap dieksekusi langsung pada AI coding tools.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Target Pengguna & Penerapan */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                      <Users className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Target Pengguna & Penerapan</span>
                      <span className="text-[10px] text-cyan-400 font-normal font-mono hidden sm:inline">| Stakeholder Personas</span>
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold hidden sm:inline">
                    Single Source of Truth
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Persona 1 */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-xs hover:border-cyan-400/60 transition-all flex flex-col justify-between group">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                        <h4 className="text-xs sm:text-sm font-bold text-cyan-300 font-display">
                          Software Architects & System Designers
                        </h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        Merancang dan memvalidasi kerangka kerja sistem sebelum didelegasikan ke tim engineer.
                      </p>
                    </div>
                    <div className="pt-2 mt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                      Role: System Framework & Validation
                    </div>
                  </div>

                  {/* Persona 2 */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-xs hover:border-cyan-400/60 transition-all flex flex-col justify-between group">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                        <h4 className="text-xs sm:text-sm font-bold text-blue-300 font-display">
                          Independent Developers & Solo Creators
                        </h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        Mempercepat perancangan alur aplikasi dari konsep awal hingga siap eksekusi tanpa kehilangan konteks teknis.
                      </p>
                    </div>
                    <div className="pt-2 mt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                      Role: Solo Execution & Context Integrity
                    </div>
                  </div>

                  {/* Persona 3 */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-xs hover:border-cyan-400/60 transition-all flex flex-col justify-between group">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        <h4 className="text-xs sm:text-sm font-bold text-emerald-300 font-display">
                          Tech Lead & Tim Pengembang
                        </h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        Sebagai dokumen rujukan arsitektur resmi (single source of truth) untuk menjaga konsistensi pengembangan produk digital.
                      </p>
                    </div>
                    <div className="pt-2 mt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                      Role: Official Architectural Reference
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Pratinjau Antarmuka Asli (Live UI Console) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30">
                      <Layout className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Pratinjau Antarmuka Asli (Live UI Console)</span>
                      <span className="text-[10px] text-cyan-400 font-normal font-mono hidden sm:inline">| Interactive Workbench</span>
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-cyan-300 border border-blue-500/30 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    AI App Architecture Workbench
                  </span>
                </div>
                <BuilderStudioConsolePreview compact={false} />
              </div>
            </div>
          ) : (
            <>
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

          {/* Bagian Khusus: JacS App PRO — Enterprise AI Suite (v2.5) */}
          {app.id === 'jacs-app-pro' && (
            <div className="space-y-4">
              {/* Ringkasan Aplikasi & Header Arsitektur v2.5 */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-purple-950/30 border border-cyan-500/30 shadow-xs space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center font-bold text-xs font-mono">
                      v2.5
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display flex items-center gap-2">
                        <span>JacS App PRO — Enterprise AI Suite (v2.5)</span>
                      </h4>
                      <p className="text-[11px] text-cyan-300 font-mono">
                        Multi-Assistant AI Workspace & Intelligent Computing Ecosystem
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold">
                      4-CORE AI WORKSPACE
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ENTERPRISE READY
                    </span>
                  </div>
                </div>
                <div>
                  <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Ringkasan Aplikasi
                  </h5>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    JacS App PRO adalah platform multi-assistant AI workspace terpadu yang dirancang untuk mengotomasi alur kerja kreatif, rekayasa antarmuka visual, penyusunan dokumen formal, hingga edukasi dan pemrograman adaptif dalam satu ekosistem komputasi cerdas.
                  </p>
                </div>
              </div>

              {/* 1. Spesialisasi Modul AI Utama */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      1. Spesialisasi Modul AI Utama
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
                <div className="p-4 rounded-xl bg-white dark:bg-[#0c0f14] border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                  {activeJacsAppProTab === 'content' && (
                    <div className="space-y-3 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
                          <Send className="w-3.5 h-3.5" />
                          AI Content (Teks & Narasi)
                        </span>
                        <span className="text-[10px] font-mono text-orange-600/80 dark:text-orange-400/80 px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 font-bold">
                          Modul 01 • Copy & Narasi
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-orange-500/5 border border-orange-500/20 text-xs">
                        <span className="font-bold text-orange-700 dark:text-orange-300 font-mono text-[11px] uppercase tracking-wider block mb-0.5">
                          Fungsi:
                        </span>
                        <p className="text-slate-700 dark:text-slate-300">
                          Mesin sintesis teks dan perumusan pesan strategis.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          Kapabilitas:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-orange-500/20 text-xs flex flex-col justify-between">
                            <div>
                              <div className="font-bold text-orange-600 dark:text-orange-400 mb-1">
                                Persuasive Copywriting
                              </div>
                              <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                                Generasi naskah iklan digital dan penulisan berbasis variasi formula hook.
                              </div>
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-orange-500/20 text-xs flex flex-col justify-between">
                            <div>
                              <div className="font-bold text-orange-600 dark:text-orange-400 mb-1">
                                Content Marketing
                              </div>
                              <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                                Penulisan artikel edukatif, draf blog terindeks, dan naskah narasi video (video script).
                              </div>
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-orange-500/20 text-xs flex flex-col justify-between">
                            <div>
                              <div className="font-bold text-orange-600 dark:text-orange-400 mb-1">
                                Communication Broadcast
                              </div>
                              <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                                Pembuatan naskah siar terstruktur untuk kanal komunikasi resmi dan publik.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-1 flex justify-end">
                        <a
                          href="https://gemini.google.com/gem/1fipy01GNfQUDdZd-o20CfPmTh6udrCR1?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-600 dark:text-orange-400 text-xs font-semibold transition-all cursor-pointer"
                        >
                          <span>Buka Asisten AI Content di Gem #1</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}

                  {activeJacsAppProTab === 'design' && (
                    <div className="space-y-3 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5" />
                          AI Design (Visual & UI Studio)
                        </span>
                        <span className="text-[10px] font-mono text-cyan-600/80 dark:text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 font-bold">
                          Modul 02 • UI & Visual
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-xs">
                        <span className="font-bold text-cyan-700 dark:text-cyan-300 font-mono text-[11px] uppercase tracking-wider block mb-0.5">
                          Fungsi:
                        </span>
                        <p className="text-slate-700 dark:text-slate-300">
                          Asisten perancangan visual, tata letak, dan rekayasa antarmuka produk digital.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          Kapabilitas:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-cyan-500/20 text-xs flex flex-col justify-between">
                            <div>
                              <div className="font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                                Design Tokens Architecture
                              </div>
                              <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                                Generasi variabel sistem desain (palet warna luminous, tipografi, radius, dan spacing).
                              </div>
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-cyan-500/20 text-xs flex flex-col justify-between">
                            <div>
                              <div className="font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                                UI Mockup & Layouts
                              </div>
                              <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                                Pembuatan spesifikasi tata letak antarmuka aplikasi web responsif bertema modern/gelap (SaaS Modern Dark Theme).
                              </div>
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-cyan-500/20 text-xs flex flex-col justify-between">
                            <div>
                              <div className="font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                                Graphic Specifications
                              </div>
                              <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                                Perancangan materi publikasi visual digital dan poster promosi siap produksi (vector ready).
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-1 flex justify-end">
                        <a
                          href="https://gemini.google.com/gem/1fipy01GNfQUDdZd-o20CfPmTh6udrCR1?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-semibold transition-all cursor-pointer"
                        >
                          <span>Buka Asisten AI Design di Gem #1</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}

                  {activeJacsAppProTab === 'doc' && (
                    <div className="space-y-3 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" />
                          AI Document (PRD & Format Resmi)
                        </span>
                        <span className="text-[10px] font-mono text-emerald-600/80 dark:text-emerald-400/80 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-bold">
                          Modul 03 • Legal & PRD
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs">
                        <span className="font-bold text-emerald-700 dark:text-emerald-300 font-mono text-[11px] uppercase tracking-wider block mb-0.5">
                          Fungsi:
                        </span>
                        <p className="text-slate-700 dark:text-slate-300">
                          Otomasi penyusunan dokumen teknis rekayasa, legal administratif, dan akuntabilitas anggaran.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          Kapabilitas:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-emerald-500/20 text-xs flex flex-col justify-between">
                            <div>
                              <div className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                                Technical Specification
                              </div>
                              <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                                Penyusunan Dokumen Kebutuhan Produk (Product Requirement Document / PRD) secara komprehensif.
                              </div>
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-emerald-500/20 text-xs flex flex-col justify-between">
                            <div>
                              <div className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                                Budget & Planning
                              </div>
                              <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                                Perumusan proposal proyek dan rencana anggaran biaya (RAB/BOS) dengan sasaran target SMART serta analisis mitigasi risiko.
                              </div>
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-emerald-500/20 text-xs flex flex-col justify-between">
                            <div>
                              <div className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                                Administrative Drafting
                              </div>
                              <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                                Format resmi Surat Keputusan (SK), surat dinas kedinasan, dan modul ikhtisar dokumen legal.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-1 flex justify-end">
                        <a
                          href="https://gemini.google.com/gem/1I8o6xug5WjRo-r738HLhXFTx_21bmQ_p?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold transition-all cursor-pointer"
                        >
                          <span>Buka Asisten AI Document di Gem #2</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}

                  {activeJacsAppProTab === 'learning' && (
                    <div className="space-y-3 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          AI Learning (Edukasi & Coding)
                        </span>
                        <span className="text-[10px] font-mono text-purple-600/80 dark:text-purple-400/80 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 font-bold">
                          Modul 04 • Edukasi & Dev
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-purple-500/5 border border-purple-500/20 text-xs">
                        <span className="font-bold text-purple-700 dark:text-purple-300 font-mono text-[11px] uppercase tracking-wider block mb-0.5">
                          Fungsi:
                        </span>
                        <p className="text-slate-700 dark:text-slate-300">
                          Mesin pendampingan kurikulum pendidikan adaptif dan bimbingan logika rekayasa perangkat lunak.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          Kapabilitas:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-purple-500/20 text-xs flex flex-col justify-between">
                            <div>
                              <div className="font-bold text-purple-600 dark:text-purple-400 mb-1">
                                Curriculum Engineering
                              </div>
                              <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                                Perancangan silabus pembelajaran berbasis Capaian Pembelajaran (CP) dan Alur Tujuan Pembelajaran (ATP) berprinsip diferensiasi materi.
                              </div>
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-purple-500/20 text-xs flex flex-col justify-between">
                            <div>
                              <div className="font-bold text-purple-600 dark:text-purple-400 mb-1">
                                Assessment Generation
                              </div>
                              <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                                Pembuatan bank soal kuis berdaya nalar tinggi (Higher Order Thinking Skills / HOTS).
                              </div>
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-purple-500/20 text-xs flex flex-col justify-between">
                            <div>
                              <div className="font-bold text-purple-600 dark:text-purple-400 mb-1">
                                Code Mentorship & Refactoring
                              </div>
                              <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                                Bimbingan logika pemrograman, pengoptimalan arsitektur skrip (seperti TypeScript), dan verifikasi kelulusan test case.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-1 flex justify-end">
                        <a
                          href="https://gemini.google.com/gem/1I8o6xug5WjRo-r738HLhXFTx_21bmQ_p?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs font-semibold transition-all cursor-pointer"
                        >
                          <span>Buka Asisten AI Learning di Gem #2</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. Fitur Workspace & Infrastruktur Pengembang */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    <Boxes className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    2. Fitur Workspace & Infrastruktur Pengembang
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {/* Fitur 1: Pustaka Template Terpadu */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c0f14] border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                        <FileCode className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          Pustaka Template Terpadu (One-Click Templates)
                        </h4>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          Pustaka akselerasi kerja instan untuk proposal teknis, modul ajar, materi kampanye, serta arsitektur antarmuka digital.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Fitur 2: Manajemen Proyek & Aset Kerja */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c0f14] border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                        <FolderGit2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          Manajemen Proyek & Aset Kerja
                        </h4>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          Dasbor pengelolaan repositori kerja multi-proyek (Project Workspace), penyimpanan aset favorit, riwayat eksekusi komputasi, dan pengaturan preferensi sistem.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Fitur 3: Integrasi & Ekosistem Terbuka */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c0f14] border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                        <Workflow className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          Integrasi & Ekosistem Terbuka (Marketplace)
                        </h4>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          Penyedia add-on fungsionalitas dan komponen modular pihak ketiga untuk perluasan kemampuan platform.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Fitur 4: Metrik Efisiensi & Audit Performa */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c0f14] border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 shrink-0">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          Metrik Efisiensi & Audit Performa
                        </h4>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          Analitik komputasi cerdas berbasis periode (harian, mingguan, bulanan, tahunan) yang memantau volume pekerjaan terselesaikan serta audit estimasi penghematan jam kerja tim.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Fitur 5: Aksesibilitas Sistem */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c0f14] border border-cyan-500/20 hover:border-cyan-500/40 transition-colors md:col-span-2">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                        <Command className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>Aksesibilitas Sistem</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                            ⌘K Shortcut Ready
                          </span>
                        </h4>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          Pencarian cepat berbasis pintasan (Command Shortcut ⌘K), switch tema visual, notifikasi sistem terpusat, dan integrasi modul eksternal terarah.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Live Bridge & Telemetri Real-Time */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-purple-950/40 border border-cyan-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display flex items-center gap-1.5">
                        <span>Direct Bridge ke SEKOLAHKITA V2 & Google Gems Core</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/50">
                          LIVE BRIDGE ACTIVE
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Sinkronisasi dua arah otomatis dengan 11 Role RBAC & 22 Modul Operasional Sekolah
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-[11px] text-cyan-400 font-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>0.18ms Pipeline</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-mono">
                  <div className="p-2 rounded bg-black/40 border border-cyan-500/20 text-slate-300">
                    <div className="text-cyan-400 font-bold">Sinkronisasi Bank Soal</div>
                    <div className="text-[9.5px] text-slate-400">Direct CBT Push & HOTS</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-cyan-500/20 text-slate-300">
                    <div className="text-cyan-400 font-bold">Modul Ajar KBM</div>
                    <div className="text-[9.5px] text-slate-400">Portal Guru & CP/ATP</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-cyan-500/20 text-slate-300">
                    <div className="text-cyan-400 font-bold">RAB BOSP Auto-Sync</div>
                    <div className="text-[9.5px] text-slate-400">Buku Kas BKU SMART</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-cyan-500/20 text-slate-300">
                    <div className="text-cyan-400 font-bold">WA Broadcast Responding</div>
                    <div className="text-[9.5px] text-slate-400">Auto-Dispatch Naskah Siar</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bagian Khusus: JacS DepoHub PRO — Solusi Telemetri, Kasir POS & Manajemen Distribusi (v2.6.0) */}
          {app.id === 'depohub' && (
            <div className="space-y-4">
              {/* 1. Ringkasan Aplikasi & Header Arsitektur v2.6.0 */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/30 via-slate-900/60 to-amber-950/30 border border-sky-500/30 shadow-xs space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 text-sky-400 flex items-center justify-center font-bold text-xs font-mono">
                      v2.6.0
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display flex items-center gap-2">
                        <span>JacS DepoHub PRO — Solusi Telemetri & Distribusi (v2.6.0)</span>
                      </h4>
                      <p className="text-[11px] text-sky-300 font-mono">
                        Solusi Telemetri, Kasir POS & Manajemen Distribusi Air Mineral / Logistik Depo
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30 font-bold">
                      LOGISTIK & WMS
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      AIR MINERAL & FMCG
                    </span>
                  </div>
                </div>
                <div>
                  <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Ringkasan Aplikasi
                  </h5>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    JacS DepoHub PRO adalah platform ERP dan manajemen rantai pasok depo terintegrasi yang dirancang khusus untuk distributor air minum kemasan/galon dan logistik FMCG. Sistem ini mengintegrasikan seluruh alur operasional depo secara real-time—mulai dari penerimaan stok pabrik, sirkulasi fisik tabung galon, pemantauan armada, transaksi kasir POS, hingga penagihan piutang toko mitra dan rekonsiliasi tutup buku harian.
                  </p>
                </div>
              </div>

              {/* 2. Telemetri & Pusat Kendali Depo (Command Center & Sirkulasi 3-Titik) */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display">
                        Telemetri & Pusat Kendali Depo (Command Center)
                      </h4>
                      <p className="text-[10.5px] text-slate-400">
                        Monitoring kapasitas gudang galon 19L & kemasan dus FMCG secara visual
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    RADAR AKTIF
                  </span>
                </div>

                {/* E-Warning Marquee Banner */}
                <div className="p-2 sm:p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between gap-2 overflow-hidden">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-extrabold text-[9.5px] font-mono shrink-0">
                      E-WARNING
                    </span>
                    <p className="text-[11px] truncate font-mono text-amber-300">
                      Buffer Stock Alert: Galon 19L Merk Utama mendekati batas aman (Buffer Stock: 150 tabung) • Quick PO ke Pabrik Siap
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold shrink-0 hidden sm:inline">
                    PO Cepat Pabrik →
                  </span>
                </div>

                {/* 3 Titik Sirkulasi Tabung Galon Real-Time */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Pelacakan Sirkulasi 3-Titik Fisik Tabung Galon:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
                      <div className="text-[10px] font-mono text-cyan-400 font-bold">1. GALON TERISI DI DEPO</div>
                      <div className="text-sm font-extrabold text-white font-mono mt-0.5">1,420 Tabung</div>
                      <div className="text-[10.5px] text-slate-400 mt-0.5">Stok Siap Antar Armada</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20">
                      <div className="text-[10px] font-mono text-amber-400 font-bold">2. GALON KOSONG DEPO</div>
                      <div className="text-sm font-extrabold text-white font-mono mt-0.5">680 Tabung</div>
                      <div className="text-[10.5px] text-slate-400 mt-0.5">Staging Siap Kirim Pabrik</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-purple-500/5 border border-purple-500/20">
                      <div className="text-[10px] font-mono text-purple-400 font-bold">3. TERTANAH DI MITRA</div>
                      <div className="text-sm font-extrabold text-white font-mono mt-0.5">2,150 Tabung</div>
                      <div className="text-[10.5px] text-slate-400 mt-0.5">Beredar di 48 Toko Mitra</div>
                    </div>
                  </div>
                </div>

                {/* SLA & Defisit Guard */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-mono">
                  <div className="p-2 rounded bg-black/40 border border-slate-700/60">
                    <div className="text-slate-400 text-[10px]">Defisit Tabung:</div>
                    <div className="text-emerald-400 font-bold">0 Selisih (100% Cocok)</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-700/60">
                    <div className="text-slate-400 text-[10px]">Armada Pengiriman:</div>
                    <div className="text-sky-400 font-bold">4 Truk En-Route</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-700/60">
                    <div className="text-slate-400 text-[10px]">Sinkronisasi Kasir-Supir:</div>
                    <div className="text-cyan-400 font-bold">0.12s Instan</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-700/60">
                    <div className="text-slate-400 text-[10px]">Piutang Toko Mitra:</div>
                    <div className="text-amber-400 font-bold">92% Status Aman</div>
                  </div>
                </div>
              </div>

              {/* 3. Fitur Utama & Kegunaan Sistem (8 Modul Inti + Cloud Sync) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      <Boxes className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      Fitur Utama & Kegunaan Sistem (8 Modul Inti + Cloud Sync)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 font-bold">
                    Modul {activeDepoHubTab + 1} dari 9
                  </span>
                </div>

                {/* Grid Tabs Selector 9 Modul */}
                <div className="grid grid-cols-3 sm:grid-cols-9 gap-1 p-1 bg-slate-100 dark:bg-[#0c0f14] rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-mono">
                  {[
                    '1. Command',
                    '2. Kasir POS',
                    '3. Sirkulasi',
                    '4. Piutang',
                    '5. Peta GIS',
                    '6. Supir App',
                    '7. Armada',
                    '8. Tutup Buku',
                    '9. Cloud Sync',
                  ].map((modName, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveDepoHubTab(idx)}
                      className={`px-1.5 py-1.5 rounded-lg font-bold text-center transition-all truncate cursor-pointer ${
                        activeDepoHubTab === idx
                          ? 'bg-sky-500 text-slate-950 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-sky-400'
                      }`}
                      title={modName}
                    >
                      {modName}
                    </button>
                  ))}
                </div>

                {/* Display Modul Aktif Terpilih */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#0c0f14] border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                  {activeDepoHubTab === 0 && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5 font-display">
                          <Layout className="w-3.5 h-3.5 text-sky-400" />
                          1. Telemetri & Pusat Kendali Depo (Command Center)
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                          Command Center
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-sky-500/20 text-xs">
                          <div className="font-bold text-sky-400 mb-1">Monitoring Stok Real-Time</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Pantau kapasitas gudang secara visual untuk galon 19L (multi-brand) dan kemasan dus FMCG.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-sky-500/20 text-xs">
                          <div className="font-bold text-sky-400 mb-1">E-Warning Running Text</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Peringatan otomatis berformat marquee saat stok menipis mendekati buffer stock + quick PO ke pabrik.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-sky-500/20 text-xs">
                          <div className="font-bold text-sky-400 mb-1">Audit Aktivitas Terpadu</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Merekam seluruh pergerakan operasional, kasir, armada, dan pasokan pabrik dalam satu dasbor.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDepoHubTab === 1 && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 font-display">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                          2. POS Kasir Depo Ritel & Grosir (Point of Sale)
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                          Kasir & Pembayaran
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-cyan-500/20 text-xs">
                          <div className="font-bold text-cyan-400 mb-1">Format Kasir Horizontal Ringkas</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Grid kasir standar cepat: No, Barcode/SKU, Nama Barang, Qty, Harga Satuan, Subtotal.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-cyan-500/20 text-xs">
                          <div className="font-bold text-cyan-400 mb-1">Katalog Cepat Terpisah</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Drawer/modal pop-up katalog terpisah agar layar utama tetap fokus pada kecepatan transaksi kasir.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-cyan-500/20 text-xs">
                          <div className="font-bold text-cyan-400 mb-1">Multi-Pembayaran</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Cash (kalkulator kembalian otomatis), QRIS, Transfer Bank, dan Nota Bon/Tempo.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDepoHubTab === 2 && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 font-display">
                          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                          3. Pelacakan Sirkulasi & Defisit Tabung Galon
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                          Aset Tabung Galon
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-amber-500/20 text-xs">
                          <div className="font-bold text-amber-400 mb-1">Rekonsiliasi Aset Kemasan</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Kontrol perputaran 3 titik fisik: Galon Terisi di Depo, Galon Kosong Siap Kirim Pabrik, Galon Tertahan di Toko Mitra.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-amber-500/20 text-xs">
                          <div className="font-bold text-amber-400 mb-1">Pencegahan Kehilangan Tabung</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Hitung otomatis selisih galon kosong yang ditarik supir guna mencegah penyusutan aset tabung beredar.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDepoHubTab === 3 && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 font-display">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          4. Buku Piutang & Monitoring Tempo Mitra (B2B)
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                          Piutang & Tempo
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-emerald-500/20 text-xs">
                          <div className="font-bold text-emerald-400 mb-1">Klasifikasi Jatuh Tempo Otomatis</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Status Aman, Mendekati Jatuh Tempo (1–2 hari), dan Lewat Jatuh Tempo (prioritas penagihan & blokir order).
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-emerald-500/20 text-xs">
                          <div className="font-bold text-emerald-400 mb-1">Sinkronisasi Supir & Kasir</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Saldo piutang toko langsung terpotong saat supir menerima uang titipan di lapangan tanpa input ulang admin.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-emerald-500/20 text-xs">
                          <div className="font-bold text-emerald-400 mb-1">Pusat Broadcast WhatsApp</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Kirim nota dan reminder tagihan otomatis ke WhatsApp pemilik toko dalam satu klik.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDepoHubTab === 4 && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5 font-display">
                          <MapPin className="w-3.5 h-3.5 text-purple-400" />
                          5. Peta GIS & Radar Distribusi Toko
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
                          Radar Geospasial
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-purple-500/20 text-xs">
                          <div className="font-bold text-purple-400 mb-1">Pemetaan Radius Pengiriman</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Visualisasi geospasial sebaran toko mitra, pangkalan, dan titik pengantaran aktif.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-purple-500/20 text-xs">
                          <div className="font-bold text-purple-400 mb-1">Monitoring Tabung Tertahan per Titik</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Pantau akumulasi galon kosong tertahan langsung dari peta pelanggan untuk prioritas penarikan supir.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDepoHubTab === 5 && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5 font-display">
                          <Truck className="w-3.5 h-3.5 text-sky-400" />
                          6. Portal Lapangan Supir (Driver Mobile View)
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                          Driver View
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-sky-500/20 text-xs">
                          <div className="font-bold text-sky-400 mb-1">Manifest Pengantaran Digital</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Urutan drop harian terstruktur berdasarkan rute jalan armada yang telah dioptimalkan.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-sky-500/20 text-xs">
                          <div className="font-bold text-sky-400 mb-1">Bukti Serah Terima Digital (POD)</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Verifikasi barang turun, input fisik galon kosong kembali, upload foto, dan e-signature toko.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-sky-500/20 text-xs">
                          <div className="font-bold text-sky-400 mb-1">Jual Cepat (Spot Delivery)</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Transaksi langsung di jalan bagi toko non-jadwal menggunakan sisa muatan armada.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDepoHubTab === 6 && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 font-display">
                          <Boxes className="w-3.5 h-3.5 text-indigo-400" />
                          7. Manajemen Armada & Logistik Masuk (Inbound)
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                          Armada & Pabrik
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-indigo-500/20 text-xs">
                          <div className="font-bold text-indigo-400 mb-1">Status Truk Operasional</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Pantau unit (Sedang Antar / Standby di Depo / Servis) dan utilisasi persentase kapasitas muatan.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-indigo-500/20 text-xs">
                          <div className="font-bold text-indigo-400 mb-1">Bongkar Muat Pabrik</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Pencatatan pasokan truk besar prinsipal dan pertukaran tabung galon kosong depo.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDepoHubTab === 7 && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 font-display">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          8. Tutup Buku Harian & Rekonsiliasi Shift
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                          Rekonsiliasi Shift
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-amber-500/20 text-xs">
                          <div className="font-bold text-amber-400 mb-1">Rekap Kas Masuk</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Audit pencocokan omzet kasir depo dengan setoran tunai dari supir tanpa selisih kasir.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-amber-500/20 text-xs">
                          <div className="font-bold text-amber-400 mb-1">Audit Fisik Tabung Harian</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Rekonsiliasi stok awal, barang laku, galon kosong kembali, dan stok akhir gudang setiap pukul 17:00 WIB.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-amber-500/20 text-xs">
                          <div className="font-bold text-amber-400 mb-1">Kunci Transaksi</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Tutup buku permanen dan cetak rekap shift siap ekspor WhatsApp ke pemilik depo.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDepoHubTab === 8 && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 font-display">
                          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                          9. Integrasi Cloud Database (Google Apps Script / Sheets)
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                          Cloud Google Sheets
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs">
                        <span className="font-bold text-emerald-400 font-mono text-[11px] uppercase tracking-wider block mb-0.5">
                          Penyimpanan Serverless & Real-Time Sync:
                        </span>
                        <p className="text-slate-300">
                          Sinkronisasi dua arah via Web App URL untuk data transaksi, stok, piutang, dan logistik langsung terhubung ke Google Sheets tanpa biaya server database eksternal.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="p-2 rounded bg-black/40 border border-emerald-500/20 text-xs">
                          <div className="text-emerald-400 font-bold">Zero-Cloud Cost</div>
                          <div className="text-[10.5px] text-slate-400">Google Workspace Ready</div>
                        </div>
                        <div className="p-2 rounded bg-black/40 border border-emerald-500/20 text-xs">
                          <div className="text-emerald-400 font-bold">Ekspor Excel & CSV</div>
                          <div className="text-[10.5px] text-slate-400">Unduh Instan Kapan Saja</div>
                        </div>
                        <div className="p-2 rounded bg-black/40 border border-emerald-500/20 text-xs">
                          <div className="text-emerald-400 font-bold">Multi-Device Access</div>
                          <div className="text-[10.5px] text-slate-400">Sinkron HP, Tablet & PC</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 4. Nilai Tambah & Target Pengguna */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Nilai Tambah & Target Pengguna
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c0f14] border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          Distributor & Pemilik Depo
                        </h4>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          Mencegah kebocoran pendapatan dan defisit tabung galon yang beredar melalui rekonsiliasi otomatis 3 titik.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c0f14] border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                        <Receipt className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          Kasir & Admin Depo
                        </h4>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          Eliminasi nota kertas manual dan percepat tutup shift tanpa selisih kas kasir vs supir.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c0f14] border border-sky-500/20 hover:border-sky-500/40 transition-colors">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          Supir & Tim Logistik
                        </h4>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          Verifikasi serah terima digital tanpa risiko faktur hilang, tanda tangan basah, atau selisih galon kosong.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c0f14] border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          Manajemen & Operasional
                        </h4>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          Transparansi operasional penuh yang dapat dipantau real-time dari mana saja via cloud dashboard.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Live Cloud Deployment & Sync Status */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-sky-950/40 via-slate-900/60 to-amber-950/40 border border-sky-500/30 flex items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-sky-500/20 border border-sky-400/50 text-sky-400 flex items-center justify-center shrink-0">
                    <Database className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-white font-bold block text-[11px]">
                      Google Apps Script / Sheets Sync Pipeline
                    </span>
                    <span className="text-[10px] text-sky-300">
                      Auto-Sync 2-Arah: Transaksi POS • Mutasi Stok Galon • Piutang B2B • Logistik Armada
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px]">0.14s Latency</span>
                </div>
              </div>
            </div>
          )}

          {/* Bagian Khusus: MasterPro App — Enterprise Order & Cash Flow Management (v2.5) */}
          {app.id === 'master-pro' && (
            <div className="space-y-4">
              {/* 1. Ringkasan Aplikasi & Header Arsitektur v2.5 */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 via-slate-900/60 to-cyan-950/30 border border-emerald-500/30 shadow-xs space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center font-bold text-xs font-mono">
                      v2.5
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display flex items-center gap-2">
                        <span>MasterPro App — Enterprise Order & Cash Flow Management</span>
                      </h4>
                      <p className="text-[11px] text-emerald-300 font-mono">
                        Sistem Manajemen Pesanan, Piutang & Arus Kas Bisnis Terpadu • Dikembangkan oleh JacS Enterprise
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                      FINANSIAL & ORDER • v2.5
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      ENTERPRISE READY
                    </span>
                  </div>
                </div>
                <div>
                  <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Ringkasan Aplikasi
                  </h5>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    MasterPro App adalah platform manajemen operasional dan finansial terpadu yang dirancang oleh JacS Enterprise untuk bisnis skala berkembang hingga level enterprise. Sistem ini menjembatani pencatatan transaksi penjualan, pengawasan piutang berumur (aging piutang), konsolidasi nota faktur, serta audit likuiditas arus kas harian dalam satu konsol operasional berbasis visual neon glassmorphism berdaya pantau tinggi.
                  </p>
                </div>
              </div>

              {/* 2. Konsol Telemetri Finansial & KPI Likuiditas (Live KPI Strip) */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display">
                        Konsol Telemetri & KPI Finansial
                      </h4>
                      <p className="text-[10.5px] text-slate-400">
                        Monitoring omzet kotor, sisa piutang berjalan, dan dana siap tarik ke kas perusahaan
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIKUIDITAS TERJAGA (83.7%)
                  </span>
                </div>

                {/* 4 Metrik Krusial */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
                    <div className="text-[10px] text-cyan-400 font-bold">1. TOTAL OMZET</div>
                    <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                      Rp 148.5M
                    </div>
                    <div className="text-[10px] text-cyan-300/80 mt-0.5">284 Pesanan Aktif</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20">
                    <div className="text-[10px] text-amber-400 font-bold">2. SISA PIUTANG</div>
                    <div className="text-sm sm:text-base font-extrabold text-amber-300 mt-0.5">
                      Rp 24.2M
                    </div>
                    <div className="text-[10px] text-amber-300/80 mt-0.5">Aging &lt;14 Hari (Aman)</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                    <div className="text-[10px] text-emerald-400 font-bold">3. KAS SIAP TARIK</div>
                    <div className="text-sm sm:text-base font-extrabold text-emerald-400 mt-0.5">
                      Rp 124.3M
                    </div>
                    <div className="text-[10px] text-emerald-300/80 mt-0.5">Dana Cair di Rekening</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-purple-500/5 border border-purple-500/20">
                    <div className="text-[10px] text-purple-400 font-bold">4. VOLUME PESANAN</div>
                    <div className="text-sm sm:text-base font-extrabold text-purple-300 mt-0.5">
                      284 Invoice
                    </div>
                    <div className="text-[10px] text-purple-300/80 mt-0.5">92% Lunas / DP Lancar</div>
                  </div>
                </div>

                {/* Banner Aksi Cepat Likuiditas */}
                <div className="p-2 sm:p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-extrabold text-[9.5px] font-mono shrink-0">
                      STATUS
                    </span>
                    <span className="text-[11px] font-mono text-emerald-300 truncate">
                      OMZET AKTIF • AGING PIUTANG MONITORED • CASHOUT READY
                    </span>
                  </div>
                  <span className="text-[10.5px] font-mono font-bold text-cyan-400 shrink-0">
                    Tarik Dana Siap Eksekusi →
                  </span>
                </div>
              </div>

              {/* 3. Tujuan & Nilai Strategis Sistem (4 Pilar) */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Target className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Tujuan & Nilai Strategis Sistem
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c0f14] border border-emerald-500/20 hover:border-emerald-500/40 transition-colors space-y-1">
                    <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      1. Eliminasi Piutang Macet
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      Memantau umur tagihan secara otomatis, memisahkan invoice lancar dari yang jatuh tempo (overdue), serta mempercepat tindak lanjut penagihan.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c0f14] border border-cyan-500/20 hover:border-cyan-500/40 transition-colors space-y-1">
                    <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      2. Rekonsiliasi Kas Tanpa Selisih
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      Mengontrol secara riil total omzet kotor terhadap dana cair yang benar-benar siap ditarik ke rekening kas perusahaan.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c0f14] border border-teal-500/20 hover:border-teal-500/40 transition-colors space-y-1">
                    <div className="font-bold text-teal-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      3. Efisiensi Transaksi B2B & Ritel
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      Memfasilitasi fleksibilitas pembayaran bertahap (DP/sebagian), pembayaran mandiri per invoice, hingga konsolidasi transaksi melalui mekanisme Gabung Nota.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c0f14] border border-purple-500/20 hover:border-purple-500/40 transition-colors space-y-1">
                    <div className="font-bold text-purple-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      4. Keamanan & Integritas Data
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      Dilengkapi audit log operasional otomatis, konsol otorisasi pengembang bertingkat, serta Mode Pratinjau (Hold / Read-Only Mode) untuk penguncian data saat pemeliharaan.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Modul & Fitur Utama (Tab Interaktif di Modal Detail) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Boxes className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      Modul & Fitur Utama (7 Modul Terpadu)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                    Modul {activeMasterProTab + 1} dari 7
                  </span>
                </div>

                {/* Tabs Selector 7 Modul */}
                <div className="grid grid-cols-2 sm:grid-cols-7 gap-1 p-1 bg-slate-100 dark:bg-[#0c0f14] rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-mono">
                  {[
                    '1. Telemetri KPI',
                    '2. Order Lifecycle',
                    '3. Aging & WA',
                    '4. Gabung Nota',
                    '5. Arsip ⌘K',
                    '6. Kas & Cashout',
                    '7. Audit & Dev',
                  ].map((tabName, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMasterProTab(idx)}
                      className={`px-1.5 py-1.5 rounded-lg font-bold text-center transition-all truncate cursor-pointer ${
                        activeMasterProTab === idx
                          ? 'bg-emerald-500 text-slate-950 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-emerald-400'
                      }`}
                      title={tabName}
                    >
                      {tabName}
                    </button>
                  ))}
                </div>

                {/* Tab Content Display */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#0c0f14] border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                  {activeMasterProTab === 0 && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 font-display">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          1. Konsol Telemetri & KPI Finansial
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                          Financial Metrics
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-emerald-500/20 text-xs">
                          <div className="font-bold text-emerald-400 mb-1">4 Metrik Krusial</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Total Omzet, Sisa Piutang Berjalan, Kas Siap Tarik, dan Volume Pesanan Aktif terpantau secara real-time.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-emerald-500/20 text-xs">
                          <div className="font-bold text-emerald-400 mb-1">Rasio Penarikan Kas & Tren</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Grafik rasio penarikan kas dan tren finansial komparatif berbasis periode (Harian, Mingguan, Bulanan, Tahunan).
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMasterProTab === 1 && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 font-display">
                          <Receipt className="w-3.5 h-3.5 text-cyan-400" />
                          2. Formulir Cepat & Manajemen Pesanan (Order Lifecycle)
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                          Order Engine
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-cyan-500/20 text-xs">
                          <div className="font-bold text-cyan-400 mb-1">Input Pesanan Kilat</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Formulir efisien untuk penerbitan faktur dan invoice resmi secara instan tanpa birokrasi manual.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-cyan-500/20 text-xs">
                          <div className="font-bold text-cyan-400 mb-1">Status Transaksi Dinamis</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Pelacakan 4 status utama: Menunggu Pembayaran, DP/Sebagian, Lunas, dan Jatuh Tempo secara otomatis.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMasterProTab === 2 && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 font-display">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          3. Sistem Aging Piutang & Integrasi WhatsApp
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                          Aging & Auto-Reminder
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-amber-500/20 text-xs">
                          <div className="font-bold text-amber-400 mb-1">Pengelompokan Umur Tagihan</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Klasifikasi tagihan tertahan dan jatuh tempo secara terstruktur guna mencegah akumulasi kredit macet.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-amber-500/20 text-xs">
                          <div className="font-bold text-amber-400 mb-1">Broadcast WhatsApp Satu Klik</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Kirim pengingat tagihan dan faktur digital langsung ke WhatsApp pemilik toko/pelanggan tanpa input ulang.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMasterProTab === 3 && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-teal-400 flex items-center gap-1.5 font-display">
                          <Layers className="w-3.5 h-3.5 text-teal-400" />
                          4. Fitur Gabung Nota (Konsolidasi Invoice)
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold">
                          Konsolidasi Invoice
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-teal-500/20 text-xs">
                        <div className="font-bold text-teal-400 mb-1">Konsolidasi Faktur Terpadu</div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                          Menggabungkan beberapa faktur terpisah dari pelanggan yang sama ke dalam satu dokumen tagihan terpadu. Mempermudah pembayaran sekaligus merekonsiliasi seluruh transaksi berjalan tanpa duplikasi nota.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeMasterProTab === 4 && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5 font-display">
                          <Command className="w-3.5 h-3.5 text-purple-400" />
                          5. Database & Riwayat Transaksi Komprehensif
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
                          Database ⌘K
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-purple-500/20 text-xs">
                          <div className="font-bold text-purple-400 mb-1">Arsip Invoice Digital Lengkap</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Menyimpan rincian item, nomor resi pengiriman, riwayat pembayaran parsial, serta data kontak cabang pelanggan.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-purple-500/20 text-xs">
                          <div className="font-bold text-purple-400 mb-1">Pencarian Cepat ⌘K</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Shortcut Command ⌘K untuk menemukan transaksi, nomor faktur, atau nama pelanggan dalam hitungan milidetik.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMasterProTab === 5 && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 font-display">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                          6. Buku Rekapitulasi Kas & Pencairan Dana (Cashout Control)
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                          Cashout Control
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-emerald-500/20 text-xs">
                          <div className="font-bold text-emerald-400 mb-1">Pengawasan Dana Masuk</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Pencatatan akurat dana pembayaran yang telah terverifikasi masuk ke rekening operasional.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-emerald-500/20 text-xs">
                          <div className="font-bold text-emerald-400 mb-1">Aksi Pencairan "Tarik Dana"</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Tombol eksekusi transfer dana cair ke kas induk perusahaan dengan audit trail otomatis.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMasterProTab === 6 && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 font-display">
                          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                          7. Audit Log & Developer Control Console
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                          Audit & Security
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-indigo-500/20 text-xs">
                          <div className="font-bold text-indigo-400 mb-1">Pencatatan Audit Log Otomatis</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Seluruh mutasi status pesanan, pembayaran, dan pencairan kas terekam permanen anti-manipulasi.
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-indigo-500/20 text-xs">
                          <div className="font-bold text-indigo-400 mb-1">Mode Hold / Read-Only</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            Fitur penguncian data instan bagi pengembang saat audit periodik atau pemeliharaan sistem berlangsung.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 5. Target Pengguna & Penerapan */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Target Pengguna & Penerapan
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c0f14] border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                        <Store className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          Distributor & Grosir B2B
                        </h4>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          Perputaran pembayaran cepat, rekonsiliasi multi-faktur, dan pemantauan tempo tagihan mitra yang tertib.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c0f14] border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          Bisnis Jasa & Manufaktur
                        </h4>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          Pengelolaan DP proyek, pembayaran bertahap per milestone, dan konsolidasi nota kirim terpadu.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c0f14] border border-teal-500/20 hover:border-teal-500/40 transition-colors">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          Manajer & Pemilik Bisnis
                        </h4>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          Visibilitas 100% arus kas nyata secara real-time tanpa risiko kebocoran piutang atau salah pencatatan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Live Deployment & Direct Action */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-cyan-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/50 text-emerald-400 flex items-center justify-center shrink-0">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white font-bold block text-xs">
                      MasterPro App Console • Production Cloud Ready
                    </span>
                    <span className="text-[10.5px] text-emerald-300">
                      Single Sign-On • Auto Aging Piutang • Cashout Control Active
                    </span>
                  </div>
                </div>
                <a
                  href={app.externalUrl || app.appUrl || '#'}
                  onClick={(e) => {
                    if (!app.externalUrl && !app.appUrl) {
                      e.preventDefault();
                    }
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-sans text-xs transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5 self-stretch sm:self-auto justify-center cursor-pointer"
                >
                  <span>Buka Konsol MasterPro App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
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
        </>
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
