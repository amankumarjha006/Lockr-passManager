import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Menu, X } from "lucide-react";;
import { Orbitron } from 'next/font/google'
import Image from "next/image";

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['400', '500'], // choose weights you want
})


export default function Navbar() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])


    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="w-full fixed top-0 left-0 z-50 bg-[linear-gradient(45deg,#003f8a_21%,#0057b7_35%,#4c1d95_70%,#000428_100%)] shadow-lg">

            <div className="max-w-7xl mycontainer py-4 flex justify-between items-center mycontainer">
                {/* Logo */}
                <Link
                    href="/"
                    className={`text-white font-bold text-2xl tracking-wide flex ${orbitron.className}`}
                >
                    L
                    <span className="mx-1 inline-block ">
                        <Image
                            src="/logo.png" // <-- your logo path
                            alt="Lockr Logo"
                            width={30}
                            height={30}
                            priority
                        />
                    </span>
                    ckr
                </Link>


                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-white font-medium">
                    <Link href="/dashboard" className="hover:text-gray-200 transition">
                        Home
                    </Link>
                    <Link href="/about" className="hover:text-gray-200 transition">
                        About
                    </Link>
                    <div className="relative group">
                        <button className="flex items-center gap-2 hover:text-gray-200 transition">
                            <User size={18} /> Profile
                        </button>
                        <div className="absolute right-0 mt-2 hidden group-hover:block bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden w-40">
                            <Link href="/profile" className="block px-4 py-2 hover:bg-gray-700">
                                View Profile
                            </Link>
                            <Link href="/settings" className="block px-4 py-2 hover:bg-gray-700">
                                Settings
                            </Link>
                            <Link href="/logout" className="block px-4 py-2 hover:bg-gray-700">
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-[#2d89ff] text-white px-6 py-4 space-y-4">
                    <Link href="/dashboard" className="hover:text-gray-200 transition">
                        Home
                    </Link>
                    <Link href="/about" className="block hover:text-gray-200 transition">
                        About
                    </Link>
                    <Link href="/profile" className="block hover:text-gray-200 transition">
                        Profile
                    </Link>
                </div>
            )}
        </nav>
    );
}
