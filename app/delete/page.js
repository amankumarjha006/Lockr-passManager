"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DeleteAccountPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleDelete = async () => {
    setError("");
    setSuccess("");

    if (!password) {
      setError("Please enter your password to continue.");
      return;
    }

    setLoading(true);

    try {
      // 1. Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setError("No logged-in user found.");
        setLoading(false);
        return;
      }

      // 2. Re-authenticate
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password,
      });

      if (signInError) {
        setError("Password incorrect. Please try again.");
        setLoading(false);
        return;
      }

      // 3. Call server-side API to delete user
      const res = await fetch("/api/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      setSuccess("Account deleted successfully. Redirecting...");
      setTimeout(() => router.push("/"), 2000);

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-black text-white min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 font-sans pt-24">
        <div className="w-full max-w-xl bg-gray-900 p-10 rounded-2xl shadow-lg space-y-6 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-red-500 text-center">Delete Account</h1>

          <p className="text-gray-300 text-lg leading-relaxed text-center">
            Warning! Deleting your account{" "}
            <span className="font-bold text-red-400">cannot be undone</span>. All your data
            will be permanently removed. Please confirm your password to delete your account.
          </p>

          <div className="flex flex-col space-y-4 w-full">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-white w-full"
            />

            {error && <p className="text-red-400 font-semibold text-center">{error}</p>}
            {success && <p className="text-green-400 font-semibold text-center">{success}</p>}

            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 transition-colors py-3 rounded-lg font-semibold text-white w-full"
            >
              {loading ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
    