"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Menu, X, Home, Info } from "lucide-react";
import { Orbitron } from "next/font/google";
import Image from "next/image";
import SignOut from "./SignOut";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Delete Account Button (links to /delete)
function DeleteButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);
    setMounted(true);
    return () => document.body.removeChild(script);
  }, []);

  if (!mounted) return null;

  return (
    <Link
      href="/delete"
      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition text-red-400"
    >
      <lord-icon
        src="https://cdn.lordicon.com/xyfswyxf.json"
        trigger="hover"
        colors="primary:#e83a30"
        style={{ width: "20px", height: "20px" }}
      ></lord-icon>
      Delete Account
    </Link>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-blue-700 via-black/70 to-blue-700 shadow-lg backdrop-blur-md">
      <div className="max-w-5xl mx-auto py-4 flex justify-between items-center px-6">
        {/* Logo */}
        <Link
          href="/"
          className={`text-white font-bold text-2xl tracking-wide flex items-center ${orbitron.className}`}
        >
          L
          <span className="mx-1 inline-block">
            <Image src="/logo.png" alt="Lockr Logo" width={30} height={30} priority />
          </span>
          ckr
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-white font-medium">
          {/* Home Link */}
          <Link
            href="/dashboard"
            className="flex items-center gap-1 hover:scale-105 hover:text-cyan-500 transition-transform"
          >
            <Home size={20} /> Home
          </Link>

          {/* About Link */}
          <Link
            href="/about"
            className="flex items-center gap-1 hover:scale-105 hover:text-cyan-500 transition-transform"
          >
            <Info size={20} /> About
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            {mounted && (
              <>
                <button
                  className="flex items-center gap-2 hover:text-cyan-500 transition"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <User size={18} /> Profile
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-black/80 text-white rounded-lg shadow-lg overflow-hidden w-48 flex flex-col z-50">
                    <SignOut />
                    <DeleteButton />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mounted && menuOpen && (
        <div className="md:hidden bg-black/70 text-white px-6 py-4 space-y-4 backdrop-blur-md rounded-b-lg max-w-5xl mx-auto">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 hover:scale-110 transition-transform"
          >
            <Home size={20} /> Home
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-1 hover:scale-110 transition-transform"
          >
            <Info size={20} /> About
          </Link>

          {/* Mobile Profile Dropdown */}
          <div className="flex flex-col gap-2 mt-2">
            <SignOut />
            <DeleteButton />
          </div>
        </div>
      )}
    </nav>
  );
}
