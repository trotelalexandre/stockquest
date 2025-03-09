"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Badge from "@/components/ui/game-badge";
import { BACKTEST_ANIMATION_DURATION } from "@/lib/settings";
import { useXP } from "@/providers/xp-provider";

interface BacktestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BacktestDialog({
  open,
  onOpenChange,
}: BacktestDialogProps) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const { awardXP } = useXP();

  useEffect(() => {
    if (open) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5;

          if (newProgress >= 100) {
            clearInterval(interval);

            setTimeout(() => {
              onOpenChange(false);
              awardXP(50);

              router.push("/backtest-results");
            }, BACKTEST_ANIMATION_DURATION);

            return 100;
          }

          return newProgress;
        });
      }, 200);

      return () => clearInterval(interval);
    }

    if (!open) {
      setProgress(0);
    }
  }, [open, router, onOpenChange, awardXP]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl border sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Running Backtest
          </DialogTitle>
          <DialogDescription className="text-center">
            Analyzing historical performance of your portfolio...
          </DialogDescription>
        </DialogHeader>

        <div className="py-8">
          <div className="pro-progress-bar mb-2">
            <div
              className="pro-progress-fill bg-game-blue"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-muted-foreground mb-4 text-center text-sm">
            {progress}% complete
          </p>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-foreground text-sm">
                Loading historical data
              </span>
              <Badge
                label={progress >= 30 ? "Complete" : "In progress"}
                color={progress >= 30 ? "primary" : "gray"}
                size="sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-foreground text-sm">
                Calculating portfolio returns
              </span>
              <Badge
                label={
                  progress >= 60
                    ? "Complete"
                    : progress >= 30
                      ? "In progress"
                      : "Pending"
                }
                color={
                  progress >= 60 ? "primary" : progress >= 30 ? "blue" : "gray"
                }
                size="sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-foreground text-sm">
                Comparing to benchmark
              </span>
              <Badge
                label={
                  progress >= 90
                    ? "Complete"
                    : progress >= 60
                      ? "In progress"
                      : "Pending"
                }
                color={
                  progress >= 90 ? "primary" : progress >= 60 ? "blue" : "gray"
                }
                size="sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-foreground text-sm">Generating report</span>
              <Badge
                label={
                  progress >= 100
                    ? "Complete"
                    : progress >= 90
                      ? "In progress"
                      : "Pending"
                }
                color={
                  progress >= 100 ? "primary" : progress >= 90 ? "blue" : "gray"
                }
                size="sm"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
