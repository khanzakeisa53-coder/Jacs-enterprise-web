import React, { useState, useEffect, useRef } from 'react';
import { Search, X, AppWindow, FileText, ArrowRight, CornerDownLeft, Sparkles, ExternalLink, Cpu } from 'lucide-react';
import { WEB_APPLICATIONS, INTELLIGENCE_ARTICLES, NAVIGATION_ITEMS, AI_GENERATOR_REFERENCES } from '../data/mockData';
import { WebApp, IntelligenceArticle } from '../types';
import { JacSLogo } from './JacSLogo';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectApp: (app: WebApp) => void;
  onSelectArticle: (article: IntelligenceArticle) => void;
  onNavigate: (sectionId: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectApp,
  onSelectArticle,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // 1. Matched Specialized Modules & Templates across all apps (AI Content, AI Design, PRD, BOS/RAB, Silabus, HOTS, etc.)
  const matchedModulesAndTemplates: {
    app: WebApp;
    module: string;
    title: string;
    description: string;
  }[] = [];

  if (normalizedQuery) {
    WEB_APPLICATIONS.forEach((app) => {
      app.features.forEach((f) => {
        if (
          f.title.toLowerCase().includes(normalizedQuery) ||
          f.module.toLowerCase().includes(normalizedQuery) ||
          f.description.toLowerCase().includes(normalizedQuery)
        ) {
          matchedModulesAndTemplates.push({
            app,
            module: f.module,
            title: f.title,
            description: f.description,
          });
        }
      });
    });
  }

  // 2. Comprehensive Apps filter including modules, specs, suitableFor, advantages
  const filteredApps = WEB_APPLICATIONS.filter(
    (app) =>
      app.name.toLowerCase().includes(normalizedQuery) ||
      app.category.toLowerCase().includes(normalizedQuery) ||
      app.description.toLowerCase().includes(normalizedQuery) ||
      (app.summary && app.summary.toLowerCase().includes(normalizedQuery)) ||
      (app.tagline && app.tagline.toLowerCase().includes(normalizedQuery)) ||
      (app.version && app.version.toLowerCase().includes(normalizedQuery)) ||
      (app.status && app.status.toLowerCase().includes(normalizedQuery)) ||
      (app.suitableFor && app.suitableFor.some((s) => s.toLowerCase().includes(normalizedQuery))) ||
      (app.advantages && app.advantages.some((a) => a.toLowerCase().includes(normalizedQuery))) ||
      (app.technicalSpecifications && (
        app.technicalSpecifications.architecture.toLowerCase().includes(normalizedQuery) ||
        app.technicalSpecifications.frontend.some((fe) => fe.toLowerCase().includes(normalizedQuery)) ||
        app.technicalSpecifications.automationAndIntegrations.some((ai) => ai.toLowerCase().includes(normalizedQuery)) ||
        app.technicalSpecifications.keyMetrics.some((km) => km.toLowerCase().includes(normalizedQuery))
      )) ||
      app.features.some(
        (f) =>
          f.title.toLowerCase().includes(normalizedQuery) ||
          f.module.toLowerCase().includes(normalizedQuery) ||
          f.description.toLowerCase().includes(normalizedQuery)
      )
  );

  const filteredArticles = INTELLIGENCE_ARTICLES.filter(
    (art) =>
      art.title.toLowerCase().includes(normalizedQuery) ||
      art.category.toLowerCase().includes(normalizedQuery) ||
      (art.excerpt && art.excerpt.toLowerCase().includes(normalizedQuery)) ||
      (art.summary && art.summary.toLowerCase().includes(normalizedQuery)) ||
      art.tags.some((t) => t.toLowerCase().includes(normalizedQuery)) ||
      (art.author?.name && art.author.name.toLowerCase().includes(normalizedQuery))
  );

  const filteredNav = NAVIGATION_ITEMS.filter(
    (nav) =>
      nav.label.toLowerCase().includes(normalizedQuery) ||
      nav.labelId.toLowerCase().includes(normalizedQuery)
  );

  const filteredGenerators = AI_GENERATOR_REFERENCES.filter(
    (gen) =>
      gen.name.toLowerCase().includes(normalizedQuery) ||
      gen.provider.toLowerCase().includes(normalizedQuery) ||
      gen.category.toLowerCase().includes(normalizedQuery) ||
      gen.description.toLowerCase().includes(normalizedQuery) ||
      gen.tags.some((t) => t.toLowerCase().includes(normalizedQuery))
  );

  const hasResults =
    filteredApps.length > 0 ||
    filteredArticles.length > 0 ||
    filteredNav.length > 0 ||
    filteredGenerators.length > 0 ||
    matchedModulesAndTemplates.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-app-surface border border-app-border rounded-app-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-app-border bg-app-elevated/40 gap-2.5">
          {/* Mini logo JacS di sudut kiri input pencarian */}
          <div className="flex items-center gap-1.5 flex-shrink-0 pr-2.5 border-r border-slate-200 dark:border-slate-800">
            <JacSLogo size="xs" withGlow={true} />
            <span className="hidden sm:inline font-extrabold text-xs text-slate-950 dark:text-white font-display tracking-tight">
              JacS
            </span>
          </div>
          <Search className="w-4.5 h-4.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.stopPropagation();
                onClose();
              }
            }}
            placeholder="Cari aplikasi, berita AI, wawasan teknologi, atau navigasi..."
            className="w-full bg-transparent text-slate-950 dark:text-white text-sm sm:text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded text-app-text-muted hover:text-app-text-primary hover:bg-app-elevated transition-colors cursor-pointer"
              title="Bersihkan input"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}

          {/* Living Neon Glow Capsule Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1 flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/25 border border-rose-400/80 hover:border-rose-300 text-rose-300 hover:text-white shadow-[0_0_12px_rgba(244,63,94,0.4)] hover:shadow-[0_0_20px_rgba(244,63,94,0.7)] text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 shrink-0 select-none"
            title="Tutup Pencarian (ESC)"
            aria-label="Tutup pencarian"
          >
            <X className="w-3.5 h-3.5" />
            <span>Tutup</span>
            <kbd className="hidden sm:inline-block text-[9px] font-mono opacity-80 bg-rose-950/40 px-1 py-0.2 rounded border border-rose-400/30">ESC</kbd>
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {!hasResults && query ? (
            <div className="py-12 text-center">
              <p className="text-sm text-app-text-secondary font-medium">
                Tidak ada hasil untuk "{query}"
              </p>
              <p className="text-xs text-app-text-muted mt-1">
                Coba cari dengan kata kunci lain seperti "JacS App PRO", "AI Content", "PRD", "Sekolah", atau "Retail".
              </p>
            </div>
          ) : null}

          {/* Matched Modules & Templates Category (Direct Module Match) */}
          {matchedModulesAndTemplates.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 mb-1.5 text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                <span>Modul & Template Spesialis ({matchedModulesAndTemplates.length})</span>
              </div>
              <div className="space-y-1">
                {matchedModulesAndTemplates.map((item, idx) => (
                  <button
                    key={`${item.app.id}-${idx}`}
                    onClick={() => {
                      onSelectApp(item.app);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-app-md hover:bg-app-elevated border border-transparent hover:border-orange-500/30 text-left transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-app-md bg-orange-500/10 text-orange-500 dark:text-orange-400 flex items-center justify-center font-bold text-xs flex-shrink-0 border border-orange-500/20">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-app-text-primary group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors truncate">
                            {item.title}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30 font-mono font-bold shrink-0">
                            {item.module}
                          </span>
                          <span className="text-[10px] text-slate-400 shrink-0 font-medium hidden sm:inline">
                            • {item.app.name}
                          </span>
                        </div>
                        <p className="text-xs text-app-text-muted truncate mt-0.5 max-w-md">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-app-text-muted group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AI Generators Hub Category */}
          {filteredGenerators.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 mb-1.5 text-[11px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Katalog AI Generator ({filteredGenerators.length})</span>
              </div>
              <div className="space-y-1">
                {filteredGenerators.map((gen) => (
                  <a
                    key={gen.id}
                    href={gen.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onClose()}
                    className="w-full flex items-center justify-between p-2.5 rounded-app-md hover:bg-app-elevated border border-transparent hover:border-cyan-500/30 text-left transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-app-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs flex-shrink-0 border border-cyan-500/20">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-app-text-primary group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                            {gen.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 font-mono">
                            {gen.category}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold ${
                            gen.accessType.includes('Gratis')
                              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                              : gen.accessType.includes('Freemium')
                              ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                              : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/30'
                          }`}>
                            {gen.accessType}
                          </span>
                        </div>
                        <p className="text-xs text-app-text-muted truncate mt-0.5 max-w-md">
                          {gen.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-cyan-600 dark:text-cyan-400 font-semibold group-hover:underline shrink-0">
                      <span>Buka</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Applications Category */}
          {filteredApps.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 mb-1.5 text-[11px] font-bold text-app-text-muted uppercase tracking-wider">
                <AppWindow className="w-3.5 h-3.5 text-purple-400" />
                <span>Aplikasi & Solusi ({filteredApps.length})</span>
              </div>
              <div className="space-y-1">
                {filteredApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      onSelectApp(app);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-app-md hover:bg-app-elevated border border-transparent hover:border-app-border text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-app-md flex items-center justify-center font-bold text-xs flex-shrink-0 border ${
                        app.id === 'jacs-app-pro'
                          ? 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                          : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      }`}>
                        {app.id === 'jacs-app-pro' ? <Cpu className="w-4 h-4" /> : app.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold text-app-text-primary transition-colors ${
                            app.id === 'jacs-app-pro' ? 'group-hover:text-orange-400' : 'group-hover:text-purple-400'
                          }`}>
                            {app.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-app-surface border border-app-border text-app-text-muted font-medium">
                            {app.category}
                          </span>
                          <span className="text-[9.5px] px-1.5 py-0.2 rounded font-mono text-slate-400 dark:text-slate-500 bg-app-surface border border-app-border">
                            {app.version}
                          </span>
                        </div>
                        <p className="text-xs text-app-text-muted truncate mt-0.5">
                          {app.summary || app.tagline}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-app-text-muted group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Intelligence & Articles Category */}
          {filteredArticles.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 mb-1.5 text-[11px] font-bold text-app-text-muted uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Berita AI & Analisis ({filteredArticles.length})</span>
              </div>
              <div className="space-y-1">
                {filteredArticles.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-app-md hover:bg-app-elevated border border-transparent hover:border-app-border text-left transition-colors group"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-blue-400">
                          {art.category}
                        </span>
                        <span className="text-[10px] text-app-text-muted">
                          • {art.date}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-app-text-primary group-hover:text-blue-400 transition-colors line-clamp-1 mt-0.5">
                        {art.title}
                      </p>
                    </div>
                    <CornerDownLeft className="w-3.5 h-3.5 text-app-text-muted group-hover:text-blue-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Shortcuts */}
          {filteredNav.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 mb-1.5 text-[11px] font-bold text-app-text-muted uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Navigasi Langsung</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {filteredNav.map((nav) => (
                  <button
                    key={nav.id}
                    onClick={() => {
                      onNavigate(nav.id);
                      onClose();
                    }}
                    className="flex items-center justify-between px-3 py-2 rounded-app-md bg-app-elevated/50 hover:bg-app-elevated border border-app-border text-xs font-medium text-app-text-secondary hover:text-app-text-primary transition-colors text-left"
                  >
                    <span>{nav.label}</span>
                    <span className="text-[10px] text-app-text-muted">
                      {nav.labelId}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts info & living neon close pill */}
        <div className="px-4 py-2.5 bg-app-elevated/60 border-t border-app-border flex items-center justify-between text-[11px] text-app-text-muted">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>JacS Global Intelligence Search</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-2.5 py-1 flex items-center gap-1.5 bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-400/60 hover:border-cyan-300 text-cyan-300 hover:text-white text-[11px] font-mono transition-all cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.3)] hover:shadow-[0_0_16px_rgba(6,182,212,0.6)] active:scale-95 select-none"
              title="Tutup modal pencarian (ESC)"
            >
              <span>ESC Tutup</span>
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
