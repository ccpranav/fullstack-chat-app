"use client";
import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { LoaderOne } from "../components/ui/loader";
import { TypewriterEffect } from "../components/ui/typewriter-effect";
// import TypewriterEffectDemo from "../components/typing";

import { cn } from "../lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Eye, EyeOff, Loader2, Mail, MessageSquare, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { useAuthStore } from "../store/useAuthStore";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [focusedField, setFocusedField] = useState(null);

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  const words = [
    {
      text: "Welcome",
      className: "text-white",
    },
    {
      text: "back",
      className: "text-white",
    },
    {
      text: "Mate!",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}

      <div className="min-h-screen flex flex-col items-center justify-start bg-black pt-24 px-4 md:px-0">
        {/* Centered dark container */}
        <div className="w-full max-w-md rounded-2xl bg-black p-8 mt-10 shadow-lg">
          {/* <h2 className="text-2xl font-bold text-white text-center leading-tight px-4">
            <TypewriterEffect
              words={words}
              className="!text-2xl !leading-tight"
            />
          </h2> */}
          <h2 className="text-2xl font-bold text-white text-center leading-tight px-4">
            <TypewriterEffect
              words={words}
              typingSpeed={70}
              restartDelay={2500} // ⏳ Wait 2.5s before clearing & restarting
            />
          </h2>

          <p className="mt-2 text-center text-gray-400 text-sm">
            Sign in to your account{" "}
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <LabelInputContainer>
              <Label htmlFor="email" className="text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                placeholder={focusedField === "email" ? "" : "you@example.com"}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-gray-800 text-white border-gray-700 focus:border-blue-500"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <div className="relative w-full">
                <Input
                  id="password"
                  placeholder={focusedField === "password" ? "" : "••••••••"}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-gray-800 text-white border-gray-700 focus:border-blue-500 pr-10"
                />
                {formData.password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                )}
              </div>
            </LabelInputContainer>

            {/* <button
            className="group/btn relative block h-10 w-full rounded-md bg-gray-700 text-white font-medium shadow hover:bg-gray-600 transition"
            type="submit"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <LoaderOne className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            ) : (
              <> Sign up &rarr;</>
            )}
          </button> */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="relative flex items-center justify-center h-10 w-full rounded-md bg-gray-700 text-white font-medium shadow hover:bg-gray-600 transition"
            >
              {isLoggingIn ? (
                <div className="scale-50">
                  <LoaderOne className="text-white animate-pulse" />
                </div>
              ) : (
                <>Sign In &rarr;</>
              )}
            </button>

            <div className="my-6 h-[1px] w-full bg-gray-700" />

            {/* <div className="flex flex-col space-y-3">
              <Link to={"/givemoney"}>
                <SocialButton icon={IconBrandGithub} text="GitHub" />
              </Link>
              <Link to={"/givemoney"}>
                <SocialButton icon={IconBrandGoogle} text="Google" />
              </Link>
            </div> */}
          </form>
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.6)] transition duration-300"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
}

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);

const SocialButton = ({ icon: Icon, text }) => (
  <button
    className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-800 px-4 font-medium text-white shadow hover:bg-gray-700 transition"
    type="button"
  >
    <Icon className="h-4 w-4 text-gray-300" />
    <span className="text-sm text-gray-300">{text}</span>
  </button>
);
