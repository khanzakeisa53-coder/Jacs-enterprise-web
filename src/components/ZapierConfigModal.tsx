import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Zap,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import { useN8nConfig } from '../context/N8nConfigContext';
import {
  AUTOMATION_PAYLOAD_PRESETS,
  dispatchRealWebhook,
} from '../data/automationBlueprints';

interface ZapierConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZapierConfigModal: React.FC<ZapierConfigModalProps> = ({ isOpen, onClose }) => {
  const { zapierConfig, saveZapierConfig, testZapierWebhook, resetZapierConfig } = useN8nConfig();
  const [webhookInput, setWebhookInput] = useState<string>(zapierConfig.webhookUrl);
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

  useEffect(() => {
    if (isOpen) {
      setWebhookInput(zapierConfig.webhookUrl);
      setFeedback(null);
      setDispatchFeedback(null);
    }
  }, [isOpen, zapierConfig.webhookUrl]);

  if (!isOpen) return null;

  const handleDispatchSample = async () => {
    const url = webhookInput.trim();
    if (!url) {
      setDispatchFeedback({
        success: false,
        message: 'Silakan isi URL Webhook Zapier terlebih dahulu.',
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
        saveZapierConfig({
          webhookUrl: url,
          isConnected: true,
          lastTriggerAt: new Date().toLocaleTimeString('id-ID'),
        });
      }
    } catch {
      setDispatchFeedback({
        success: false,
        message: 'Gagal mengirimkan request ke webhook Zapier.',
      });
    } finally {
      setIsDispatching(false);
    }
  };

  const handleSaveAndTest = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = webhookInput.trim();
    saveZapierConfig({ webhookUrl: url });

    if (!url) {
      setFeedback({ success: false, message: 'URL Webhook Zapier tidak boleh kosong.' });
      return;
    }

    setIsTesting(true);
    setFeedback(null);
    try {
      const res = await testZapierWebhook();
      setFeedback({ success: res.success, message: res.message });
      if (res.success) {
        setTimeout(() => onClose(), 1200);
      }
    } catch {
      setFeedback({ success: false, message: 'Gagal mengirimkan trigger uji coba ke Zapier.' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset konfigurasi webhook Zapier?')) {
      resetZapierConfig();
      setWebhookInput('');
      setFeedback(null);
      setDispatchFeedback(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0c1017] border border-amber-500/50 shadow-2xl overflow-hidden p-5 sm:p-6 space-y-4 my-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FF4A00]/20 text-[#FF4A00] border border-[#FF4A00]/40 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-white font-display">
                Konfigurasi Zapier Catch Hook
              </h4>
              <p className="text-[11px] text-slate-400 font-mono">
                Instant Triggers & 7,000+ App Ecosystem Integration
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

        {/* Guidance Box */}
        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-slate-300 space-y-1">
          <div className="font-bold text-amber-300 flex items-center gap-1.5">
            <span>Panduan Singkat Zapier Catch Hook:</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            1. Buka Zapier → Buat Zap baru → Pilih Trigger <strong>"Webhooks by Zapier"</strong>.<br />
            2. Pilih Event <strong>"Catch Hook"</strong> dan salin <em>Custom Webhook URL</em> ke kolom di bawah.<br />
            3. Klik tombol uji kirim data untuk memverifikasi payload di Zapier.
          </p>
        </div>

        {/* Form Webhook */}
        <form onSubmit={handleSaveAndTest} className="space-y-3.5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-300">
                URL Catch Hook Zapier
              </label>
              <a
                href="https://zapier.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>Buka Zapier</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="url"
              value={webhookInput}
              onChange={(e) => setWebhookInput(e.target.value)}
              placeholder="https://hooks.zapier.com/hooks/catch/xxxxxx/xxxxxx/"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>

          {/* Simulator & Live Payload Dispatch */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Live Simulator Payload JSON</span>
              </div>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
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
                        ? 'border-amber-400 bg-amber-950/50 text-white shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-amber-500/50'
                    }`}
                  >
                    <div className="text-[9px] font-mono text-amber-400 font-bold">{p.badge}</div>
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
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_14px_rgba(245,158,11,0.4)] active:scale-95"
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
            {zapierConfig.webhookUrl ? (
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
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 text-xs font-bold transition-all shadow-[0_0_16px_rgba(245,158,11,0.4)] disabled:opacity-50 cursor-pointer active:scale-95"
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
