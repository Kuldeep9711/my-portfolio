import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Kuldeep Saini | Fullstack Developer",
  description: "Next.js & Typescript Fullstack Developer | Building modern web apps",
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark"
    >
      <body className={`${inter.className} bg-zinc-950 text-zinc-100`}>{children}</body>
    </html>
  );
}
