"use client";
import { useEffect, useState } from "react";
import { Inter, Orbitron } from 'next/font/google';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react'; // <-- Lucide React icons

const inter = Inter({ subsets: ['latin'] });
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500'],
});

export default function Dashboard() {
  const [showPassword, setShowPassword] = useState(false);

  // Dynamically load Lordicon script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <div className={` max-w-5xl mycontainer ${inter.className}`}>
      {/* Logo row */}
      <div className={`logo flex justify-center items-center gap-2 py-3 ${orbitron.className}`}>
        <span className="text-white font-bold text-4xl tracking-wide flex items-center">
          L
          <span className="mx-2 flex items-center">
            <Image src="/logo.png" alt="Lockr Logo" width={40} height={40} priority />
          </span>
          ckr
        </span>
      </div>

      <h3 className='text-lg text-blue-800 font-semibold text-center mt-1 p-0.5'>
        Your Own Password Manager
      </h3>

      <div className="text-white flex flex-col p-7 gap-5">
        <input placeholder="Enter Website URL" className="w-full rounded-3xl px-5 py-1 border border-blue-400 text-white placeholder-gray-300 bg-white/5 backdrop-blur-md shadow-lg shadow-black/20 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 ease-in-out" type="text" name="site" id="site" />

        <div className="flex w-full gap-5">
          <input placeholder="Enter Username" className="w-full rounded-3xl px-5 py-1 border border-blue-400 text-white placeholder-gray-300 bg-white/5 backdrop-blur-md shadow-lg shadow-black/20 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 ease-in-out" type="text" name="site" id="site" />

          {/* Password input with show/hide icon */}
          <div className="relative w-full">
            <input
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              className="w-full rounded-3xl px-5 py-1 border border-blue-400 text-white placeholder-gray-300 bg-white/5 backdrop-blur-md shadow-lg shadow-black/20 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 ease-in-out pr-12"
              name="site"
              id="site"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-white/70 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Button with Lordicon */}
        <div className="flex justify-center items-center mt-4">
          <button className="group relative flex gap-1 items-center justify-center w-fit overflow-hidden rounded-2xl border border-white/30 
      bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 
      text-md font-semibold text-white px-6 py-3 transition-all duration-300 ease-in-out
      hover:scale-105 hover:shadow-[0_0_20px_rgba(99,62,238,0.8)] hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600 active:scale-90">

            {/* Lordicon */}
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="loop" // autoplay on page load
              colors="primary:#ffffff,secondary:#08a88a"
              style={{ width: 30, height: 30 }}
            ></lord-icon>

            Add Password
          </button>
        </div>
      </div>
    </div>
  );
}
