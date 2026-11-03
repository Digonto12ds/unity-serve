"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-slate-50 px-4 py-16 dark:bg-slate-950">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-xl text-center">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 shadow-sm dark:bg-emerald-500/10 dark:text-emerald-400">
          <Compass size={40} strokeWidth={1.7} />
        </div>

        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
          Oops! Page not found
        </p>

        <h1 className="text-8xl font-black tracking-tight text-slate-900 sm:text-9xl dark:text-white">
          404
          <span className="text-emerald-500">.</span>
        </h1>

        <h2 className="mt-5 text-2xl font-bold text-slate-800 sm:text-3xl dark:text-slate-100">
          Looks like you are lost!
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base dark:text-slate-400">
          The page you are looking for does not exist or may have been moved.
          Do not worry, lets get you back on track!
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            Back to Home
            <ArrowRight size={17} />
          </Link>
        </div>

        <p className="mt-12 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-600">
          UNITYSERVE — TOGETHER WE MAKE A DIFFERENCE
        </p>
      </div>
    </main>
  );
}