import React, { useState, useEffect } from 'react';
import {
  X,
  Zap,
  Server,
  Cloud,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Send,
  Lock,
  ExternalLink,
  Code2,
  HelpCircle,
  Layers,
  Sparkles,
  Info,
  ShieldCheck,
  Check,
  Trash2,
  Download,
  FileJson,
} from 'lucide-react';
import { useN8nConfig } from '../context/N8nConfigContext';
import { N8nHostingType } from '../types/n8n';
import {
  AUTOMATION_PAYLOAD_PRESETS,
  N8N_WORKFLOW_BLUEPRINT,
  downloadJsonFile,
  dispatchRealWebhook,
} from '../data/automationBlueprints';

interface N8nConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const N8nConfigModal: React.FC<N8nConfigModalProps> = ({ isOpen, onClose }) => {
  const {
    config,
    isConfigured,
    isConnected,
    saveConfig,
    testPingConnection,
    sendTestWebhook,
    resetConfig,
  } = useN8nConfig();

  // Local form state
  const [instanceUrl, setInstanceUrl] = useState<string>(config.instanceUrl);
  const [apiKey, setApiKey] = useState<string>(config.apiKey);
  const [webhookEndpoint, setWebhookEndpoint] = useState<string>(config.webhookEndpoint);
  const [hostingType, setHostingType] = useState<N8nHostingType>(config.hostingType);

