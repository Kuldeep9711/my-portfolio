import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Kuldeep Saini | Fullstack Developer",
  description: "Fullstack developer specializing in Next.js, TypeScript and PostgreSQL. Open to work",
   openGraph: {
    title: 'Kuldeep Saini | Fullstack Developer',
    description: '...',
    url: 'https://my-portfolio-x6f3.vercel.app',
   }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
       suppressHydrationWarning
    >
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 dark:bg-zinc-950 dark:text-zinc-100`}>{children}</body>
    </html>
  );
}
