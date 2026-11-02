import Link from "next/link";

interface CartSummaryProps {
  selectedItemCount: number;
  subtotal: number;
}

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export default function CartSummary({
  selectedItemCount,
  subtotal,
}: CartSummaryProps) {
  const delivery = selectedItemCount > 0 ? 5 : 0;
  const taxes = selectedItemCount > 0 ? 5 : 0;
  const discount = 0;
  const total = subtotal + delivery + taxes - discount;

  return (
    <aside aria-labelledby="cart-summary-title" className="h-fit">
      <h2
        id="cart-summary-title"
        className="mb-4 text-2xl font-extrabold uppercase tracking-wide text-[#24231F]"
      >
        Summary
      </h2>

      <div className="rounded-2xl bg-[#F7F8F9] p-5 sm:p-6">
        <dl className="space-y-4 text-sm sm:text-base">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-[#737373]">Total items</dt>
            <dd className="font-bold text-[#34332F]">
              {String(selectedItemCount).padStart(2, "0")}{" "}
              {selectedItemCount === 1 ? "Item" : "Items"}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-[#737373]">Sub total</dt>
            <dd className="font-bold text-[#34332F]">
              {formatPrice(subtotal)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3 mb-5">
            <dt className="text-[#737373]">Est. Delivery</dt>
            <dd className="font-bold text-[#34332F]">
              {formatPrice(delivery)}
            </dd>
          </div>

          <div className="space-y-3 border-t border-[#E9E9E7] pt-4">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-[#737373]">Taxes</dt>
              <dd className="font-bold text-rose-500">+{formatPrice(taxes)}</dd>
            </div>
            <div className="flex items-center justify-between gap-3 mb-5">
              <dt className="text-[#737373]">Discount</dt>
              <dd className="font-bold text-emerald-600">
                -{formatPrice(discount)}
              </dd>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-[#E9E9E7] pt-4">
            <dt className="text-xl font-medium text-[#55544F]">
              Final payment
            </dt>
            <dd className="text-base font-bold text-[#24231F]">
              {formatPrice(total)}
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center gap-2 rounded-full border border-[#E8E7E3] bg-white p-1">
          <label className="sr-only" htmlFor="promo-code">
            Promo code
          </label>
          <input
            id="promo-code"
            placeholder="Enter promo code"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent px-2.5 py-3 text-xs outline-none placeholder:text-[#AAA9A4]"
          />
          <span className="rounded-full bg-black px-4 py-2 text-[10px] font-bold uppercase text-white">
            Apply
          </span>
        </div>
      </div>

      <Link href="/cart/shipping-address">
        <button className="mt-4 w-full rounded-full bg-secondary-color px-5 py-3.5 text-center text-xs font-bold uppercase tracking-wide text-white cursor-pointer hover:bg-[#5a3614] duration-300">
          Checkout
        </button>
      </Link>
    </aside>
  );
}
