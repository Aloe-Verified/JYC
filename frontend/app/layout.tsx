import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JYC",
  description: "A do-it-all note-taking assistant",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/JYC_icon.svg",
        href: "/JYC_icon.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/JYC_icon.svg",
        href: "/JYC_icon.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased
          bg-white text-gray-900
          dark:bg-gray-900 dark:text-gray-100
          `}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-right" />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
