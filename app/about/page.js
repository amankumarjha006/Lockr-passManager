"use client";

import { Inter, Orbitron } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-orbitron" });

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className={`bg-black text-white min-h-screen pt-24 px-6 md:px-12 lg:px-24 font-sans ${inter.className} space-y-12`}>
        <h1 className="text-5xl md:text-6xl font-bold mb-12 text-center tracking-wide text-indigo-400">
          About This Project
        </h1>

        {/* Disclaimer Section */}
        <section className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-300 tracking-tight">Disclaimer</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            This is <span className="font-bold">not a professional website</span>. It is solely a 
            <span className="font-bold"> personal project</span> built to practice web development 
            and work with modern technologies. Use it at your own discretion!
          </p>
        </section>

        {/* Technologies Used */}
        <section className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-300 tracking-tight">Technologies Used</h2>
          <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
            <li>Next.js (React framework)</li>
            <li>Tailwind CSS (Styling)</li>
            <li>Supabase (Database & Authentication)</li>
            <li>Lucide React (Icons)</li>
            <li>React Toastify (Notifications)</li>
            <li>JavaScript / TypeScript</li>
          </ul>
        </section>

        {/* Attributions */}
        <section className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-300 tracking-tight">Attributions</h2>
          <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
            <li>Icons by <a href="https://lucide.dev/" target="_blank" className="underline hover:text-indigo-400">Lucide</a></li>
            <li>Notifications powered by <a href="https://fkhadra.github.io/react-toastify/" target="_blank" className="underline hover:text-indigo-400">React Toastify</a></li>
            <li>Fonts from <a href="https://fonts.google.com/" target="_blank" className="underline hover:text-indigo-400">Google Fonts</a></li>
            <li>Database & Auth by <a href="https://supabase.com/" target="_blank" className="underline hover:text-indigo-400">Supabase</a></li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
