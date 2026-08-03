import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { MotionConfig } from "motion/react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://invisionsolutions.co.uk"),
  title: {
    default: "Invision Solutions — Cybersecurity, DevSecOps & Cloud Consultancy",
    template: "%s — Invision Solutions",
  },
  description:
    "Senior-level security expertise. No layers in between. Invision Solutions is a founder-led cybersecurity, DevSecOps, and cloud consultancy delivering enterprise-grade outcomes with direct, principal-led engagement.",
  openGraph: {
    title: "Invision Solutions — Cybersecurity, DevSecOps & Cloud Consultancy",
    description:
      "Senior-level security expertise. No layers in between. One principal consultant, direct engagement, enterprise-grade outcomes.",
    url: "https://invisionsolutions.co.uk",
    siteName: "Invision Solutions",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invision Solutions — Cybersecurity, DevSecOps & Cloud Consultancy",
    description: "Senior-level security expertise. No layers in between.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-void text-platinum">
        <MotionConfig reducedMotion="user">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
