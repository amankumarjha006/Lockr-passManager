"use client";

import React, { useState } from "react";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);

  const toggleMode = () => setIsSignup(!isSignup);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        {isSignup ? <SignUp onSwitch={toggleMode} /> : <SignIn onSwitch={toggleMode} />}
      </div>
    </div>
  );
}
