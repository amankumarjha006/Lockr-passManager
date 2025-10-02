"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className=" px-8 py-20">{children}</div> {/* Push content below navbar */}

      <Footer />
    </>
  );
}
