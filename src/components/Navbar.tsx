"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CalendarDays, LogIn, Menu, Moon, Sun, X } from "lucide-react";

import {
  RiUserLine,
  RiAddCircleLine,
  RiCalendarEventLine,
  RiCheckboxCircleLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";

import { authClient } from "@/lib/auth-client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileAvatar from "./shared/ProfileAvatar";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const router = useRouter();

  // Better Auth session
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Load saved theme without synchronously updating React state
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";

    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !document.documentElement.classList.contains("dark");

    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");

    setDarkMode(newTheme);
  };

  // Logout
  const handleLogout = async () => {
    await authClient.signOut();

    setMenuOpen(false);
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
      <nav className="container mx-auto flex h-18 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
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

        {/* Desktop Right Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-amber-500 transition hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:text-emerald-400 dark:hover:bg-slate-800"
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* Logged In */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 pr-3 transition hover:border-emerald-500 dark:border-slate-700 dark:bg-slate-900">
                <ProfileAvatar name={user.name} image={user.image} size="sm" />

                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  My Account
                </span>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-3 py-2">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs font-normal text-slate-500 dark:text-slate-400">
                      {user.email}
                    </p>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => router.push("/profile")}
                    className="flex cursor-pointer items-center gap-3 px-3 py-2.5"
                  >
                    <RiUserLine size={19} />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/create-event")}
                    className="flex cursor-pointer items-center gap-3 px-3 py-2.5"
                  >
                    <RiAddCircleLine size={19} />
                    Create Event
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => router.push("/manage-events")}
                    className="flex cursor-pointer items-center gap-3 px-3 py-2.5"
                  >
                    <RiCalendarEventLine size={19} />
                    Manage Events
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => router.push("/joined-events")}
                    className="flex cursor-pointer items-center gap-3 px-3 py-2.5"
                  >
                    <RiUserLine size={19} />
                    Joined Events
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-3 px-3 py-2.5 text-red-600 focus:text-red-600"
                >
                  <RiLogoutBoxRLine size={19} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* Logged Out */
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/15 transition hover:bg-emerald-700"
            >
              <LogIn size={17} />
              Login
            </Link>
          )}
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

            {user ? (
              <>
                {/* User Information */}
                <div className="flex items-center gap-3 border-y border-slate-200 py-4 dark:border-slate-800">
                  <Avatar className="h-11 w-11 border-2 border-emerald-500">
                    <AvatarImage
                      src={user.image || ""}
                      alt={user.name || "User"}
                    />

                    <AvatarFallback className="bg-emerald-100 font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Create Event */}
                <Link
                  href="/create-event"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 font-medium text-slate-700 dark:text-slate-300"
                >
                  <RiAddCircleLine className="text-lg text-emerald-600" />
                  Create Event
                </Link>

                {/* Manage Events */}
                <Link
                  href="/manage-events"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 font-medium text-slate-700 dark:text-slate-300"
                >
                  <RiCalendarEventLine className="text-lg text-emerald-600" />
                  Manage Events
                </Link>

                {/* Joined Events */}
                <Link
                  href="/joined-events"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 font-medium text-slate-700 dark:text-slate-300"
                >
                  <RiCheckboxCircleLine className="text-lg text-emerald-600" />
                  Joined Events
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-xl py-2 text-left font-semibold text-red-600"
                >
                  <RiLogoutBoxRLine className="text-lg" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-bold text-white"
              >
                <LogIn size={18} />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
