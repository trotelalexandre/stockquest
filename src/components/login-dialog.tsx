"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp } from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: () => void;
}

export default function LoginDialog({
  open,
  onOpenChange,
  onLogin,
}: LoginDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl border-2 border-gray-200 sm:max-w-[425px]">
        <DialogHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="from-game-primary flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b to-[#388E3C]">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Welcome to StockQuest
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Login to track your progress and earn rewards
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="game-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-medium text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="game-input"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="game-button game-button-primary w-full"
            >
              {isLoading ? "Logging in..." : "Start Your Journey"}
            </Button>
          </DialogFooter>

          <div className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="text-game-blue font-semibold hover:underline"
            >
              Sign up
            </a>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
