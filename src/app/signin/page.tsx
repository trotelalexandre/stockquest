"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasskeyLoading, setIsPasskeyLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (
      !PublicKeyCredential.isConditionalMediationAvailable ||
      !PublicKeyCredential.isConditionalMediationAvailable()
    ) {
      return;
    }

    void authClient.signIn.passkey({ autoFill: true });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    const data = await authClient.signIn.username({
      username,
      password,
    });

    if (data?.error) {
      toast.error("An error occurred. Please try again later.");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    router.push("/");
  };

  const handlePasskeySignIn = async () => {
    setIsPasskeyLoading(true);

    try {
      const data = await authClient.signIn.passkey();

      if (data?.error) {
        toast.error("An error occurred. Please try again later.");
        setIsPasskeyLoading(false);
        return;
      }

      setIsPasskeyLoading(false);
      router.push("/");
    } catch {
      toast.error("An error occurred. Please try again later.");
      setIsPasskeyLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-card w-full max-w-md space-y-8 rounded-xl border-2 p-6">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="from-game-primary flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b to-[#388E3C]">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>

            <h1 className="text-foreground text-2xl font-bold">Sign In</h1>

            <p className="text-muted-foreground mt-2 text-sm">
              Sign in to your account to continue
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
                placeholder="john_doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username webauthn"
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
                autoComplete="current-password webauthn"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || isPasskeyLoading}
              className="game-button game-button-primary w-full"
            >
              {isLoading ? "Signing in..." : "Sign In"}
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
              onClick={handlePasskeySignIn}
              className="w-full"
            >
              <Key className="mr-2 h-4 w-4" />
              {isPasskeyLoading ? "Signing in..." : "Sign In with Passkey"}
            </Button>

            <div className="text-muted-foreground text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                type="button"
                className="text-game-blue cursor-pointer font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
