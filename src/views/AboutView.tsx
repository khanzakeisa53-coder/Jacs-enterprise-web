import React from 'react';
import { JacSLogo } from '../components/JacSLogo';
import { ShieldCheck, Cpu, Globe, Users, Award, Sparkles, Layers } from 'lucide-react';
import { InteractiveSpotlightCard } from '../components/InteractiveSpotlightCard';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-12 sm:space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <JacSLogo size="xl" showText={true} withGlow={true} className="justify-center" />
        <h1 className="text-3xl sm:text-5xl font-extrabold text-app-text-primary tracking-tight font-display mt-4">
          Digital Intelligence for a Better Future
        </h1>
        <p className="text-sm sm:text-base text-app-text-secondary leading-relaxed">
          JacS Enterprise didirikan sebagai jembatan strategis antara kecerdasan buatan mutakhir dan ekosistem aplikasi terapan untuk mempercepat produktivitas manusia dan ketahanan organisasi.
        </p>
      </div>

      {/* 3 Core Pillars with Spotlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InteractiveSpotlightCard
          glowColor="rgba(0, 102, 255, 0.15)"
          className="p-6 space-y-3 cursor-default"
        >
          <div className="w-12 h-12 rounded-app-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-app-text-primary font-display">
            Ekosistem 7 Aplikasi Terintegrasi
          </h3>
          <p className="text-xs sm:text-sm text-app-text-secondary leading-relaxed">
            Menghilangkan fragmentasi data antar-divisi melalui integrasi langsung dari modul retail, pendidikan, manajemen sewa, hingga gudang logistik.
          </p>
        </InteractiveSpotlightCard>

        <InteractiveSpotlightCard
          glowColor="rgba(124, 92, 255, 0.15)"
          className="p-6 space-y-3 cursor-default"
        >
          <div className="w-12 h-12 rounded-app-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-app-text-primary font-display">
            Pusat Riset & Intelijen AI
          </h3>
          <p className="text-xs sm:text-sm text-app-text-secondary leading-relaxed">
            Menyaring sinyal penting dari kebisingan tren teknologi, menyajikan laporan objektif dan rekomendasi aplikatif bagi pengambil keputusan.
          </p>
        </InteractiveSpotlightCard>

        <InteractiveSpotlightCard
          glowColor="rgba(16, 185, 129, 0.15)"
          className="p-6 space-y-3 cursor-default"
        >
          <div className="w-12 h-12 rounded-app-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-app-text-primary font-display">
            Keamanan Tingkat Enterprise
          </h3>
          <p className="text-xs sm:text-sm text-app-text-secondary leading-relaxed">
            Dibangun dengan prinsip Zero-Trust, enkripsi end-to-end, dan pemenuhan standar regulasi perlindungan data pribadi nasional dan internasional.
          </p>
        </InteractiveSpotlightCard>
      </div>

      {/* Leadership & Values */}
      <div className="rounded-app-xl bg-gradient-to-br from-app-surface via-app-elevated to-app-surface border border-app-border dark:border-white/10 p-6 sm:p-10 space-y-6 shadow-md">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            Filosofi Desain & Tata Nilai
          </span>
          <h2 className="text-2xl font-bold text-app-text-primary font-display">
            Teknologi yang Memberdayakan, Bukan Membingungkan
          </h2>
          <p className="text-xs sm:text-sm text-app-text-secondary leading-relaxed">
            Kami meyakini bahwa antarmuka enterprise terbaik adalah yang bersih, berfokus tinggi, dan bebas dari animasi atau ornamen berlebih. Desain JacS memprioritaskan keterbacaan data, responsivitas cepat, dan kejelasan navigasi di segala resolusi layar.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-app-border/60 dark:border-white/10">
          <div className="text-center p-3 rounded-app-md bg-app-surface/60 border border-app-border/40 dark:border-white/5">
            <div className="text-2xl font-black text-purple-400 font-mono">7+</div>
            <div className="text-xs text-app-text-muted mt-1">WebApps Aktif</div>
          </div>
          <div className="text-center p-3 rounded-app-md bg-app-surface/60 border border-app-border/40 dark:border-white/5">
            <div className="text-2xl font-black text-blue-400 font-mono">99.99%</div>
            <div className="text-xs text-app-text-muted mt-1">Ketersediaan Sistem</div>
          </div>
          <div className="text-center p-3 rounded-app-md bg-app-surface/60 border border-app-border/40 dark:border-white/5">
            <div className="text-2xl font-black text-emerald-400 font-mono">250K+</div>
            <div className="text-xs text-app-text-muted mt-1">Transaksi Harian</div>
          </div>
          <div className="text-center p-3 rounded-app-md bg-app-surface/60 border border-app-border/40 dark:border-white/5">
            <div className="text-2xl font-black text-amber-400 font-mono">5</div>
            <div className="text-xs text-app-text-muted mt-1">Tingkatan Hak Akses</div>
          </div>
        </div>
      </div>

    </div>
  );
};

