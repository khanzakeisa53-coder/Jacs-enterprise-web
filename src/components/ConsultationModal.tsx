import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  Building2,
  Mail,
  Phone,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { JacSLogo } from './JacSLogo';
import { CONSULTATION_PARTNERSHIP_CARD } from '../data/mockData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    solutionType: 'Integrasi Multi-Solusi ERP',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [inquiryId, setInquiryId] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `JACS-REQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setInquiryId(generatedId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      institution: '',
      email: '',
      phone: '',
      solutionType: 'Integrasi Multi-Solusi ERP',
      message: '',
    });
  };

  const defaultWaText = encodeURIComponent(
    `Halo JacS Enterprise, saya ${formData.name || 'rekan'} dari ${formData.institution || 'institusi/perusahaan'} ingin berkonsultasi mengenai Kemitraan & Integrasi Khusus solusi arsitektur sistem digital.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto backdrop-blur-md bg-slate-950/70 animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#111419] rounded-2xl border border-slate-200 dark:border-cyan-500/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-blue-600" />
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200/90 dark:border-slate-800 flex items-start justify-between gap-4 relative z-10 bg-slate-50/70 dark:bg-slate-900/50">
          {/* Top-Left Developer Identity */}
          <div className="flex items-center gap-3">
            <JacSLogo size="md" showText={false} withGlow={true} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-950 dark:text-white tracking-tight text-base sm:text-lg font-display">
                  JacS Enterprise
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                  Partner Portal
                </span>
              </div>
              <p className="text-[11px] text-cyan-600 dark:text-cyan-400 font-mono uppercase tracking-wider">
                JacS Enterprise Suite • Kemitraan & Solusi Kustom
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 max-h-[calc(85vh-130px)] overflow-y-auto">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-500 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-slate-950 dark:text-white font-display">
                  Permintaan Konsultasi Diterima
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  Terima kasih, <strong className="text-slate-900 dark:text-white">{formData.name}</strong>. Tim Principal Solutions Architect JacS Enterprise akan mempelajari kebutuhan Anda dan menghubungi via WhatsApp/Email dalam 1x24 jam kerja.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 max-w-xs mx-auto text-xs font-mono">
                <span className="text-slate-500 dark:text-slate-400">Kode Tiket Konsultasi:</span>
                <div className="font-bold text-cyan-600 dark:text-cyan-300 text-sm mt-0.5 tracking-wider">
                  {inquiryId}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/6281234567890?text=${defaultWaText}%20Tiket:%20${inquiryId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Lanjutkan di WhatsApp Resmi</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Kirim Pengajuan Lain
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Banner Summary */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-cyan-50/80 via-blue-50/40 to-white dark:from-cyan-950/20 dark:via-blue-950/15 dark:to-slate-900/40 border border-cyan-200/80 dark:border-cyan-500/25 space-y-2">
                <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 text-xs font-bold font-mono tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>KONSULTASI & KUSTOMISASI</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white font-display">
                  Kemitraan & Integrasi Khusus
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Butuh arsitektur sistem khusus untuk institusi atau perusahaan Anda? Diskusikan kebutuhan transformasi digital Anda dengan Principal Architect JacS Enterprise.
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                    Arsitektur Berstandar Zero-Trust
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-blue-500" />
                    Kustomisasi API & Data Warehouse
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-500" />
                    Respon &lt; 24 Jam
                  </span>
                </div>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Pratama, S.T."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Institusi / Perusahaan *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: PT Surya Retailindo / Yayasan Edukasi"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Email Korporat / Resmi *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="budi@perusahaan.co.id"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812-xxxx-xxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Fokus Solusi / Kebutuhan Integrasi
                  </label>
                  <select
                    value={formData.solutionType}
                    onChange={(e) => setFormData({ ...formData, solutionType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 cursor-pointer"
                  >
                    <option value="Integrasi Multi-Solusi ERP">Integrasi Multi-Solusi ERP & SSO Terpadu</option>
                    <option value="Kustomisasi SEKOLAHKITA-V2">Kustomisasi SEKOLAHKITA-V2 (Multi-Kampus & BOSP)</option>
                    <option value="Kustomisasi RetailOS ERP">Kustomisasi JacS RetailOS ERP (Multi-Cabang & POS)</option>
                    <option value="Kustomisasi DepoHub WMS">Kustomisasi DepoHub PRO (WMS, Barcode & Logistik)</option>
                    <option value="Kustomisasi KosKita Property">Kustomisasi KosKita Property ERP (Hunian Sewa & Co-Living)</option>
                    <option value="AI App Architecture & Custom Model">AI App Architecture & Custom Generative Model</option>
                    <option value="Audit Keamanan & Infrastruktur Cloud">Audit Keamanan & Infrastruktur Cloud Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Ringkasan Kebutuhan / Skala Organisasi
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Jelaskan perkiraan jumlah pengguna, lokasi cabang, kendala sistem yang dihadapi, atau ekspektasi integrasi..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/6281234567890?text=${defaultWaText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Chat WhatsApp Langsung</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>

                    <a
                      href="mailto:enterprise@jacs.id?subject=Konsultasi%20Kemitraan%20dan%20Integrasi%20Khusus%20JacS%20Enterprise"
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-cyan-500" />
                      <span>Email Resmi</span>
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer active:scale-95"
                  >
                    <span>Kirim Pengajuan Konsultasi</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
