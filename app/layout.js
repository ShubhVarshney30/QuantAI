import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "welth",
  description: "one stop budgeting platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        {/* header */}
        <main className="min-h-screen">
          <Header/>
        {children}
        </main>
        {/* footer */}
        <footer className="text-center bg-blue-50 py-12">
          <div className="container mx-auto px-4 text-center text-xl">
            <p>© 2025 Welth. Made by Shubh Varshney with Next.js.</p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
