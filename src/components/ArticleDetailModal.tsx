import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowLeft,
  Clock,
  Bookmark,
  Share2,
  ArrowRight,
  Check,
  ThumbsUp,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { IntelligenceArticle } from '../types';
import { INTELLIGENCE_ARTICLES } from '../data/mockData';
import { JacSLogo } from './JacSLogo';
import { CommunityCommentsSection } from './CommunityCommentsSection';

interface ArticleDetailModalProps {
  article: IntelligenceArticle | null;
  onClose: () => void;
  onSelectArticle: (article: IntelligenceArticle) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  onSelectArticle,
}) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(42);
  const [hasLiked, setHasLiked] = useState(false);

  // Keyboard shortcut listener: Escape key closes modal
  useEffect(() => {
    if (!article) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [article, onClose]);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (!article) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [article]);

  if (!article) return null;

  const displayImage = article.coverImage || article.imageUrl;
  const displayExcerpt = article.summary || article.excerpt;
  const relatedArticles = INTELLIGENCE_ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  const formatInlineText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const renderParagraphContent = (paragraph: string, index: number) => {
    // Heading 3
    if (paragraph.startsWith('### ')) {
      const title = paragraph.replace(/^###\s+/, '');
      return (
        <div key={index} className="pt-3 pb-0.5">
          <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white font-display tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span>{formatInlineText(title)}</span>
          </h3>
        </div>
      );
    }

    // Heading 2
    if (paragraph.startsWith('## ')) {
      const title = paragraph.replace(/^##\s+/, '');
      return (
        <div key={index} className="pt-4 pb-1">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white font-display tracking-tight border-b border-slate-200 dark:border-slate-800 pb-2">
            {formatInlineText(title)}
          </h2>
        </div>
      );
    }

    // Markdown Table
    if (paragraph.includes('|') && paragraph.includes('\n|')) {
      const lines = paragraph.trim().split('\n').filter((l) => l.trim().startsWith('|'));
      if (lines.length >= 3) {
        const parseCells = (line: string) =>
          line.split('|').slice(1, -1).map((c) => c.trim());
        const headers = parseCells(lines[0]);
        const rows = lines.slice(2).map(parseCells);

        return (
          <div
            key={index}
            className="my-5 overflow-hidden rounded-xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#0c1017] shadow-lg dark:shadow-[0_4px_20px_rgba(6,182,212,0.1)]"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-cyan-950/70 border-b border-slate-200 dark:border-cyan-500/30">
                    {headers.map((h, hIdx) => (
                      <th
                        key={hIdx}
                        className={`p-3 sm:p-3.5 font-bold uppercase tracking-wider text-[11px] sm:text-xs font-mono text-cyan-900 dark:text-cyan-200 ${
                          hIdx === 0 ? 'min-w-[170px]' : 'min-w-[210px]'
                        }`}
                      >
                        {formatInlineText(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={`transition-colors hover:bg-cyan-500/5 ${
                        rIdx % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/60 dark:bg-white/[0.02]'
                      }`}
                    >
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`p-3 sm:p-3.5 align-top leading-relaxed ${
                            cIdx === 0
                              ? 'font-semibold text-slate-900 dark:text-slate-100'
                              : 'text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {formatInlineText(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    }

    // Bullet List item or multi-line bullet points
    if (paragraph.startsWith('- ') || paragraph.includes('\n- ')) {
      const listLines = paragraph.split('\n').filter((l) => l.trim().length > 0);
      return (
        <ul key={index} className="space-y-2 my-2.5 pl-0.5">
          {listLines.map((line, lIdx) => {
            const itemText = line.replace(/^-\s+/, '');
            return (
              <li
                key={lIdx}
                className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2.5 shrink-0 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                <span className="flex-1">{formatInlineText(itemText)}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    // Regular paragraph
    return (
      <p key={index} className="leading-relaxed">
        {formatInlineText(paragraph)}
      </p>
    );
  };

  const handleShare = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/80 dark:bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#111419] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh] animate-in zoom-in-95 duration-200 cursor-default transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Header: 'Kembali' button & 'Tutup (X)' */}
        <div className="sticky top-0 z-50 bg-white/95 dark:bg-[#111419]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between transition-colors shadow-sm">
          {/* Left: Kembali ke Portal */}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border border-cyan-500/40 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-500/10 transition-colors group shadow-sm active:scale-95"
            title="Kembali ke Portal (Esc)"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-cyan-600 dark:text-cyan-400" />
            <span>← Kembali ke Portal</span>
            <span className="hidden sm:inline-block ml-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              Esc
            </span>
          </button>

          {/* Center: Category & Read Time indicator */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/25 font-bold uppercase tracking-wider font-mono">
              {article.category}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-cyan-500" />
              {article.readTime}
            </span>
          </div>

          {/* Right: Actions (Bookmark, Share) and Tutup (X) button */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-lg border transition-colors ${
                bookmarked
                  ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/40'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 border-slate-200 dark:border-slate-800'
              }`}
              title="Bookmark artikel"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 transition-colors flex items-center gap-1 text-xs"
              title="Bagikan tautan"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

            {/* Circular Tutup (X) button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all flex items-center justify-center active:scale-90"
              aria-label="Tutup modal"
              title="Tutup (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div id="article-modal-scroll-body" className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="space-y-3">
            {/* Sudut Kiri Atas Header Artikel: Blok Identitas Developer Resmi JacS Enterprise */}
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/80 dark:border-slate-800/80">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                <JacSLogo size="sm" withGlow={true} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-slate-950 dark:text-white tracking-tight text-sm leading-none font-display">
                  JacS Enterprise
                </span>
                <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-mono uppercase tracking-wider font-semibold mt-0.5 truncate">
                  JacS Enterprise Intelligence
                </span>
              </div>
            </div>

            {/* Title with crisp contrast in both dark & light modes */}
            <h1
              id="article-modal-title"
              className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-950 dark:text-white leading-tight font-display tracking-tight"
            >
              {article.title}
            </h1>

            {/* Author info & Likes */}
            <div className="flex items-center justify-between pt-2 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                />
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {article.author.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    {article.author.role} • {article.date}
                  </div>
                </div>
              </div>

              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                  hasLiked
                    ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{likes}</span>
              </button>
            </div>
          </div>

          {/* Featured Article Image Banner */}
          {displayImage && (
            <div className="relative w-full h-56 sm:h-72 lg:h-80 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
              <img
                src={displayImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 text-xs text-white/95 font-mono backdrop-blur-md bg-black/60 px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-sm">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>JacS Intelligence Briefing</span>
              </div>
              {article.externalUrl && (
                <a
                  href={article.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs backdrop-blur-md shadow-md transition-all group"
                  title="Buka sumber resmi di tab baru"
                >
                  <span>{article.externalUrl.includes('google') ? 'Google AI / Gemini ↗' : 'Dokumentasi Resmi ↗'}</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>
          )}

          {/* Abstract / Excerpt Highlight */}
          {displayExcerpt && (
            <div className="p-4 sm:p-5 rounded-xl bg-purple-50 dark:bg-purple-950/20 border-l-4 border-purple-500 dark:border-purple-400 text-sm sm:text-base text-slate-800 dark:text-slate-200 italic leading-relaxed shadow-sm">
              "{displayExcerpt}"
            </div>
          )}

          {/* Full Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {article.content.map((paragraph, index) => renderParagraphContent(paragraph, index))}
          </div>

          {/* Official External Resource Link Banner */}
          {article.externalUrl && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-300 dark:border-cyan-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-700/60 shadow-xs shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Dokumentasi & Sumber Riset Resmi</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-mono">Resmi</span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono truncate max-w-sm sm:max-w-md mt-0.5">
                    {article.externalUrl}
                  </div>
                </div>
              </div>

              <a
                href={article.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 shrink-0 transition-all cursor-pointer"
                title={`Buka ${article.externalUrl} di tab baru`}
              >
                <span>Buka Dokumen Resmi</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Tag Cloud */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Topik Terkait
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Public Comments & Community Discussion Section */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <CommunityCommentsSection
              articleId={article.id}
              articleTitle={article.title}
              compact={false}
            />
          </div>

          {/* Related Articles Section */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Berita Terkait Lainnya
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectArticle(rel);
                    const scrollContainer = document.getElementById('article-modal-scroll-body');
                    if (scrollContainer) scrollContainer.scrollTop = 0;
                  }}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 cursor-pointer transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-mono">
                      {rel.category}
                    </span>
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 mt-1">
                      {rel.title}
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 flex items-center justify-between font-mono">
                    <span>{rel.readTime}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-cyan-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-[#0c0e12] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <JacSLogo size="xs" />
            <span className="hidden sm:inline font-mono">JacS Enterprise Intelligence Portal</span>
            <span className="sm:hidden font-mono">JacS Portal</span>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium text-xs transition-colors active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Portal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
