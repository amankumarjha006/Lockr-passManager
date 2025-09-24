import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lockr – Your Passwords, Reinvented",
  description: "Lockr is your secure, modern password manager built for peace of mind.",
  icons: {
    icon: "/logo.png", // path to your favicon in the public folder
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/logo.png" />
      </head>
      <body >
        <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#4867ff)]"></div>
        {children}
      </body>
    </html>
  );
}
