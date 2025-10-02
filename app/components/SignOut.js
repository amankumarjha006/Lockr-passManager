"use client";

import { useAuth } from "@/lib/AuthContext"; // your custom auth context
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const { signOut } = useAuth(); // method from context
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();

      toast.success("Signed out successfully 👋", {
        position: "bottom-center",
        autoClose: 1500,
        theme: "dark",
      });

      // Give toast a moment, then redirect
      setTimeout(() => {
        router.push("/auth");
      }, 1500);
    } catch (err) {
      console.error("Sign out error:", err);
      toast.error("Failed to sign out 😢", {
        position: "bottom-center",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-2 px-4 py-2 hover:bg-blue-800/50 transition text-white text-sm w-full text-left"
    >
      <LogOut size={16} />
      Sign Out
    </button>
  );
}
