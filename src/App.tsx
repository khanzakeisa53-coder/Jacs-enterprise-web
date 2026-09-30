/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { RoleProvider } from './context/RoleContext';
import { N8nConfigProvider, useN8nConfig } from './context/N8nConfigContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickSearchModal } from './components/QuickSearchModal';
import { AppDetailModal } from './components/AppDetailModal';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { AiGeneratorCatalogModal } from './components/AiGeneratorCatalogModal';
import { N8nConfigModal } from './components/N8nConfigModal';
import { HomeView } from './views/HomeView';
import { ApplicationsView } from './views/ApplicationsView';
import { IntelligenceView } from './views/IntelligenceView';
import { InsightsView } from './views/InsightsView';
import { AboutView } from './views/AboutView';
import { WebApp, IntelligenceArticle } from './types';
import { WEB_APPLICATIONS } from './data/mockData';
import { BreakingNewsTicker } from './components/BreakingNewsTicker';

export function AppContent() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [aiCatalogOpen, setAiCatalogOpen] = useState<boolean>(false);
  const [selectedApp, setSelectedApp] = useState<WebApp | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<IntelligenceArticle | null>(null);
  const { isModalOpen: n8nModalOpen, setIsModalOpen: setN8nModalOpen } = useN8nConfig();

  // Global Ctrl + K / Cmd + K shortcut listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAppById = (appId: string) => {
    const found = WEB_APPLICATIONS.find((a) => a.id === appId);
    if (found) {
      setSelectedApp(found);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] dark:bg-[#0B0D10] text-slate-900 dark:text-white selection:bg-cyan-500/20 selection:text-cyan-600 dark:selection:text-cyan-400 font-sans transition-colors duration-200 relative overflow-x-hidden">
      
      {/* Ambient Mesh Glows in Background (Radial gradients in top-left & bottom-right) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Top-Left Ambient Cyan-500 Glow */}
        <div
          className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 blur-[140px] animate-pulse-slow"
          style={{ willChange: 'opacity, transform' }}
        />
        {/* Bottom-Right Ambient Blue-600 Glow */}
        <div
          className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full bg-blue-600/10 dark:bg-blue-600/10 blur-[140px] animate-pulse-slow"
          style={{ animationDelay: '4s', willChange: 'opacity, transform' }}
        />
        {/* Subtle Mid Accent Mesh Glow */}
        <div
          className="absolute top-1/3 -right-24 w-[450px] h-[450px] rounded-full bg-cyan-400/5 dark:bg-cyan-400/8 blur-[130px]"
        />
      </div>

      {/* Sticky Header / Navbar with Glowing Solid Neon Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAiCatalog={() => setAiCatalogOpen(true)}
      />

      {/* Live Breaking News Ticker (Seamless horizontal marquee telemetry) */}
      <BreakingNewsTicker
        onNavigate={handleNavigate}
        onOpenAiCatalog={() => setAiCatalogOpen(true)}
      />

      {/* Main Full-Width Portal Container */}
      <div className={`flex-1 w-full ${activeSection === 'home' ? 'max-w-[1540px] mx-auto px-2 sm:px-4 lg:px-6 overflow-hidden' : 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'}`}>
        
        {/* Dynamic Views Viewport */}
        <main className={`w-full ${activeSection === 'home' ? 'h-full overflow-hidden' : ''}`}>
          {activeSection === 'home' && (
            <HomeView
              onSelectApp={(app) => setSelectedApp(app)}
              onSelectArticle={(article) => setSelectedArticle(article)}
              onNavigate={handleNavigate}
              onOpenAiCatalog={() => setAiCatalogOpen(true)}
            />
          )}

          {activeSection === 'applications' && (
            <ApplicationsView onSelectApp={(app) => setSelectedApp(app)} />
          )}

          {activeSection === 'intelligence' && (
            <IntelligenceView onSelectArticle={(article) => setSelectedArticle(article)} />
          )}

          {activeSection === 'insights' && (
            <InsightsView onSelectArticle={(article) => setSelectedArticle(article)} />
          )}

          {activeSection === 'about' && (
            <AboutView />
          )}
        </main>
      </div>

      {/* Footer (Shown on content-rich subpages) */}
      {activeSection !== 'home' && (
        <Footer
          onNavigate={handleNavigate}
          onSelectAppById={handleSelectAppById}
        />
      )}

      {/* Global Quick Search Modal (Ctrl + K) */}
      <QuickSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectApp={(app) => setSelectedApp(app)}
        onSelectArticle={(article) => setSelectedArticle(article)}
        onNavigate={handleNavigate}
      />

      {/* App Detail Modal */}
      <AppDetailModal
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
      />

      {/* Article Detail Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onSelectArticle={(article) => setSelectedArticle(article)}
      />

      {/* Curated AI Generator Catalog Hub Modal */}
      <AiGeneratorCatalogModal
        isOpen={aiCatalogOpen}
        onClose={() => setAiCatalogOpen(false)}
        onNavigateToIntelligence={() => handleNavigate('intelligence')}
      />

      {/* Integrasi n8n Mandiri Klien (BYO-Instance) Modal */}
      <N8nConfigModal
        isOpen={n8nModalOpen}
        onClose={() => setN8nModalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RoleProvider>
        <N8nConfigProvider>
          <AppContent />
        </N8nConfigProvider>
      </RoleProvider>
    </ThemeProvider>
  );
}
