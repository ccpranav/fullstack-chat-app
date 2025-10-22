"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { LoaderOne } from "../ui/loader";

import { cn } from "../../lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";

export default function SignupFormDemo() {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.firstName.trim())
      return toast.error("First name is required");
    if (!formData.lastName.trim()) return toast.error("Last name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fullName =
      `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();

    console.log("Form submitted", formData);
    const success = validateForm();
    if (success === true) {
      signUp({
        fullName,
        email: formData.email,
        password: formData.password,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black pt-24 px-4 md:px-0">
      {/* Centered dark container */}
      <div className="w-full max-w-md rounded-2xl bg-black p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center">
          Welcome to CharLando
        </h2>
        <p className="mt-2 text-center text-gray-400 text-sm">
          Get started with your free account{" "}
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
            <LabelInputContainer>
              <Label htmlFor="firstname" className="text-gray-300">
                First name
              </Label>
              <Input
                id="firstname"
                placeholder={focusedField === "firstName" ? "" : "Michael"}
                onFocus={() => setFocusedField("firstName")}
                onBlur={() => setFocusedField(null)}
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="bg-gray-800 text-white border-gray-700 focus:border-blue-500"
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname" className="text-gray-300">
                Last name
              </Label>
              <Input
                id="lastname"
                placeholder={focusedField === "lastName" ? "" : "Jackson"}
                onFocus={() => setFocusedField("lastName")}
                onBlur={() => setFocusedField(null)}
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="bg-gray-800 text-white border-gray-700 focus:border-blue-500"
              />
            </LabelInputContainer>
          </div>

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

          {/* <LabelInputContainer>
            <Label htmlFor="password" className="text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              className="bg-gray-800 text-white border-gray-700 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </LabelInputContainer> */}
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
            disabled={isSigningUp}
            className="relative flex items-center justify-center h-10 w-full rounded-md bg-gray-700 text-white font-medium shadow hover:bg-gray-600 transition"
          >
            {isSigningUp ? (
              <div className="scale-50">
                <LoaderOne className="text-white animate-pulse" />
              </div>
            ) : (
              <>Sign up &rarr;</>
            )}
          </button>

          <div className="my-6 h-[1px] w-full bg-gray-700" />

          <div className="flex flex-col space-y-3">
            <SocialButton icon={IconBrandGithub} text="GitHub" />
            <SocialButton icon={IconBrandGoogle} text="Google" />
            {/* <SocialButton icon={IconBrandOnlyfans} text="OnlyFans" /> */}
          </div>
        </form>
      </div>
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
