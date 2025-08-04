import React from "react";

const MainLayout = ({ children }) => {
  return <div className="space-y-8 bg-gradient-to-br from-slate-200 to-blue-300 dark:from-gray-900 dark:to-blue-900/20 ">{children}</div>;
};

export default MainLayout;


// import type {Metadata} from 'next';
// import {Geist, Geist_Mono} from 'next/font/google';
// import './globals.css';
// import { Toaster } from "@/components/ui/toaster";

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

// export const metadata: Metadata = {
//   title: 'Sage Advisor', // Updated App Name
//   description: 'Your personal AI financial sage with centuries of wisdom.', // Updated Description
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         {children}
//         <Toaster />
//       </body>
//     </html>
//   );
// }
