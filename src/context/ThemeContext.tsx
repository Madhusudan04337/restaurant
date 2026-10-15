import React, { createContext, useContext, useState, useLayoutEffect } from 'react';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  themeMode: ThemeMode;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (dark: boolean) => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'dark',
  isDarkMode: true,
  toggleTheme: () => {},
  setTheme: () => {},
  setThemeMode: () => {}
});

// Synchronous DOM updater to apply theme immediately with zero delay and avoid any white line
const applyThemeToDOM = (mode: ThemeMode) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const body = document.body;

  if (mode === 'dark') {
    root.classList.remove('light');
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
    root.style.backgroundColor = '#0b1329';
    if (body) {
      body.classList.remove('light');
      body.classList.add('dark');
      body.style.backgroundColor = '#0b1329';
    }
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
    root.style.colorScheme = 'light';
    root.style.backgroundColor = '#faf8f5';
    if (body) {
      body.classList.remove('dark');
      body.classList.add('light');
      body.style.backgroundColor = '#faf8f5';
    }
  }

  try {
    localStorage.setItem('cravedrop_theme_mode', mode);
    localStorage.setItem('cravedrop_theme', mode);
  } catch {}
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('cravedrop_theme_mode') || localStorage.getItem('cravedrop_theme');
    const initialMode: ThemeMode = saved === 'light' ? 'light' : 'dark';
    applyThemeToDOM(initialMode);
    return initialMode;
  });

  const isDarkMode = themeMode === 'dark';

  useLayoutEffect(() => {
    applyThemeToDOM(themeMode);
  }, [themeMode]);

  // Sudden, instantaneous theme toggle (zero delay, immediate DOM & class sync)
  const toggleTheme = () => {
    const nextMode: ThemeMode = themeMode === 'dark' ? 'light' : 'dark';
    applyThemeToDOM(nextMode); // Apply immediately to DOM before re-render paint
    setThemeModeState(nextMode);
  };

  const setTheme = (dark: boolean) => {
    const nextMode: ThemeMode = dark ? 'dark' : 'light';
    applyThemeToDOM(nextMode);
    setThemeModeState(nextMode);
  };

  const setThemeMode = (mode: ThemeMode) => {
    applyThemeToDOM(mode);
    setThemeModeState(mode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, isDarkMode, toggleTheme, setTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
