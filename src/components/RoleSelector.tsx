import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, User, Sparkles, ChevronDown, Check, GraduationCap, PenTool, Edit3, Zap } from 'lucide-react';
import { useRole } from '../context/RoleContext';
import { useN8nConfig } from '../context/N8nConfigContext';
import { UserRole } from '../types';

export const RoleSelector: React.FC = () => {
  const { currentRole, currentRoleInfo, setRole, rolesList } = useRole();
  const {
    isConnected: isN8nConnected,
    isMakeConnected,
    isZapierConnected,
    openN8nConfig,
  } = useN8nConfig();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Guarantee dropdown is closed by default upon page load / component mount
  useEffect(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getRoleIcon = (roleId: UserRole) => {
    switch (roleId) {
      case 'visitor':
        return <User className="w-4 h-4 text-zinc-400" />;
      case 'registered':
        return <GraduationCap className="w-4 h-4 text-blue-400" />;
      case 'contributor':
        return <PenTool className="w-4 h-4 text-emerald-400" />;
      case 'editor':
        return <Edit3 className="w-4 h-4 text-amber-400" />;
      case 'admin':
        return <ShieldCheck className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-app-md bg-app-elevated/80 hover:bg-app-elevated border border-app-border/80 hover:border-app-border text-app-text-primary transition-all group focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        title="Ganti Peran Pengguna (Role Simulation)"
        aria-label="User role selector"
      >
        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-app-surface border border-app-border group-hover:border-purple-400/40 transition-colors">
          {getRoleIcon(currentRole)}
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] text-app-text-muted uppercase tracking-wider font-semibold leading-none">
            Peran
          </span>
          <span className="text-xs font-semibold text-app-text-primary leading-tight flex items-center gap-1">
            {currentRoleInfo.badge}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-app-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-app-xl bg-app-surface border border-app-border shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-4 py-2 border-b border-app-border/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-app-text-muted">
                Simulasi Peran Pengguna
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${currentRoleInfo.badgeColor}`}>
                {currentRoleInfo.badge}
              </span>
            </div>
            <p className="text-xs text-app-text-secondary mt-1">
              Pilih peran untuk melihat hak akses, fitur, dan tampilan antarmuka JacS Enterprise.
            </p>
          </div>

          <div className="py-1 max-h-72 overflow-y-auto divide-y divide-app-border/30">
            {rolesList.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setRole(role.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors ${
                  currentRole === role.id
                    ? 'bg-purple-500/10'
                    : 'hover:bg-app-elevated/70'
                }`}
              >
                <div className="mt-0.5 p-1.5 rounded-app-md bg-app-elevated border border-app-border flex-shrink-0">
                  {getRoleIcon(role.id)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-app-text-primary">
                      {role.title}
                    </span>
                    {currentRole === role.id && (
                      <Check className="w-4 h-4 text-purple-400 flex-shrink-0 ml-1" />
                    )}
                  </div>
                  <p className="text-[11px] text-app-text-muted line-clamp-2 mt-0.5 leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="p-2 border-t border-app-border/50 bg-app-elevated/20">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                openN8nConfig();
              }}
              className="w-full p-2 rounded-lg bg-gradient-to-r from-cyan-500/10 via-[#FF6A00]/10 to-purple-500/10 hover:from-cyan-500/20 hover:to-purple-500/20 border border-cyan-500/30 text-left transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-cyan-500/20 text-[#FF6A00] group-hover:text-cyan-400">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-app-text-primary group-hover:text-cyan-400 flex items-center gap-1">
                    <span>Trio Automation Hub (BYO)</span>
                  </div>
                  <span className="text-[10px] text-app-text-muted">n8n • Make.com • Zapier dedicated</span>
                </div>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                isN8nConnected || isMakeConnected || isZapierConnected
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
              }`}>
                {isN8nConnected || isMakeConnected || isZapierConnected ? '🟢 Aktif' : '⚪ Setup'}
              </span>
            </button>
          </div>

          <div className="px-4 py-2 bg-app-elevated/40 border-t border-app-border/50 text-[11px] text-app-text-muted flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
            <span>Hak akses disesuaikan seketika di seluruh modul portal.</span>
          </div>
        </div>
      )}
    </div>
  );
};
