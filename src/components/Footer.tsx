import React from 'react';
import { JacSLogo } from './JacSLogo';
import { Youtube, Facebook, Instagram, Linkedin, Twitter, ArrowUpRight, ShieldCheck, Cpu, Sparkles } from 'lucide-react';
import { WebApp } from '../types';
import { apps } from '../data/mockData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectAppById: (appId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectAppById,
}) => {
  return (
    <footer className="bg-app-surface/90 dark:bg-[#0B0D10]/95 backdrop-blur-md border-t border-app-border dark:border-white/10 text-app-text-secondary mt-16 sm:mt-24 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand & Positioning Column (Span 2 on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <JacSLogo size="md" showText={true} withGlow={true} />
            <p className="text-sm text-app-text-secondary leading-relaxed max-w-sm mt-3">
              JacS Enterprise adalah ekosistem digital terpadu yang menyatukan platform aplikasi bisnis, pendidikan, operasional, serta pusat intelijen kecerdasan buatan untuk masa depan yang lebih baik.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-app-text-muted">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                Enterprise Security
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Cpu className="w-4 h-4 text-blue-400" />
                AI-Driven Core
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                {apps.length} Interconnected Apps
              </span>
            </div>

            {/* Social Icons */}
            <div className="pt-3 flex items-center gap-3">
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-8 h-8 rounded-app-md bg-app-elevated border border-app-border flex items-center justify-center text-app-text-muted hover:text-red-500 hover:border-red-500/30 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-app-md bg-app-elevated border border-app-border flex items-center justify-center text-app-text-muted hover:text-blue-500 hover:border-blue-500/30 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-app-md bg-app-elevated border border-app-border flex items-center justify-center text-app-text-muted hover:text-pink-500 hover:border-pink-500/30 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-app-md bg-app-elevated border border-app-border flex items-center justify-center text-app-text-muted hover:text-blue-400 hover:border-blue-400/30 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#x"
                aria-label="X / Twitter"
                className="w-8 h-8 rounded-app-md bg-app-elevated border border-app-border flex items-center justify-center text-app-text-muted hover:text-app-text-primary hover:border-app-border transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1 (Platform) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-app-text-primary">
              Platform
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-app-text-primary transition-colors text-left"
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-app-text-primary transition-colors text-left"
                >
                  Technology Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('applications')}
                  className="hover:text-app-text-primary transition-colors text-left"
                >
                  Ecosystem Integration
                </button>
              </li>
              <li>
                <span className="text-app-text-muted flex items-center gap-1 cursor-default">
                  Security & Compliance
                </span>
              </li>
              <li>
                <span className="text-app-text-muted flex items-center gap-1 cursor-default">
                  Infrastructure Cloud
                </span>
              </li>
            </ul>
          </div>

          {/* Column 2 (Applications) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-app-text-primary">
              Aplikasi JacS ({apps.length} Apps)
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onSelectAppById('studio-suite')}
                  className="hover:text-purple-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Studio Suite</span>
                  <span className="text-[10px] px-1 py-0.2 rounded bg-purple-500/10 text-purple-400 font-mono">v3.4</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectAppById('sekolahkita')}
                  className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Sekolahkita</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectAppById('koskita')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>KosKita</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectAppById('retail-os')}
                  className="hover:text-red-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>RetailOS</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectAppById('master-pro')}
                  className="hover:text-indigo-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>MasterPro</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectAppById('enterprise-suite')}
                  className="hover:text-purple-400 transition-colors text-left flex items-center gap-1.5 font-medium"
                >
                  <span>Enterprise Suite</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectAppById('depohub')}
                  className="hover:text-sky-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>DepoHub</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectAppById('jacs-app-pro')}
                  className="hover:text-orange-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>JacS App PRO</span>
                  <span className="text-[10px] px-1 py-0.2 rounded bg-orange-500/10 text-orange-400 font-mono">v2.5</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 (Intelligence) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-app-text-primary">
              Intelligence
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('intelligence')}
                  className="hover:text-app-text-primary transition-colors text-left"
                >
                  AI & Model Frontier
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intelligence')}
                  className="hover:text-app-text-primary transition-colors text-left"
                >
                  Technology News
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('insights')}
                  className="hover:text-app-text-primary transition-colors text-left"
                >
                  Research & Whitepapers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('insights')}
                  className="hover:text-app-text-primary transition-colors text-left"
                >
                  Industry Trends 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('insights')}
                  className="hover:text-app-text-primary transition-colors text-left"
                >
                  Transformasi Digital
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: © 2026 JacS Enterprise, Privacy, Terms, Contact */}
        <div className="mt-12 pt-6 border-t border-app-border/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-app-text-muted">
          <div>
            &copy; 2026 JacS Enterprise. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <a href="#privacy" className="hover:text-app-text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-app-text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#security" className="hover:text-app-text-primary transition-colors">
              Security
            </a>
            <a href="#contact" className="hover:text-app-text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
