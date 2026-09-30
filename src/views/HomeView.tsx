import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Clock,
  Layers,
  Radio,
  Zap,
  Palette,
  GraduationCap,
  Building,
  Store,
  Users,
  Briefcase,
  Truck,
  Cpu,
  Activity,
  ExternalLink,
  Handshake,
  ArrowUpRight,
  BarChart2,
  Receipt,
  Package,
  Home,
  MessageSquare,
  MapPin,
  Brain,
  DraftingCompass,
  Pin,
  ShieldCheck,
  Link2,
  Rocket,
  BookOpen,
  Workflow,
} from 'lucide-react';
import { WEB_APPLICATIONS, INTELLIGENCE_ARTICLES, apps, CONSULTATION_PARTNERSHIP_CARD } from '../data/mockData';
import { WebApp, IntelligenceArticle } from '../types';
import { NeuralNetworkCanvas } from '../components/NeuralNetworkCanvas';
import { AppCardThumbnail } from '../components/AppCardThumbnail';
import { ConsultationModal } from '../components/ConsultationModal';
import { TrioAutomationHub } from '../components/TrioAutomationHub';
import { useN8nConfig } from '../context/N8nConfigContext';
import { MakeConfigModal } from '../components/MakeConfigModal';
import { ZapierConfigModal } from '../components/ZapierConfigModal';
import { CommunityCommentsSection } from '../components/CommunityCommentsSection';
interface CinematicCoverConfig {
  image: string;
  alt: string;
  subtitle: string;
}

const APP_CINEMATIC_COVERS: Record<string, CinematicCoverConfig> = {
  'sekolahkita': {
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=85',
    alt: 'Smart Digital Classroom & Biometrik Modern - SEKOLAHKITA V2',
    subtitle: 'Kartu QR presensi dinamis, status validasi, dan kas BOSP.',
  },
  'retail-os': {
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1600&q=85',
    alt: 'Swalayan Besar Modern, Lorong Bersih, & Terminal Kasir Futuristik - JacS RetailOS ERP',
    subtitle: 'Terminal kasir kilat, tombol bayar QRIS, dan status drawer.',
  },
  'koskita': {
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=85',
    alt: 'Smart Building & Modern Co-Living Space - KosKita ERP',
    subtitle: 'Grid kamar pintar (101-104), status CCTV live, dan kWh meter.',
  },
  'depohub': {
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85',
    alt: 'Armada Logistik Modern & Gudang Otomatis AI/IoT - JacS DepoHub PRO',
    subtitle: 'Radar rute armada GPS live, ETA, dan e-POD pergudangan.',
  },
  'studio-suite': {
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=85',
    alt: 'Developer Interface & Arsitektur Diagram AI Glowing - JacS Builder Studio',
    subtitle: 'Terminal prompt generative AI, token/s meter, dan status arsitektur.',
  },
  'master-pro': {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=85',
    alt: 'Tata Kelola Korporat & Enterprise Business Intelligence - MasterPro ERP',
    subtitle: 'Kanban board interaktif, status audit ISO, dan sinkronisasi API.',
  },
  'enterprise-suite': {
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85',
    alt: 'Network Mesh Server Zero-Trust & Cyber Security - JacS Enterprise Suite',
    subtitle: 'Diagram arsitektur core SSO mesh dan zero-trust telemetry.',
  },
  'jacs-app-pro': {
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=85',
    alt: 'Kecerdasan Buatan Multi-Agen & Google Gems Core - JacS App PRO',
    subtitle: 'Panel Google Gems interaktif EduCore Kurikulum AI & Enterprise Logic Co-Pilot.',
  },
};

