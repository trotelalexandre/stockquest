import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { PortfolioProvider } from "@/providers/portfolio-provider";
import Navbar from "@/components/core/navbar";
import XPProvider from "@/providers/xp-provider";
import ConfettiProvider from "@/providers/confetti-provider";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ConfettiProvider>
            <XPProvider>
              <PortfolioProvider>
                <Navbar />
                {children}
              </PortfolioProvider>
            </XPProvider>
          </ConfettiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
