import React, { useState } from 'react';
import {
  ArrowRight,
  Search,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles,
  Palette,
  GraduationCap,
  Building,
  Store,
  Users,
  Briefcase,
  Truck,
  ExternalLink,
  Cpu,
  Receipt,
} from 'lucide-react';
import { WEB_APPLICATIONS, apps } from '../data/mockData';
import { WebApp } from '../types';
import { AppCardThumbnail } from '../components/AppCardThumbnail';

interface ApplicationsViewProps {
  onSelectApp: (app: WebApp) => void;
}

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({ onSelectApp }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'Semua',
    'ERP Pendidikan',
    'Retail & POS',
    'Manajemen Kos',
    'Logistik & WMS',
    'Arsitektur Sistem & AI',
    'Finansial & Operasional Bisnis',
    'Sistem Terintegrasi',
    'Enterprise AI Suite',
  ];

  const getAppBadgeConfig = (id: string) => {
    switch (id) {
      case 'studio-suite':
        return {
          Icon: Palette,
          badgeClass:
            'bg-blue-50 text-blue-600 border border-slate-200 dark:bg-blue-950/40 dark:text-cyan-400 dark:border-blue-500/30',
        };
      case 'sekolahkita':
        return {
          Icon: GraduationCap,
          badgeClass:
            'bg-emerald-50 text-emerald-600 border border-slate-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-500/30',
        };
      case 'koskita':
        return {
          Icon: Building,
          badgeClass:
            'bg-amber-50 text-amber-600 border border-slate-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-500/30',
        };
      case 'retail-os':
      case 'retailos':
        return {
          Icon: Store,
          badgeClass:
            'bg-indigo-50 text-indigo-600 border border-slate-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-500/30',
        };
      case 'master-pro':
      case 'masterpro':
        return {
          Icon: Receipt,
          badgeClass:
            'bg-emerald-50 text-emerald-600 border border-slate-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-500/40',
        };
      case 'enterprise-suite':
        return {
          Icon: Briefcase,
          badgeClass:
            'bg-sky-50 text-sky-600 border border-slate-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-500/30',
        };
      case 'depohub':
        return {
          Icon: Truck,
          badgeClass:
            'bg-sky-50 text-sky-600 border border-slate-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-500/40',
        };
      case 'jacs-app-pro':
        return {
          Icon: Cpu,
          badgeClass:
            'bg-cyan-50 text-cyan-600 border border-slate-200 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-500/40',
        };
      default:
        return {
          Icon: Zap,
          badgeClass:
            'bg-orange-50 text-orange-600 border border-slate-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-500/30',
        };
    }
  };

  const filteredApps = WEB_APPLICATIONS.filter((app) => {
    const matchesCategory =
      selectedCategory === 'Semua' ||
      app.category.toLowerCase() === selectedCategory.toLowerCase() ||
      app.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.summary && app.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
      app.features.some(
        (f) =>
          f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.module.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-slate-200 dark:border-blue-500/30 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-xs">
          <Layers className="w-3.5 h-3.5" strokeWidth={1.8} />
          <span>Application Showcase</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
          App & Solusi JacS Enterprise
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {apps.length} solusi terintegrasi untuk pendidikan, retail, logistik, properti, dan arsitektur AI.
        </p>
      </div>

      {/* Filter and Search Bar with Clean Theme Styling */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 rounded-app-lg bg-white dark:bg-[#111419]/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-app-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 border border-slate-200/90 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.8} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari fitur aplikasi..."
            className="w-full pl-9 pr-3 py-1.5 rounded-app-md bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Applications Grid with Solid Neon Cards & Modern Icon Badges */}
      {/* Applications Grid: Compact & Optimized */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredApps.map((app) => {
          const { Icon: AppIcon, badgeClass } = getAppBadgeConfig(app.id);
          return (
            <div
              key={app.id}
              onClick={() => onSelectApp(app)}
              className="p-3.5 sm:p-4 rounded-xl cursor-pointer group jacs-solid-neon-card flex flex-col justify-between h-full min-h-[290px] shadow-xs hover:shadow-lg transition-all duration-300"
            >
              <div className="flex-1 flex flex-col min-w-0">
                {/* App Photographic Thumbnail Banner with Fallback & Clean Top Area */}
                <AppCardThumbnail
                  appId={app.id}
                  src={app.imageUrl}
                  alt={app.name}
                  Icon={AppIcon}
                  heightClass="h-28 sm:h-32 max-h-[128px]"
                  marginClass="mb-2"
                />

                {/* Category label inside card body above app name */}
                <span className="text-[10px] sm:text-[11px] font-mono font-medium text-cyan-600 dark:text-cyan-400 tracking-wider uppercase mb-0.5 block truncate">
                  {app.category}
                </span>

                {/* Header Title with Modern App Icon Badge */}
                <div className="flex items-center gap-2 mb-1.5 min-w-0">
                  <div className={`p-1.5 rounded-lg shrink-0 shadow-xs ${badgeClass}`}>
                    <AppIcon className="w-3.5 h-3.5" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors font-display truncate">
                    {app.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal line-clamp-1 truncate">
                  {app.tagline}
                </p>

                {/* Key Features preview */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-white/5 space-y-1 flex-1">
                  {app.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-3 h-3 text-cyan-600 dark:text-cyan-400 flex-shrink-0" strokeWidth={1.8} />
                      <span className="truncate text-[11px]">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">[{f.module}] </span>
                        {f.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0">
                <div className="jacs-neon-cta-btn flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs">
                  <span>Pelajari Solusi</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={1.8} />
                </div>
                {app.liveUrl && app.liveUrl !== '#' && (
                  <a
                    href={app.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all flex items-center gap-1 shadow-xs shadow-cyan-500/20 active:scale-95 shrink-0 cursor-pointer"
                    title={`Buka ${app.name} langsung di tab baru`}
                  >
                    <span>Buka ↗</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Integration Framework Architecture Card */}
      <div className="rounded-app-xl bg-white dark:bg-[#111419]/90 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 mt-8 relative overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              <Sparkles className="w-4 h-4" strokeWidth={1.8} />
              <span>Arsitektur JacS Mesh Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
              Satu Kredensial untuk {apps.length} Aplikasi Tanpa Hambatan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Semua aplikasi dalam ekosistem JacS terhubung melalui protokol Single Sign-On (SSO) berbasis enkripsi
              standar perbankan. Sinkronisasi data antara Point-of-Sale (RetailOS), Gudang (DepoHub), dan Akuntansi
              (MasterPro) berlangsung secara real-time tanpa perlu entri ulang data manual.
            </p>
            <div className="pt-2 flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={1.8} />
                TLS 1.3 & AES-256
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" strokeWidth={1.8} />
                Event-Driven Architecture
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" strokeWidth={1.8} />
                REST & GraphQL APIs
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="p-6 rounded-app-xl bg-slate-50 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-purple-500/30 text-center space-y-3 shadow-xs">
              <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white">
                <Layers className="w-7 h-7" strokeWidth={2} />
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                JacS Enterprise Suite
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Pusat orkestrasi data induk untuk seluruh unit usaha digital.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
