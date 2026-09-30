import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Menu,
  X,
  Globe,
  Bell,
  Clock,
  Activity,
  Sparkles,
  ShieldCheck,
  CheckCheck,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { JacSLogo } from './JacSLogo';
import { ThemeToggle } from './ThemeToggle';
import { RoleSelector } from './RoleSelector';
import { NAVIGATION_ITEMS } from '../data/mockData';
import { useRole } from '../context/RoleContext';
import { useN8nConfig } from '../context/N8nConfigContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSearch: () => void;
  onOpenAiCatalog?: () => void;
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  category: 'ai' | 'system' | 'security';
  read: boolean;
  targetSection?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'JacS Engine v4.2 Rilis',
    description: 'Model penalaran adaptif & multimodal frontier resmi diaktifkan di seluruh modul enterprise.',
    time: '10m lalu',
    category: 'ai',
    read: false,
    targetSection: 'intelligence',
  },
  {
    id: 'notif-2',
    title: 'Sistem Terdistribusi Optimal',
    description: 'Edge CDN & sinkronisasi multi-region mencapai uptime 99.99% dengan latensi 24ms.',
    time: '1j lalu',
    category: 'system',
    read: false,
    targetSection: 'applications',
  },
  {
    id: 'notif-3',
    title: 'Audit Keamanan ISO 27001',
    description: 'Pembaruan enkripsi AES-256 pada database DepoHub & RetailOS telah tervalidasi.',
    time: '3j lalu',
    category: 'security',
    read: false,
    targetSection: 'about',
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenSearch,
  onOpenAiCatalog,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<'id' | 'en'>('id');
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [latency, setLatency] = useState<number>(24);

  const notifRef = useRef<HTMLDivElement>(null);
  const { currentRoleInfo } = useRole();
  const {
    isConnected: isN8nConnected,
    isConfigured: isN8nConfigured,
    openN8nConfig,
  } = useN8nConfig();

  // Scroll detection for navbar blur / elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real-time ticking digital clock and date
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds} WITA`);

      const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const dayName = days[now.getDay()];
      const dateNum = now.getDate();
      const monthName = months[now.getMonth()];
      setCurrentDate(`${dayName}, ${dateNum} ${monthName}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Realistic CDN latency fluctuation between 18ms and 32ms
    const latencyTimer = setInterval(() => {
      const nextLatency = Math.floor(Math.random() * (32 - 18 + 1)) + 18;
      setLatency(nextLatency);
    }, 4500);

    return () => {
      clearInterval(timer);
      clearInterval(latencyTimer);
    };
  }, []);

  // Click outside listener for notification popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleNotifItem = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getNotifIcon = (category: 'ai' | 'system' | 'security') => {
    switch (category) {
      case 'ai':
        return <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />;
      case 'system':
        return <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      case 'security':
        return <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          scrolled
            ? 'bg-white/95 dark:bg-[#0B0D10]/95 backdrop-blur-xl border-slate-200/90 dark:border-cyan-500/50 shadow-sm dark:shadow-[0_4px_24px_rgba(6,182,212,0.3)]'
            : 'bg-white/90 dark:bg-[#0B0D10]/90 backdrop-blur-xl border-slate-200/80 dark:border-cyan-500/40 shadow-xs dark:shadow-[0_4px_16px_rgba(6,182,212,0.2)]'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-7">
          <div className="flex items-center justify-between h-16 gap-2 sm:gap-3">
            
            {/* Left Section: Brand Logo + System Telemetry Latency Pill */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div
                className="flex items-center gap-2.5 cursor-pointer py-1 select-none"
                onClick={() => onNavigate('home')}
                title="Kembali ke Beranda JacS Enterprise"
              >
                <JacSLogo size="md" showText={true} withGlow={true} />
              </div>

              {/* Live System Telemetry / Latency Badge */}
              <div
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-cyan-500/30 text-[11px] font-mono shadow-xs select-none transition-colors hover:border-emerald-500/50"
                title="Status Jaringan JacS Cloud & CDN Edge Global"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">CDN Aktif</span>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <span className="text-slate-700 dark:text-cyan-300 font-bold transition-all duration-300">{latency}ms</span>
              </div>
            </div>

            {/* Center: Desktop Navigation Links (Sejajar 1 Baris Datar & Modern Pill) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                const isAiTech = item.id === 'intelligence';
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (isAiTech && onOpenAiCatalog) {
                        onOpenAiCatalog();
                      } else {
                        onNavigate(item.id);
                      }
                    }}
                    className={`whitespace-nowrap inline-flex items-center gap-1 text-[12px] xl:text-[13px] tracking-tight px-2.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer border ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold border-blue-200 shadow-xs dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-400/40 dark:shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                        : isAiTech
                        ? 'font-medium text-slate-800 dark:text-cyan-300 border-cyan-400/50 dark:border-cyan-500/40 bg-cyan-50/60 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 hover:shadow-[0_0_12px_rgba(6,182,212,0.25)] transition-all'
                        : 'font-medium text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-white/10 transition-colors'
                    }`}
                    title={isAiTech ? 'Katalog AI Generator & Hub Cepat' : undefined}
                  >
                    {isAiTech && (
                      <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                    )}
                    <span>{language === 'en' ? item.label : item.labelId}</span>
                    {isAiTech && (
                      <span className="text-[9px] px-1 rounded bg-cyan-500/20 text-cyan-800 dark:text-cyan-200 font-mono font-bold">
                        Hub ↗
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Section: Real-Time Clock, Cmd+K Capsule Search, Bell Notification, ThemeToggle, RoleSelector */}
            <div className="flex items-center gap-1.5 sm:gap-2">

              {/* Real-Time Digital Clock & Date (Monospace Web App Indicator) */}
              <div
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300 shadow-xs select-none"
                title="Waktu Sistem Real-Time"
              >
                <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" strokeWidth={1.8} />
                <span className="text-slate-500 dark:text-slate-400 font-sans text-[10px] hidden 2xl:inline">
                  {currentDate} •
                </span>
                <span className="font-semibold text-slate-800 dark:text-cyan-300 tracking-tight">
                  {currentTime || 'Memuat...'}
                </span>
              </div>

              {/* Modern Capsule Input Bar Quick Search Trigger (Cmd / Ctrl + K) */}
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-slate-100/95 hover:bg-slate-200/90 dark:bg-slate-900/90 dark:hover:bg-slate-800 border border-slate-200 dark:border-cyan-500/30 hover:border-cyan-500 dark:hover:border-cyan-400 hover:shadow-[0_0_14px_rgba(6,182,212,0.25)] text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-cyan-200 transition-all text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/30 group cursor-pointer"
                title="Pencarian Cepat Global (Cmd/Ctrl + K)"
                aria-label="Pencarian Cepat Global"
              >
                <Search
                  className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-600 dark:text-slate-400 dark:group-hover:text-cyan-300 transition-colors"
                  strokeWidth={2}
                />
                <span className="hidden sm:inline-block font-normal text-xs text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors max-w-[120px] md:max-w-none truncate">
                  Cari cepat...
                </span>
                <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md shadow-xs group-hover:border-cyan-400 transition-colors">
                  ⌘K
                </kbd>
              </button>

              {/* Interactive Notification Bell with JacS Orange Badge */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className={`relative p-2 rounded-xl border transition-all cursor-pointer ${
                    notifOpen
                      ? 'bg-cyan-50 text-cyan-700 border-cyan-400 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:text-cyan-300 border-slate-200 dark:border-slate-800 hover:border-cyan-400/50'
                  }`}
                  title="Notifikasi & Update Sistem"
                  aria-label="Notifikasi"
                >
                  <Bell className="w-4 h-4" strokeWidth={2} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF6A00] text-white text-[10px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(255,106,0,0.6)] animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Glassmorphism Notification Dropdown */}
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white/95 dark:bg-[#111419]/95 backdrop-blur-xl border border-slate-200 dark:border-cyan-500/30 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/90 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded-lg bg-orange-50 text-[#FF6A00] dark:bg-orange-950/40 border border-orange-200 dark:border-orange-500/30">
                          <Bell className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                          Pemberitahuan Sistem
                        </h4>
                        {unreadCount > 0 && (
                          <span className="px-1.5 py-0.2 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] text-[10px] font-bold font-mono">
                            {unreadCount} Baru
                          </span>
                        )}
                      </div>

                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>Tandai dibaca</span>
                        </button>
                      )}
                    </div>

                    {/* Notification Items List */}
                    <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-0.5">
                      {notifications.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            toggleNotifItem(item.id);
                            if (item.targetSection) {
                              onNavigate(item.targetSection);
                              setNotifOpen(false);
                            }
                          }}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                            item.read
                              ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/70 dark:border-slate-800/70 opacity-80'
                              : 'bg-cyan-50/60 dark:bg-[#151922] border-cyan-400/40 dark:border-cyan-500/30 shadow-xs'
                          }`}
                        >
                          <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 mt-0.5">
                            {getNotifIcon(item.category)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <h5 className="text-xs font-bold text-slate-900 dark:text-white font-display truncate">
                                {item.title}
                              </h5>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono shrink-0">
                                {item.time}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          {!item.read && (
                            <span className="w-2 h-2 rounded-full bg-[#FF6A00] shrink-0 mt-1.5 shadow-[0_0_6px_rgba(255,106,0,0.8)]" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Notification Footer Link */}
                    <div className="mt-3 pt-2.5 border-t border-slate-200/90 dark:border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setNotifOpen(false);
                          onNavigate('intelligence');
                        }}
                        className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Buka Pusat Intelijensi JacS</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setNotifOpen(false)}
                        className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      >
                        Tutup
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                className="hidden 2xl:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-cyan-950/20 border border-slate-200 dark:border-slate-800 text-xs transition-colors cursor-pointer"
                title="Ganti Bahasa (ID / EN)"
              >
                <Globe className="w-3.5 h-3.5" strokeWidth={1.8} />
                <span className="uppercase text-[11px] font-semibold">{language}</span>
              </button>

              {/* Single 1-Click Theme Toggle Button */}
              <ThemeToggle />

              {/* User Role Selector / Avatar Dropdown */}
              <div className="hidden sm:block">
                <RoleSelector />
              </div>

              {/* Mobile Hamburger Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-cyan-950/20 border border-slate-200 dark:border-cyan-500/30 transition-colors focus:outline-none cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" strokeWidth={2} /> : <Menu className="w-5 h-5" strokeWidth={2} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with WCAG AAA Light & Dark Contrast */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed right-0 top-0 bottom-0 w-5/6 max-w-sm bg-white dark:bg-[#111419] border-l border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-250">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <JacSLogo size="sm" showText={true} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-app-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>

              {/* Telemetry in mobile drawer */}
              <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">CDN Aktif</span>
                  <span className="text-slate-400 font-bold">• {latency}ms</span>
                </div>
                <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                  {currentTime}
                </div>
              </div>

              {/* Mobile Role Switcher */}
              <div className="mt-4 pt-1 pb-3 border-b border-slate-200 dark:border-slate-800/80">
                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Peran Pengguna Aktif
                </div>
                <RoleSelector />
              </div>

              {/* Mobile Trio Automation Hub Card */}
              <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-cyan-500/10 via-[#FF6A00]/10 to-purple-500/10 border border-cyan-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#FF6A00]" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-display">
                      Trio Automation Engine (BYO)
                    </span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    isN8nConnected
                      ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {isN8nConnected ? 'Terhubung 🟢' : 'Setup BYO ⚪'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Otomasi alur kerja (n8n, Make, Zapier) mandiri dieksekusi langsung pada server/cloud instansi Anda.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openN8nConfig();
                  }}
                  className="mt-2.5 w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-[#FF6A00] to-purple-600 hover:opacity-90 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Kelola Trio Automation Hub</span>
                </button>
              </div>

              {/* Mobile Search Button */}
              <div className="mt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left text-sm text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-cyan-600 dark:text-cyan-400" strokeWidth={2} />
                    <span>Cari topik, aplikasi, data...</span>
                  </div>
                  <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300">
                    ⌘K
                  </kbd>
                </button>
              </div>

              {/* Navigation Links with High Contrast styling */}
              <div className="mt-5 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider px-2 mb-1">
                  Menu Utama
                </div>
                {NAVIGATION_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  const isAiTech = item.id === 'intelligence';
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (isAiTech && onOpenAiCatalog) {
                          onOpenAiCatalog();
                        } else {
                          onNavigate(item.id);
                        }
                      }}
                      className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ease-out text-left cursor-pointer border ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-400 shadow-xs'
                          : isAiTech
                          ? 'bg-cyan-50/70 dark:bg-cyan-950/30 text-cyan-900 dark:text-cyan-200 border-cyan-300 dark:border-cyan-500/40'
                          : 'bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isAiTech && <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
                        <span>{item.labelId}</span>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono ${
                        isActive
                          ? 'bg-blue-600 text-white dark:bg-cyan-500/25 dark:text-cyan-200'
                          : isAiTech
                          ? 'bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {isAiTech ? 'Katalog AI ↗' : item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom info inside drawer */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">Mode Tampilan:</span>
                <ThemeToggle />
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-mono">
                JacS Enterprise Portal &copy; 2026. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
