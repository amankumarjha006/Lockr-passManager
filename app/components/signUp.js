"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from "lucide-react";

export default function SignUp({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    alert("Account created successfully!");
  };

  return (
    <div className="relative w-full max-w-md mx-auto animate-fade-in">
      <div className="relative bg-gray-900/70 backdrop-blur-3xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Sign Up</h2>
        <p className="text-gray-400 text-center mb-6">Create a new account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition"
              required
            />
          </div>

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

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition"
            >
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full group relative overflow-hidden rounded-xl border border-white/30 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_25px_rgba(99,62,238,0.8)] flex items-center justify-center"
          >
            <span className="absolute inset-0 bg-gradient-to-tr from-indigo-700 via-blue-500 to-sky-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Sign Up <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </span>
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <button onClick={onSwitch} className="text-blue-400 font-semibold hover:text-blue-300 transition">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
