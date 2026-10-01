export type ThemeMode = 'dark' | 'light' | 'system';

export type UserRole = 'visitor' | 'registered' | 'contributor' | 'editor' | 'admin';

export interface RoleInfo {
  id: UserRole;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  permissions: string[];
}

export interface AppFeature {
  id: string;
  module: string;
  title: string;
  description: string;
  status: string;
  docUrl?: string;
}

export interface AppTechnicalSpecifications {
  architecture: string;
  frontend: string[];
  storageAndDataHandling: string[];
  automationAndIntegrations: string[];
  keyMetrics: string[];
}

export interface WebApp {
  id: string;
  name: string;
  suite?: string;
  tagline: string;
  category: string;
  status: string;
  version: string;
  summary: string;
  description: string;
  fullDescription?: string;
  liveUrl?: string;
  externalUrl?: string;
  appUrl?: string;
  documentationUrl?: string;
  iconName?: string;
  accentColor?: string;
  accentGradient?: string;
  features: AppFeature[];
  advantages?: string[];
  objectives?: { title: string; desc: string }[] | string[];
  suitableFor?: string[];
  stats?: { label: string; value: string }[];
  technicalSpecifications?: AppTechnicalSpecifications;
  imageUrl?: string;
}

export type JacsAppItem = WebApp;

export interface IntelligenceArticle {
  id: string;
  title: string;
  slug?: string;
  category: 'AI & TEKNOLOGI' | 'TEKNOLOGI' | 'BISNIS' | 'EDUKASI' | 'INOVASI' | 'DIGITAL';
  categoryColor?: string;
  excerpt: string;
  summary?: string;
  content: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  trendingRank?: number;
  trendingTimeAgo?: string;
  tags: string[];
  featured?: boolean;
  relatedIds?: string[];
  imageUrl?: string;
  coverImage?: string;
  externalUrl?: string;
  imagePlaceholder?: {
    type: 'ai' | 'robotics' | 'education' | 'cloud' | 'business' | 'chips';
    primaryColor: string;
  };
}

export interface NavigationItem {
  id: string;
  label: string;
  labelId: string;
  href: string;
}

export type AiAccessType = 'Gratis / Free Tier' | 'Freemium / Kuota Harian' | 'Trial / Berbayar' | 'Gratis / Akun Google';

export interface AiGeneratorReference {
  id: string;
  name: string;
  provider: string;
  category: 'Multimodal' | 'Text & Reasoning' | 'Code & UI' | 'Image & Art' | 'Video & Motion' | 'Studio & IDE' | 'Google Gems';
  description: string;
  url: string;
  accessType: AiAccessType;
  badge?: string;
  accentColor?: string;
  tags: string[];
  isFeatured?: boolean;
}

export * from './n8n';
