import React from 'react';
import { FileText, Download, ArrowRight, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { INTELLIGENCE_ARTICLES } from '../data/mockData';
import { IntelligenceArticle } from '../types';
import { InteractiveSpotlightCard } from '../components/InteractiveSpotlightCard';

interface InsightsViewProps {
  onSelectArticle: (article: IntelligenceArticle) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ onSelectArticle }) => {
  const [downloadedIdx, setDownloadedIdx] = React.useState<number | null>(null);

  const whitepapers = [
    {
      title: 'Peta Jalan Adopsi Agen AI Otonom di Sektor Perbankan dan Ritel Indonesia',
      date: 'September 2026',
      pages: '38 Halaman',
      category: 'Executive Report',
      summary: 'Kajian empiris mengenai kesiapan infrastruktur komputasi kognitif dan kepatuhan perlindungan data pribadi (PDP).',
    },
    {
      title: 'Optimalisasi Rantai Pasok Pergudangan 4.0 Melalui Integrasi Fleet Robotic',
      date: 'Agustus 2026',
      pages: '44 Halaman',
      category: 'Technical Whitepaper',
      summary: 'Arsitektur komunikasi real-time antara sistem WMS dengan robot otonom bipedal di fasilitas pemenuhan berskala masif.',
    },
    {
      title: 'Pengukuran Dampak Pembelajaran Adaptif AI Terhadap Retensi Konsep Siswa',
      date: 'Juli 2026',
      pages: '28 Halaman',
      category: 'Academic Research',
      summary: 'Studi komparatif longitudinal pada 12.000 siswa sekolah menengah menggunakan sistem Sekolahkita.',
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
          <FileText className="w-3.5 h-3.5" />
          <span>Edukasi & Analisis Strategis</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-app-text-primary tracking-tight font-display">
          Riset & Whitepaper Enterprise
        </h1>
        <p className="text-sm sm:text-base text-app-text-secondary leading-relaxed">
          Kumpulan kajian mendalam, kerangka kerja implementasi, dan publikasi ilmiah terverifikasi yang dirilis oleh dewan pakar JacS Enterprise.
        </p>
      </div>

      {/* Featured Whitepapers with Solid Neon Styling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {whitepapers.map((paper, idx) => (
          <div
            key={idx}
            className="p-6 cursor-pointer group jacs-solid-neon-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                  {paper.category}
                </span>
                <span className="text-xs text-app-text-muted font-mono">{paper.pages}</span>
              </div>
              <h3 className="text-base font-bold text-app-text-primary mt-1 font-display leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                {paper.title}
              </h3>
              <p className="text-xs text-app-text-secondary mt-2 leading-relaxed">
                {paper.summary}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-app-border/60 dark:border-white/10 flex items-center justify-between">
              <span className="text-xs text-app-text-muted">{paper.date}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDownloadedIdx(idx);
                  setTimeout(() => setDownloadedIdx(null), 2500);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-app-md border text-xs font-semibold transition-all ${
                  downloadedIdx === idx
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                }`}
              >
                {downloadedIdx === idx ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Tersimpan</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Articles Stream */}
      <div className="space-y-6 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-app-text-primary font-display">
          Artikel Analisis Terbaru
        </h2>

        <div className="space-y-3">
          {INTELLIGENCE_ARTICLES.slice(2).map((art) => (
            <InteractiveSpotlightCard
              key={art.id}
              onClick={() => onSelectArticle(art)}
              glowColor="rgba(124, 92, 255, 0.12)"
              className="p-5 cursor-pointer group"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-bold uppercase">
                      {art.category}
                    </span>
                    <span className="text-xs text-app-text-muted">• {art.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-app-text-primary group-hover:text-purple-400 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-app-text-secondary line-clamp-1">
                    {art.summary || art.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-app-text-muted self-end sm:self-center flex-shrink-0">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {art.readTime}
                  </span>
                  <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </InteractiveSpotlightCard>
          ))}
        </div>
      </div>

    </div>
  );
};

