import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QodeNest",
  description:
    "Possible brings you the best of the web for Qbasic to be Quantum Basics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta name="application-name" content="QodeNest" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="QodeNest" />
        <meta
          name="description"
          content="QodeNest is your ultimate browser-based coding platform. Write, compile, and run code seamlessly without installing anything!"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#007BA7" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#007BA7" />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/icon512_maskable.png" color="#FFD700" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="http://localhost:3000" />
        <meta
          name="twitter:title"
          content="QodeNest - Code, Compile, and Run in Your Browser"
        />
        <meta
          name="twitter:description"
          content="QodeNest is your ultimate browser-based coding platform. Write, compile, and run code seamlessly without installing anything!"
        />
        <meta
          name="twitter:image"
          content="http://localhost:3000/icon512_rounded.png"
        />
        <meta name="twitter:creator" content="@QodeNestApp" />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="QodeNest - Code, Compile, and Run in Your Browser"
        />
        <meta
          property="og:description"
          content="Experience the future of coding with QodeNest. A fully featured in-browser IDE for developers."
        />
        <meta property="og:site_name" content="QodeNest" />
        <meta property="og:url" content="http://localhost:3000" />
        <meta
          property="og:image"
          content="http://localhost:3000/icon512_rounded.png"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
