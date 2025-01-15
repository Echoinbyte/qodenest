import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quan bas",
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta name="application-name" content="Quanbas" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Quanbas" />
        <meta
          name="description"
          content="Quanbas is your ultimate browser-based coding platform. Write, compile, and run code seamlessly without installing anything!"
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
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://quanbas.vercel.app" />
        <meta
          name="twitter:title"
          content="Quanbas - Code, Compile, and Run in Your Browser"
        />
        <meta
          name="twitter:description"
          content="Quanbas is your ultimate browser-based coding platform. Write, compile, and run code seamlessly without installing anything!"
        />
        <meta
          name="twitter:image"
          content="https://quanbas.vercel.app/icon512_rounded.png"
        />
        <meta name="twitter:creator" content="@QuanbasApp" />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Quanbas - Code, Compile, and Run in Your Browser"
        />
        <meta
          property="og:description"
          content="Experience the future of coding with Quanbas. A fully featured in-browser IDE for developers."
        />
        <meta property="og:site_name" content="Quanbas" />
        <meta property="og:url" content="https://quanbas.vercel.app" />
        <meta
          property="og:image"
          content="https://quanbas.vercel.app/icon512_rounded.png"
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
