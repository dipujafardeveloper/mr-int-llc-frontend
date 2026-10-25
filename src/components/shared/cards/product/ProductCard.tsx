"use client";

import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useState } from "react";

export interface ProductCardProps {
  image: ImageProps["src"];
  imageAlt: string;
  category: string;
  title: string;
  price: number | string;
  originalPrice?: number | string;
  rating?: number;
  href?: string;
  badge?: string;
  soldCount?: number;
  stockCount?: number;
  initialFavorite?: boolean;
  onFavoriteChange?: (isFavorite: boolean) => void;
}

function formatPrice(value: number | string) {
  if (typeof value === "string") return value;

  return `$${value.toFixed(2)}`;
}

export default function ProductCard({
  image,
  imageAlt,
  category,
  title,
  price,
  originalPrice,
  rating = 0,
  href,
  badge,
  soldCount,
  stockCount,
  initialFavorite = false,
  onFavoriteChange,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const hasSale = originalPrice !== undefined;
  const safeRating = Math.min(5, Math.max(0, rating));

  const toggleFavorite = () => {
    const nextFavorite = !isFavorite;
    setIsFavorite(nextFavorite);
    onFavoriteChange?.(nextFavorite);
  };

  const productImage = (
    <div className="relative aspect-1.25/1 w-full">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 350px"
        className="object-contain p-5 sm:p-7"
      />
    </div>
  );

  const productTitle = (
    <h2 className="line-clamp-2 min-h-11 text-base font-semibold leading-[1.35] text-slate-800">
      {title}
    </h2>
  );

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-[#f7f7f8]">
      <div className="relative">
        {href ? (
          <Link href={href} aria-label={title}>
            {productImage}
          </Link>
        ) : (
          productImage
        )}

        {hasSale && (
          <span className="absolute left-5 top-5 rounded bg-green-700 px-2 py-1 text-[10px] font-medium text-white">
            {badge ?? "On Sale"}
          </span>
        )}

        <button
          type="button"
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={isFavorite}
          className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          <Heart
            aria-hidden="true"
            className="size-4"
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-2">
        <p className="mb-0.5 text-sm text-slate-400">{category}</p>
        {href ? (
          <Link href={href} className="rounded-sm focus-visible:outline-2">
            {productTitle}
          </Link>
        ) : (
          productTitle
        )}

        <div
          role="img"
          className="mt-1 flex items-center gap-1 text-amber-500"
          aria-label={`${safeRating} out of 5 stars`}
        >
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              aria-hidden="true"
              className="size-3.5"
              fill={index < Math.floor(safeRating) ? "currentColor" : "none"}
            />
          ))}
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-bold text-[#b74b0a]">
            {formatPrice(price)}
          </span>
          {originalPrice !== undefined && (
            <span className="text-xs text-slate-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {soldCount !== undefined && (
          <p className="mt-3 text-sm text-slate-400">
            Already sold:{" "}
            <span className="font-semibold text-slate-700">
              {soldCount}
              {stockCount !== undefined && `/${stockCount}`}
            </span>
          </p>
        )}
      </div>
    </article>
  );
}