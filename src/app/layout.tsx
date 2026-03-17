import type { Metadata } from "next";
import { Inter_Tight, Azeret_Mono } from "next/font/google";

import "./globals.css";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import Toaster from "../components/ui/toaster";

const interSans = Inter_Tight({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const azeretMono = Azeret_Mono({
  variable: "--font-azeret-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home | Taylor Kelley",
  description:
    "Personal website of Taylor Kelley, a software engineer who works with TypeScript, React, and C# frameworks.",
  keywords: [
    "Software Engineer",
    "TypeScript",
    "React",
    "C#",
    "Web Development",
    "Full Stack Developer",
    "Portfolio",
    "Resume",
    "Projects",
    "Blog",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${azeretMono.variable} antialiased`}
      >
        <NavBar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
