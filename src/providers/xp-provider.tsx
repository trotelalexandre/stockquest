"use client";

import { XP_ANIMATION_DURATION } from "@/lib/settings";
import { createContext, useCallback, useContext, useState } from "react";

interface XPContextType {
  xp: number;
  setXP: (xp: number) => void;
  awardXP: (amount: number) => void;
  xpEarned: number;
  setXpEarned: (xpEarned: number) => void;
  showXpAnimation: boolean;
  setShowXpAnimation: (showXpAnimation: boolean) => void;
}

const XPContext = createContext<XPContextType | undefined>(undefined);

interface XPProviderProps {
  children: React.ReactNode;
}

export default function XPProvider({ children }: XPProviderProps) {
  const [xp, setXP] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [showXpAnimation, setShowXpAnimation] = useState(false);
  const [xpKey, setXPKey] = useState(0);

  const awardXP = useCallback((amount: number) => {
    setXpEarned(amount);
    setXPKey((prevKey) => prevKey + 1);
    setShowXpAnimation(true);

    setTimeout(() => {
      setShowXpAnimation(false);
    }, XP_ANIMATION_DURATION);
  }, []);

  const value = {
    xp,
    setXP,
    awardXP,
    xpEarned,
    setXpEarned,
    showXpAnimation,
    setShowXpAnimation,
  };

  return (
    <XPContext.Provider value={value}>
      <div className="relative h-screen">
        {showXpAnimation && (
          <div
            key={xpKey}
            className="from-game-blue fixed right-4 bottom-4 z-50 animate-bounce rounded-lg border-b-2 border-[#0D47A1] bg-gradient-to-b to-[#1976D2] px-3 py-1 font-semibold text-white shadow-sm"
          >
            +{xpEarned} XP
          </div>
        )}

        {children}
      </div>
    </XPContext.Provider>
  );
}

export function useXP() {
  const context = useContext(XPContext);

  if (context === undefined) {
    throw new Error("useXP must be used within a XPProvider");
  }

  return context;
}
