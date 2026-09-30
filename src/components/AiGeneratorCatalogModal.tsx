import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Search,
  ExternalLink,
  Sparkles,
  Bot,
  Code2,
  Image as ImageIcon,
  Video,
  Wrench,
  Compass,
  ArrowRight,
  Flame,
  CheckCircle2,
  Clock,
  CreditCard,
  Gem,
} from 'lucide-react';
import { AI_GENERATOR_REFERENCES } from '../data/mockData';
import { AiGeneratorReference, AiAccessType } from '../types';
import { JacSLogo } from './JacSLogo';

interface AiGeneratorCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToIntelligence?: () => void;
}

export const AiGeneratorCatalogModal: React.FC<AiGeneratorCatalogModalProps> = ({
  isOpen,
  onClose,
  onNavigateToIntelligence,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedTier, setSelectedTier] = useState<string>('Semua');

  // Keyboard shortcut listener: Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const categories = useMemo(
    () => ['Semua', 'Google Gems', 'Multimodal', 'Text & Reasoning', 'Code & UI', 'Image & Art', 'Video & Motion', 'Studio & IDE'],
    []
  );

  const tierOptions = useMemo(
    () => [
      { id: 'Semua', label: 'Semua Lisensi' },
      { id: 'Gratis', label: 'Gratis / Free Tier & Gems' },
      { id: 'Freemium', label: 'Freemium' },
      { id: 'Trial', label: 'Trial / Berbayar' },
    ],
    []
  );

  const filteredItems = useMemo(() => {
    return AI_GENERATOR_REFERENCES.filter((item: AiGeneratorReference) => {
      const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchesTier =
        selectedTier === 'Semua' ||
        (selectedTier === 'Gratis' && (item.accessType.includes('Gratis') || item.accessType.includes('Akun Google'))) ||
        (selectedTier === 'Freemium' && item.accessType.includes('Freemium')) ||
        (selectedTier === 'Trial' && item.accessType.includes('Trial'));
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.accessType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesTier && matchesSearch;
    });
  }, [selectedCategory, selectedTier, searchQuery]);

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Google Gems':
        return <Gem className="w-3.5 h-3.5" />;
      case 'Multimodal':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'Text & Reasoning':
        return <Bot className="w-3.5 h-3.5" />;
      case 'Code & UI':
        return <Code2 className="w-3.5 h-3.5" />;
      case 'Image & Art':
        return <ImageIcon className="w-3.5 h-3.5" />;
      case 'Video & Motion':
        return <Video className="w-3.5 h-3.5" />;
      case 'Studio & IDE':
        return <Wrench className="w-3.5 h-3.5" />;
      default:
        return <Compass className="w-3.5 h-3.5" />;
    }
  };

  const getAccessTypeBadge = (accessType: AiAccessType | string) => {
    switch (accessType) {
      case 'Gratis / Akun Google':
        return {
          label: 'Gratis / Akun Google',
          shortLabel: 'Akun Google',
          badgeClass:
            'bg-cyan-50 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-500/40 dark:shadow-[0_0_10px_rgba(6,182,212,0.35)]',
          dotClass: 'bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.9)]',
          icon: CheckCircle2,
        };
      case 'Gratis / Free Tier':
        return {
          label: 'Gratis / Free Tier',
          shortLabel: 'Gratis',
          badgeClass:
            'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-500/40 dark:shadow-[0_0_10px_rgba(16,185,129,0.35)]',
          dotClass: 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.9)]',
          icon: CheckCircle2,
        };
      case 'Freemium / Kuota Harian':
      case 'Freemium / Kuota Terbatas':
        return {
          label: 'Freemium / Kuota Harian',
          shortLabel: 'Freemium',
          badgeClass:
            'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-500/40 dark:shadow-[0_0_10px_rgba(245,158,11,0.3)]',
          dotClass: 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.9)]',
          icon: Clock,
        };
      case 'Trial / Berbayar':
      default:
        return {
          label: 'Trial / Berbayar',
          shortLabel: 'Berbayar',
          badgeClass:
            'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-500/40 dark:shadow-[0_0_10px_rgba(244,63,94,0.3)]',
          dotClass: 'bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.9)]',
          icon: CreditCard,
        };
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/75 dark:bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-catalog-title"
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#111419] border border-slate-200 dark:border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh] animate-in zoom-in-95 duration-200 cursor-default text-slate-900 dark:text-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.25)] dark:shadow-[0_0_35px_rgba(6,182,212,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with glowing cyan accent */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-50 via-white to-cyan-50/30 dark:from-[#151922] dark:via-[#111419] dark:to-[#131b26] border-b border-slate-200 dark:border-cyan-500/20 relative">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2.5">
              {/* Sudut Kiri Atas Modal: Blok Identitas Developer Resmi JacS Enterprise */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <JacSLogo size="sm" withGlow={true} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-extrabold text-slate-950 dark:text-white tracking-tight text-sm leading-none font-display">
                    JacS Enterprise
                  </span>
                  <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-mono uppercase tracking-wider font-semibold mt-0.5 truncate">
                    JacS Enterprise AI Ecosystem
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300 font-mono text-[11px] font-bold uppercase tracking-wider shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Hub Akses Cepat</span>
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-medium">
                  {AI_GENERATOR_REFERENCES.length} Tools Terkurasi
                </span>
              </div>
              <h2
                id="ai-catalog-title"
                className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight font-display flex items-center gap-2"
              >
                <span>Katalog AI Generator</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Akses langsung ke ekosistem model frontier, mesin penalaran, pembuat kode, dan studio multimedia generatif terkemuka dunia dengan indikator lisensi transparan.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all flex items-center justify-center shrink-0 cursor-pointer active:scale-95"
              aria-label="Tutup katalog"
              title="Tutup (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar & Categories */}
          <div className="mt-4 pt-3 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari AI Generator (Gemini, ChatGPT, v0, Midjourney, Gratis, Freemium...)"
                  className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-cyan-500/30 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Pricing Tier Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none shrink-0">
                {tierOptions.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTier(t.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                      selectedTier === t.id
                        ? 'bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold border-transparent shadow-xs'
                        : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {t.id === 'Gratis' && <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />}
                    {t.id === 'Freemium' && <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />}
                    {t.id === 'Trial' && <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />}
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Categories Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs shadow-cyan-500/30'
                      : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-cyan-300 border border-slate-200 dark:border-slate-800 hover:border-cyan-400/40'
                  }`}
                >
                  {getCategoryIcon(cat)}
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Micro-Card Grid Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh] space-y-4">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Bot className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Tidak ada AI Generator yang cocok dengan filter yang dipilih
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua');
                  setSelectedTier('Semua');
                }}
                className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
              >
                Reset pencarian dan kategori
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {filteredItems.map((item) => {
                const tier = getAccessTypeBadge(item.accessType);
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-4 rounded-xl bg-white dark:bg-[#151922] border border-slate-200/90 dark:border-cyan-500/25 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-200 shadow-xs hover:shadow-[0_0_22px_rgba(6,182,212,0.18)] dark:hover:shadow-[0_0_26px_rgba(6,182,212,0.25)] flex flex-col justify-between cursor-pointer hover:-translate-y-0.5"
                  >
                    <div>
                      {/* Top Row: Provider & Colored Access Badge & Category & Featured Badge */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                          <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-cyan-400 uppercase tracking-wider truncate">
                            {item.provider}
                          </span>

                          {/* Colored Access Badge right next to provider name */}
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border transition-all ${tier.badgeClass}`}
                            title={`Lisensi Akses: ${item.accessType}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${tier.dotClass}`} />
                            <span>{item.accessType}</span>
                          </span>

                          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                            {item.category}
                          </span>
                        </div>

                        {item.badge && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-bold shrink-0 flex items-center gap-1">
                            {item.isFeatured && <Flame className="w-2.5 h-2.5 text-orange-500 fill-orange-500" />}
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Tool Name & External Link Indicator */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors font-display flex items-center gap-1.5">
                          <span>{item.name}</span>
                        </h3>
                        <div className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 group-hover:bg-cyan-500/20 text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-all border border-slate-200/60 dark:border-slate-700/60 group-hover:border-cyan-400/50">
                          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>

                      {/* Function Description */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Tags & Link Status */}
                    <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1">
                        {item.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 group-hover:underline flex items-center gap-1 whitespace-nowrap shrink-0">
                        <span>{item.category === 'Google Gems' || item.url.includes('/gem/') ? 'Buka Gem' : 'Buka Resmi'}</span>
                        <span>↗</span>
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer with Legend */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#0E1116] border-t border-slate-200 dark:border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3 text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Status Akses:</span>
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
              <span>Gratis / Akun Google</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
              <span>Gratis / Free Tier</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
              <span>Freemium / Kuota Harian</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
              <span>Trial / Berbayar</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {onNavigateToIntelligence && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToIntelligence();
                }}
                className="px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition-colors font-semibold flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <span>Portal Berita & Riset AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold transition-colors cursor-pointer text-xs"
            >
              Tutup (Esc)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
