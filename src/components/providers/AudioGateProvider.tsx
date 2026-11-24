"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

interface AudioGateContextValue {
  audioUnlocked: boolean;
  unlockAudio: () => void;
  welcomeVisible: boolean;
  welcomeCompleted: boolean;
  dismissWelcome: () => void;
  replayWelcome: () => void;
}

const AudioGateContext = createContext<AudioGateContextValue>({
  audioUnlocked: false,
  unlockAudio: () => {},
  welcomeVisible: false,
  welcomeCompleted: true,
  dismissWelcome: () => {},
  replayWelcome: () => {},
});

export function AudioGateProvider({ children }: { children: React.ReactNode }) {
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [welcomeCompleted, setWelcomeCompleted] = useState(false);

  const unlockAudio = useCallback(() => {
    setAudioUnlocked(true);
  }, []);

  useEffect(() => {
    const onGesture = () => {
      setAudioUnlocked(true);
    };
    window.addEventListener("pointerdown", onGesture, { passive: true, once: true });
    window.addEventListener("keydown", onGesture, { passive: true, once: true });
    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, []);

  const dismissWelcome = useCallback(() => {
    setWelcomeVisible(false);
    setWelcomeCompleted(true);
  }, []);

  const replayWelcome = useCallback(() => {
    setWelcomeVisible(true);
    setWelcomeCompleted(false);
  }, []);

  return (
    <AudioGateContext.Provider
      value={{
        audioUnlocked,
        unlockAudio,
        welcomeVisible,
        welcomeCompleted,
        dismissWelcome,
        replayWelcome,
      }}
    >
      {children}
    </AudioGateContext.Provider>
  );
}

export function useAudioGate() {
  return useContext(AudioGateContext);
}
