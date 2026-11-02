"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HeartHandshake,
  User,
  Mail,
  Image as ImageIcon,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      image?: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
    });
    if (data?.user?.email) {
      localStorage.setItem("userEmail", data.user.email);
      redirect("/");
    }
    if (error) {
      console.error("Error signing up user:", error);
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-4 py-10 transition-colors duration-300 dark:bg-slate-950 sm:px-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-xl shadow-slate-900/5 transition-colors duration-300 sm:px-8 sm:py-10 dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-600/20">
            <HeartHandshake size={29} strokeWidth={2.2} />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Create Account
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Join the community and start driving social change
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-bold text-slate-800 dark:text-slate-200"
            >
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
              />

              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Tanvir Ahmed"
                autoComplete="name"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pr-4 pl-10 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-slate-800 dark:text-slate-200"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
              />

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                autoComplete="email"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pr-4 pl-10 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Profile Photo URL */}
          <div>
            <label
              htmlFor="photo"
              className="mb-2 block text-sm font-bold text-slate-800 dark:text-slate-200"
            >
              Profile Photo URL
            </label>

            <div className="relative">
              <ImageIcon
                size={18}
                className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
              />

              <input
                id="photo"
                name="image"
                type="url"
                placeholder="https://images.unsplash.com/..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pr-4 pl-10 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <p className="mt-2 text-xs text-slate-400">
              Optional: Leave empty for default avatar
            </p>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold text-slate-800 dark:text-slate-200"
            >
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
              />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="new-password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pr-12 pl-10 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3.5 -translate-y-1/2 text-slate-400 transition hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="mt-3 space-y-2">
              <p
                className={`flex items-center gap-2 text-xs ${
                  hasUppercase
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {hasUppercase ? <Check size={14} /> : <X size={14} />}
                At least one uppercase letter (A-Z)
              </p>

              <p
                className={`flex items-center gap-2 text-xs ${
                  hasLowercase
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {hasLowercase ? <Check size={14} /> : <X size={14} />}
                At least one lowercase letter (a-z)
              </p>

              <p
                className={`flex items-center gap-2 text-xs ${
                  hasMinLength
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {hasMinLength ? <Check size={14} /> : <X size={14} />}
                Minimum 6 characters length
              </p>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={!hasUppercase || !hasLowercase || !hasMinLength}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            Register
            <ArrowRight size={19} />
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}
