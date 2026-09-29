import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akhil Zade | Senior Full-Stack & Frontend Engineer (React, Next.js, Node.js)",
  description:
    "Portfolio of Akhil Zade - Full-Stack Developer with 5 years of software development experience (4 years scalable web applications with React.js, Next.js, TypeScript, Node.js, Express.js, MySQL + 1+ year banking backend in Java 8 and Spring Boot).",
  keywords: [
    "Akhil Zade",
    "Full-Stack Developer",
    "React.js Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "Express.js",
    "Frontend Engineer",
    "Software Engineer Portfolio",
    "AI Integration",
    "Nagpur Developer"
  ],
  authors: [{ name: "Akhil Zade", url: "https://github.com/akhilzade" }],
  creator: "Akhil Zade",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Akhil Zade | Senior Full-Stack & Frontend Engineer",
    description:
      "Full-Stack Developer with 5+ years building scalable, high-performance web applications with Next.js, React, Node.js, and TypeScript.",
    siteName: "Akhil Zade Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akhil Zade | Senior Full-Stack & Frontend Engineer",
    description:
      "Explore interactive live work and portfolio for Akhil Zade - 5+ years building scalable web apps with Next.js, React, and Node.js.",
  },
  icons: {
    icon: [
      { url: "/icon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg?v=2",
    apple: "/icon.svg?v=2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth dark`}
    >
      <head>
        <link rel="icon" href="/icon.svg?v=2" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg?v=2" />
      </head>
      <body className="min-h-screen bg-black text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 antialiased relative">
        {children}
      </body>
    </html>
  );
}
