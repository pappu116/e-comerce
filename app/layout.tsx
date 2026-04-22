import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import AppShell from "./app-shell";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Premium Store",
  description: "Professional dynamic e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} min-h-screen bg-background text-foreground antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
