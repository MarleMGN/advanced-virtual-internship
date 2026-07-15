import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import Authentication from "@/components/authentication";
import { FontSizeProvider } from "@/context/FontSizeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Advanced Virtual Internship",
  description: "Summarist Website Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ModalProvider>
          <FontSizeProvider>
            <Authentication />
            <main>{children}</main>
          </FontSizeProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
