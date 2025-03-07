"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  Home,
  LogIn,
  Award,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoginDialog from "./login-dialog";
import StreakCounter from "./streak-counter";
import Badge from "./badge";
import Avatar from "./avatar";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/saved-portfolios", label: "Portfolios", icon: Bookmark },
    { href: "/achievements", label: "Achievements", icon: Award },
  ];

  return (
    <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-game-primary flex items-center gap-2 text-lg font-bold">
              <TrendingUp className="h-5 w-5" />
              <span>StockQuest</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:ml-8 md:flex md:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === item.href
                    ? "bg-game-primary/10 text-game-primary"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
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

          {/* Desktop User Section */}
          <div className="hidden md:flex md:items-center md:gap-3">
            {isLoggedIn ? (
              <>
                <StreakCounter days={5} />
                <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-white px-3 py-1.5 shadow-sm">
                  <Badge label="2500 XP" color="blue" />
                  <Badge label="Level 8" color="purple" />
                </div>
                <Avatar name="John Doe" />
              </>
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
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t py-4 pb-6 md:hidden">
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                    pathname === item.href
                      ? "bg-game-primary/10 text-game-primary"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}

              {/* Mobile User Section */}
              <div className="px-3">
                {isLoggedIn ? (
                  <div className="space-y-4">
                    <StreakCounter days={5} />
                    <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-white px-3 py-1.5 shadow-sm">
                      <Badge label="2500 XP" color="blue" />
                      <Badge label="Level 8" color="purple" />
                    </div>
                    <Avatar name="John Doe" />
                  </div>
                ) : (
                  <Button
                    onClick={() => setLoginOpen(true)}
                    className="game-button game-button-primary w-full"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                )}
              </div>
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
