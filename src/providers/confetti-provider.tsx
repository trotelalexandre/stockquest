"use client";

import Confetti from "@/components/ui/confetti";
import { createContext, useContext, useState } from "react";

interface ConfettiContextType {
  showConfetti: boolean;
  setShowConfetti: (show: boolean) => void;
  handleSetShowConfetti: (show: boolean) => void;
}

const ConfettiContext = createContext<ConfettiContextType | undefined>(
  undefined,
);

interface ConfettiProviderProps {
  children: React.ReactNode;
}

export default function ConfettiProvider({ children }: ConfettiProviderProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  const handleSetShowConfetti = (show: boolean) => {
    setShowConfetti(show);
    if (show) {
      setConfettiKey((prevKey) => prevKey + 1);
    }
  };

  const value = { showConfetti, setShowConfetti, handleSetShowConfetti };

  return (
    <ConfettiContext.Provider value={value}>
      <div className="relative h-screen">
        {showConfetti && <Confetti key={confettiKey} />}

        {children}
      </div>
    </ConfettiContext.Provider>
  );
}

export function useConfetti() {
  const context = useContext(ConfettiContext);

  if (!context) {
    throw new Error("useConfetti must be used within a ConfettiProvider");
  }

  return context;
}
