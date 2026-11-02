'use client';
import { useEffect, useState } from 'react';

// Small client component only: the rest of the layout stays a server component.
// Theme is stored in localStorage ('cbo-theme'); on first visit the saved
// choice wins, otherwise the operating system's dark/light preference wins.
// The inline script in app/layout.js applies the same choice before paint
// so the page does not flash between themes.
export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const saved = window.localStorage.getItem('cbo-theme');
    const initial = saved === 'dark' || saved === 'light'
      ? saved
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);
  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try { window.localStorage.setItem('cbo-theme', next); } catch {}
  }
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
