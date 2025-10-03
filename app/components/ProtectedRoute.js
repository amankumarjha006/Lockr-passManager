"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login"); // redirect to login if not logged in
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-white">Checking authentication...</div>;

  return <>{children}</>;
}
