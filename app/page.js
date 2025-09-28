"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700"],
});

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden ">
      {/* Content Grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2">
        {/* Logo & Button Section */}
        <div className="flex flex-col items-center md:items-start space-y-8">
          <motion.div
            initial={{ y: -100, opacity: 0, rotate: -10 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="transition-transform duration-300 hover:scale-110 hover:rotate-3 hover:drop-shadow-[0_0_5px_rgba(99,62,238,0.8)]"
          >
            <Link
              href="/"
              className={`flex items-center text-8xl font-bold text-white ${orbitron.className}`}
            >
              L
              <span className="mx-2 inline-block">
                <Image
                  src="/logo.png"
                  alt="Lock Icon"
                  width={90}
                  height={90}
                  priority
                />
              </span>
              ckr
            </Link>
          </motion.div>

          {/* Get Started Button */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8, type: "spring" }}
          >
            <Link href="/auth">
              <button className="group relative overflow-hidden rounded-xl border border-white/30 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_25px_rgba(99,62,238,0.8)]">
                <span className="absolute inset-0 bg-gradient-to-tr from-violet-700 via-indigo-700 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                <span className="relative z-10">Get Started</span>
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Text Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Never Forget. <br /> Never Regret. <br />
            <span className="text-blue-600">Your Passwords, Reinvented.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-6 max-w-lg text-base text-gray-300 sm:text-lg"
          >
            Lockr is your secure, modern password manager built for peace of
            mind. Keep every login safe, accessible, and beautifully simple —
            wherever you are.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
