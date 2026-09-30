import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  ThumbsUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCcw,
  User,
  Filter,
} from 'lucide-react';

export interface CommentItem {
  id: string;
  author: string;
  roleOrCompany: string;
  avatarColor: string; // e.g., 'cyan' | 'purple' | 'emerald' | 'amber' | 'blue'
  content: string;
  timestamp: string;
  likes: number;
  hasLiked?: boolean;
  topicTag?: string;
  isPinned?: boolean;
}

const STORAGE_KEY = 'jacs_enterprise_community_comments_v1';

const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: 'comm-1',
    author: 'Budi Santoso',
    roleOrCompany: 'PT Nusantara Mandiri Core',
    avatarColor: 'cyan',
    content:
      'Integrasi n8n self-hosted dengan pipeline Gemini API di JacS benar-benar menghemat waktu deployment arsitektur kami hingga 70%. Data payload tetap aman di server internal!',
    timestamp: '2 jam yang lalu',
    likes: 18,
    hasLiked: false,
    topicTag: 'n8n & AI Agent',
    isPinned: true,
  },
  {
    id: 'comm-2',
    author: 'Siti Rahmawati',
    roleOrCompany: 'DepoHub Logistics Solutions',
    avatarColor: 'emerald',
    content:
      'Fitur WMS RFID dan webhook real-time nya tersinkron tanpa hambatan ke visual scenario Make.com. Komunitas developer enterprise di Indonesia sangat terbantu dengan transparansi blueprint ini.',
    timestamp: '5 jam yang lalu',
    likes: 12,
    hasLiked: false,
    topicTag: 'Make Automation',
  },
  {
    id: 'comm-3',
    author: 'Reza Pratama',
    roleOrCompany: 'EduTech Innovations Indonesia',
    avatarColor: 'purple',
    content:
      'Implementasi AI Agent di SEKOLAHKITA V2.4 sangat rapi dan responsif. Apakah tim JacS berencana merilis template trigger Zapier khusus untuk sinkronisasi Google Workspace multi-tenant?',
    timestamp: '1 hari yang lalu',
    likes: 8,
    hasLiked: false,
    topicTag: 'SEKOLAHKITA V2.4',
  },
  {
    id: 'comm-4',
    author: 'Andi Wijaya, CISSP',
    roleOrCompany: 'Fintech SecOps Lead',
    avatarColor: 'amber',
    content:
      'Zero-Trust protocol dan audit logging compliance yang diterapkan pada arsitektur hybrid cloud JacS sangat solid dan siap audit ISO 27001. Pertahankan standar ini!',
    timestamp: '2 hari yang lalu',
    likes: 15,
    hasLiked: false,
    topicTag: 'Security & Zero-Trust',
  },
];

const AVATAR_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  cyan: {
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-300',
    border: 'border-cyan-400/80',
    glow: 'shadow-[0_0_12px_rgba(6,182,212,0.4)]',
  },
  purple: {
    bg: 'bg-purple-500/20',
    text: 'text-purple-300',
    border: 'border-purple-400/80',
    glow: 'shadow-[0_0_12px_rgba(168,85,247,0.4)]',
  },
  emerald: {
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-300',
    border: 'border-emerald-400/80',
    glow: 'shadow-[0_0_12px_rgba(16,185,129,0.4)]',
  },
  amber: {
    bg: 'bg-amber-500/20',
    text: 'text-amber-300',
    border: 'border-amber-400/80',
    glow: 'shadow-[0_0_12px_rgba(245,158,11,0.4)]',
  },
  blue: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-300',
    border: 'border-blue-400/80',
    glow: 'shadow-[0_0_12px_rgba(59,130,246,0.4)]',
  },
};

interface CommunityCommentsSectionProps {
  articleId?: string;
  articleTitle?: string;
  compact?: boolean;
}

