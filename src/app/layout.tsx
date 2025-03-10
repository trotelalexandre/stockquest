import "./globals.css";

import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { PortfolioProvider } from "@/providers/portfolio-provider";
import Navbar from "@/components/core/navbar";
import XPProvider from "@/providers/xp-provider";
import ConfettiProvider from "@/providers/confetti-provider";
import ProgressBarProvider from "@/providers/progress-bar-provider";
import AchievementsProvider from "@/providers/achievements-provider";
import NotificationBanner from "@/components/core/push-notifications";
import { Toaster } from "@/components/ui/sonner";

const font = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StockQuest",
  description:
    "StockQuest is the funny way to backtest your trading strategies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ProgressBarProvider>
            <ConfettiProvider>
              <XPProvider>
                <AchievementsProvider>
                  <PortfolioProvider>
                    <Navbar />
                    <main className="container mx-auto flex flex-col gap-8 px-4 py-8 pb-16 md:pb-8">
                      {children}
                    </main>

                    <Toaster />
                    <NotificationBanner />
                  </PortfolioProvider>
                </AchievementsProvider>
              </XPProvider>
            </ConfettiProvider>
          </ProgressBarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
