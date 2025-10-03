"use client";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-16">{children}</div> {/* Push content below navbar */}
    </>
  );
}
