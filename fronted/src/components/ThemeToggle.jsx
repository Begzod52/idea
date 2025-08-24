import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
      className="relative flex flex-col cursor-pointer items-center text-gray-600 hover:text-pink-600 font-medium focus:outline-none"
      aria-label="Переключить тему"
      title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
    >
      {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}
