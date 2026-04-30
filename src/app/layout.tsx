import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clinical-Grade Approval Motivation Analyzer",
  description: "統計学と心理測定に基づき、あなたの承認欲求を多角的に傾向分析します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900`}>
        <main className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative overflow-hidden">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
