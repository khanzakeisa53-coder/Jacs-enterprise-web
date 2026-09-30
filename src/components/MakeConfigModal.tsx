import React, { useState, useEffect } from 'react';
import {
  X,
  Workflow,
  Zap,
  Download,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Radio,
  FileJson,
  Trash2,
} from 'lucide-react';
import { useN8nConfig } from '../context/N8nConfigContext';
import {
  AUTOMATION_PAYLOAD_PRESETS,
  MAKE_SCENARIO_BLUEPRINT,
  downloadJsonFile,
  dispatchRealWebhook,
} from '../data/automationBlueprints';

interface MakeConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MakeConfigModal: React.FC<MakeConfigModalProps> = ({ isOpen, onClose }) => {
  const { makeConfig, saveMakeConfig, testMakeWebhook, resetMakeConfig } = useN8nConfig();
  const [webhookInput, setWebhookInput] = useState<string>(makeConfig.webhookUrl);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(AUTOMATION_PAYLOAD_PRESETS[0].id);
  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const [dispatchFeedback, setDispatchFeedback] = useState<{
    success: boolean;
    message: string;
    statusCode?: number;
    latencyMs?: number;
  } | null>(null);
  const [downloadToast, setDownloadToast] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setWebhookInput(makeConfig.webhookUrl);
      setFeedback(null);
      setDispatchFeedback(null);
    }
  }, [isOpen, makeConfig.webhookUrl]);

  if (!isOpen) return null;

  const handleDownloadBlueprint = () => {
    downloadJsonFile('make-scenario-jacs-blueprint.json', MAKE_SCENARIO_BLUEPRINT);
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 2500);
  };

  const handleDispatchSample = async () => {
    const url = webhookInput.trim();
    if (!url) {
      setDispatchFeedback({
        success: false,
        message: 'Silakan isi URL Webhook Make.com terlebih dahulu.',
      });
      return;
    }

    setIsDispatching(true);
    setDispatchFeedback(null);

    const preset =
      AUTOMATION_PAYLOAD_PRESETS.find((p) => p.id === selectedPresetId) ||
      AUTOMATION_PAYLOAD_PRESETS[0];
    const payload = {
      event: preset.id,
      eventName: preset.name,
      source: preset.app,
      dispatchedAt: new Date().toISOString(),
      ...preset.payload,
    };

    try {
      const res = await dispatchRealWebhook(url, payload);
      setDispatchFeedback({
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
      setDispatchFeedback({
        success: false,
        message: 'Gagal mengirimkan request ke webhook Make.com.',
      });
    } finally {
      setIsDispatching(false);
    }
  };

  const handleSaveAndTest = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = webhookInput.trim();
    saveMakeConfig({ webhookUrl: url });

    if (!url) {
      setFeedback({ success: false, message: 'URL Webhook Make.com tidak boleh kosong.' });
      return;
    }

    setIsTesting(true);
    setFeedback(null);
    try {
      const res = await testMakeWebhook();
      setFeedback({ success: res.success, message: res.message });
      if (res.success) {
        setTimeout(() => onClose(), 1200);
      }
    } catch {
      setFeedback({ success: false, message: 'Gagal mengirimkan trigger uji coba ke Make.com.' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset konfigurasi webhook Make.com?')) {
      resetMakeConfig();
      setWebhookInput('');
      setFeedback(null);
      setDispatchFeedback(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0c1017] border border-purple-500/50 shadow-2xl overflow-hidden p-5 sm:p-6 space-y-4 my-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/40 shadow-xs">
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-white font-display">
                Konfigurasi Webhook Make.com
              </h4>
              <p className="text-[11px] text-slate-400 font-mono">
                Visual Multi-SaaS Scenario Automation & Cloud Router
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Blueprint Download Box */}
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <FileJson className="w-3.5 h-3.5 text-purple-400" />
              <span>Blueprint Skenario Make.com (.json)</span>
            </div>
            <p className="text-[10.5px] text-slate-400">
              Import ke Make: Custom Webhook → JSON Parser → Router Event JacS.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadBlueprint}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>[ 📥 Download Blueprint .json ]</span>
          </button>
        </div>

        {downloadToast && (
          <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-400 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Blueprint Skenario Make berhasil diunduh!</span>
          </div>
        )}

        {/* Form Webhook */}
        <form onSubmit={handleSaveAndTest} className="space-y-3.5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-300">
                URL Custom Webhook Make.com
              </label>
              <a
                href="https://make.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <span>Buka Make.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="url"
              value={webhookInput}
              onChange={(e) => setWebhookInput(e.target.value)}
              placeholder="https://hook.eu1.make.com/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          {/* Simulator & Live Payload Dispatch */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span>Live Simulator Payload JSON</span>
              </div>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                Pilih Preset Event
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {AUTOMATION_PAYLOAD_PRESETS.map((p) => {
                const isSel = selectedPresetId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPresetId(p.id)}
                    className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                      isSel
                        ? 'border-purple-400 bg-purple-950/50 text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-purple-500/50'
                    }`}
                  >
                    <div className="text-[9px] font-mono text-purple-400 font-bold">{p.badge}</div>
                    <div className="text-[11px] font-bold mt-0.5 line-clamp-1">{p.name}</div>
                    <div className="text-[9.5px] text-slate-400 line-clamp-1 mt-0.5">{p.summary}</div>
                  </button>
                );
              })}
            </div>

            <div className="pt-1 flex items-center justify-end">
              <button
                type="button"
                onClick={handleDispatchSample}
                disabled={isDispatching || !webhookInput.trim()}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_14px_rgba(16,185,129,0.4)] active:scale-95"
              >
                <Send className={`w-3.5 h-3.5 ${isDispatching ? 'animate-pulse' : ''}`} />
                <span>{isDispatching ? 'Mengirim Payload...' : '[ 📨 Uji Kirim Payload JSON ]'}</span>
              </button>
            </div>

            {dispatchFeedback && (
              <div
                className={`p-2.5 rounded-xl text-xs font-mono transition-all ${
                  dispatchFeedback.success
                    ? 'bg-emerald-950/80 border border-emerald-400 text-emerald-200'
                    : 'bg-red-950/70 border border-red-500 text-red-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">
                    {dispatchFeedback.success ? '🟢 200 OK • Webhook Diterima' : '🔴 Gagal Terkirim'}
                  </span>
                  {dispatchFeedback.latencyMs !== undefined && (
                    <span className="text-[10px] text-emerald-300 font-bold">
                      {dispatchFeedback.latencyMs} ms
                    </span>
                  )}
                </div>
                <p className="text-[11px] mt-0.5 opacity-90">{dispatchFeedback.message}</p>
              </div>
            )}
          </div>

          {feedback && (
            <div
              className={`p-2.5 rounded-xl text-xs font-mono ${
                feedback.success
                  ? 'bg-emerald-950/80 border border-emerald-400 text-emerald-200'
                  : 'bg-red-950/70 border border-red-500 text-red-200'
              }`}
            >
              {feedback.message}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            {makeConfig.webhookUrl ? (
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/40 text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset URL</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isTesting || !webhookInput.trim()}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-[0_0_16px_rgba(168,85,247,0.4)] disabled:opacity-50 cursor-pointer active:scale-95"
              >
                {isTesting ? 'Menguji Koneksi...' : 'Simpan & Verifikasi'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
