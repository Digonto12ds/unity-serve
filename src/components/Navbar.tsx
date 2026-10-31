
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  LogIn,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";

    // setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !darkMode;

    setDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
      <nav className="container mx-auto flex h-18 w-full  items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl">
            <Image
              src="/Navbar.png"
              alt="UnityServe Logo"
              fill
              priority
              sizes="40px"
              className="object-contain"
            />
          </div>

          <div className="leading-tight">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Unity<span className="text-emerald-600">Serve</span>
            </h1>
            <p className="mt-1 text-[9px] font-bold tracking-[2px] text-slate-500 dark:text-slate-400">
              TOGETHER WE MAKE A DIFFERENCE
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <Link
            href="/events"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
          >
            <CalendarDays size={17} />
            Upcoming Events
          </Link>
        </div>

        {/* Right Actions */}
        <div className="hidden items-center gap-3 md:flex">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-amber-500 transition hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:text-emerald-400 dark:hover:bg-slate-800"
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* Login */}
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/15 transition hover:bg-emerald-700"
          >
            <LogIn size={17} />
            Login
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-amber-500 dark:border-slate-700 dark:text-emerald-400"
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-800 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/events"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-300"
            >
              <CalendarDays size={18} />
              Upcoming Events
            </Link>

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-bold text-white"
            >
              <LogIn size={18} />
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
