import React, { useState } from 'react';
import {
  Zap,
  ExternalLink,
  Settings2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Send,
  Layers,
  Sparkles,
  ShieldCheck,
  Info,
  X,
  Workflow,
  Radio,
  Trash2,
  Cpu,
  Download,
  FileJson,
} from 'lucide-react';
import { useN8nConfig } from '../context/N8nConfigContext';
import {
  AUTOMATION_PAYLOAD_PRESETS,
  N8N_WORKFLOW_BLUEPRINT,
  MAKE_SCENARIO_BLUEPRINT,
  downloadJsonFile,
  dispatchRealWebhook,
} from '../data/automationBlueprints';

interface TrioAutomationHubProps {
  onClose?: () => void;
  isStandalone?: boolean;
}

export const TrioAutomationHub: React.FC<TrioAutomationHubProps> = ({
  onClose,
  isStandalone = false,
}) => {
  const {
    config: n8nConfig,
    makeConfig,
    zapierConfig,
    isConnected: isN8nConnected,
    isConfigured: isN8nConfigured,
    isMakeConnected,
    isMakeConfigured,
    isZapierConnected,
    isZapierConfigured,
    openN8nConfig,
    saveMakeConfig,
    saveZapierConfig,
    testMakeWebhook,
    testZapierWebhook,
    resetMakeConfig,
    resetZapierConfig,
  } = useN8nConfig();

  // Dialog State for Make
  const [isMakeModalOpen, setIsMakeModalOpen] = useState(false);
  const [makeWebhookInput, setMakeWebhookInput] = useState(makeConfig.webhookUrl);
  const [makeTesting, setMakeTesting] = useState(false);
  const [makeFeedback, setMakeFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [selectedMakePresetId, setSelectedMakePresetId] = useState<string>(AUTOMATION_PAYLOAD_PRESETS[0].id);
  const [isMakeDispatching, setIsMakeDispatching] = useState<boolean>(false);
  const [makeDispatchFeedback, setMakeDispatchFeedback] = useState<{
    success: boolean;
    message: string;
    statusCode?: number;
    latencyMs?: number;
  } | null>(null);

  // Dialog State for Zapier
  const [isZapierModalOpen, setIsZapierModalOpen] = useState(false);
  const [zapierWebhookInput, setZapierWebhookInput] = useState(zapierConfig.webhookUrl);
  const [zapierTesting, setZapierTesting] = useState(false);
  const [zapierFeedback, setZapierFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [selectedZapierPresetId, setSelectedZapierPresetId] = useState<string>(AUTOMATION_PAYLOAD_PRESETS[0].id);
  const [isZapierDispatching, setIsZapierDispatching] = useState<boolean>(false);
  const [zapierDispatchFeedback, setZapierDispatchFeedback] = useState<{
    success: boolean;
    message: string;
    statusCode?: number;
    latencyMs?: number;
  } | null>(null);

  // Global Blueprint Download Toast
  const [blueprintToast, setBlueprintToast] = useState<string | null>(null);

  const handleDownloadN8nBlueprint = () => {
    downloadJsonFile('n8n-workflow-jacs-blueprint.json', N8N_WORKFLOW_BLUEPRINT);
    setBlueprintToast('Blueprint n8n Workflow (.json) berhasil diunduh!');
    setTimeout(() => setBlueprintToast(null), 3000);
  };

  const handleDownloadMakeBlueprint = () => {
    downloadJsonFile('make-scenario-jacs-blueprint.json', MAKE_SCENARIO_BLUEPRINT);
    setBlueprintToast('Blueprint Skenario Make.com (.json) berhasil diunduh!');
    setTimeout(() => setBlueprintToast(null), 3000);
  };

  // Quick Copy Feedback
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(id);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // Open instance URL for n8n
  const handleOpenN8nInstance = () => {
    const targetUrl = n8nConfig.instanceUrl.trim()
      ? n8nConfig.instanceUrl.trim()
      : 'https://n8n.io';
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  // Handle Dispatch Real Payload for Make
  const handleDispatchMakeSample = async () => {
    const url = makeWebhookInput.trim();
    if (!url) {
      setMakeDispatchFeedback({
        success: false,
        message: 'Silakan isi URL Webhook Make.com terlebih dahulu.',
      });
      return;
    }

    setIsMakeDispatching(true);
    setMakeDispatchFeedback(null);

    const preset = AUTOMATION_PAYLOAD_PRESETS.find((p) => p.id === selectedMakePresetId) || AUTOMATION_PAYLOAD_PRESETS[0];
    const payload = {
      event: preset.id,
      eventName: preset.name,
      source: preset.app,
      dispatchedAt: new Date().toISOString(),
      ...preset.payload,
    };

    try {
      const res = await dispatchRealWebhook(url, payload);
      setMakeDispatchFeedback({
        success: res.success,
        message: res.message,
        statusCode: res.statusCode,
        latencyMs: res.latencyMs,
      });

      if (res.success) {
        saveMakeConfig({
          webhookUrl: url,
          isConnected: true,
          lastTriggerAt: new Date().toLocaleTimeString('id-ID'),
        });
      }
    } catch {
      setMakeDispatchFeedback({
        success: false,
        message: 'Gagal mengirimkan request ke webhook Make.com.',
      });
    } finally {
      setIsMakeDispatching(false);
    }
  };

  // Handle Dispatch Real Payload for Zapier
  const handleDispatchZapierSample = async () => {
    const url = zapierWebhookInput.trim();
    if (!url) {
      setZapierDispatchFeedback({
        success: false,
        message: 'Silakan isi URL Webhook Zapier Catch Hook terlebih dahulu.',
      });
      return;
    }

    setIsZapierDispatching(true);
    setZapierDispatchFeedback(null);

    const preset = AUTOMATION_PAYLOAD_PRESETS.find((p) => p.id === selectedZapierPresetId) || AUTOMATION_PAYLOAD_PRESETS[0];
    const payload = {
      event: preset.id,
      eventName: preset.name,
      source: preset.app,
      dispatchedAt: new Date().toISOString(),
      ...preset.payload,
    };

    try {
      const res = await dispatchRealWebhook(url, payload);
      setZapierDispatchFeedback({
        success: res.success,
        message: res.message,
        statusCode: res.statusCode,
        latencyMs: res.latencyMs,
      });

      if (res.success) {
        saveZapierConfig({
          webhookUrl: url,
          isConnected: true,
          lastTriggerAt: new Date().toLocaleTimeString('id-ID'),
        });
      }
    } catch {
      setZapierDispatchFeedback({
        success: false,
        message: 'Gagal mengirimkan request ke webhook Zapier.',
      });
    } finally {
      setIsZapierDispatching(false);
    }
  };

  // Handle Save & Test Make Webhook
  const handleSaveMake = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = makeWebhookInput.trim();
    saveMakeConfig({ webhookUrl: url });

    if (!url) {
      setMakeFeedback({ success: false, message: 'URL Webhook Make.com tidak boleh kosong.' });
      return;
    }

    setMakeTesting(true);
    setMakeFeedback(null);
    try {
      const res = await testMakeWebhook();
      setMakeFeedback({ success: res.success, message: res.message });
      if (res.success) {
        setTimeout(() => setIsMakeModalOpen(false), 1400);
      }
    } catch {
      setMakeFeedback({ success: false, message: 'Gagal mengirimkan trigger uji coba ke Make.com.' });
    } finally {
      setMakeTesting(false);
    }
  };

  // Handle Save & Test Zapier Webhook
  const handleSaveZapier = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = zapierWebhookInput.trim();
    saveZapierConfig({ webhookUrl: url });

    if (!url) {
      setZapierFeedback({ success: false, message: 'URL Webhook Zapier tidak boleh kosong.' });
      return;
    }

    setZapierTesting(true);
    setZapierFeedback(null);
    try {
      const res = await testZapierWebhook();
      setZapierFeedback({ success: res.success, message: res.message });
      if (res.success) {
        setTimeout(() => setIsZapierModalOpen(false), 1400);
      }
    } catch {
      setZapierFeedback({ success: false, message: 'Gagal mengirimkan trigger uji coba ke Zapier.' });
    } finally {
      setZapierTesting(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-between max-h-[calc(100vh-14rem)] min-h-[460px] overflow-hidden space-y-2.5">
      
      {/* Header Hub */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-700/60 pb-2.5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-gradient-to-br from-cyan-500/20 via-[#FF6A00]/20 to-purple-600/20 border border-cyan-500/40 text-cyan-300 shadow-sm shrink-0">
            <Cpu className="w-4.5 h-4.5 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-white font-display tracking-tight flex items-center gap-2">
                <span>TRIO AUTOMATION ENGINE HUB</span>
                <span className="text-[9px] px-2 py-0.2 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 font-mono font-bold">
                  BYO-ENGINE
                </span>
              </h3>
            </div>
            <p className="text-[11px] text-slate-300 line-clamp-1">
              Orkestrasi alur kerja multi-cabang & API eksternal mandiri (Client-Dedicated).
            </p>
          </div>
        </div>

        {/* Global Summary Badge & Return Button */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-400">Status:</span>
            <span className="font-bold text-cyan-300">
              {[isN8nConnected, isMakeConnected, isZapierConnected].filter(Boolean).length}/3 Aktif
            </span>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-cyan-400/40 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)] hover:shadow-[0_0_18px_rgba(6,182,212,0.5)] cursor-pointer active:scale-95 shrink-0 select-none"
              title="Kembali ke Panggung Showcase Aplikasi"
            >
              <span>← Kembali ke Showcase</span>
              <X className="w-3.5 h-3.5 opacity-70" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable / Compact Cards Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 py-0.5 space-y-2.5">
        {/* Grid 3 Kolom: 3 Kartu Berjejer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
          
          {/* ========================================================
              KARTU 1: n8n Automation Studio
              ======================================================== */}
          <div className="rounded-xl bg-gradient-to-b from-slate-900/95 via-slate-950 to-[#070b12] border-2 border-cyan-500/50 hover:border-cyan-400 p-3.5 flex flex-col justify-between transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_28px_rgba(6,182,212,0.35)] relative group overflow-hidden">
            
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />

            <div className="space-y-2 relative z-10">
              {/* Badge */}
              <div className="flex items-center justify-between gap-1">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-400/60 uppercase tracking-wider backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>SELF-HOSTED / CLOUD • KEDAULATAN DATA</span>
                </span>
              </div>

              {/* Ikon & Judul */}
              <div className="flex items-center gap-2.5 pt-0.5">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#FF6A00]/20 to-cyan-500/20 text-[#FF6A00] border border-[#FF6A00]/40 shadow-xs shrink-0">
                  <Zap className="w-5 h-5 text-[#FF6A00]" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-white font-display tracking-tight flex items-center gap-1">
                    <span>[⚡] n8n Automation</span>
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isN8nConnected ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-500'}`} />
                    <span className={isN8nConnected ? 'text-emerald-300 font-bold' : 'text-slate-400'}>
                      {isN8nConnected ? `Terhubung (${n8nConfig.pingLatencyMs || 28}ms)` : isN8nConfigured ? 'Terkonfigurasi' : 'Belum Terhubung'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Deskripsi */}
              <p className="text-[11px] text-slate-300/90 leading-snug line-clamp-2 min-h-0">
                Alur kerja node-based mandiri & AI Agent LangChain. 100% kontrol data internal & bebas kuota.
              </p>

              {/* Config Summary Preview */}
              <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-[10px] font-mono text-slate-400 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span>Instance:</span>
                  <span className="text-cyan-300 truncate max-w-[130px]">
                    {n8nConfig.instanceUrl ? n8nConfig.instanceUrl.replace(/^https?:\/\//, '') : 'Belum diisi'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tipe:</span>
                  <span className="text-slate-300">
                    {n8nConfig.hostingType === 'self_hosted' ? 'Self-Hosted VPS' : 'Cloud Resmi'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2.5 mt-2 border-t border-slate-800/80 space-y-1.5 relative z-10">
              {/* Tombol Setup Utama */}
              <button
                type="button"
                onClick={openN8nConfig}
                className="w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.35)] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Setup Webhook BYO</span>
              </button>

              {/* Tombol Sekunder Berjejer */}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={handleOpenN8nInstance}
                  className="py-1 px-2 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-cyan-300 hover:text-white border border-cyan-500/40 text-[10.5px] font-semibold transition-all flex items-center justify-center gap-1 truncate cursor-pointer"
                >
                  <span>Buka Instance</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </button>
                <button
                  type="button"
                  onClick={handleDownloadN8nBlueprint}
                  className="py-1 px-2 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 hover:text-white border border-cyan-500/30 text-[10.5px] font-semibold transition-all flex items-center justify-center gap-1 truncate cursor-pointer"
                  title="Unduh Blueprint .json"
                >
                  <Download className="w-3 h-3 shrink-0" />
                  <span>Blueprint .json</span>
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================
              KARTU 2: Make.com Canvas
              ======================================================== */}
          <div className="rounded-xl bg-gradient-to-b from-slate-900/95 via-slate-950 to-[#0c0817] border-2 border-purple-500/50 hover:border-purple-400 p-3.5 flex flex-col justify-between transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_28px_rgba(168,85,247,0.35)] relative group overflow-hidden">
            
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-all" />

            <div className="space-y-2 relative z-10">
              {/* Badge */}
              <div className="flex items-center justify-between gap-1">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-950/80 text-purple-300 border border-purple-400/60 uppercase tracking-wider backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <span>CLOUD SCENARIOS • VISUAL ROUTING</span>
                </span>
              </div>

              {/* Ikon & Judul */}
              <div className="flex items-center gap-2.5 pt-0.5">
                <div className="p-2 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/40 shadow-xs shrink-0">
                  <Workflow className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-white font-display tracking-tight flex items-center gap-1">
                    <span>[🟣] Make Workflow</span>
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isMakeConnected ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-500'}`} />
                    <span className={isMakeConnected ? 'text-emerald-300 font-bold' : 'text-slate-400'}>
                      {isMakeConnected ? 'Tersambung (Webhook OK)' : isMakeConfigured ? 'Webhook Tersimpan' : 'Belum Dihubungkan'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Deskripsi */}
              <p className="text-[11px] text-slate-300/90 leading-snug line-clamp-2 min-h-0">
                Orkestrasi skenario visual multi-aplikasi tanpa batas. Router logika kompleks & iterasi array.
              </p>

              {/* Config Summary Preview */}
              <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-[10px] font-mono text-slate-400 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span>Webhook:</span>
                  <span className="text-purple-300 truncate max-w-[130px]">
                    {makeConfig.webhookUrl ? makeConfig.webhookUrl.replace(/^https?:\/\//, '') : 'Belum diisi'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <span className="text-slate-300">
                    {makeConfig.lastTriggerAt ? `Aktif (${makeConfig.lastTriggerAt})` : 'Standby'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2.5 mt-2 border-t border-slate-800/80 space-y-1.5 relative z-10">
              {/* Tombol Setup Utama */}
              <button
                type="button"
                onClick={() => {
                  setMakeWebhookInput(makeConfig.webhookUrl);
                  setMakeFeedback(null);
                  setMakeDispatchFeedback(null);
                  setIsMakeModalOpen(true);
                }}
                className="w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-[0_0_12px_rgba(168,85,247,0.35)] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Hubungkan Webhook Make</span>
              </button>

              {/* Tombol Sekunder Berjejer */}
              <div className="grid grid-cols-2 gap-1.5">
                <a
                  href="https://make.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1 px-2 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-purple-300 hover:text-white border border-purple-500/40 text-[10.5px] font-semibold transition-all flex items-center justify-center gap-1 truncate cursor-pointer"
                >
                  <span>Buka Make.com</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
                <button
                  type="button"
                  onClick={handleDownloadMakeBlueprint}
                  className="py-1 px-2 rounded-lg bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 hover:text-white border border-purple-500/30 text-[10.5px] font-semibold transition-all flex items-center justify-center gap-1 truncate cursor-pointer"
                  title="Unduh Blueprint .json"
                >
                  <Download className="w-3 h-3 shrink-0" />
                  <span>Blueprint .json</span>
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================
              KARTU 3: Zapier Ecosystem
              ======================================================== */}
          <div className="rounded-xl bg-gradient-to-b from-slate-900/95 via-slate-950 to-[#120a06] border-2 border-amber-500/50 hover:border-amber-400 p-3.5 flex flex-col justify-between transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_28px_rgba(245,158,11,0.35)] relative group overflow-hidden">
            
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />

            <div className="space-y-2 relative z-10">
              {/* Badge */}
              <div className="flex items-center justify-between gap-1">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-400/60 uppercase tracking-wider backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>INSTANT NO-CODE • 7000+ APPS</span>
                </span>
              </div>

              {/* Ikon & Judul */}
              <div className="flex items-center gap-2.5 pt-0.5">
                <div className="p-2 rounded-lg bg-[#FF4A00]/20 text-[#FF4A00] border border-[#FF4A00]/40 shadow-xs shrink-0">
                  <Sparkles className="w-5 h-5 text-[#FF4A00]" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-white font-display tracking-tight flex items-center gap-1">
                    <span>[🟠] Zapier Trigger</span>
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isZapierConnected ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-500'}`} />
                    <span className={isZapierConnected ? 'text-emerald-300 font-bold' : 'text-slate-400'}>
                      {isZapierConnected ? 'Tersambung (Zap Active)' : isZapierConfigured ? 'Webhook Tersimpan' : 'Belum Dihubungkan'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Deskripsi */}
              <p className="text-[11px] text-slate-300/90 leading-snug line-clamp-2 min-h-0">
                Integrasi kilat ribuan SaaS untuk operasional instan. Tautkan Google Sheets, Slack, & CRM.
              </p>

              {/* Config Summary Preview */}
              <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-[10px] font-mono text-slate-400 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span>Catch Hook:</span>
                  <span className="text-amber-300 truncate max-w-[130px]">
                    {zapierConfig.webhookUrl ? zapierConfig.webhookUrl.replace(/^https?:\/\//, '') : 'Belum diisi'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <span className="text-slate-300">
                    {zapierConfig.lastTriggerAt ? `Aktif (${zapierConfig.lastTriggerAt})` : 'Standby'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2.5 mt-2 border-t border-slate-800/80 space-y-1.5 relative z-10">
              {/* Tombol Setup Utama */}
              <button
                type="button"
                onClick={() => {
                  setZapierWebhookInput(zapierConfig.webhookUrl);
                  setZapierFeedback(null);
                  setIsZapierModalOpen(true);
                }}
                className="w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 text-xs font-bold transition-all shadow-[0_0_12px_rgba(245,158,11,0.35)] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Hubungkan Zap Webhook</span>
              </button>

              {/* Tombol Buka Zapier */}
              <a
                href="https://zapier.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-1 px-2 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-amber-300 hover:text-white border border-amber-500/40 text-[10.5px] font-semibold transition-all flex items-center justify-center gap-1 truncate cursor-pointer"
              >
                <span>Buka Zapier Platform ↗</span>
              </a>
            </div>
          </div>

        </div>

        {/* Disclaimer Legalitas Transparan */}
        <div className="p-2 sm:p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] sm:text-[11px] text-slate-400 flex items-start gap-2 shadow-xs shrink-0">
          <span className="text-amber-400 text-xs leading-none shrink-0 mt-0.5">💡</span>
          <p className="leading-snug">
            <strong className="text-slate-300">Arsitektur BYO Mandiri:</strong> n8n, Make, dan Zapier adalah merek dagang penyedia terkait. JacS Enterprise menyediakan jembatan integrasi mandiri di mana kredensial & kuota dikelola langsung oleh pengguna.
          </p>
        </div>
      </div>

      {/* Global Blueprint Download Toast */}
      {blueprintToast && (
        <div className="fixed bottom-6 right-6 z-50 p-3.5 rounded-xl bg-emerald-950/90 border-2 border-emerald-400 text-emerald-200 text-xs font-mono flex items-center gap-2.5 shadow-[0_0_28px_rgba(52,211,153,0.7)] animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
          <span className="font-bold">{blueprintToast}</span>
        </div>
      )}

      {/* ========================================================
          MODAL DIALOG: Hubungkan Webhook Make.com
          ======================================================== */}
      {isMakeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl bg-[#0c1017] border border-purple-500/50 shadow-2xl overflow-hidden p-5 sm:p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Workflow className="w-5 h-5 text-purple-400" />
                <h4 className="text-sm font-extrabold text-white font-display">
                  Hubungkan Webhook Klien Make.com
                </h4>
              </div>
              <button
                onClick={() => setIsMakeModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Template Blueprint Make Download */}
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <FileJson className="w-3.5 h-3.5 text-purple-400" />
                  <span>Template Blueprint Skenario Make.com (.json)</span>
                </div>
                <p className="text-[10.5px] text-slate-400">
                  Import langsung ke Make: Custom Webhook → JSON Parser → Router Event.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownloadMakeBlueprint}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>[ 📥 Download Make Scenario Blueprint (.json) ]</span>
              </button>
            </div>

            <form onSubmit={handleSaveMake} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  URL Custom Webhook Make.com Klien
                </label>
                <input
                  type="url"
                  value={makeWebhookInput}
                  onChange={(e) => setMakeWebhookInput(e.target.value)}
                  placeholder="https://hook.eu1.make.com/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Salin URL modul "Custom Webhook" dari skenario Make.com instansi Anda.
                </p>
              </div>

              {/* Simulator & Uji Kirim Data Riil (Prompt Requirement 1) */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                    <Zap className="w-3.5 h-3.5 text-purple-400" />
                    <span>Simulator Payload Event JacS Enterprise</span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                    Live Test
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {AUTOMATION_PAYLOAD_PRESETS.map((p) => {
                      const isSel = selectedMakePresetId === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setSelectedMakePresetId(p.id)}
                          className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                            isSel
                              ? 'border-purple-400 bg-purple-950/50 text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                              : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-purple-500/50'
                          }`}
                        >
                          <div className="text-[9px] font-mono text-purple-400 font-bold">{p.badge}</div>
                          <div className="text-[11px] font-bold mt-0.5 line-clamp-1">{p.name}</div>
                          <div className="text-[9.5px] text-slate-400 line-clamp-2 mt-1">{p.summary}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-1 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={handleDispatchMakeSample}
                      disabled={isMakeDispatching || !makeWebhookInput.trim()}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_16px_rgba(16,185,129,0.4)] hover:shadow-[0_0_24px_rgba(16,185,129,0.7)] active:scale-95"
                    >
                      <Send className={`w-3.5 h-3.5 ${isMakeDispatching ? 'animate-pulse' : ''}`} />
                      <span>{isMakeDispatching ? 'Mengirim Payload...' : '[ 📨 Kirim Sample Payload JSON ]'}</span>
                    </button>
                  </div>
                </div>

                {/* Real Dispatch Result Feedback with Glowing Neon Green Glow */}
                {makeDispatchFeedback && (
                  <div
                    className={`p-3 rounded-xl text-xs font-mono transition-all duration-300 ${
                      makeDispatchFeedback.success
                        ? 'bg-emerald-950/80 border-2 border-emerald-400 text-emerald-200 shadow-[0_0_24px_rgba(52,211,153,0.6)]'
                        : 'bg-red-950/70 border-2 border-red-500 text-red-200 shadow-[0_0_18px_rgba(239,68,68,0.4)]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {makeDispatchFeedback.success ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">
                            {makeDispatchFeedback.success ? '🟢 200 OK • Webhook Diterima' : '🔴 Gagal Terkirim'}
                          </span>
                          {makeDispatchFeedback.latencyMs !== undefined && (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/40 text-[10px]">
                              {makeDispatchFeedback.latencyMs} ms
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-200">
                          {makeDispatchFeedback.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Feedback Alert */}
              {makeFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 font-mono ${
                    makeFeedback.success
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
                      : 'bg-red-950/60 text-red-300 border border-red-500/40'
                  }`}
                >
                  {makeFeedback.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{makeFeedback.message}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                {isMakeConfigured && (
                  <button
                    type="button"
                    onClick={() => {
                      resetMakeConfig();
                      setMakeWebhookInput('');
                      setMakeFeedback(null);
                      setMakeDispatchFeedback(null);
                    }}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Webhook</span>
                  </button>
                )}
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsMakeModalOpen(false)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Tutup
                  </button>
                  <button
                    type="submit"
                    disabled={makeTesting}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className={`w-3.5 h-3.5 ${makeTesting ? 'animate-spin' : ''}`} />
                    <span>{makeTesting ? 'Menyimpan...' : 'Simpan Webhook'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL DIALOG: Hubungkan Webhook Zapier
          ======================================================== */}
      {isZapierModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl bg-[#0c1017] border border-amber-500/50 shadow-2xl overflow-hidden p-5 sm:p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FF4A00]" />
                <h4 className="text-sm font-extrabold text-white font-display">
                  Hubungkan Zapier Catch Hook Klien
                </h4>
              </div>
              <button
                onClick={() => setIsZapierModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveZapier} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  URL Webhooks by Zapier (Catch Hook)
                </label>
                <input
                  type="url"
                  value={zapierWebhookInput}
                  onChange={(e) => setZapierWebhookInput(e.target.value)}
                  placeholder="https://hooks.zapier.com/hooks/catch/1234567/abcdef/"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Salin webhook trigger URL dari Zap "Webhooks by Zapier - Catch Hook" Anda.
                </p>
              </div>

              {/* Simulator & Uji Kirim Data Riil (Prompt Requirement 1) */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Simulator Payload Event JacS Enterprise</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                    Live Test
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {AUTOMATION_PAYLOAD_PRESETS.map((p) => {
                      const isSel = selectedZapierPresetId === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setSelectedZapierPresetId(p.id)}
                          className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                            isSel
                              ? 'border-amber-400 bg-amber-950/50 text-white shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                              : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-amber-500/50'
                          }`}
                        >
                          <div className="text-[9px] font-mono text-amber-400 font-bold">{p.badge}</div>
                          <div className="text-[11px] font-bold mt-0.5 line-clamp-1">{p.name}</div>
                          <div className="text-[9.5px] text-slate-400 line-clamp-2 mt-1">{p.summary}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-1 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={handleDispatchZapierSample}
                      disabled={isZapierDispatching || !zapierWebhookInput.trim()}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_16px_rgba(16,185,129,0.4)] hover:shadow-[0_0_24px_rgba(16,185,129,0.7)] active:scale-95"
                    >
                      <Send className={`w-3.5 h-3.5 ${isZapierDispatching ? 'animate-pulse' : ''}`} />
                      <span>{isZapierDispatching ? 'Mengirim Payload...' : '[ 📨 Kirim Sample Payload JSON ]'}</span>
                    </button>
                  </div>
                </div>

                {/* Real Dispatch Result Feedback with Glowing Neon Green Glow */}
                {zapierDispatchFeedback && (
                  <div
                    className={`p-3 rounded-xl text-xs font-mono transition-all duration-300 ${
                      zapierDispatchFeedback.success
                        ? 'bg-emerald-950/80 border-2 border-emerald-400 text-emerald-200 shadow-[0_0_24px_rgba(52,211,153,0.6)]'
                        : 'bg-red-950/70 border-2 border-red-500 text-red-200 shadow-[0_0_18px_rgba(239,68,68,0.4)]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {zapierDispatchFeedback.success ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">
                            {zapierDispatchFeedback.success ? '🟢 200 OK • Catch Hook Diterima' : '🔴 Gagal Terkirim'}
                          </span>
                          {zapierDispatchFeedback.latencyMs !== undefined && (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/40 text-[10px]">
                              {zapierDispatchFeedback.latencyMs} ms
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-200">
                          {zapierDispatchFeedback.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Feedback Alert */}
              {zapierFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 font-mono ${
                    zapierFeedback.success
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
                      : 'bg-red-950/60 text-red-300 border border-red-500/40'
                  }`}
                >
                  {zapierFeedback.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{zapierFeedback.message}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                {isZapierConfigured && (
                  <button
                    type="button"
                    onClick={() => {
                      resetZapierConfig();
                      setZapierWebhookInput('');
                      setZapierFeedback(null);
                      setZapierDispatchFeedback(null);
                    }}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Webhook</span>
                  </button>
                )}
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsZapierModalOpen(false)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Tutup
                  </button>
                  <button
                    type="submit"
                    disabled={zapierTesting}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className={`w-3.5 h-3.5 ${zapierTesting ? 'animate-spin' : ''}`} />
                    <span>{zapierTesting ? 'Menyimpan...' : 'Simpan Webhook'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
