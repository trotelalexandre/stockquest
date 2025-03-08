"use client";

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

  const awardXP = useCallback((amount: number) => {
    setXpEarned(amount);
    setShowXpAnimation(true);

    setTimeout(() => {
      setShowXpAnimation(false);
    }, 2000);
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

  console.log(showXpAnimation);

  return (
    <XPContext.Provider value={value}>
      <div className="relative">
        {showXpAnimation && (
          <div className="from-game-blue absolute top-4 right-4 animate-bounce rounded-lg border-b-2 border-[#0D47A1] bg-gradient-to-b to-[#1976D2] px-3 py-1 font-semibold text-white shadow-sm">
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
