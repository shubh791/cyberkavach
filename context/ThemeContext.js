'use client';

import { createContext, useContext, useEffect, useCallback, useMemo, useSyncExternalStore } from 'react';

const ThemeContext = createContext(null);

const STORAGE_KEY = 'cyberkavach-theme';

const themeListeners = new Set();

function notifyThemeListeners() {
  themeListeners.forEach((listener) => listener());
}

function getThemeSnapshot() {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'dark';
  }
}

function getServerSnapshot() {
  return 'dark';
}

function subscribeTheme(callback) {
  themeListeners.add(callback);

  const handleStorage = (e) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener('storage', handleStorage);

  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const handleMedia = () => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) callback();
  };
  media.addEventListener('change', handleMedia);

  return () => {
    themeListeners.delete(callback);
    window.removeEventListener('storage', handleStorage);
    media.removeEventListener('change', handleMedia);
  };
}

function subscribeMounted() {
  return () => {};
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerSnapshot);
  const mounted = useSyncExternalStore(subscribeMounted, () => true, () => false);

  // Synchronize document attributes with the active theme
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Fallback if localStorage quota is exceeded or storage is disabled
    }
    notifyThemeListeners();
  }, [theme]);

  const setExplicitTheme = useCallback((newTheme) => {
    if (newTheme !== 'dark' && newTheme !== 'light') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Fallback
    }
    notifyThemeListeners();
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme,
      setTheme: setExplicitTheme,
      mounted,
    }),
    [theme, toggleTheme, setExplicitTheme, mounted]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
