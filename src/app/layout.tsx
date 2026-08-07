import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { ErrorBoundary } from "@/components/common";
import { AppShell } from "@/components/layout";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RheumaLens",
    template: "%s | RheumaLens",
  },
  description: "AI-powered diagnostic co-pilot for rural rheumatology care",
  keywords: [
    "rheumatology",
    "healthcare",
    "diagnostic support",
    "medical imaging",
    "AI co-pilot",
  ],
  openGraph: {
    title: "RheumaLens",
    description: "AI-powered diagnostic co-pilot for rural rheumatology care",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RheumaLens",
    description: "AI-powered diagnostic co-pilot for rural rheumatology care",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f8fafc" }, { media: "(prefers-color-scheme: dark)", color: "#0f172a" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Providers>
          <ErrorBoundary>
            <AppShell>{children}</AppShell>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
