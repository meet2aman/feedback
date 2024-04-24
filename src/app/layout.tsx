import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import SmoothScrolling from "@/components/SmoothScrolling";
import Header from "@/components/main/Header";
import { Toaster } from "@/components/ui/toaster";
import { GlobalProvider } from "@/context/GlobalProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Empower anonymity with our feedback webapp. Collect honest insights discreetly. Join us for transparent communication!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <GlobalProvider>
          <body className={inter.className}>
            <Toaster />
            <SmoothScrolling>{children}</SmoothScrolling>
          </body>
        </GlobalProvider>
      </AuthProvider>
    </html>
  );
}
