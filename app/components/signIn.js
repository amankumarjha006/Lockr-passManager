"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function SignIn({ onSwitch }) {
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // <-- new error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // reset error
    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err) {
      console.error("Sign in error:", err);

      // You can customize messages based on err.message
      let message = "Something went wrong. Please try again.";
      if (err.message?.includes("Invalid login credentials")) {
        message = "Invalid email or password. Please check and try again.";
      } else if (err.message?.includes("Email not confirmed")) {
        message = "Please verify your email before signing in.";
      } else if (err.message?.includes("Missing")) {
        message = "Please fill in all fields.";
      }

      setError(message);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900/70 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-4 text-center">Sign In</h2>
      <p className="text-gray-400 text-center mb-6">Welcome back! Enter your credentials.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-600/50 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-600/50 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full group relative overflow-hidden rounded-xl border border-white/30 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_25px_rgba(99,62,238,0.8)] flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 bg-gradient-to-tr from-violet-700 via-indigo-700 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
          <span className="relative z-10 flex items-center gap-2">
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              <>
                Sign In <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </span>
        </button>
      </form>

      <p className="text-gray-400 mt-6 text-center">
        {"Don't have an account?"}{" "}
        <button onClick={onSwitch} className="text-blue-400 font-semibold hover:text-blue-300 transition">
          Sign Up
        </button>
      </p>
    </div>
  );
}
