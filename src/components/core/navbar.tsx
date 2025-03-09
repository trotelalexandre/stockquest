"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, TrendingUp, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoginDialog from "../features/auth/login-dialog";
import Badge from "../ui/game-badge";
import { navItems } from "@/lib/data";
import { useAchievements } from "@/providers/achievements-provider";

export default function Navbar() {
  const pathname = usePathname();
  const { level } = useAchievements();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-white shadow-sm dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="text-game-primary flex items-center gap-2 text-lg font-bold">
              <TrendingUp className="h-5 w-5" />
              <span>StockQuest</span>
            </div>
          </Link>

          <nav className="hidden md:ml-8 md:flex md:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold ${
                  pathname === item.href
                    ? "bg-game-primary/10 text-game-primary"
                    : "text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex md:items-center md:gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Badge label={`Level ${level}`} color="purple" />
              </div>
            ) : (
              <Button
                onClick={() => setLoginOpen(true)}
                className="game-button game-button-primary"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Badge label={`Level ${level}`} color="purple" />
              </div>
            ) : (
              <Button
                onClick={() => setLoginOpen(true)}
                className="game-button game-button-primary"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}

            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t py-4 pb-6 md:hidden">
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${
                    pathname === item.href
                      ? "bg-game-primary/10 text-game-primary"
                      : "text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onLogin={handleLogin}
      />
    </header>
  );
}
