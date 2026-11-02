"use client";
import { cn } from "cn";
import { Heart } from "lucide-react";

export default function FavoriteIcon({filled = false }: {filled?: boolean}) {
  const handleFavoriteClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <button
      type="button"
      onClick={handleFavoriteClick}
      aria-label={filled ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={filled}
      className="absolute right-3.5 top-3.5 flex size-8 items-center justify-center rounded-full bg-slate-900 text-white transition-colors  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 group cursor-pointer"
    >
      <Heart
        aria-hidden="true"
        className={cn("size-4 group-hover:fill-red-500 group-hover:text-red-500 duration-300 transition-all", filled && "fill-red-500 text-red-500")}
        fill={filled ? "red" : "none"}
      />
    </button>
  );
}
