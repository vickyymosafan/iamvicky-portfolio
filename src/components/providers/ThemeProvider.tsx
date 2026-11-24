"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

type ThemeMode = "dark" | "light";

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (next: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

const STORAGE_KEY = "vicky-portfolio-theme";
const THEME_EVENT = "vicky-portfolio-theme-change";

function readStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function getClientThemeSnapshot(): ThemeMode {
  return readStoredTheme();
}

function getServerThemeSnapshot(): ThemeMode {
  return "dark";
}

function subscribeTheme(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onChange = () => callback();

  window.addEventListener("storage", onChange);
  window.addEventListener(THEME_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(THEME_EVENT, onChange);
  };
}

function applyThemeToDocument(next: ThemeMode) {
  document.documentElement.dataset.theme = next;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
  if (meta) {
    meta.content = next;
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getClientThemeSnapshot,
    getServerThemeSnapshot
  );

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  const setTheme = useCallback((next: ThemeMode) => {
    applyThemeToDocument(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked in restricted browsing mode — theme still applies live to document
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
