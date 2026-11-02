
import {useState } from "react";
import Image from "next/image";

type ProfileAvatarProps = {
  name?: string | null;
  image?: string | null;
  size?: "sm" | "md" | "lg";
};

export default function ProfileAvatar({
  name,
  image,
  size = "md",
}: ProfileAvatarProps) {
 const [failedImage, setFailedImage] = useState<string | null>(null);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-28 w-28 text-3xl",
  };
  return (
    <div
      className={`${sizeClasses[size]} relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-100 font-bold text-emerald-700 ring-2 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:ring-emerald-900`}
    >
 {image && failedImage !== image ? (
  <Image
    src={image}
    alt={`${name || "User"}'s profile`}
    fill
    sizes={
      size === "lg"
        ? "112px"
        : size === "md"
          ? "40px"
          : "32px"
    }
    className="object-cover"
    onError={() => setFailedImage(image)}
  />
) : (
  <Image
    src="/images.png"
    alt="Default user avatar"
    fill
    sizes={
      size === "lg"
        ? "112px"
        : size === "md"
          ? "40px"
          : "32px"
    }
    className="object-cover"
  />
)}
    </div>
  );
}