  // UI state
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [pingFeedback, setPingFeedback] = useState<{ success: boolean; text: string } | null>(null);
  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const [dispatchFeedback, setDispatchFeedback] = useState<{
    success: boolean;
    text: string;
    statusCode?: number;
    latencyMs?: number;
  } | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string>(AUTOMATION_PAYLOAD_PRESETS[0].id);
  const [showPayloadInspector, setShowPayloadInspector] = useState<boolean>(false);
  const [savedSuccessToast, setSavedSuccessToast] = useState<boolean>(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<boolean>(false);

  // Sync state when modal opens or config changes
  useEffect(() => {
    if (isOpen) {
      setInstanceUrl(config.instanceUrl);
      setApiKey(config.apiKey);
      setWebhookEndpoint(config.webhookEndpoint);
      setHostingType(config.hostingType);
      setPingFeedback(null);
      setDispatchFeedback(null);
      setSavedSuccessToast(false);
    }
  }, [isOpen, config]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Handle Form Save
  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    saveConfig({
      instanceUrl: instanceUrl.trim(),
      apiKey: apiKey.trim(),
      webhookEndpoint: webhookEndpoint.trim(),
      hostingType,
    });
    setSavedSuccessToast(true);
    setTimeout(() => setSavedSuccessToast(false), 3000);
  };

  // Handle Ping Connection
  const handlePing = async () => {
    setIsPinging(true);
    setPingFeedback(null);
    try {
      const res = await testPingConnection({
        instanceUrl: instanceUrl.trim(),
        apiKey: apiKey.trim(),
        webhookEndpoint: webhookEndpoint.trim(),
        hostingType,
      });
      setPingFeedback({
        success: res.success,
        text: res.message,
      });
    } catch {
      setPingFeedback({
        success: false,
        text: 'Gagal terhubung ke host n8n. Pastikan URL dan CORS/Firewall telah dikonfigurasi.',
      });
    } finally {
      setIsPinging(false);
    }
  };

  // Selected Preset Object
  const currentPreset =
    AUTOMATION_PAYLOAD_PRESETS.find((p) => p.id === selectedEventId) || AUTOMATION_PAYLOAD_PRESETS[0];

  // Handle Real Sample Webhook Dispatch (HTTP POST with latency & response status)
  const handleTestDispatch = async () => {
    if (!webhookEndpoint.trim()) {
      setDispatchFeedback({
        success: false,
        text: 'Silakan isi "Webhook Trigger Endpoint" terlebih dahulu.',
      });
      return;
    }

    setIsDispatching(true);
    setDispatchFeedback(null);

    const fullPayload = {
      event: currentPreset.id,
      eventName: currentPreset.name,
      source: currentPreset.app,
      instanceUrl: instanceUrl.trim() || 'https://otomasi.domain-klien.com',
      dispatchedAt: new Date().toISOString(),
      ...currentPreset.payload,
    };

    try {
      const res = await dispatchRealWebhook(webhookEndpoint.trim(), fullPayload);
      setDispatchFeedback({
        success: res.success,
        text: res.message,
        statusCode: res.statusCode,
        latencyMs: res.latencyMs,
      });

      // Synchronize in context
      if (res.success) {
        sendTestWebhook(currentPreset.name, fullPayload);
      }
    } catch {
      setDispatchFeedback({
        success: false,
        text: 'Gagal mengirimkan trigger ke endpoint webhook n8n.',
      });
    } finally {
      setIsDispatching(false);
    }
  };

  // Handle Download Blueprint n8n Workflow (.json)
  const handleDownloadBlueprint = () => {
    downloadJsonFile('n8n-workflow-jacs-blueprint.json', N8N_WORKFLOW_BLUEPRINT);
    setDownloadSuccessToast(true);
    setTimeout(() => setDownloadSuccessToast(false), 3500);
  };

  // Quick Preset Helper
  const applyPresetExample = (type: 'self_hosted' | 'cloud') => {
    if (type === 'self_hosted') {
      setHostingType('self_hosted');
      setInstanceUrl('https://otomasi.domain-klien.com');
      setApiKey('n8n_api_live_client_k39f82kd018fjs92');
      setWebhookEndpoint('https://otomasi.domain-klien.com/webhook/jacs-enterprise-events');
    } else {
      setHostingType('cloud');
      setInstanceUrl('https://mycompany.app.n8n.cloud');
      setApiKey('n8n_api_cloud_k29e71bc99a8df10');
      setWebhookEndpoint('https://mycompany.app.n8n.cloud/webhook/jacs-sync');
    }
  };

  const handleReset = () => {
    if (window.confirm('Yakin ingin mereset dan memutus tautan konfigurasi n8n mandiri ini dari browser Anda?')) {
      resetConfig();
      setInstanceUrl('');
      setApiKey('');
      setWebhookEndpoint('');
      setHostingType('self_hosted');
      setPingFeedback(null);
      setDispatchFeedback(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-[#0c1017] border border-slate-200 dark:border-cyan-500/40 shadow-2xl overflow-hidden z-10 my-auto animate-in zoom-in-95 fade-in duration-200 flex flex-col max-h-[92vh]">
        
        {/* Glow Ambient Top Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-[#FF6A00] to-purple-600 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200/80 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/70 dark:bg-[#0d121c]/80 backdrop-blur-md">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#FF6A00]/20 to-cyan-500/20 text-[#FF6A00] dark:text-cyan-400 border border-[#FF6A00]/30 dark:border-cyan-500/30 shadow-xs shrink-0">
              <Zap className="w-6 h-6 text-[#FF6A00] dark:text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
                  Integrasi n8n Mandiri Klien (BYO-Instance)
                </h3>
                {/* Status Indicator Badge */}
                {isConnected ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Terhubung 🟢</span>
                    {config.pingLatencyMs && <span>({config.pingLatencyMs}ms)</span>}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-300 dark:bg-slate-900/80 dark:text-slate-400 dark:border-slate-700">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    <span>Belum Dikonfigurasi ⚪</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Tautkan server n8n dedicated milik instansi Anda. Seluruh beban eksekusi workflow, API limits, dan data payload berada 100% di infrastruktur Anda (Client-Side Dedicated).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">

          {/* Toast Notification when saved */}
          {savedSuccessToast && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center justify-between shadow-md animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Konfigurasi n8n mandiri berhasil disimpan di LocalStorage peramban Anda!</span>
              </div>
              <span className="font-mono text-[10px] uppercase opacity-75">Tersimpan</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">

            {/* Toggle Opsi: Cloud Resmi vs Server Mandiri (Self-Hosted VPS) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Tipe Hosting Instance n8n
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setHostingType('self_hosted')}
                  className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all cursor-pointer ${
                    hostingType === 'self_hosted'
                      ? 'bg-cyan-50/80 dark:bg-cyan-950/40 border-cyan-400 dark:border-cyan-400/80 shadow-[0_0_14px_rgba(6,182,212,0.25)] text-cyan-900 dark:text-cyan-200'
                      : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${hostingType === 'self_hosted' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <span>Server Mandiri (Self-Hosted VPS)</span>
                      {hostingType === 'self_hosted' && <Check className="w-3.5 h-3.5 text-cyan-500" />}
                    </div>
                    <span className="text-[11px] opacity-80 block">Docker, VPS Pribadi, Coolify, Portainer</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setHostingType('cloud')}
                  className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all cursor-pointer ${
                    hostingType === 'cloud'
                      ? 'bg-purple-50/80 dark:bg-purple-950/40 border-purple-400 dark:border-purple-400/80 shadow-[0_0_14px_rgba(168,85,247,0.25)] text-purple-900 dark:text-purple-200'
                      : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${hostingType === 'cloud' ? 'bg-purple-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                    <Cloud className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <span>Gunakan Cloud Resmi n8n</span>
                      {hostingType === 'cloud' && <Check className="w-3.5 h-3.5 text-purple-500" />}
                    </div>
                    <span className="text-[11px] opacity-80 block">SaaS Resmi (tenant.app.n8n.cloud)</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Quick Demo Pre-fill */}
            <div className="flex items-center justify-between gap-2 pt-1 pb-1">
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Pintasan Simulasi Demo:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => applyPresetExample('self_hosted')}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[10.5px] font-mono text-cyan-600 dark:text-cyan-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  Contoh VPS Mandiri
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetExample('cloud')}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[10.5px] font-mono text-purple-600 dark:text-purple-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  Contoh n8n Cloud
                </button>
              </div>
            </div>

            {/* Field 1: URL Instance n8n Klien */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span>URL Instance n8n Klien</span>
                  <span className="text-red-500">*</span>
                </label>
                <span className="text-[10.5px] text-slate-500 dark:text-slate-400 font-mono">
                  Protokol https:// diutamakan
                </span>
              </div>
              <div className="relative">
                <input
                  type="url"
                  value={instanceUrl}
                  onChange={(e) => setInstanceUrl(e.target.value)}
                  placeholder="https://otomasi.domain-klien.com atau https://tenant.app.n8n.cloud"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 font-mono transition-all"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Domain atau IP publik server n8n yang dapat diakses oleh browser/perangkat Anda.
              </p>
            </div>

            {/* Field 2: n8n API Key / Webhook Key */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>n8n API Key / Webhook Key</span>
                </label>
                <span className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Tersimpan di Local Storage Klien
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="n8n_api_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 font-mono transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  title={showApiKey ? 'Sembunyikan API Key' : 'Tampilkan API Key'}
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Dibuat melalui menu <em>Settings → API Keys</em> pada dasbor n8n Anda untuk otorisasi alur kerja aman.
              </p>
            </div>

            {/* Field 3: Webhook Trigger Endpoint */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span>Webhook Trigger Endpoint</span>
                </label>
                <span className="text-[10.5px] text-slate-500 dark:text-slate-400 font-mono">
                  Penerima data otomatisasi
                </span>
              </div>
              <div className="relative">
                <input
                  type="url"
                  value={webhookEndpoint}
                  onChange={(e) => setWebhookEndpoint(e.target.value)}
                  placeholder="https://otomasi.domain-klien.com/webhook/jacs-enterprise-events"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 font-mono transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                URL node Webhook pada canvas n8n klien untuk menangkap payload pesanan kasir, presensi, surat jalan, atau pesan WhatsApp.
              </p>
            </div>

            {/* Test Ping Feedback Result */}
            {pingFeedback && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                  pingFeedback.success
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-200'
                    : 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-500/40 text-red-800 dark:text-red-200'
                }`}
              >
                {pingFeedback.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 font-mono text-[11px] leading-relaxed">
                  {pingFeedback.text}
                </div>
              </div>
            )}

            {/* Control Bar: [⚡ Tes Ping Koneksi] + [Simpan Konfigurasi] + [Reset] */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2">
                {/* [ ⚡ Tes Ping Koneksi ] */}
                <button
                  type="button"
                  onClick={handlePing}
                  disabled={isPinging || !instanceUrl.trim()}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] active:scale-95"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin text-cyan-400' : 'text-cyan-600 dark:text-cyan-400'}`} />
                  <span>[ ⚡ Tes Ping Koneksi ]</span>
                </button>

                {/* Reset button if configured */}
                {isConfigured && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                    title="Putus Tautan & Reset Kredensial"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-[0_0_16px_rgba(6,182,212,0.4)] hover:shadow-[0_0_24px_rgba(6,182,212,0.7)] flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Konfigurasi</span>
              </button>
            </div>
          </form>

          {/* Template Blueprint Download Section (Prompt Requirement 2) */}
          <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-purple-950/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FileJson className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-white font-display">
                  Template Alur Kerja n8n Bawaan (Blueprint)
                </h4>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-mono">
                  Siap Impor
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Node Webhook → Gemini 2.5 Flash LLM Parser → Router Cabang Event → WhatsApp Gateway & Database.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownloadBlueprint}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_16px_rgba(6,182,212,0.4)] hover:shadow-[0_0_24px_rgba(6,182,212,0.7)] shrink-0 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>[ 📥 Download Blueprint n8n Workflow (.json) ]</span>
            </button>
          </div>

          {/* Download Success Notification */}
          {downloadSuccessToast && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-400 text-emerald-300 text-xs font-mono flex items-center gap-2 shadow-[0_0_18px_rgba(52,211,153,0.5)] animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Blueprint alur kerja n8n ("n8n-workflow-jacs-blueprint.json") berhasil diunduh! Silakan import di canvas n8n Anda.</span>
            </div>
          )}

          {/* Interactive Webhook Simulator & Payload Inspector (Prompt Requirement 1) */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#FF6A00]" />
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
                  Simulator & Uji Kirim Data Riil (n8n Webhook)
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowPayloadInspector(!showPayloadInspector)}
                className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer font-mono"
              >
                {showPayloadInspector ? 'Sembunyikan Payload JSON' : 'Lihat Format Payload JSON'}
              </button>
            </div>

            {/* Preset Event Selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span>Pilih Preset Event JacS Enterprise untuk Diuji:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {AUTOMATION_PAYLOAD_PRESETS.map((preset) => {
                  const isSelected = selectedEventId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedEventId(preset.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-[0_0_14px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[9.5px] px-1.5 py-0.2 rounded font-mono font-bold bg-slate-200 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300">
                          {preset.badge}
                        </span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                      </div>
                      <div className="text-xs font-bold leading-snug">{preset.name}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {preset.summary}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action Button: [ 📨 Kirim Sample Payload JSON ] */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Target: <span className="font-mono text-cyan-600 dark:text-cyan-300">{webhookEndpoint.trim() || 'Endpoint belum diisi'}</span>
                </div>

                <button
                  type="button"
                  onClick={handleTestDispatch}
                  disabled={isDispatching || !webhookEndpoint.trim()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_16px_rgba(16,185,129,0.4)] hover:shadow-[0_0_24px_rgba(16,185,129,0.7)] active:scale-95"
                >
                  <Send className={`w-3.5 h-3.5 ${isDispatching ? 'animate-pulse' : ''}`} />
                  <span>{isDispatching ? 'Mengirim Request...' : '[ 📨 Kirim Sample Payload JSON ]'}</span>
                </button>
              </div>
            </div>

            {/* Real Dispatch Result Feedback with Visual Neon Green Glow if Success */}
            {dispatchFeedback && (
              <div
                className={`p-3 rounded-xl text-xs font-mono transition-all duration-300 ${
                  dispatchFeedback.success
                    ? 'bg-emerald-950/80 border-2 border-emerald-400 text-emerald-200 shadow-[0_0_24px_rgba(52,211,153,0.6)]'
                    : 'bg-red-950/70 border-2 border-red-500 text-red-200 shadow-[0_0_18px_rgba(239,68,68,0.4)]'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {dispatchFeedback.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-sm text-white">
                        {dispatchFeedback.success ? '🟢 PENGIRIMAN DATA SUKSES (200 OK)' : '🔴 PENGIRIMAN GAGAL'}
                      </span>
                      {dispatchFeedback.latencyMs !== undefined && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/50 text-[10.5px]">
                          Latency: {dispatchFeedback.latencyMs} ms
                        </span>
                      )}
                    </div>
                    <p className="text-[11.5px] leading-relaxed text-slate-200">
                      {dispatchFeedback.text}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Payload JSON Inspector preview */}
            {showPayloadInspector && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Pratinjau Request Body (POST application/json):</span>
                  <span className="text-cyan-400">{currentPreset.name}</span>
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-950 text-cyan-300 text-[11px] font-mono overflow-x-auto border border-cyan-500/30 max-h-52 shadow-inner">
                  {JSON.stringify(
                    {
                      event: currentPreset.id,
                      eventName: currentPreset.name,
                      source: currentPreset.app,
                      instanceUrl: instanceUrl || 'https://otomasi.domain-klien.com',
                      dispatchedAt: new Date().toISOString(),
                      ...currentPreset.payload,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            )}
          </div>

          {/* Edukasi Biaya di Antarmuka (Prompt Requirement 4) */}
          <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-1.5 shadow-xs">
            <div className="flex items-start gap-2.5">
              <span className="text-base leading-none">💡</span>
              <p className="leading-relaxed font-medium">
                <strong>Catatan Biaya:</strong> Seluruh proses otomatisasi dieksekusi langsung pada server/cloud n8n milik instansi Anda. Tidak ada biaya eksekusi tambahan dari pengembang JacS Enterprise.
              </p>
            </div>
            <div className="pl-6 text-[11px] text-amber-800/80 dark:text-amber-300/80">
              Klien mengontrol sepenuhnya spesifikasi CPU/RAM VPS, frekuensi eksekusi cron, dan kerahasiaan data internal tanpa pihak ketiga.
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0c1017] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Kredensial Aman • Local Client Only</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
