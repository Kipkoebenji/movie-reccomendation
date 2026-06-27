import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import QueryProvider from "@/components/providers/query-provider";
import type { ChildrenProps } from "@/types/shared";
import "./globals.css";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

export const metadata: Metadata = {
  title: "Movie App",
  description: "Movie reccommendation app",
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en" className={`${lexend.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
