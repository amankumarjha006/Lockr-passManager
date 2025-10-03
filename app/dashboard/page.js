"use client";
import { useEffect, useState } from "react";
import { Inter, Orbitron } from "next/font/google";
import Image from "next/image";
import { Eye, EyeOff, Copy } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/lib/supabaseClient";
import ProtectedRoute from "../components/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "500"] });

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [visiblePasswordIndex, setVisiblePasswordIndex] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => setMounted(true), []);

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) fetchPasswords(user.id);
    };
    getUser();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) fetchPasswords(session.user.id);
      else setPasswordArray([]);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Fetch passwords for current user
  const fetchPasswords = async (userId) => {
    const { data, error } = await supabase
      .from("passwords")
      .select("*")
      .eq("user_id", userId)
      .order("id", { ascending: true });
    if (error) console.error("Error fetching passwords:", error);
    else setPasswordArray(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const savePassword = async () => {
    if (!user) {
      setError("You must be signed in to save passwords!");
      return;
    }
    if (!form.site.trim() || !form.username.trim() || !form.password.trim()) {
      setError("Please fill in all fields before saving!");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("passwords")
        .insert([{ ...form, user_id: user.id }])
        .select();
      if (error) throw error;

      setPasswordArray([...passwordArray, data[0]]);
      setForm({ site: "", username: "", password: "" });
      setError("");
    } catch (err) {
      console.error("Error saving password:", err);
      setError(err.message || "Failed to save password!");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const deleteEntry = async (id, index) => {
    try {
      const { error } = await supabase.from("passwords").delete().eq("id", id);
      if (error) throw error;
      const updated = passwordArray.filter((_, i) => i !== index);
      setPasswordArray(updated);
    } catch (err) {
      console.error("Error deleting password:", err);
      toast.error("Failed to delete password", { theme: "dark" });
    }
  };

  // Add Lordicon script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <ProtectedRoute>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className={`max-w-5xl mx-auto my-6 px-4 ${inter.className}`}>
        {/* Logo */}
        <div className={`logo flex justify-center items-center py-3 ${orbitron.className}`}>
          <span className="text-white font-bold text-4xl tracking-wide flex flex-row items-center gap-2">
            <span>L</span>
            <Image src="/logo.png" alt="Lockr Logo" width={40} height={40} priority />
            <span>ckr</span>
          </span>
        </div>

        <h3 className="text-lg text-blue-800 font-semibold text-center mt-1 p-0.5">
          Your Own Password Manager
        </h3>

        {/* Input Form */}
        <div className="text-white flex flex-col p-7 gap-5">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="w-full rounded-3xl px-5 py-2 border border-blue-400 text-white placeholder-gray-300 bg-white/5 backdrop-blur-md shadow-lg shadow-black/20 focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
            type="text"
            name="site"
          />

          <div className="flex flex-col md:flex-row w-full gap-5">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="w-full rounded-3xl px-5 py-2 border border-blue-400 text-white placeholder-gray-300 bg-white/5 backdrop-blur-md shadow-lg shadow-black/20 focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
              type="text"
              name="username"
            />

            {/* Password Field */}
            <div className="relative w-full">
              <input
                value={form.password}
                placeholder="Enter Password"
                onChange={handleChange}
                type="password"
                className="w-full rounded-3xl px-5 py-2 border border-blue-400 text-white placeholder-gray-300 bg-white/5 backdrop-blur-md shadow-lg shadow-black/20 focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out pr-12"
                name="password"
              />
            </div>
          </div>

          {/* Inline Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Add Button */}
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={savePassword}
              className="group relative flex gap-2 items-center justify-center w-fit overflow-hidden rounded-2xl
              border border-cyan-600/50
              bg-gradient-to-tr from-blue-900 via-indigo-700 to-blue-800
              text-md md:text-lg font-semibold text-white px-6 py-3
              backdrop-blur-sm shadow-lg shadow-black/60
              transition-all duration-300 ease-in-out
              hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]
              hover:from-blue-800 hover:via-indigo-500 hover:to-blue-700
              active:scale-95"
            >
              {mounted && (
                <lord-icon
                  src="https://cdn.lordicon.com/efxgwrkc.json"
                  trigger="morph"
                  autoplay
                  colors="primary:#ffffff,secondary:#08a88a"
                  style={{ width: 28, height: 28 }}
                ></lord-icon>
              )}
              Add Password
            </button>
          </div>
        </div>
      </div>

      {/* Password Table */}
      <div className="passwords mt-2 mx-4 md:mx-20 my-6">
        <h2 className="flex justify-center items-center gap-3 text-xl md:text-2xl font-semibold text-center text-white mb-4 tracking-wide">
          Your Passwords
        </h2>
        <div className="overflow-x-auto rounded-xl shadow-2xl shadow-black/50 bg-black/50 backdrop-blur-lg border border-blue-700">
          <table className="w-full min-w-[750px] table-fixed border-separate border-spacing-0">
            <thead className="bg-gradient-to-r from-blue-500 via-indigo-700 to-cyan-800 text-white">
              <tr>
                <th className="py-3 px-4 text-center text-sm md:text-base font-medium uppercase tracking-wider w-[28%]">
                  Site
                </th>
                <th className="py-3 px-4 text-center text-sm md:text-base font-medium uppercase tracking-wider w-[25%]">
                  Username
                </th>
                <th className="py-3 px-4 text-center text-sm md:text-base font-medium uppercase tracking-wider w-[25%]">
                  Password
                </th>
                <th className="py-3 px-4 text-center text-sm md:text-base font-medium uppercase tracking-wider w-[20%]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="text-center text-white">
              {passwordArray.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-4 text-gray-400 text-sm md:text-base"
                  >
                    No passwords saved yet
                  </td>
                </tr>
              ) : (
                passwordArray.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-blue-300/20 transition-colors duration-300"
                  >
                    <td className="py-3 px-4 break-words text-center align-middle">
                      <a
                        href={item.site}
                        target="_blank"
                        className="text-blue-300 hover:underline"
                      >
                        {item.site}
                      </a>
                    </td>

                    <td className="py-3 px-4 break-words text-center align-middle">
                      {item.username}
                    </td>

                    <td className="py-3 px-4 break-words text-center align-middle">
                      <div className="flex items-center justify-center gap-2">
                        <span className="select-none">
                          {visiblePasswordIndex === idx
                            ? item.password
                            : "•".repeat(Math.min(item.password.length, 10))}
                        </span>
                        <button
                          onClick={() =>
                            setVisiblePasswordIndex(visiblePasswordIndex === idx ? null : idx)
                          }
                          className={
                            visiblePasswordIndex === idx
                              ? "text-indigo-400 hover:text-cyan-300 transition"
                              : "text-indigo-400/60 hover:text-indigo-400 transition"
                          }
                          title={visiblePasswordIndex === idx ? "Hide Password" : "Show Password"}
                        >
                          {visiblePasswordIndex === idx ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center align-middle">
                      <div className="flex justify-center items-center gap-3">
                        <button
                          onClick={() => copyToClipboard(item.username)}
                          className="text-cyan-400 hover:text-cyan-300 hover:scale-110 transition-transform"
                          title="Copy Username"
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          onClick={() => copyToClipboard(item.password)}
                          className="text-green-400 hover:text-green-300 hover:scale-110 transition-transform"
                          title="Copy Password"
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          onClick={() => deleteEntry(item.id, idx)}
                          className="hover:scale-110 transition-transform"
                          title="Delete Entry"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/oqeixref.json"
                            trigger="hover"
                            colors="primary:#e83a30"
                            style={{ width: 26, height: 26 }}
                          ></lord-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}