export const CommunityCommentsSection: React.FC<CommunityCommentsSectionProps> = ({
  articleId,
  articleTitle,
  compact = false,
}) => {
  const [comments, setComments] = useState<CommentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load comments from localStorage', e);
    }
    return INITIAL_COMMENTS;
  });

  const [authorName, setAuthorName] = useState('');
  const [companyOrRole, setCompanyOrRole] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('Umum & AI');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterTag, setFilterTag] = useState<string>('Semua');

  // Save to localStorage whenever comments change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    } catch (e) {
      console.error('Failed to save comments to localStorage', e);
    }
  }, [comments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanAuthor = authorName.trim();
    const cleanMessage = message.trim();

    if (!cleanAuthor) {
      setErrorMsg('Mohon isi Nama / Perusahaan Anda.');
      return;
    }
    if (cleanAuthor.length < 3) {
      setErrorMsg('Nama pengirim minimal 3 karakter.');
      return;
    }
    if (!cleanMessage) {
      setErrorMsg('Mohon tuliskan pesan atau masukan Anda.');
      return;
    }
    if (cleanMessage.length < 5) {
      setErrorMsg('Pesan masukan minimal 5 karakter.');
      return;
    }

    setIsSubmitting(true);

    const colorKeys = Object.keys(AVATAR_COLORS);
    const randomColor = colorKeys[Math.floor(Math.random() * colorKeys.length)];

    const now = new Date();
    const timeString = 'Baru saja';

    const newComment: CommentItem = {
      id: `comm-${Date.now()}`,
      author: cleanAuthor,
      roleOrCompany: companyOrRole.trim() || 'Anggota Komunitas JacS',
      avatarColor: randomColor,
      content: cleanMessage,
      timestamp: timeString,
      likes: 0,
      hasLiked: false,
      topicTag: articleTitle ? `Artikel: ${articleTitle.slice(0, 24)}...` : selectedTag,
      isPinned: false,
    };

    setTimeout(() => {
      setComments((prev) => [newComment, ...prev]);
      setMessage('');
      setSuccessMsg('Komentar Anda berhasil dipublikasikan!');
      setIsSubmitting(false);

      setTimeout(() => {
        setSuccessMsg(null);
      }, 4000);
    }, 250);
  };

  const handleToggleLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const wasLiked = !!c.hasLiked;
          return {
            ...c,
            hasLiked: !wasLiked,
            likes: wasLiked ? Math.max(0, c.likes - 1) : c.likes + 1,
          };
        }
        return c;
      })
    );
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset diskusi ke komentar awal JacS Enterprise?')) {
      setComments(INITIAL_COMMENTS);
      localStorage.removeItem(STORAGE_KEY);
      setSuccessMsg('Diskusi telah direset ke komentar default.');
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  // Extract initials from author name
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (name.slice(0, 2) || 'JK').toUpperCase();
  };

  const filteredComments = comments.filter((c) => {
    if (filterTag === 'Semua') return true;
    return c.topicTag?.toLowerCase().includes(filterTag.toLowerCase());
  });

  const availableTags = ['Semua', 'n8n', 'Make', 'AI', 'Security'];

  return (
    <div
      className={`w-full bg-slate-900/80 dark:bg-[#0c1017]/90 border border-cyan-500/30 rounded-2xl backdrop-blur-xl shadow-2xl transition-all duration-300 ${
        compact ? 'p-3.5 sm:p-5' : 'p-4 sm:p-6'
      }`}
    >
      {/* ========================================================
          HEADER: DISKUSI & KOMENTAR PUBLIK
          ======================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-3 sm:pb-4 mb-4 sm:mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white tracking-wide">
                💬 DISKUSI & KOMENTAR PUBLIK
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_8px_rgba(6,182,212,0.25)]">
                {comments.length} Respon
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400">
              Forum terbuka seputar integrasi AI, otomatisasi n8n • Make • Zapier, dan arsitektur JacS Enterprise.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Tag Filter Pills */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setFilterTag(tag)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                  filterTag === tag
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(6,182,212,0.5)]'
                    : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleResetToDefaults}
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 border border-slate-800 transition-all cursor-pointer"
            title="Reset ke Komentar Default"
            aria-label="Reset comments"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================
          FORM INPUT KOMENTAR PUBLIK
          ======================================================== */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Input Nama Pengirim */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Nama Lengkap <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Contoh: Hendra Kusuma"
                maxLength={60}
                className="w-full text-xs sm:text-[13px] px-3 py-2 rounded-xl bg-slate-950/70 border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Input Perusahaan / Posisi */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Instansi / Perusahaan / Role (Opsional)
            </label>
            <input
              type="text"
              value={companyOrRole}
              onChange={(e) => setCompanyOrRole(e.target.value)}
              placeholder="Contoh: Tech Lead / PT Solusi Digital"
              maxLength={70}
              className="w-full text-xs sm:text-[13px] px-3 py-2 rounded-xl bg-slate-950/70 border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
          </div>
        </div>

        {/* Input Textarea Pesan / Masukan */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-[11px] font-mono text-slate-400">
              Pesan / Masukan Diskusi <span className="text-cyan-400">*</span>
            </label>
            <span className="text-[10px] font-mono text-slate-500">
              {message.length} / 500
            </span>
          </div>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tuliskan pengalaman, masukan teknis, atau pertanyaan seputar pipeline otomatisasi JacS Enterprise..."
            maxLength={500}
            className="w-full text-xs sm:text-[13px] p-3 rounded-xl bg-slate-950/70 border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
          />
        </div>

        {/* Feedback Notifikasi */}
        {errorMsg && (
          <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tombol Aksi Kirim Komentar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tersimpan secara lokal (Persistent LocalStorage).</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_22px_rgba(6,182,212,0.65)] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>[ Kirim Komentar 🚀 ]</span>
          </button>
        </div>
      </form>

      {/* ========================================================
          LIST DAFTAR KOMENTAR AKTIF
          ======================================================== */}
      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">
        {filteredComments.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            Tidak ada komentar untuk kategori ini. Jadilah yang pertama berkomentar!
          </div>
        ) : (
          filteredComments.map((comm) => {
            const colorCfg = AVATAR_COLORS[comm.avatarColor] || AVATAR_COLORS.cyan;
            const initials = getInitials(comm.author);

            return (
              <div
                key={comm.id}
                className={`p-3 sm:p-3.5 rounded-xl bg-slate-950/70 border transition-all duration-200 hover:border-cyan-400/50 group ${
                  comm.isPinned
                    ? 'border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.15)] bg-slate-950/85'
                    : 'border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Avatar & Author Info */}
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 border ${colorCfg.bg} ${colorCfg.text} ${colorCfg.border} ${colorCfg.glow}`}
                    >
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-xs sm:text-[13px] text-slate-200 group-hover:text-cyan-300 transition-colors">
                          {comm.author}
                        </span>
                        {comm.isPinned && (
                          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/60">
                            ★ Pinned
                          </span>
                        )}
                        {comm.topicTag && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
                            #{comm.topicTag}
                          </span>
                        )}
                      </div>

                      <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">
                        {comm.roleOrCompany}
                      </div>
                    </div>
                  </div>

                  {/* Timestamp & Like Button */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-slate-500" />
                      <span>{comm.timestamp}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => handleToggleLike(comm.id)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-mono font-semibold transition-all cursor-pointer ${
                        comm.hasLiked
                          ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                          : 'bg-slate-800/80 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 border border-slate-700'
                      }`}
                      title={comm.hasLiked ? 'Batal Suka' : 'Sukai Komentar'}
                    >
                      <ThumbsUp className={`w-3 h-3 ${comm.hasLiked ? 'fill-current' : ''}`} />
                      <span>{comm.likes}</span>
                    </button>
                  </div>
                </div>

                {/* Pesan Komentar */}
                <p className="mt-2 text-xs sm:text-[12.5px] text-slate-300 leading-relaxed pl-10 sm:pl-11">
                  {comm.content}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
