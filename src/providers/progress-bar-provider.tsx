"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

interface ProgressBarProps {
  children: React.ReactNode;
}

export default function ProgressBarProvider({ children }: ProgressBarProps) {
  return (
    <>
      {children}

      <ProgressBar
        color="#4caf50"
        height="5px"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}
