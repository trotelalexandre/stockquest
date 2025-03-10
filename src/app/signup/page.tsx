"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp } from "lucide-react";
import LoginDialog from "@/components/features/auth/login-dialog";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const router = useRouter();

  const onOpenChange = (open: boolean) => {
    setLoginOpen(open);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setIsLoading(true);

    const { error } = await authClient.signUp.email({
      email,
      password,
      name: username,
      callbackURL: "/",
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

  return (
    <>
      <div className="flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-xl border-2 border-gray-200 bg-white p-6">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="from-game-primary flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b to-[#388E3C]">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>

            <h1 className="text-foreground text-2xl font-bold">
              Join StockQuest
            </h1>

            <p className="text-muted-foreground mt-2 text-sm">
              Create an account to start your investment journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="game-input"
              />
            </div>

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

            <div className="space-y-2">
              <Label
                htmlFor="confirm-password"
                className="text-foreground font-medium"
              >
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                placeholder="•••••••••••••••"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="game-input"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="game-button game-button-primary w-full"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-muted-foreground text-center text-sm">
              Already have an account?{" "}
              <button
                onClick={() => setLoginOpen(true)}
                type="button"
                className="text-game-blue cursor-pointer font-semibold hover:underline"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
