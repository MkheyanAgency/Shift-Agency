import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 hover:border-[#b4f846]/40 text-neutral-300 dark:text-neutral-300 hover:text-[#b4f846] transition-all cursor-pointer"
      title={isDark ? 'Փոխել Լուսավոր ռեժիմի (Light Mode)' : 'Փոխել Մութ ռեժիմի (Dark Mode)'}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#b4f846]" />
      ) : (
        <Moon className="w-4 h-4 text-amber-400" />
      )}
    </button>
  );
}
