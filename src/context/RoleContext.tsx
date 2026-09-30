import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, RoleInfo } from '../types';

export const ROLE_DEFINITIONS: Record<UserRole, RoleInfo> = {
  visitor: {
    id: 'visitor',
    title: 'Pengunjung (Visitor)',
    badge: 'Visitor',
    badgeColor: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
    description: 'Akses publik untuk semua berita, wawasan umum, dan katalog showcase aplikasi.',
    permissions: [
      'Membaca berita & artikel umum',
      'Melihat katalog 7 aplikasi JacS',
      'Melakukan pencarian cepat (Ctrl + K)',
      'Mengakses informasi profil ekosistem',
    ],
  },
  registered: {
    id: 'registered',
    title: 'Pelajar / Pengguna Terdaftar',
    badge: 'Member',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    description: 'Akses konten edukasi terstruktur, artikel riset, dan bookmark aplikasi favorit.',
    permissions: [
      'Semua hak akses Visitor',
      'Menyimpan & menandai (bookmark) artikel',
      'Mencoba interactive sandbox aplikasi',
      'Akses materi edukasi Sekolahkita & modul belajar',
    ],
  },
  contributor: {
    id: 'contributor',
    title: 'Kontributor / Profesional',
    badge: 'Contributor',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    description: 'Akses analisis bisnis mendalam, whitepaper enterprise, dan pengajuan draf wawasan.',
    permissions: [
      'Semua hak akses Pengguna Terdaftar',
      'Unduh whitepaper & kajian strategi era AI',
      'Mengajukan draf artikel wawasan teknologi',
      'Akses preview integrasi JacS Enterprise Suite',
    ],
  },
  editor: {
    id: 'editor',
    title: 'Editor Konten',
    badge: 'Editor',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    description: 'Kewenangan kurasi konten berita, pengaturan kategori trending, dan editorial wawasan.',
    permissions: [
      'Semua hak akses Kontributor',
      'Persetujuan & publikasi artikel Intelligence',
      'Penyusunan daftar berita Trending (01-04)',
      'Katalogisasi & penandaan metadata topik',
    ],
  },
  admin: {
    id: 'admin',
    title: 'Administrator Sistem',
    badge: 'Administrator',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    description: 'Kendali penuh atas konfigurasi ekosistem, perizinan aplikasi, analitik, dan audit sistem.',
    permissions: [
      'Akses tak terbatas ke seluruh ekosistem JacS',
      'Manajemen peran & perizinan pengguna',
      'Pemantauan status 7 aplikasi terhubung',
      'Konfigurasi token design system & runtime',
    ],
  },
};

interface RoleContextType {
  currentRole: UserRole;
  currentRoleInfo: RoleInfo;
  setRole: (role: UserRole) => void;
  rolesList: RoleInfo[];
}

const ROLE_STORAGE_KEY = 'jacs-enterprise-active-role';

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem(ROLE_STORAGE_KEY) as UserRole;
      if (saved && ROLE_DEFINITIONS[saved]) {
        return saved;
      }
    } catch {
      // Fallback
    }
    return 'visitor';
  });

  const setRole = (role: UserRole) => {
    setCurrentRoleState(role);
    try {
      localStorage.setItem(ROLE_STORAGE_KEY, role);
    } catch {
      // Ignore
    }
  };

  const currentRoleInfo = ROLE_DEFINITIONS[currentRole];
  const rolesList = Object.values(ROLE_DEFINITIONS);

  return (
    <RoleContext.Provider value={{ currentRole, currentRoleInfo, setRole, rolesList }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
