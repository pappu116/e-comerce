import type { Metadata } from "next";
import "./globals.css";
import AppShell from "./app-shell";

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
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
