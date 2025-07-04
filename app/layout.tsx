import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { satoshi } from "../fonts/font";
import { Toaster } from "react-hot-toast";

const geistKarla = Karla({
  variable: "--font-geist-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScreenDrop",
  description: "A Screen Sharing App",
  icons: {
    icon: "/assets/icons/logo.svg",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistKarla.variable} ${satoshi.variable} font-karla antialiased`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
