"use client";

import { Heart, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type ProductFavoriteButtonProps = {
  productTitle: string;
};

export function ProductFavoriteButton({
  productTitle,
}: ProductFavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button
      aria-label={
        isFavorite
          ? `Remove ${productTitle} from favorites`
          : `Add ${productTitle} to favorites`
      }
      aria-pressed={isFavorite}
      className="inline-flex shrink-0 items-center gap-2 rounded-full px-2 py-2 text-xs font-medium text-secondary-color transition hover:bg-[#fbf6f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-color"
      onClick={() => setIsFavorite((favorite) => !favorite)}
      type="button"
    >
      <Heart
        aria-hidden="true"
        className="size-4"
        fill={isFavorite ? "currentColor" : "none"}
      />
      <span className="hidden sm:inline">
        {isFavorite ? "Added to favorites" : "Add to favorite"}
      </span>
    </button>
  );
}

type ProductPurchaseControlsProps = {
  stockCount?: number;
};

export function ProductPurchaseControls({
  stockCount,
}: ProductPurchaseControlsProps) {
  const [quantity, setQuantity] = useState(1);
  const [finish, setFinish] = useState("White");
  const [showCartNotice, setShowCartNotice] = useState(false);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label
          className="flex min-h-12 min-w-0 flex-1 items-center justify-between gap-3 rounded-lg border border-[#E9E6DF] bg-[#F7F8FA] px-3 py-2"
          htmlFor="product-finish"
        >
          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#8A8D94]">
            Finish
          </span>
          <select
            className="max-w-[65%] cursor-pointer bg-transparent text-sm font-medium text-[#34332F] outline-none"
            id="product-finish"
            onChange={(event) => setFinish(event.target.value)}
            value={finish}
          >
            <option>White</option>
            <option>Black</option>
            <option>Silver</option>
          </select>
        </label>

        <div
          aria-label="Quantity"
          className="flex h-12 items-center justify-between rounded-lg border border-[#D8DDE5] bg-white sm:w-40"
        >
          <button
            aria-label="Decrease quantity"
            className="grid h-full w-11 place-items-center text-[#475569] transition hover:text-secondary-color disabled:cursor-not-allowed disabled:opacity-40"
            disabled={quantity <= 1}
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            type="button"
          >
            <Minus aria-hidden="true" className="size-4" />
          </button>
          <span aria-live="polite" className="min-w-6 text-center font-semibold">
            {quantity}
          </span>
          <button
            aria-label="Increase quantity"
            className="grid h-full w-11 place-items-center text-[#475569] transition hover:text-secondary-color disabled:cursor-not-allowed disabled:opacity-40"
            disabled={stockCount !== undefined && quantity >= stockCount}
            onClick={() =>
              setQuantity((current) =>
                stockCount === undefined
                  ? current + 1
                  : Math.min(stockCount, current + 1)
              )
            }
            type="button"
          >
            <Plus aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>

      <button
        aria-live="polite"
        aria-label={`Add ${quantity} ${finish} item${quantity === 1 ? "" : "s"} to cart`}
        className="min-h-12 w-full rounded-full bg-secondary-color px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7d391b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-color sm:w-auto sm:min-w-48"
        disabled={stockCount === 0}
        onClick={() => setShowCartNotice(true)}
        type="button"
      >
        Add to Cart
      </button>
      {showCartNotice && (
        <p aria-live="polite" className="text-sm text-[#737983]">
          Cart checkout is not connected yet.{" "}
          <Link
            className="font-semibold text-secondary-color underline underline-offset-2"
            href="/contact-us"
          >
            Contact us to place an order.
          </Link>
        </p>
      )}
    </div>
  );
}
