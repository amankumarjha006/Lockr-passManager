"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function SignUp({ onSwitch }) {
  const { signUp } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Password validation function
  const validatePassword = (pwd) => {
    const errors = [];
    if (pwd.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(pwd)) errors.push("At least 1 uppercase letter");
    if (!/[0-9]/.test(pwd)) errors.push("At least 1 number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) errors.push("At least 1 special character");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const pwdErrors = validatePassword(password);
    if (pwdErrors.length > 0) {
      setError(`Password must include: ${pwdErrors.join(", ")}`);
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, name);
      setSuccess("Account created! Check your email to confirm your account.");
      setTimeout(() => router.push("/auth"), 2000); // redirect after a short delay
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    }
    setLoading(false);
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

          {/* Error / Success Message */}
          {error && (
            <div className="flex items-start gap-2 text-red-400 text-sm mt-2">
              <AlertCircle size={18} className="mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="flex items-start gap-2 text-green-400 text-sm mt-2">
              <CheckCircle2 size={18} className="mt-0.5" />
              <span>{success}</span>
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
                  Creating...
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
