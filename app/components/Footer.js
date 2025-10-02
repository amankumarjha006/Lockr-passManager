"use client";
import { X } from "lucide-react";
import { Orbitron } from "next/font/google";
import Image from "next/image";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "500"] });

export default function Footer() {
  return (
    <footer className="w-full 
      bg-gradient-to-r from-blue-700 via-black/70 to-blue-700 
      text-white backdrop-blur-md py-1 flex flex-col items-center justify-center shadow-inner mt-auto">
      
      {/* Logo */}
      <div className={`flex items-center gap-1 ${orbitron.className} text-base font-bold`}>
        L
        <span className="inline-block">
          <Image
            src="/logo.png"
            alt="Lockr Logo"
            width={20}
            height={20}
            priority
          />
        </span>
        ckr
      </div>

      {/* Copyright */}
      <div className="mt-1 text-[10px] text-white/80">
        &copy; {new Date().getFullYear()} Lockr. All rights reserved.
      </div>
    </footer>
  );
}
