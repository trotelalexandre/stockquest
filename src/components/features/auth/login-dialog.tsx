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
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      toast.error("An error occurred. Please try again later.");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    onOpenChange(false);
    router.push("/");
  };

  const handleSignUp = () => {
    onOpenChange(false);
    router.push("/signup");
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

          <DialogTitle className="text-foreground text-center text-xl font-bold">
            Welcome to StockQuest
          </DialogTitle>

          <DialogDescription className="text-muted-foreground text-center">
            Login to track your progress and earn rewards
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
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
            <Label htmlFor="password" className="text-foreground font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              placeholder="•••••••••••••••"
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

          <div className="text-muted-foreground text-center text-sm">
            Don&apos;t have an account?{" "}
            <button
              onClick={handleSignUp}
              className="text-game-blue cursor-pointer font-semibold hover:underline"
            >
              Sign up
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
