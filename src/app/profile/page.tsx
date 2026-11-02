
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  RiArrowLeftLine,
  RiImageEditLine,
  RiLoader4Line,
  RiSaveLine,
  RiUserLine,
} from "react-icons/ri";

import ProfileAvatar from "@/components/shared/ProfileAvatar";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

 const [name, setName] = useState(user?.name || "");
const [image, setImage] = useState(user?.image || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Redirect users who are not logged in.
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  const handleUpdateProfile = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMessage("");
    setError("");

    const trimmedName = name.trim();
    const trimmedImage = image.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }

    if (
      trimmedImage &&
      !/^https?:\/\/.+/i.test(trimmedImage)
    ) {
      setError("Please enter a valid image URL.");
      return;
    }

    try {
      setSaving(true);

      const { error: updateError } = await authClient.updateUser({
        name: trimmedName,
        image: trimmedImage || null,
      });

      if (updateError) {
        toast.error("Could not update your profile.");
        setError(updateError.message || "Failed to update profile.");
        return;
      }

      toast.success("Your profile has been updated successfully.");
      setMessage("Your profile has been updated successfully.");
      
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <RiLoader4Line className="animate-spin text-4xl text-emerald-600" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl">
        {/* Back button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600 dark:text-slate-400"
        >
          <RiArrowLeftLine size={18} />
          Go Back
        </button>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Page heading */}
          <div className="border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              My Profile
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Manage your personal information and profile picture.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {/* Profile preview */}
            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row">
              <ProfileAvatar
                name={name}
                image={image}
                size="lg"
              />

              <div className="text-center sm:text-left">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {name || "Your Name"}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {user?.email}
                </p>
                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                  UnityServe Member
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Full Name
                </label>

                <div className="relative">
                  <RiUserLine className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                    required
                    maxLength={80}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-emerald-950"
                  />
                </div>
              </div>

              {/* Profile image URL */}
              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Profile Picture URL
                </label>

                <div className="relative">
                  <RiImageEditLine className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    id="image"
                    type="url"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                    placeholder="https://example.com/profile.jpg"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-emerald-950"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Paste a publicly accessible image URL. Leave it empty to use your initials.
                </p>
              </div>

              {/* Email - read only */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={user?.email}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                />
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Your email address cannot be changed here.
                </p>
              </div>

              {/* Feedback */}
              {message && (
                <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  {message}
                </p>
              )}

              {error && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {saving ? (
                  <>
                    <RiLoader4Line className="animate-spin" size={19} />
                    Saving...
                  </>
                ) : (
                  <>
                    <RiSaveLine size={19} />
                    Update Profile
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