interface HomeViewProps {
  onSelectApp: (app: WebApp) => void;
  onSelectArticle: (article: IntelligenceArticle) => void;
  onNavigate: (sectionId: string) => void;
  onOpenAiCatalog?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectApp,
  onSelectArticle,
  onNavigate,
  onOpenAiCatalog,
}) => {
  const [activeSlide, setActiveSlide] = useState<'01' | '02' | '03'>('01');
  const slideKeys: Array<'01' | '02' | '03'> = ['01', '02', '03'];
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [newsFilter, setNewsFilter] = useState<string>('Semua');
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const { openN8nConfig } = useN8nConfig();
  const [isMakeModalOpen, setIsMakeModalOpen] = useState<boolean>(false);
  const [isZapierModalOpen, setIsZapierModalOpen] = useState<boolean>(false);
  const [slide03Tab, setSlide03Tab] = useState<'news' | 'comments'>('news');

  // Auto-Update & Live Data Engine: dynamic relative timestamps & auto-rotation
  const [elapsedMinutes, setElapsedMinutes] = useState<number>(0);
  const [activeTrendingIndex, setActiveTrendingIndex] = useState<number>(0);
  const [isTrendingHovered, setIsTrendingHovered] = useState<boolean>(false);

  // Dynamic relative timestamp ticker (every 30 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedMinutes((prev) => prev + 0.5);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // Helper for dynamic real-time relative time
  const getDynamicTrendingTimeAgo = (rank: number) => {
    const baseMinutes = rank === 1 ? 14 : rank === 2 ? 128 : rank === 3 ? 245 : 430;
    const totalMinutes = Math.floor(baseMinutes + elapsedMinutes);
    if (totalMinutes < 1) return 'Baru saja';
    if (totalMinutes < 60) return `${totalMinutes}m lalu`;
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return mins > 0 ? `${hours}j ${mins}m lalu` : `${hours}j lalu`;
  };

  const prevSlide = () => {
    setActiveSlide((prev) => {
      const idx = slideKeys.indexOf(prev);
      const nextIdx = (idx - 1 + slideKeys.length) % slideKeys.length;
      return slideKeys[nextIdx];
    });
  };

  const nextSlide = () => {
    setActiveSlide((prev) => {
      const idx = slideKeys.indexOf(prev);
      const nextIdx = (idx + 1) % slideKeys.length;
      return slideKeys[nextIdx];
    });
  };

  const goToSlide = (slideKey: '01' | '02' | '03') => {
    setActiveSlide(slideKey);
  };

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch Swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;
    if (deltaX > 50) {
      nextSlide();
    } else if (deltaX < -50) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  // Top 4 Carousel Articles for Hero Card (sorted by trendingRank / featured)
  const heroCarouselArticles = INTELLIGENCE_ARTICLES.filter((a) => a.trendingRank !== undefined)
    .sort((a, b) => (a.trendingRank || 0) - (b.trendingRank || 0))
    .slice(0, 4);

  const [heroSlideIndex, setHeroSlideIndex] = useState<number>(0);
  const [isHeroHovered, setIsHeroHovered] = useState<boolean>(false);

  // Synchronize active trending index with hero slide index
  useEffect(() => {
    setActiveTrendingIndex(heroSlideIndex);
  }, [heroSlideIndex]);

  // Auto-Slide carousel every 5 seconds (pauses on hover of hero card or trending panel)
  useEffect(() => {
    if (isHeroHovered || isTrendingHovered || heroCarouselArticles.length <= 1) return;
    const carouselTimer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % heroCarouselArticles.length);
    }, 5000);
    return () => clearInterval(carouselTimer);
  }, [isHeroHovered, isTrendingHovered, heroCarouselArticles.length]);

  const prevHeroSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setHeroSlideIndex((prev) => (prev - 1 + heroCarouselArticles.length) % heroCarouselArticles.length);
  };

  const nextHeroSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setHeroSlideIndex((prev) => (prev + 1) % heroCarouselArticles.length);
  };

  const currentHeroArticle = heroCarouselArticles[heroSlideIndex] || heroCarouselArticles[0];

  const getHeroAccent = (rank?: number) => {
    switch (rank) {
      case 1:
        return {
          pillColor: 'bg-cyan-500/15 border-cyan-400/50 text-cyan-700 dark:text-cyan-300',
          badgeBg: 'bg-cyan-500 text-slate-950 font-bold',
          glowColor: 'bg-cyan-400/20 dark:bg-cyan-400/25',
          borderPulse: 'border-cyan-400/60 dark:border-cyan-400/70',
        };
      case 2:
        return {
          pillColor: 'bg-blue-500/15 border-blue-400/50 text-blue-700 dark:text-blue-300',
          badgeBg: 'bg-blue-600 text-white font-bold',
          glowColor: 'bg-blue-500/20 dark:bg-blue-500/25',
          borderPulse: 'border-blue-400/60 dark:border-blue-400/70',
        };
      case 3:
        return {
          pillColor: 'bg-emerald-500/15 border-emerald-400/50 text-emerald-700 dark:text-emerald-300',
          badgeBg: 'bg-emerald-500 text-slate-950 font-bold',
          glowColor: 'bg-emerald-400/20 dark:bg-emerald-400/25',
          borderPulse: 'border-emerald-400/60 dark:border-emerald-400/70',
        };
      case 4:
      default:
        return {
          pillColor: 'bg-amber-500/15 border-amber-400/50 text-amber-700 dark:text-amber-300',
          badgeBg: 'bg-amber-500 text-slate-950 font-bold',
          glowColor: 'bg-amber-400/20 dark:bg-amber-400/25',
          borderPulse: 'border-amber-400/60 dark:border-amber-400/70',
        };
    }
  };

  // Active App Slider for Slide 02 (App & Solusi Showcase Stage)
  const [activeAppIndex, setActiveAppIndex] = useState<number>(0);
  const [isAppHovered, setIsAppHovered] = useState<boolean>(false);
  const [stageMode, setStageMode] = useState<'app' | 'automation'>('app');

  // Auto-Slide apps every 6 seconds (pauses on hover)
  useEffect(() => {
    if (isAppHovered || apps.length <= 1) return;
    const appTimer = setInterval(() => {
      setActiveAppIndex((prev) => (prev + 1) % apps.length);
    }, 6000);
    return () => clearInterval(appTimer);
  }, [isAppHovered, apps.length]);

  const prevAppSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveAppIndex((prev) => (prev - 1 + apps.length) % apps.length);
  };

  const nextAppSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveAppIndex((prev) => (prev + 1) % apps.length);
  };

  const currentActiveApp = apps[activeAppIndex] || apps[0];

  const getAppTheme = (id: string) => {
    switch (id) {
      case 'sekolahkita':
        return {
          pillColor: 'bg-emerald-500/15 border-emerald-400/50 text-emerald-700 dark:text-emerald-300',
          borderNeon: 'border-emerald-400 dark:border-emerald-400',
          glowColor: 'bg-emerald-400/20 dark:bg-emerald-400/25',
          barColor: 'from-emerald-400 via-teal-500 to-cyan-500',
          textColor: 'text-emerald-600 dark:text-emerald-300',
          badgeBg: 'bg-emerald-500 text-slate-950',
          shadowGlow: 'shadow-[0_0_24px_rgba(16,185,129,0.35)]',
          dotActive: 'bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.85)]',
          role: 'ERP PENDIDIKAN',
        };
      case 'retail-os':
        return {
          pillColor: 'bg-rose-500/15 border-rose-400/50 text-rose-700 dark:text-rose-300',
          borderNeon: 'border-rose-400 dark:border-rose-400',
          glowColor: 'bg-rose-400/20 dark:bg-rose-400/25',
          barColor: 'from-rose-400 via-amber-500 to-orange-500',
          textColor: 'text-rose-600 dark:text-rose-300',
          badgeBg: 'bg-rose-500 text-white',
          shadowGlow: 'shadow-[0_0_24px_rgba(244,63,94,0.35)]',
          dotActive: 'bg-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.85)]',
          role: 'RETAIL & POS',
        };
      case 'koskita':
        return {
          pillColor: 'bg-amber-500/15 border-amber-400/50 text-amber-700 dark:text-amber-300',
          borderNeon: 'border-amber-400 dark:border-amber-400',
          glowColor: 'bg-amber-400/20 dark:bg-amber-400/25',
          barColor: 'from-amber-400 via-orange-500 to-emerald-500',
          textColor: 'text-amber-600 dark:text-amber-300',
          badgeBg: 'bg-amber-500 text-slate-950',
          shadowGlow: 'shadow-[0_0_24px_rgba(245,158,11,0.35)]',
          dotActive: 'bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.85)]',
          role: 'MANAJEMEN KOS',
        };
      case 'depohub':
        return {
          pillColor: 'bg-sky-500/15 border-sky-400/50 text-sky-700 dark:text-sky-300',
          borderNeon: 'border-sky-400 dark:border-sky-400',
          glowColor: 'bg-sky-400/20 dark:bg-sky-400/25',
          barColor: 'from-sky-400 via-blue-500 to-cyan-500',
          textColor: 'text-sky-600 dark:text-sky-300',
          badgeBg: 'bg-sky-500 text-white',
          shadowGlow: 'shadow-[0_0_24px_rgba(2,132,199,0.35)]',
          dotActive: 'bg-sky-400 shadow-[0_0_12px_rgba(2,132,199,0.85)]',
          role: 'LOGISTIK & WMS',
        };
      case 'studio-suite':
        return {
          pillColor: 'bg-cyan-500/15 border-cyan-400/50 text-cyan-700 dark:text-cyan-300',
          borderNeon: 'border-cyan-400 dark:border-cyan-400',
          glowColor: 'bg-cyan-400/20 dark:bg-cyan-400/25',
          barColor: 'from-cyan-400 via-blue-500 to-indigo-500',
          textColor: 'text-cyan-600 dark:text-cyan-300',
          badgeBg: 'bg-cyan-500 text-slate-950',
          shadowGlow: 'shadow-[0_0_24px_rgba(6,182,212,0.35)]',
          dotActive: 'bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.85)]',
          role: 'ARSITEKTUR AI',
        };
      case 'master-pro':
        return {
          pillColor: 'bg-violet-500/15 border-violet-400/50 text-violet-700 dark:text-violet-300',
          borderNeon: 'border-violet-400 dark:border-violet-400',
          glowColor: 'bg-violet-400/20 dark:bg-violet-400/25',
          barColor: 'from-violet-400 via-purple-500 to-fuchsia-500',
          textColor: 'text-violet-600 dark:text-violet-300',
          badgeBg: 'bg-violet-500 text-white',
          shadowGlow: 'shadow-[0_0_24px_rgba(139,92,246,0.35)]',
          dotActive: 'bg-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.85)]',
          role: 'TATA KELOLA',
        };
      case 'enterprise-suite':
        return {
          pillColor: 'bg-purple-500/15 border-purple-400/50 text-purple-700 dark:text-purple-300',
          borderNeon: 'border-purple-400 dark:border-purple-400',
          glowColor: 'bg-purple-400/20 dark:bg-purple-400/25',
          barColor: 'from-purple-400 via-indigo-500 to-pink-500',
          textColor: 'text-purple-600 dark:text-purple-300',
          badgeBg: 'bg-purple-500 text-white',
          shadowGlow: 'shadow-[0_0_24px_rgba(168,85,247,0.35)]',
          dotActive: 'bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.85)]',
          role: 'CORE SSO MESH',
        };
      case 'jacs-app-pro':
      default:
        return {
          pillColor: 'bg-gradient-to-r from-cyan-500/15 to-purple-500/15 border-cyan-400/50 text-cyan-700 dark:text-cyan-300',
          borderNeon: 'border-cyan-400 dark:border-cyan-400',
          glowColor: 'bg-cyan-400/20 dark:bg-cyan-400/25',
          barColor: 'from-cyan-400 via-purple-500 to-indigo-500',
          textColor: 'text-cyan-600 dark:text-cyan-300',
          badgeBg: 'bg-gradient-to-r from-cyan-500 to-purple-500 text-slate-950',
          shadowGlow: 'shadow-[0_0_24px_rgba(6,182,212,0.35)]',
          dotActive: 'bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.85)]',
          role: 'GOOGLE GEMS AI',
        };
    }
  };

  const trendingArticles = INTELLIGENCE_ARTICLES.filter((a) => a.trendingRank !== undefined).sort(
    (a, b) => (a.trendingRank || 0) - (b.trendingRank || 0)
  );

  const categories = ['Semua', 'AI & TEKNOLOGI', 'TEKNOLOGI', 'BISNIS', 'EDUKASI', 'INOVASI'];

  const filteredNews =
    newsFilter === 'Semua'
      ? INTELLIGENCE_ARTICLES.slice(0, 4)
      : INTELLIGENCE_ARTICLES.filter((a) => a.category === newsFilter).slice(0, 4);

  const analysisFeatured =
    INTELLIGENCE_ARTICLES.find((a) => a.id === 'art-transformasi-digital-peluang-era-ai') ||
    INTELLIGENCE_ARTICLES[4];

  // Helper for application icon badges
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
        return {
          Icon: Store,
          badgeClass:
            'bg-indigo-50 text-indigo-600 border border-slate-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-500/30',
        };
      case 'master-pro':
        return {
          Icon: Users,
          badgeClass:
            'bg-violet-50 text-violet-600 border border-slate-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-500/30',
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
            'bg-rose-50 text-rose-600 border border-slate-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-500/30',
        };
      case 'jacs-app-pro':
        return {
          Icon: Cpu,
          badgeClass:
            'bg-orange-50 text-orange-600 border border-slate-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-500/30',
        };
      default:
        return {
          Icon: Zap,
          badgeClass:
            'bg-orange-50 text-orange-600 border border-slate-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-500/30',
        };
    }
  };

  const slidesMeta: Array<{ id: '01' | '02' | '03'; label: string; title: string; subtitle: string }> = [
    { id: '01', label: 'Hero', title: 'Hero & Trending', subtitle: 'Pusat Inteligensi' },
    { id: '02', label: 'Solusi', title: 'App & Solusi', subtitle: `${apps.length} Ekosistem WebApps` },
    { id: '03', label: 'Insight', title: 'Berita & Komunitas', subtitle: 'Feed & Diskusi Publik' },
  ];

  return (
    <div
      className="relative w-full h-[calc(100vh-5.5rem)] max-h-[calc(100vh-5.5rem)] overflow-hidden flex flex-col justify-between select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-full max-w-[1500px] h-[580px] pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute -top-16 -left-10 w-[550px] h-[450px] rounded-full blur-[140px] bg-cyan-500/10 dark:bg-cyan-500/15 pointer-events-none animate-pulse-slow"
        />
        <div
          className="absolute top-10 -right-10 w-[550px] h-[450px] rounded-full blur-[140px] bg-blue-600/10 dark:bg-blue-600/15 pointer-events-none animate-pulse-slow"
          style={{
            animationDelay: '3.5s',
          }}
        />
      </div>

      {/* Main Slide Active Viewport (Single Active View - Conditional Rendering) */}
      <div className="w-full flex-1 relative flex flex-col h-full min-h-0 overflow-hidden">
        {/* ========================================================
            SLIDE 01: HERO INTELLIGENCE & TRENDING CYBER BAR
            ======================================================== */}
        {activeSlide === '01' && (
          <div id="slide-01" className="w-full h-full max-h-full overflow-hidden flex flex-col justify-between px-2 sm:px-4 lg:px-6 pr-14 sm:pr-16 py-0.5 sm:py-1 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-2.5 lg:gap-3 items-stretch flex-1 min-h-0 overflow-hidden">
              
              {/* Main Featured AI Hero Card (8 cols) - Interactive Auto-Slider / Carousel for Top 4 Insights */}
              <div
                className="lg:col-span-8 rounded-app-xl bg-white/85 dark:bg-[#0d1117]/85 backdrop-blur-xl border border-slate-200/90 dark:border-slate-700/50 overflow-hidden relative group flex flex-col justify-between p-2.5 sm:p-3 lg:p-3.5 shadow-xl dark:shadow-2xl dark:shadow-cyan-950/20 hover:border-cyan-400/80 hover:shadow-[0_0_35px_rgba(6,182,212,0.22)] transition-all duration-300 cursor-pointer select-none h-full min-h-0"
                onMouseEnter={() => setIsHeroHovered(true)}
                onMouseLeave={() => setIsHeroHovered(false)}
                onClick={() => onSelectArticle(currentHeroArticle)}
              >
                {/* Smooth Cross-Fading Background Visuals for Top 4 Articles */}
                {heroCarouselArticles.map((article, idx) => {
                  const isActive = idx === heroSlideIndex;
                  const accent = getHeroAccent(article.trendingRank);
                  const coverImg = article.coverImage || article.imageUrl;
                  return (
                    <div
                      key={article.id}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none ${
                        isActive ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
                      }`}
                    >
                      {/* Large-Scale Conceptual Image with Cyber Mask - Transparent Blend */}
                      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-3/4 md:w-3/5 lg:w-[55%] h-full overflow-hidden opacity-45 dark:opacity-35 pointer-events-none">
                        <img
                          src={coverImg}
                          alt={article.title}
                          className={`w-full h-full object-cover object-center transition-transform duration-1000 ${
                            isActive ? 'scale-100 opacity-75 dark:opacity-60' : 'scale-105 opacity-0'
                          } jacs-hero-ai-mask`}
                        />
                        {/* Gradient Overlays for Soft Blending into Dark Atmosphere */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0d1117] dark:via-[#0d1117]/85 dark:to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-transparent dark:from-[#0d1117]/95 dark:via-transparent dark:to-transparent pointer-events-none" />
                      </div>

                      {/* Dynamic Luminous Radial Glow based on article rank */}
                      <div className={`absolute top-2 right-6 w-72 h-72 rounded-full blur-[80px] pointer-events-none animate-pulse-slow ${accent.glowColor}`} />
                    </div>
                  );
                })}

                {/* Cyber / Neural Node Wireframe Matrix Illustration (Top-Right Depth) */}
                <div className="absolute top-0 right-0 w-full sm:w-[68%] md:w-[58%] h-full pointer-events-none overflow-hidden z-[2]">
                  <svg
                    className="w-full h-full object-cover select-none"
                    viewBox="0 0 520 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="cyberWireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
                        <stop offset="50%" stopColor="#0284c7" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
                      </linearGradient>
                      <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                        <stop offset="35%" stopColor="#22d3ee" stopOpacity="0.85" />
                        <stop offset="70%" stopColor="#0891b2" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                      </radialGradient>
                      <filter id="cyanGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="3.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Concentric Cyber Orbit Rings */}
                    <g className="origin-[380px_120px] animate-spin-slow opacity-60 dark:opacity-85">
                      <circle cx="380" cy="120" r="115" stroke="url(#cyberWireGrad)" strokeWidth="1" strokeDasharray="4 8" />
                      <circle cx="380" cy="120" r="80" stroke="#22d3ee" strokeWidth="0.8" strokeOpacity="0.4" />
                      <circle cx="380" cy="120" r="48" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="8 6" strokeOpacity="0.6" />
                    </g>

                    {/* 3D-Perspective Neural Node Lattice Wireframe */}
                    <g filter="url(#cyanGlowFilter)" className="opacity-80 dark:opacity-95">
                      <line x1="380" y1="120" x2="450" y2="60" stroke="url(#cyberWireGrad)" strokeWidth="1.6" />
                      <line x1="380" y1="120" x2="310" y2="50" stroke="url(#cyberWireGrad)" strokeWidth="1.3" />
                      <line x1="380" y1="120" x2="440" y2="190" stroke="url(#cyberWireGrad)" strokeWidth="1.6" />
                      <line x1="380" y1="120" x2="290" y2="160" stroke="url(#cyberWireGrad)" strokeWidth="1.3" />
                      <line x1="450" y1="60" x2="500" y2="105" stroke="url(#cyberWireGrad)" strokeWidth="1.1" strokeDasharray="3 3" />
                      <line x1="450" y1="60" x2="395" y2="15" stroke="url(#cyberWireGrad)" strokeWidth="1.1" />
                      <line x1="310" y1="50" x2="395" y2="15" stroke="url(#cyberWireGrad)" strokeWidth="1.1" />
                      <line x1="310" y1="50" x2="245" y2="95" stroke="url(#cyberWireGrad)" strokeWidth="1.1" strokeDasharray="3 3" />
                      <line x1="290" y1="160" x2="245" y2="95" stroke="url(#cyberWireGrad)" strokeWidth="1.1" />
                      <line x1="290" y1="160" x2="335" y2="235" stroke="url(#cyberWireGrad)" strokeWidth="1.1" />
                      <line x1="440" y1="190" x2="335" y2="235" stroke="url(#cyberWireGrad)" strokeWidth="1.3" />
                      <line x1="440" y1="190" x2="495" y2="245" stroke="url(#cyberWireGrad)" strokeWidth="1.1" strokeDasharray="4 4" />
                      <line x1="500" y1="105" x2="495" y2="245" stroke="url(#cyberWireGrad)" strokeWidth="1.1" />
                      <line x1="380" y1="120" x2="395" y2="15" stroke="url(#cyberWireGrad)" strokeWidth="1.2" strokeDasharray="2 4" />

                      <polygon
                        points="380,55 440,90 440,155 380,185 320,155 320,90"
                        stroke="#22d3ee"
                        strokeWidth="0.9"
                        strokeDasharray="4 4"
                        strokeOpacity="0.5"
                        fill="rgba(6, 182, 212, 0.05)"
                      />

                      <circle cx="380" cy="120" r="16" fill="url(#nodeGlow)" />
                      <circle cx="380" cy="120" r="5" fill="#ffffff" />
                      <circle cx="380" cy="120" r="9" stroke="#22d3ee" strokeWidth="1.5" className="animate-ping origin-[380px_120px] opacity-75" />

                      <circle cx="450" cy="60" r="5" fill="#67e8f9" />
                      <circle cx="450" cy="60" r="10" fill="url(#nodeGlow)" opacity="0.6" />
                      <circle cx="310" cy="50" r="4" fill="#38bdf8" />
                      <circle cx="395" cy="15" r="4.5" fill="#a5f3fc" />
                      <circle cx="440" cy="190" r="5" fill="#22d3ee" />
                      <circle cx="290" cy="160" r="4" fill="#38bdf8" />
                      <circle cx="500" cy="105" r="3.5" fill="#67e8f9" />
                      <circle cx="335" cy="235" r="4" fill="#0284c7" />
                      <circle cx="245" cy="95" r="3.5" fill="#38bdf8" opacity="0.8" />
                      <circle cx="495" cy="245" r="3.5" fill="#22d3ee" opacity="0.8" />
                    </g>
                  </svg>
                </div>

                {/* Interactive Neural Network Particles Canvas floating over visual */}
                <NeuralNetworkCanvas className="opacity-20 dark:opacity-30 group-hover:opacity-45 transition-opacity duration-700 pointer-events-none z-[3]" />

                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-orange-500/5 dark:from-[#0056FF]/10 dark:via-transparent dark:to-[#FF6A00]/10 pointer-events-none z-[3]" />

                {/* Top status badges & Carousel navigation */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Ranking & Highlight Badge */}
                    <div className={`relative overflow-hidden inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs ${getHeroAccent(currentHeroArticle.trendingRank).pillColor}`}>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                      </span>
                      <span>#{currentHeroArticle.trendingRank || (heroSlideIndex + 1)} SOROTAN UTAMA</span>
                    </div>

                    {/* Category Pill */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAiCatalog?.();
                      }}
                      className="relative overflow-hidden inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50/90 hover:bg-cyan-100 dark:bg-cyan-950/60 dark:hover:bg-cyan-900/60 border border-cyan-300 hover:border-cyan-400 dark:border-cyan-400/60 dark:hover:border-cyan-400 text-cyan-800 hover:text-cyan-950 dark:text-cyan-300 dark:hover:text-cyan-100 font-mono text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-xs transition-all cursor-pointer group active:scale-95"
                      title="Buka Hub Akses Cepat AI Generator"
                      aria-label="Buka Katalog AI Generator"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 group-hover:rotate-12 transition-transform" strokeWidth={1.8} />
                      <span>{currentHeroArticle.category}</span>
                      <span className="text-[10px] ml-0.5 px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-sans font-bold flex items-center gap-0.5">
                        Hub ↗
                      </span>
                    </button>

                    {/* Read Time & Date */}
                    <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px] font-medium backdrop-blur-md">
                      <Clock className="w-3 h-3 text-cyan-500" strokeWidth={1.8} />
                      <span>{currentHeroArticle.date}</span>
                      <span>•</span>
                      <span>{currentHeroArticle.readTime}</span>
                    </div>
                  </div>

                  {/* Top Right: Carousel Navigation Arrows & Pause Status */}
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {/* Auto-Slide Status Indicator */}
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 font-mono text-[10px] text-slate-600 dark:text-slate-400">
                      <span className={`w-1.5 h-1.5 rounded-full ${isHeroHovered ? 'bg-amber-400' : 'bg-cyan-400 animate-pulse'}`} />
                      <span>{isHeroHovered ? 'Dijeda' : 'Auto 5s'}</span>
                    </div>

                    {/* Slide Counter */}
                    <span className="font-mono text-xs font-bold text-slate-700 dark:text-cyan-300 px-1">
                      0{heroSlideIndex + 1} / 0{heroCarouselArticles.length}
                    </span>

                    {/* Prev / Next Arrows */}
                    <div className="inline-flex items-center gap-0.5 bg-white/90 dark:bg-slate-900/90 rounded-full border border-slate-200/90 dark:border-cyan-500/40 p-0.5 shadow-sm">
                      <button
                        onClick={prevHeroSlide}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-cyan-500/20 transition-all cursor-pointer"
                        title="Insight Sebelumnya"
                        aria-label="Previous Insight"
                      >
                        <ChevronLeft className="w-4 h-4" strokeWidth={2.2} />
                      </button>
                      <button
                        onClick={nextHeroSlide}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-cyan-500/20 transition-all cursor-pointer"
                        title="Insight Berikutnya"
                        aria-label="Next Insight"
                      >
                        <ChevronRight className="w-4 h-4" strokeWidth={2.2} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Headline & Description */}
                <div
                  key={currentHeroArticle.id}
                  className="relative z-10 my-auto py-0.5 sm:py-1 max-w-xl md:max-w-[65%] space-y-1 sm:space-y-1.5 animate-in fade-in duration-300 overflow-hidden"
                >
                  <h1 className="font-extrabold tracking-[-0.03em] leading-tight text-base sm:text-lg lg:text-xl xl:text-2xl text-slate-900 dark:text-white font-display line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    {currentHeroArticle.title}
                  </h1>

                  <p className="text-slate-700 dark:text-slate-200/95 text-xs sm:text-[13px] leading-snug font-normal line-clamp-2">
                    {currentHeroArticle.summary || currentHeroArticle.excerpt}
                  </p>

                  {/* Tags Row */}
                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    {currentHeroArticle.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9.5px] sm:text-[10px] font-mono px-2 py-0.2 rounded-full bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-slate-600 dark:text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Author + Dot Indicators + Action Button */}
                <div className="relative z-10 pt-1.5 sm:pt-2 mt-0.5 border-t border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0">
                  {/* Left: Author */}
                  <div className="flex items-center gap-2">
                    <img
                      src={currentHeroArticle.author.avatar}
                      alt={currentHeroArticle.author.name}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-cyan-400/60 shadow-xs"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-900 dark:text-white leading-tight text-[11px] sm:text-xs">
                        {currentHeroArticle.author.name}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        {currentHeroArticle.author.role}
                      </div>
                    </div>
                  </div>

                  {/* Center: Dot Indicators */}
                  <div
                    className="hidden sm:flex items-center justify-center gap-2 px-2.5 py-1 rounded-full bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/90 backdrop-blur-md shadow-xs select-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="font-mono text-[11px] font-bold text-cyan-700 dark:text-cyan-300 tabular-nums">
                      0{heroSlideIndex + 1} / 0{heroCarouselArticles.length}
                    </span>
                    <span className="w-px h-2.5 bg-slate-300 dark:bg-slate-700" />
                    <div className="flex items-center gap-1">
                      {heroCarouselArticles.map((art, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={() => {
                            setHeroSlideIndex(dotIdx);
                            setActiveTrendingIndex(dotIdx);
                          }}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            dotIdx === heroSlideIndex
                              ? 'w-6 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                              : 'w-1.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-500'
                          }`}
                          aria-label={`Pindah ke slide #${dotIdx + 1}: ${art.title}`}
                          title={`#0${dotIdx + 1} ${art.title}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    {currentHeroArticle.externalUrl && (
                      <a
                        href={currentHeroArticle.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-app-md bg-white/90 dark:bg-slate-900/90 hover:bg-cyan-50 dark:hover:bg-slate-800 border border-cyan-400/60 dark:border-cyan-500/50 text-cyan-700 dark:text-cyan-300 font-bold text-[11px] transition-all flex items-center justify-center gap-1 shadow-xs hover:border-cyan-400 active:scale-95"
                        title="Buka sumber dokumentasi resmi di tab baru"
                      >
                        <span>{currentHeroArticle.externalUrl.includes('google') ? 'Google AI' : 'Sumber'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    <button
                      onClick={() => onSelectArticle(currentHeroArticle)}
                      className="px-3 py-1 rounded-app-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] transition-all duration-300 shadow-[0_0_12px_rgba(6,182,212,0.35)] flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                    >
                      <span>📖 Baca</span>
                      <ArrowRight className="w-3 h-3" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Trending Intelligence: Modern Glassmorphism Cyber List (4 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-1 sm:space-y-1.5 mt-2 lg:mt-0 h-full min-h-0 overflow-hidden">
                <div className="p-1 sm:p-1.5 rounded-xl bg-white/85 dark:bg-[#0d1117]/75 backdrop-blur-xl border border-slate-200/90 dark:border-slate-700/40 flex items-center justify-between shadow-sm shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1 rounded-md bg-orange-50 text-orange-600 border border-slate-200 dark:bg-orange-950/40 dark:border-orange-500/30 dark:text-orange-400 shadow-xs">
                      <TrendingUp className="w-3.5 h-3.5" strokeWidth={1.8} />
                    </div>
                    <h2 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-display">
                      Trending Intelligence
                    </h2>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-cyan-600 dark:text-cyan-400 font-mono font-bold">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                    </span>
                    <span>{isTrendingHovered ? 'Jeda' : 'Live'}</span>
                  </div>
                </div>

                {/* Stacked Cards 01-03 with compact padding */}
                <div
                  className="space-y-1 sm:space-y-1.5 flex-1 min-h-0 flex flex-col justify-between overflow-hidden"
                  onMouseEnter={() => setIsTrendingHovered(true)}
                  onMouseLeave={() => setIsTrendingHovered(false)}
                >
                  {trendingArticles.slice(0, 3).map((article, idx) => {
                    const isHighlighted = idx === heroSlideIndex;
                    const dynamicTime = getDynamicTrendingTimeAgo(idx + 1);
                    return (
                      <div
                        key={article.id}
                        onClick={() => {
                          setHeroSlideIndex(idx);
                          setActiveTrendingIndex(idx);
                          onSelectArticle(article);
                        }}
                        onMouseEnter={() => {
                          setActiveTrendingIndex(idx);
                        }}
                        className={`jacs-trending-card py-1 px-2 rounded-lg cursor-pointer flex items-center gap-2 group transition-all duration-200 ${
                          isHighlighted
                            ? 'bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-white/95 dark:from-cyan-950/70 dark:via-[#0e1622]/80 dark:to-[#0d1117]/90 backdrop-blur-xl border border-cyan-400 dark:border-cyan-400 shadow-[0_0_14px_rgba(6,182,212,0.3)] translate-x-0.5 relative overflow-hidden'
                            : 'bg-white/80 dark:bg-[#0d1117]/75 backdrop-blur-xl border border-slate-200/90 dark:border-slate-700/40 hover:border-cyan-500/60 dark:hover:border-cyan-400/60 hover:shadow-xs shadow-xs'
                        }`}
                        title="Klik untuk baca lengkap & tampilkan di sorotan utama"
                      >
                        {isHighlighted && (
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                        )}

                        <div className="flex flex-col items-center w-5 flex-shrink-0">
                          <span
                            className={`font-mono font-bold tracking-tighter text-xs sm:text-sm transition-transform ${
                              isHighlighted
                                ? 'text-cyan-500 dark:text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.95)] scale-105'
                                : 'text-cyan-600 dark:text-cyan-400'
                            }`}
                          >
                            0{idx + 1}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 leading-tight">
                            <h3 className={`text-xs font-semibold leading-tight truncate transition-colors font-display flex-1 ${
                              isHighlighted ? 'text-cyan-950 dark:text-cyan-100 font-bold' : 'text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-300'
                            }`}>
                              {article.title}
                            </h3>
                            <div className="flex items-center gap-0.5 shrink-0">
                              {article.externalUrl && (
                                <a
                                  href={article.externalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-0.5 rounded text-cyan-600 hover:text-white dark:text-cyan-400 dark:hover:text-slate-950 hover:bg-cyan-500 dark:hover:bg-cyan-400 shrink-0 transition-all cursor-pointer"
                                  title="Buka tautan sumber resmi di tab baru"
                                >
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setHeroSlideIndex(idx);
                                  setActiveTrendingIndex(idx);
                                }}
                                className={`p-0.5 rounded text-xs transition-all cursor-pointer ${
                                  isHighlighted
                                    ? 'text-cyan-600 dark:text-cyan-300 bg-cyan-500/20'
                                    : 'text-slate-400 hover:text-cyan-500'
                                }`}
                                title="Tampilkan di Panggung Hero"
                              >
                                <ArrowRight className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>

                          <div className="text-[9px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5 font-medium">
                            <span className="text-cyan-700 dark:text-cyan-400 font-semibold font-mono flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-cyan-500" />
                              {dynamicTime}
                            </span>
                            <span>•</span>
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => onNavigate('intelligence')}
                  className="w-full py-1 rounded-lg bg-cyan-50/90 hover:bg-cyan-100/90 text-cyan-800 dark:bg-[#0d1117]/75 dark:hover:bg-cyan-950/50 dark:text-cyan-300 backdrop-blur-xl border border-cyan-300 dark:border-cyan-500/40 hover:border-cyan-500 dark:hover:border-cyan-400 text-[11px] font-bold transition-all flex items-center justify-center gap-1 shadow-xs shrink-0 cursor-pointer"
                >
                  <span>Lihat Semua Topik Hangat</span>
                  <ChevronRight className="w-3 h-3 text-cyan-700 dark:text-cyan-400" strokeWidth={1.8} />
                </button>
              </div>
            </div>

            {/* ========================================================
                TRIO AUTOMATION INTEGRATION (BYO WORKSPACE) - ULTRA-COMPACT NEON STRIP
                ======================================================== */}
            <div className="mt-1 sm:mt-1.5 rounded-xl border border-cyan-500/30 bg-slate-900/80 dark:bg-[#0c1017]/90 backdrop-blur-xl py-1 px-2 sm:px-3 shadow-md shrink-0 flex-shrink-0 h-[66px] sm:h-[68px] max-h-[70px] overflow-hidden flex flex-col justify-between">
              {/* Header Bilah */}
              <div className="flex items-center justify-between gap-2 leading-none pb-0.5 border-b border-slate-800/80 shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="p-0.5 rounded bg-gradient-to-br from-cyan-400 to-[#FF6A00] text-slate-950">
                    <Zap className="w-2.5 h-2.5 fill-current" />
                  </div>
                  <h3 className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-wider text-slate-900 dark:text-white font-display">
                    TRIO AUTOMATION INTEGRATION (BYO WORKSPACE)
                  </h3>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[8px] sm:text-[8.5px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-400/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Client-Side Active</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      goToSlide('02');
                      setStageMode('automation');
                    }}
                    className="hidden sm:inline-flex text-[9px] font-mono text-cyan-500 dark:text-cyan-400 hover:underline items-center gap-0.5 cursor-pointer"
                    title="Buka Panggung Lengkap di Slide 02"
                  >
                    <span>Panggung Lengkap</span>
                    <ChevronRight className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

              {/* 3 Kartu Mini Ringkas (Grid 3 Kolom) */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 items-center flex-1 min-h-0 pt-0.5">
                {/* Kolom 1 (n8n) */}
                <div className="py-0.5 px-1.5 sm:px-2 rounded-lg bg-white/70 dark:bg-slate-950/80 border border-slate-200 dark:border-cyan-500/30 hover:border-cyan-400/60 transition-all flex items-center justify-between gap-1 shadow-xs group h-[34px]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="p-0.5 rounded bg-[#FF6A00]/20 text-[#FF6A00] border border-[#FF6A00]/40 shrink-0">
                      <Zap className="w-2.5 h-2.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-[10.5px] font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors truncate leading-tight">
                        [⚡] n8n Studio
                      </div>
                      <div className="text-[8px] sm:text-[8.5px] text-slate-500 dark:text-slate-400 truncate leading-tight">
                        Self-Hosted / Webhook
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={openN8nConfig}
                    className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[9.5px] font-mono font-bold bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-400/60 text-cyan-600 dark:text-cyan-300 hover:text-white transition-all shrink-0 cursor-pointer active:scale-95 whitespace-nowrap"
                    title="Setup n8n"
                  >
                    [ Setup n8n ↗ ]
                  </button>
                </div>

                {/* Kolom 2 (Make) */}
                <div className="py-0.5 px-1.5 sm:px-2 rounded-lg bg-white/70 dark:bg-slate-950/80 border border-slate-200 dark:border-purple-500/30 hover:border-purple-400/60 transition-all flex items-center justify-between gap-1 shadow-xs group h-[34px]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="p-0.5 rounded bg-purple-600/20 text-purple-400 border border-purple-500/40 shrink-0">
                      <Workflow className="w-2.5 h-2.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-[10.5px] font-bold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors truncate leading-tight">
                        [🟣] Make Hub
                      </div>
                      <div className="text-[8px] sm:text-[8.5px] text-slate-500 dark:text-slate-400 truncate leading-tight">
                        Visual Multi-SaaS
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMakeModalOpen(true)}
                    className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[9.5px] font-mono font-bold bg-purple-500/10 hover:bg-purple-500/25 border border-purple-400/60 text-purple-600 dark:text-purple-300 hover:text-white transition-all shrink-0 cursor-pointer active:scale-95 whitespace-nowrap"
                    title="Setup Make"
                  >
                    [ Setup Make ↗ ]
                  </button>
                </div>

                {/* Kolom 3 (Zapier) */}
                <div className="py-0.5 px-1.5 sm:px-2 rounded-lg bg-white/70 dark:bg-slate-950/80 border border-slate-200 dark:border-amber-500/30 hover:border-amber-400/60 transition-all flex items-center justify-between gap-1 shadow-xs group h-[34px]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="p-0.5 rounded bg-[#FF6A00]/20 text-[#FF6A00] border border-[#FF6A00]/40 shrink-0">
                      <Sparkles className="w-2.5 h-2.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-[10.5px] font-bold text-slate-900 dark:text-white group-hover:text-amber-400 transition-colors truncate leading-tight">
                        [🟠] Zapier Connect
                      </div>
                      <div className="text-[8px] sm:text-[8.5px] text-slate-500 dark:text-slate-400 truncate leading-tight">
                        Instant Triggers
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsZapierModalOpen(true)}
                    className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[9.5px] font-mono font-bold bg-amber-500/10 hover:bg-amber-500/25 border border-amber-400/60 text-amber-600 dark:text-amber-300 hover:text-white transition-all shrink-0 cursor-pointer active:scale-95 whitespace-nowrap"
                    title="Setup Zapier"
                  >
                    [ Setup Zapier ↗ ]
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SLIDE 02: APP & SOLUSI JACS ENTERPRISE (Split-Screen Architecture: 7 cols vs 5 cols)
            ======================================================== */}
        {activeSlide === '02' && (
          <div id="slide-02" className="w-full h-full max-h-full overflow-hidden flex flex-col justify-between px-2 sm:px-4 lg:px-6 pr-14 sm:pr-16 py-1 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-4 items-stretch h-full flex-1 min-h-0 py-0.5">
              
              {/* Sisi Kiri: Showcase Stage Utama (7 cols / ~58% lebar) */}
              <div
                className={`lg:col-span-7 rounded-app-xl bg-slate-950 border transition-all duration-500 overflow-hidden relative group flex flex-col justify-between shadow-2xl select-none h-full min-h-0 ${
                  stageMode === 'automation'
                    ? 'border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.35)] cursor-default p-3.5 sm:p-4'
                    : `${getAppTheme(currentActiveApp.id).borderNeon} ${getAppTheme(currentActiveApp.id).shadowGlow} cursor-pointer p-3.5 sm:p-4 lg:p-5`
                }`}
                onMouseEnter={() => setIsAppHovered(true)}
                onMouseLeave={() => setIsAppHovered(false)}
                onClick={() => {
                  if (stageMode === 'app') {
                    onSelectApp(currentActiveApp);
                  }
                }}
              >
                {stageMode === 'automation' ? (
                  <div className="relative z-10 w-full h-full flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
                    <TrioAutomationHub onClose={() => setStageMode('app')} />
                  </div>
                ) : (
                  <>
                    {/* Visual Utama: Cinematic High-Resolution AI Images with smooth cross-fade */}
                    {apps.map((app, idx) => {
                      const isActive = idx === activeAppIndex;
                      const cinematic = APP_CINEMATIC_COVERS[app.id] || {
                        image: app.imageUrl,
                        alt: app.name,
                        subtitle: app.tagline || app.summary,
                      };

                      return (
                        <div
                          key={app.id}
                          className={`absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none ${
                            isActive ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
                          }`}
                        >
                          <img
                            src={cinematic.image}
                            alt={cinematic.alt}
                            className={`w-full h-full object-cover object-center transition-transform duration-1000 ${
                              isActive ? 'scale-100' : 'scale-105'
                            }`}
                          />
                          {/* Overlay gradien gelap di bagian bawah gambar & samping agar menyatu mulus dengan tema portal */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                        </div>
                      );
                    })}

                    {/* Ambient Radial Glow matching active app neon */}
                    <div className={`absolute top-2 right-6 w-96 h-96 rounded-full blur-[110px] pointer-events-none animate-pulse-slow ${getAppTheme(currentActiveApp.id).glowColor}`} />

                    {/* Bilah Atas Minimalis: Badge Kategori & Nomor di kiri, Tombol navigasi panah [<] [>] di kanan */}
                    <div className="relative z-10 flex items-center justify-between gap-2 border-b border-slate-700/50 pb-2.5">
                      {/* Sisi Kiri: Badge Kategori & Nomor (misal: "GOOGLE GEMS AI • 08/08") */}
                      <div className="flex items-center gap-2">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md border shadow-xs ${getAppTheme(currentActiveApp.id).pillColor}`}>
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                          </span>
                          <span>{(currentActiveApp.category || getAppTheme(currentActiveApp.id).role).toUpperCase()} • 0{activeAppIndex + 1}/0{apps.length}</span>
                        </div>
                      </div>

                      {/* Sisi Kanan: Tombol Navigasi Panah [<] [>] */}
                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <div className="inline-flex items-center gap-0.5 bg-slate-900/90 rounded-full border border-cyan-500/40 p-0.5 shadow-sm backdrop-blur-md">
                          <button
                            type="button"
                            onClick={prevAppSlide}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/20 transition-all cursor-pointer"
                            title="Solusi Sebelumnya"
                            aria-label="Previous App"
                          >
                            <ChevronLeft className="w-4 h-4" strokeWidth={2.2} />
                          </button>
                          <button
                            type="button"
                            onClick={nextAppSlide}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/20 transition-all cursor-pointer"
                            title="Solusi Berikutnya"
                            aria-label="Next App"
                          >
                            <ChevronRight className="w-4 h-4" strokeWidth={2.2} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Open Center Stage: Visual Gambar AI tampil bersih & lega */}
                    <div className="relative z-10 w-full flex-1 min-h-[140px] sm:min-h-[180px] pointer-events-none" />

                    {/* Tata Letak Informasi Bawah: Judul Aplikasi, Deskripsi, dan Tombol Aksi */}
                    <div className="relative z-10 space-y-3 pt-3">
                      {/* Judul Aplikasi berukuran tegas (text-2xl / text-3xl font-bold text-white) */}
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl shrink-0 ${getAppBadgeConfig(currentActiveApp.id).badgeClass} shadow-md`}>
                          {React.createElement(getAppBadgeConfig(currentActiveApp.id).Icon, { className: 'w-6 h-6', strokeWidth: 2 })}
                        </div>
                        <div className="min-w-0">
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight drop-shadow-md truncate">
                            {currentActiveApp.name}
                          </h2>
                        </div>
                      </div>

                      {/* Deskripsi satu kalimat pendek (1 baris saja) */}
                      <p className="text-xs sm:text-sm text-slate-200/90 font-normal truncate leading-relaxed drop-shadow-sm">
                        {APP_CINEMATIC_COVERS[currentActiveApp.id]?.subtitle || currentActiveApp.tagline || currentActiveApp.summary}
                      </p>

                      {/* Baris Tombol Fitur & Aksi Langsung */}
                      <div
                        className="pt-3 border-t border-slate-700/60 flex items-center justify-between gap-2.5 flex-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Left Actions / Sub-Actions */}
                        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar py-0.5 min-w-0">
                          {currentActiveApp.id === 'jacs-app-pro' ? (
                            /* Khusus JacS App PRO: Dua tombol pil langsung sejajar horizontal */
                            <div className="flex items-center gap-2 flex-nowrap">
                              <a
                                href="https://gemini.google.com/gem/1fipy01GNfQUDdZd-o20CfPmTh6udrCR1?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-400/80 shadow-[0_0_16px_rgba(6,182,212,0.45)] hover:shadow-[0_0_24px_rgba(6,182,212,0.7)] transition-all active:scale-95 cursor-pointer backdrop-blur-md whitespace-nowrap shrink-0"
                                title="Buka Google Gem EduCore & Kurikulum AI di tab baru"
                              >
                                <span>🎓</span>
                                <span>EduCore & Kurikulum AI</span>
                                <ExternalLink className="w-3 h-3 text-cyan-400 shrink-0" />
                              </a>
                              <a
                                href="https://gemini.google.com/gem/1I8o6xug5WjRo-r738HLhXFTx_21bmQ_p?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-purple-950/80 hover:bg-purple-900 text-purple-300 border border-purple-400/80 shadow-[0_0_16px_rgba(168,85,247,0.45)] hover:shadow-[0_0_24px_rgba(168,85,247,0.7)] transition-all active:scale-95 cursor-pointer backdrop-blur-md whitespace-nowrap shrink-0"
                                title="Buka Google Gem Enterprise & Logic Co-Pilot di tab baru"
                              >
                                <span>🏛️</span>
                                <span>Enterprise & Logic Co-Pilot</span>
                                <ExternalLink className="w-3 h-3 text-purple-400 shrink-0" />
                              </a>
                            </div>
                          ) : (
                            /* Dot Indicators for direct jump */
                            <div className="flex items-center gap-1.5">
                              {apps.map((app, dotIdx) => (
                                <button
                                  key={dotIdx}
                                  onClick={() => setActiveAppIndex(dotIdx)}
                                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                    dotIdx === activeAppIndex
                                      ? `w-7 sm:w-8 ${getAppTheme(app.id).dotActive}`
                                      : 'w-2 bg-slate-600 hover:bg-slate-400'
                                  }`}
                                  aria-label={`Pindah ke solusi #${dotIdx + 1}: ${app.name}`}
                                  title={`#0${dotIdx + 1} ${app.name}`}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Right: Tombol Kapsul Neon Eksplorasi (Living Neon Glow Pill) */}
                        <div className="flex items-center gap-2.5 shrink-0">
                          {/* Untuk JacS App PRO, sediakan dots mini di sebelah tombol eksplorasi */}
                          {currentActiveApp.id === 'jacs-app-pro' && (
                            <div className="hidden xl:flex items-center gap-1.5 mr-1">
                              {apps.map((app, dotIdx) => (
                                <button
                                  key={dotIdx}
                                  onClick={() => setActiveAppIndex(dotIdx)}
                                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                    dotIdx === activeAppIndex
                                      ? `w-5 ${getAppTheme(app.id).dotActive}`
                                      : 'w-1.5 bg-slate-600 hover:bg-slate-400'
                                  }`}
                                  aria-label={`Pindah ke solusi #${dotIdx + 1}: ${app.name}`}
                                  title={`#0${dotIdx + 1} ${app.name}`}
                                />
                              ))}
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() => onSelectApp(currentActiveApp)}
                            className="w-auto px-5 py-2 whitespace-nowrap rounded-full bg-cyan-500/10 hover:bg-cyan-500/25 backdrop-blur-md border border-cyan-400/80 hover:border-cyan-300 text-cyan-300 hover:text-white font-medium tracking-wide text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer select-none"
                          >
                            <span>Eksplorasi →</span>
                          </button>
                        </div>
                      </div>
                    </div>
              </>
            )}
          </div>

              {/* Sisi Kanan: App Ecosystem Navigator (5 cols / ~42% lebar) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-1.5 mt-3 lg:mt-0 h-full min-h-0 overflow-hidden">
                {/* Header Panel */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/85 dark:bg-[#0d1117]/75 backdrop-blur-xl border border-slate-200/90 dark:border-slate-700/40 flex items-center justify-between shadow-lg shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-blue-50 text-blue-600 border border-slate-200 dark:bg-blue-950/40 dark:border-blue-500/30 dark:text-cyan-400 shadow-xs">
                      <Layers className="w-3.5 h-3.5" strokeWidth={1.8} />
                    </div>
                    <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-display">
                      Solusi & Role Ekosistem
                    </h2>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10.5px] text-cyan-600 dark:text-cyan-400 font-mono font-bold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    <span>{isAppHovered ? 'Jeda' : 'Auto-Sync'}</span>
                  </div>
                </div>

                {/* 8-App Compact Navigator Stack */}
                <div
                  className="space-y-1 flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar"
                  onMouseEnter={() => setIsAppHovered(true)}
                  onMouseLeave={() => setIsAppHovered(false)}
                >
                  {apps.map((app, idx) => {
                    const isActive = idx === activeAppIndex;
                    const { Icon: AppIcon, badgeClass } = getAppBadgeConfig(app.id);
                    const theme = getAppTheme(app.id);

                    return (
                      <div
                        key={app.id}
                        onClick={() => {
                          setActiveAppIndex(idx);
                          setStageMode('app');
                        }}
                        className={`py-1.5 px-3 rounded-xl cursor-pointer flex items-center gap-2.5 group transition-all duration-200 relative select-none ${
                          isActive && stageMode === 'app'
                            ? `bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-white/95 dark:from-cyan-950/70 dark:via-[#0e1622]/80 dark:to-[#0d1117]/90 backdrop-blur-xl border border-cyan-400 dark:border-cyan-400 ring-1 ring-cyan-400/50 ${theme.shadowGlow}`
                            : 'bg-white/80 dark:bg-[#0d1117]/75 backdrop-blur-xl border border-slate-200/90 dark:border-slate-700/40 hover:border-cyan-500/60 dark:hover:border-cyan-400/60 hover:shadow-xs shadow-xs'
                        }`}
                      >
                        {isActive && stageMode === 'app' && (
                          <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${theme.barColor} shadow-[0_0_10px_rgba(34,211,238,0.9)] rounded-l-xl`} />
                        )}

                        {/* Number Index */}
                        <div className="flex flex-col items-center w-5 shrink-0">
                          <span
                            className={`font-mono font-bold tracking-tight text-xs transition-transform ${
                              isActive && stageMode === 'app'
                                ? `${theme.textColor} drop-shadow-[0_0_10px_rgba(34,211,238,0.9)] scale-105`
                                : 'text-slate-400 dark:text-slate-500'
                            }`}
                          >
                            0{idx + 1}
                          </span>
                        </div>

                        {/* App Icon */}
                        <div className={`p-1 rounded-lg shrink-0 ${badgeClass}`}>
                          <AppIcon className="w-3.5 h-3.5" strokeWidth={2} />
                        </div>

                        {/* App Name & Category */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 leading-tight">
                            <h3 className={`text-xs sm:text-sm font-semibold truncate transition-colors font-display ${
                              isActive && stageMode === 'app' ? 'text-cyan-950 dark:text-cyan-100 font-bold' : 'text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-300'
                            }`}>
                              {app.name}
                            </h3>
                            {isActive && stageMode === 'app' ? (
                              <span className="text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-cyan-500/25 text-cyan-800 dark:text-cyan-300 border border-cyan-400/50 shrink-0 animate-pulse">
                                AKTIF
                              </span>
                            ) : (
                              <span className="text-[10px] sm:text-xs font-mono text-slate-400 dark:text-slate-500 shrink-0">
                                {app.version}
                              </span>
                            )}
                          </div>

                          <div className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate font-mono flex items-center justify-between">
                            <span className="truncate">{theme.role}</span>
                            <ChevronRight className={`w-3 h-3 text-slate-400 shrink-0 transition-transform ${isActive && stageMode === 'app' ? 'translate-x-0.5 text-cyan-400' : 'group-hover:translate-x-0.5'}`} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Dedicated Trio Automation Hub Switcher */}
                <button
                  type="button"
                  onClick={() => setStageMode((prev) => (prev === 'automation' ? 'app' : 'automation'))}
                  className={`w-full py-1.5 px-2.5 rounded-xl border text-xs font-bold transition-all duration-300 flex items-center justify-between cursor-pointer shrink-0 ${
                    stageMode === 'automation'
                      ? 'bg-gradient-to-r from-cyan-950 via-[#0c1017] to-purple-950/80 border-cyan-400 text-white shadow-[0_0_16px_rgba(6,182,212,0.45)] ring-1 ring-cyan-400/60'
                      : 'bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-amber-500/10 hover:from-cyan-500/20 hover:to-amber-500/20 text-slate-800 dark:text-cyan-200 border-cyan-500/30 hover:border-cyan-400/60 shadow-xs'
                  }`}
                  title={stageMode === 'automation' ? 'Klik untuk menutup dan kembali ke showcase aplikasi' : 'Buka Trio Automation Engine Hub di panggung utama'}
                >
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-gradient-to-br from-cyan-400 to-[#FF6A00] text-slate-950 shadow-xs">
                      <Zap className="w-3 h-3 fill-current" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-1.5 font-display text-[11px] sm:text-xs">
                        <span>Trio Automation Engine</span>
                        <span className="text-[8.5px] font-mono px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-400/40">
                          BYO
                        </span>
                      </div>
                      <div className="text-[9.5px] text-slate-500 dark:text-slate-400 font-mono">
                        {stageMode === 'automation' ? '● Aktif di Panggung (Klik Tutup)' : 'n8n • Make • Zapier Hub'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-cyan-400">
                    <span className="text-[9.5px] font-mono font-bold hidden sm:inline">
                      {stageMode === 'automation' ? 'Tutup ✕' : 'Buka →'}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${stageMode === 'automation' ? 'rotate-90 text-cyan-300' : 'group-hover:translate-x-1'}`} />
                  </div>
                </button>

                {/* Bottom Action: Buka Semua Solusi */}
                <button
                  onClick={() => onNavigate('applications')}
                  className="w-full py-1.5 rounded-xl bg-cyan-50/90 hover:bg-cyan-100/90 text-cyan-800 dark:bg-[#0d1117]/75 dark:hover:bg-cyan-950/50 dark:text-cyan-300 backdrop-blur-xl border border-cyan-300 dark:border-cyan-500/40 hover:border-cyan-500 dark:hover:border-cyan-400 text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-xs hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] cursor-pointer shrink-0"
                >
                  <span>Buka Semua Solusi ({apps.length})</span>
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SLIDE 03: BERITA TERBARU (Real Visual Photography) & STRATEGIC INSIGHT
            ======================================================== */}
        {activeSlide === '03' && (
          <div id="slide-03" className="w-full h-full max-h-full overflow-y-auto px-2 sm:px-4 lg:px-6 pr-14 sm:pr-16 flex flex-col justify-between py-1 transition-all duration-300 custom-scrollbar">
            <div className="flex flex-col justify-between h-auto py-1 space-y-3.5">
              
              {/* Slide 3 Header + Tab Switcher (Berita vs Diskusi Publik) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-200/90 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600 border border-slate-200 dark:bg-cyan-950/40 dark:border-cyan-500/30 dark:text-cyan-400 shadow-xs">
                    {slide03Tab === 'news' ? (
                      <Radio className="w-4 h-4" strokeWidth={1.8} />
                    ) : (
                      <MessageSquare className="w-4 h-4" strokeWidth={1.8} />
                    )}
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                      {slide03Tab === 'news'
                        ? 'Intelligence Feed & Berita Terbaru'
                        : '💬 Ruang Diskusi & Komentar Publik'}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
                      {slide03Tab === 'news'
                        ? 'Perkembangan terkini AI, transformasi komputasi, dan riset strategis.'
                        : 'Forum interaktif terbuka untuk pengguna, engineer, dan mitra ekosistem JacS.'}
                    </p>
                  </div>
                </div>

                {/* Right Controls: Tab Switcher & Category Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Mode Tabs: Berita vs Diskusi */}
                  <div className="inline-flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xs">
                    <button
                      type="button"
                      onClick={() => setSlide03Tab('news')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        slide03Tab === 'news'
                          ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                          : 'text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300'
                      }`}
                    >
                      <Radio className="w-3.5 h-3.5" />
                      <span>Berita & Riset</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSlide03Tab('comments')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        slide03Tab === 'comments'
                          ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                          : 'text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Diskusi Komunitas</span>
                    </button>
                  </div>

                  {/* Category Pills Filter (Only visible in News Mode) */}
                  {slide03Tab === 'news' && (
                    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
                      {categories.slice(0, 5).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setNewsFilter(cat)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                            newsFilter === cat
                              ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                              : 'bg-white dark:bg-[#111419]/90 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 shadow-xs'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* View Switch: Comments View vs News Cards View */}
              {slide03Tab === 'comments' ? (
                <div className="my-auto py-1">
                  <CommunityCommentsSection />
                </div>
              ) : (
                <>
                  {/* 4 Cards Grid with Real High-Res Photography Thumbnails */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-auto">
                {filteredNews.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => onSelectArticle(art)}
                    className="p-3.5 sm:p-4 cursor-pointer group jacs-solid-neon-card flex flex-col justify-between shadow-xs hover:shadow-md"
                  >
                    <div>
                      {/* Real Visual Image Thumbnail */}
                      <div className="relative w-full h-32 sm:h-36 overflow-hidden rounded-lg mb-2.5 border border-slate-200/80 dark:border-white/10 group-hover:border-cyan-400/80 transition-colors">
                        <img
                          src={art.coverImage || art.imageUrl || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80'}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {/* Gradient Overlay for contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85" />

                        {/* Kiri Atas: Floating Glass Category Pill Badge */}
                        <div className="absolute top-2 left-2 z-10">
                          <span className="backdrop-blur-md bg-black/50 text-cyan-300 border border-white/20 px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono">
                            {art.category}
                          </span>
                        </div>

                        {/* Kanan Atas: Floating Read Time or Trending Badge */}
                        <div className="absolute top-2 right-2 z-10">
                          {art.trendingRank ? (
                            <span className="backdrop-blur-md bg-black/50 border border-orange-500/40 text-orange-400 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 font-mono">
                              <TrendingUp className="w-3 h-3 text-orange-400" />
                              #{art.trendingRank}
                            </span>
                          ) : (
                            <span className="backdrop-blur-md bg-black/50 border border-cyan-500/30 text-cyan-300 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 font-mono">
                              <Clock className="w-3 h-3 text-cyan-300" strokeWidth={1.8} />
                              {art.readTime}
                            </span>
                          )}
                        </div>

                        {/* Date Floating Overlay at Bottom Left */}
                        <div className="absolute bottom-2 left-2.5 z-10">
                          <span className="text-[11px] font-medium text-slate-200 backdrop-blur-md bg-black/40 border border-white/10 px-2 py-0.5 rounded-full drop-shadow-sm">
                            {art.date}
                          </span>
                        </div>
                      </div>

                      {/* Title & Excerpt */}
                      <div className="flex items-start justify-between gap-1.5">
                        <h3 className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug font-display flex-1">
                          {art.title}
                        </h3>
                        {art.externalUrl && (
                          <a
                            href={art.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 rounded text-cyan-600 hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-200 hover:bg-cyan-500/10 shrink-0 transition-all group/ext"
                            title="Buka sumber resmi di tab baru"
                          >
                            <ExternalLink className="w-3.5 h-3.5 group-hover/ext:drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                          </a>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {art.summary || art.excerpt}
                      </p>
                    </div>

                    {/* Bottom Neon CTA Button */}
                    <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <div className="jacs-neon-cta-btn py-1.5 px-2.5 text-xs flex-1">
                        <span>Baca Selengkapnya</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={1.8} />
                      </div>
                      {art.externalUrl && (
                        <a
                          href={art.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/40 text-cyan-600 dark:text-cyan-400 hover:text-white hover:bg-cyan-500 dark:hover:bg-cyan-500 dark:hover:text-slate-950 transition-all shadow-xs hover:shadow-[0_0_12px_rgba(6,182,212,0.5)] group/iconbtn shrink-0"
                          title="Buka sumber resmi di tab baru"
                        >
                          <ExternalLink className="w-3.5 h-3.5 group-hover/iconbtn:drop-shadow-[0_0_6px_rgba(34,211,238,0.9)]" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Strategic Insight Quick Banner (Bottom of Slide 3) */}
              <div
                onClick={() => onSelectArticle(analysisFeatured)}
                className="p-3 rounded-xl bg-white dark:bg-[#111419]/90 border border-slate-200/90 dark:border-cyan-500/30 hover:border-cyan-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 border border-slate-200 dark:bg-purple-950/40 dark:text-purple-300 shrink-0">
                    <Activity className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400">
                      Kajian Utama:
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 ml-2 transition-colors truncate">
                      {analysisFeatured.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  {analysisFeatured.externalUrl && (
                    <a
                      href={analysisFeatured.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white dark:bg-purple-950/40 dark:hover:bg-purple-600 dark:text-purple-300 dark:hover:text-white border border-purple-200 dark:border-purple-500/30 hover:border-purple-400 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs hover:shadow-[0_0_12px_rgba(168,85,247,0.5)] cursor-pointer group/link"
                      title="Buka Dokumen Arsitektur Cerdas (Google AI Studio)"
                    >
                      <span>Arsitektur Cerdas AI</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/link:rotate-12 transition-transform" />
                    </a>
                  )}

                  <button
                    onClick={() => onSelectArticle(analysisFeatured)}
                    className="flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer"
                  >
                    <span>Buka Analisis</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={1.8} />
                  </button>
                </div>
              </div>

              {/* Quick Access to Community Discussion Neon Strip */}
              <div
                onClick={() => setSlide03Tab('comments')}
                className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-slate-900/90 via-slate-900/95 to-[#0c1017] border border-cyan-500/30 hover:border-cyan-400 flex items-center justify-between gap-3 shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 group-hover:scale-105 transition-transform shrink-0">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-[13px] font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                      💬 Punya Masukan atau Pertanyaan Seputar Arsitektur JacS & Otomatisasi?
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">
                      Buka forum terbuka dan bagikan perspektif Anda bersama komunitas developer & enterprise.
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:text-cyan-300 shrink-0">
                  <span>Buka Forum Diskusi</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </>
          )}
            </div>
          </div>
        )}
      </div>

      {/* Slide Navigation Controls: Floating Vertical Dock on Right Side */}
      <div className="fixed right-2 sm:right-3 top-1/2 -translate-y-1/2 z-40 pointer-events-none select-none">
        <div className="pointer-events-auto bg-slate-900/85 dark:bg-[#0c1017]/90 backdrop-blur-xl border border-cyan-500/40 rounded-full p-1.5 sm:p-2 shadow-2xl shadow-cyan-950/40 flex flex-col items-center gap-1.5 sm:gap-2 ring-1 ring-cyan-500/20">
          {/* Arrow Up: Previous Slide */}
          <button
            onClick={prevSlide}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/15 border border-transparent hover:border-cyan-400/40 transition-all duration-200 cursor-pointer shadow-xs active:scale-95 group relative"
            title="Slide Sebelumnya (Arrow Up)"
            aria-label="Slide Sebelumnya"
          >
            <ChevronUp className="w-4 h-4" strokeWidth={2.2} />
            {/* Floating Tooltip to the left */}
            <span className="pointer-events-none absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-950/95 text-cyan-300 text-[10.5px] font-mono border border-cyan-500/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-50">
              Slide Sebelumnya (↑)
            </span>
          </button>

          <div className="w-4 h-[1px] bg-slate-200 dark:bg-slate-800 my-0.5" />

          {/* Slide Vertical Buttons */}
          <div className="flex flex-col items-center gap-1.5 sm:gap-2">
            {slidesMeta.map((slide) => {
              const isActive = activeSlide === slide.id;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(slide.id)}
                  className={`group relative px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all duration-300 cursor-pointer flex flex-col items-center gap-0.5 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/80 shadow-[0_0_14px_rgba(6,182,212,0.6)] scale-105'
                      : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 border border-transparent'
                  }`}
                  title={`Slide ${slide.id}: ${slide.title}`}
                  aria-label={`Slide ${slide.id}: ${slide.title}`}
                >
                  <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-cyan-300' : 'text-slate-500 dark:text-slate-400'}`}>
                    {slide.id}
                  </span>
                  <span className="font-display text-[10px] sm:text-[11px] font-bold tracking-tight">
                    {slide.label}
                  </span>

                  {/* Floating Tooltip to the left */}
                  <span className="pointer-events-none absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-950/95 text-cyan-300 text-[11px] font-sans border border-cyan-500/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-50">
                    <span className="font-bold text-white mr-1.5">{slide.id}</span>
                    <span>{slide.title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-4 h-[1px] bg-slate-200 dark:bg-slate-800 my-0.5" />

          {/* Arrow Down: Next Slide */}
          <button
            onClick={nextSlide}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/15 border border-transparent hover:border-cyan-400/40 transition-all duration-200 cursor-pointer shadow-xs active:scale-95 group relative"
            title="Slide Selanjutnya (Arrow Down)"
            aria-label="Slide Selanjutnya"
          >
            <ChevronDown className="w-4 h-4" strokeWidth={2.2} />
            {/* Floating Tooltip to the left */}
            <span className="pointer-events-none absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-950/95 text-cyan-300 text-[10.5px] font-mono border border-cyan-500/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-50">
              Slide Selanjutnya (↓)
            </span>
          </button>
        </div>
      </div>

      {/* Consultation & Custom Partnership Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        onNavigate={onNavigate}
      />

      {/* Make.com Webhook Config Modal */}
      <MakeConfigModal
        isOpen={isMakeModalOpen}
        onClose={() => setIsMakeModalOpen(false)}
      />

      {/* Zapier Catch Hook Config Modal */}
      <ZapierConfigModal
        isOpen={isZapierModalOpen}
        onClose={() => setIsZapierModalOpen(false)}
      />
    </div>
  );
};
