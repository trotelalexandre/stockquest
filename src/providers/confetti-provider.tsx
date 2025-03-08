"use client";

import Confetti from "@/components/confetti";
import { createContext, useContext, useState } from "react";

interface ConfettiContextType {
  showConfetti: boolean;
  setShowConfetti: (show: boolean) => void;
}

const ConfettiContext = createContext<ConfettiContextType | undefined>(
  undefined,
);

interface ConfettiProviderProps {
  children: React.ReactNode;
}

export default function ConfettiProvider({ children }: ConfettiProviderProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  const value = { showConfetti, setShowConfetti };

  return (
    <ConfettiContext.Provider value={value}>
      <div className="relative">
        {showConfetti && <Confetti />}

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
