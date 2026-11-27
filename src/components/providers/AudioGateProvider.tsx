"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface WelcomeContextValue {
  welcomeVisible: boolean;
  dismissWelcome: () => void;
  replayWelcome: () => void;
}

const WelcomeContext = createContext<WelcomeContextValue>({
  welcomeVisible: false,
  dismissWelcome: () => {},
  replayWelcome: () => {},
});

/**
 * Lightweight on-demand Welcome Screen state provider:
 * - Zero initial load blocking (Hero renders & accepts scroll at 0ms).
 * - Zero dead gesture listeners or root re-renders on first click/keypress.
 * - Replay Intro button mounts the code-split WelcomeScreen on demand.
 */
export function AudioGateProvider({ children }: { children: React.ReactNode }) {
  const [welcomeVisible, setWelcomeVisible] = useState(false);

  const dismissWelcome = useCallback(() => {
    setWelcomeVisible(false);
  }, []);

  const replayWelcome = useCallback(() => {
    setWelcomeVisible(true);
  }, []);

  const value = useMemo(
    () => ({ welcomeVisible, dismissWelcome, replayWelcome }),
    [welcomeVisible, dismissWelcome, replayWelcome]
  );

  return <WelcomeContext.Provider value={value}>{children}</WelcomeContext.Provider>;
}

export function useAudioGate() {
  return useContext(WelcomeContext);
}
