import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { resolvedTheme, setTheme } = useTheme();

  const handleToggle = () => {
    // 1-Click Switch: Instantly switch between dark and light
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={handleToggle}
      type="button"
      className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:rotate-45 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/30 border ${
        isDark
          ? 'bg-slate-900/90 border-slate-700/80 text-amber-400 hover:border-amber-400/80 hover:shadow-[0_0_12px_rgba(251,191,36,0.5)]'
          : 'bg-white border-slate-200/90 text-indigo-600 hover:border-indigo-400/80 hover:shadow-[0_0_12px_rgba(99,102,241,0.3)] shadow-xs'
      } ${className}`}
      title={isDark ? 'Beralih ke Mode Terang (Light Mode)' : 'Beralih ke Mode Gelap (Dark Mode)'}
      aria-label="Toggle Dark and Light theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 transition-colors" strokeWidth={1.8} />
      ) : (
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 transition-colors" strokeWidth={1.8} />
      )}
    </button>
  );
};
