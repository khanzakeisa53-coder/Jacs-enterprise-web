import React, { useState, useEffect } from 'react';
import { Sparkles, Radio, Zap, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

interface BreakingNewsTickerProps {
  onNavigate?: (sectionId: string) => void;
  onOpenAiCatalog?: () => void;
}

interface TickerItem {
  id: string;
  iconText: string;
  title: string;
  tag: string;
  sectionId?: string;
  isAiHub?: boolean;
}

export const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({
  onNavigate,
  onOpenAiCatalog,
}) => {
  const [latency, setLatency] = useState<number>(22);

  // Dynamic realistic latency variation between 18ms and 28ms
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(18 + Math.random() * 11)); // 18 - 28ms
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const tickerItems: TickerItem[] = [
    {
      id: 'item-1',
      iconText: '🔥',
      title: 'AI Models Updated',
      tag: 'Google Gemini & Frontier Cores Ready',
      isAiHub: true,
    },
    {
      id: 'item-2',
      iconText: '⚡',
      title: `Ecosystem Latency ${latency}ms`,
      tag: 'Edge CDN Global Synchronized',
      sectionId: 'home',
    },
    {
      id: 'item-3',
      iconText: '🚀',
      title: 'SEKOLAHKITA V2.4 Active',
      tag: 'ERP Pendidikan Multi-Jenjang',
      sectionId: 'applications',
    },
    {
      id: 'item-4',
      iconText: '📦',
      title: 'DepoHub PRO Synchronized',
      tag: 'Smart Logistics & WMS RFID',
      sectionId: 'applications',
    },
    {
      id: 'item-5',
      iconText: '🧠',
      title: 'JacS Builder Studio Online',
      tag: 'AI Generative Pipeline Active',
      isAiHub: true,
    },
    {
      id: 'item-6',
      iconText: '🛡️',
      title: 'Zero-Trust Protocol Engaged',
      tag: 'ISO 27001 Security Audit Passed',
      sectionId: 'about',
    },
    {
      id: 'item-7',
      iconText: '🏬',
      title: 'RetailOS Multi-Store Gateway',
      tag: 'Live Cloud POS v3.1',
      sectionId: 'applications',
    },
  ];

  const handleItemClick = (item: TickerItem) => {
    if (item.isAiHub && onOpenAiCatalog) {
      onOpenAiCatalog();
    } else if (item.sectionId && onNavigate) {
      onNavigate(item.sectionId);
    }
  };

  return (
    <div className="w-full bg-slate-900/90 dark:bg-[#07090e]/85 backdrop-blur-xl border-y border-cyan-500/20 text-slate-300 relative overflow-hidden select-none z-20 shadow-xs dark:shadow-[0_4px_20px_rgba(6,182,212,0.06)]">
      <div className="max-w-[1500px] mx-auto px-2 sm:px-4 flex items-center h-7 py-1 text-xs">
        
        {/* Left Pinned Live Telemetry Badge with Pulse Animation */}
        <div className="flex items-center gap-2 pr-2.5 sm:pr-3 py-0.5 border-r border-slate-700/60 dark:border-cyan-500/30 flex-shrink-0 z-10 bg-slate-900/95 dark:bg-[#07090e]/95">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.2 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 font-mono text-[9.5px] font-bold uppercase tracking-wider shadow-[0_0_8px_rgba(6,182,212,0.35)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
            </span>
            <span className="hidden xs:inline">LIVE FEED</span>
            <span className="xs:hidden">LIVE</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-[9.5px] font-mono text-cyan-400/90 font-medium">
            <Radio className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
            <span>TELEMETRI</span>
          </div>
        </div>

        {/* Marquee Track Container with gradient fade mask on both edges */}
        <div className="flex-1 overflow-hidden relative group h-full flex items-center">
          
          {/* Subtle Left Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-slate-900 dark:from-[#07090e] to-transparent pointer-events-none z-10" />
          
          {/* Subtle Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-slate-900 dark:from-[#07090e] to-transparent pointer-events-none z-10" />

          {/* Scrolling Content (Repeated twice for uninterrupted seamless loop) */}
          <div className="animate-marquee flex items-center gap-6 sm:gap-8 whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => handleItemClick(item)}
                className="inline-flex items-center gap-2 cursor-pointer transition-all duration-200 text-xs text-slate-300 hover:text-cyan-300 group/item"
                title={`${item.title} - ${item.tag}`}
              >
                <span className="text-sm select-none">{item.iconText}</span>
                <span className="font-bold tracking-tight text-white group-hover/item:text-cyan-300 transition-colors">
                  {item.title}
                </span>
                <span className="text-[11px] text-slate-400 font-normal">
                  ({item.tag})
                </span>
                <span className="text-cyan-500/60 text-xs mx-1 font-bold">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Corner Indicator: Eco-Status & Speed */}
        <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-slate-700/60 dark:border-cyan-500/30 flex-shrink-0 z-10 bg-slate-900/95 dark:bg-[#07090e]/95 text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            99.99% Uptime
          </span>
          <span>•</span>
          <span className="text-cyan-400 font-semibold">{latency}ms</span>
        </div>

      </div>
    </div>
  );
};
