"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasskeyLoading, setIsPasskeyLoading] = useState(false);

  const router = useRouter();

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
    router.push("/");
  };

  const handlePasskeySignup = async () => {
    if (!username) {
      toast.error("Please enter a username first");
      return;
    }

    setIsPasskeyLoading(true);

    try {
      const data = await authClient.passkey.addPasskey({
        name: username,
      });

      if (data?.error) {
        console.error(data.error);
        toast.error("An error occurred during passkey registration.");
        setIsPasskeyLoading(false);
        return;
      }

      setIsPasskeyLoading(false);
      router.push("/");
    } catch {
      toast.error("An error occurred during passkey registration.");
      setIsPasskeyLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-card w-full max-w-md space-y-8 rounded-xl border-2 p-6">
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
              disabled={isLoading || isPasskeyLoading}
              className="game-button game-button-primary w-full"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="text-muted-foreground bg-card px-2">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={isLoading || isPasskeyLoading}
              onClick={handlePasskeySignup}
              className="w-full"
            >
              <Key className="mr-2 h-4 w-4" />
              {isPasskeyLoading ? "Registering Passkey..." : "Use Passkey"}
            </Button>

            <div className="text-muted-foreground text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/signin"
                type="button"
                className="text-game-blue cursor-pointer font-semibold hover:underline"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
