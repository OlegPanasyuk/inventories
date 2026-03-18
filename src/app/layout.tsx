import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inventories Auth",
  description: "Authentication flow with Next.js App Router, Sequelize, and PostgreSQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}