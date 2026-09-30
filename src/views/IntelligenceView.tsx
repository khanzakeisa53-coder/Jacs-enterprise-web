import React, { useState } from 'react';
import { Search, Clock, Calendar, Bookmark, ArrowRight, TrendingUp, Sparkles, Filter, ExternalLink } from 'lucide-react';
import { INTELLIGENCE_ARTICLES } from '../data/mockData';
import { IntelligenceArticle } from '../types';
import { InteractiveSpotlightCard } from '../components/InteractiveSpotlightCard';

interface IntelligenceViewProps {
  onSelectArticle: (article: IntelligenceArticle) => void;
}

export const IntelligenceView: React.FC<IntelligenceViewProps> = ({ onSelectArticle }) => {
  const [selectedTag, setSelectedTag] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tags = ['Semua', 'AI & TEKNOLOGI', 'TEKNOLOGI', 'BISNIS', 'EDUKASI', 'INOVASI', 'DIGITAL'];

  const filteredArticles = INTELLIGENCE_ARTICLES.filter((art) => {
    const matchesTag = selectedTag === 'Semua' || art.category === selectedTag;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  return (
    <div className="space-y-10 sm:space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30 text-blue-500 dark:text-blue-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intelligence Portal</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-app-text-primary tracking-tight font-display">
          AI & Technology Intelligence
        </h1>
        <p className="text-sm sm:text-base text-app-text-secondary leading-relaxed">
          Pusat wawasan terkini mengenai revolusi kecerdasan buatan, komputasi frontier, robotika industri, dan dampak transformasi terhadap tatanan dunia modern.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 rounded-app-lg bg-app-surface/80 dark:bg-app-surface/60 backdrop-blur-md border border-app-border dark:border-white/10 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-app-md text-xs font-medium whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'bg-app-elevated/60 hover:bg-app-elevated text-app-text-secondary hover:text-app-text-primary border border-app-border/40 dark:border-white/5'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-app-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari artikel berita..."
            className="w-full pl-9 pr-3 py-1.5 rounded-app-md bg-app-elevated border border-app-border dark:border-white/10 text-xs text-app-text-primary placeholder:text-app-text-muted focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Articles Grid with Solid Neon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => onSelectArticle(art)}
            className="p-5 sm:p-6 cursor-pointer group jacs-solid-neon-card flex flex-col justify-between"
          >
            <div>
              {/* Photographic Thumbnail Container */}
              <div className="w-full h-44 rounded-app-lg relative overflow-hidden mb-4 border border-slate-200/80 dark:border-white/10 group-hover:border-cyan-400/80 transition-colors">
                <img
                  src={art.coverImage || art.imageUrl || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80'}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111419]/90 via-black/30 to-transparent" />
                
                {/* Floating Glass Category Pill Badge */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="backdrop-blur-md bg-black/50 text-cyan-300 border border-white/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono">
                    {art.category}
                  </span>
                </div>

                {art.trendingRank && (
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/50 text-orange-400 border border-orange-500/40 text-[10px] font-bold flex items-center gap-1 backdrop-blur-md z-10">
                    <TrendingUp className="w-3 h-3 text-orange-400" />
                    #{art.trendingRank} Trending
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold uppercase tracking-wide border border-cyan-500/20">
                  {art.category}
                </span>
                <span className="text-[10px] text-app-text-muted">• {art.date}</span>
              </div>

              <h2 className="text-base font-bold tracking-tight text-app-text-primary group-hover:text-cyan-300 transition-colors font-display line-clamp-2 leading-snug">
                {art.title}
              </h2>
              <p className="text-xs text-app-text-secondary mt-2 leading-relaxed line-clamp-3">
                {art.summary || art.excerpt}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-app-border/50 dark:border-white/10 flex items-center justify-between text-xs text-app-text-muted">
              <div className="flex items-center gap-2">
                <img
                  src={art.author.avatar}
                  alt={art.author.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="truncate max-w-[120px] font-medium">{art.author.name}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {art.externalUrl && (
                  <a
                    href={art.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/40 text-cyan-600 dark:text-cyan-400 hover:text-white hover:bg-cyan-500 dark:hover:bg-cyan-500 dark:hover:text-slate-950 transition-all shadow-xs hover:shadow-[0_0_12px_rgba(6,182,212,0.5)] group/ext"
                    title={`Buka sumber resmi: ${art.externalUrl}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5 group-hover/ext:rotate-12 transition-transform" />
                  </a>
                )}
                <span className="flex items-center gap-1 font-medium text-cyan-400">
                  <Clock className="w-3 h-3" />
                  {art.readTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

