
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HeartHandshake,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Connect your Better Auth login function here.
  };

  const handleGoogleLogin = () => {
    // Connect your Google sign-in function here.
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-4 py-10 transition-colors duration-300 dark:bg-[#09141d] sm:px-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white px-6 py-9 shadow-xl shadow-slate-900/5 transition-colors duration-300 sm:px-8 sm:py-10 dark:border-slate-800 dark:bg-slate-900">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-600/20">
            <HeartHandshake size={29} strokeWidth={2.2} />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Sign in and continue making a difference
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pr-4 pl-10 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
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
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pr-12 pl-10 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3.5 -translate-y-1/2 text-slate-400 transition hover:text-teal-600 dark:hover:text-teal-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-lg"
          >
            Login
            <ArrowRight size={19} />
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          <span className="text-xs font-medium text-slate-400">
            OR CONTINUE WITH
          </span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:border-teal-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-600 dark:hover:bg-slate-800/70"
        >
          <FcGoogle />
          Continue with Google
        </button>

        {/* Signup Link */}
        <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
          Do not have an account?{" "}
          <Link
            href="/signup"
            className="font-bold text-teal-600 transition hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </main>
  );
}
