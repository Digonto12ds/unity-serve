"use client";

import { FiHeart } from "react-icons/fi";

interface PageLoaderProps {
  message?: string;
}

const PageLoader = ({
  message = "Loading UnityServe...",
}: PageLoaderProps) => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      {/* Animated loader */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600 dark:border-slate-800 dark:border-t-emerald-400" />

        <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
          <FiHeart size={25} />
        </div>
      </div>

      {/* Loading text */}
      <h2 className="mt-6 text-lg font-bold tracking-wide text-slate-800 dark:text-white">
        {message}
      </h2>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Together we make a difference.
      </p>

      {/* Animated dots */}
      <div className="mt-4 flex items-center gap-2">
        <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-600 [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-600 [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-600" />
      </div>
    </div>
  );
};

export default PageLoader;