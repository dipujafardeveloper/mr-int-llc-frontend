import { Trash2 } from "lucide-react";
import type { CartItem } from "./cart.data";
import CartItemRow from "./CartItemRow";

interface CartItemsPanelProps {
  items: CartItem[];
  onDeleteAll: () => void;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, change: number) => void;
  onItemChange: (item: CartItem) => void;
}

export default function CartItemsPanel({
  items,
  onDeleteAll,
  onRemove,
  onQuantityChange,
  onItemChange,
}: CartItemsPanelProps) {
  return (
    <section aria-label="Cart items" className="min-w-0">
      <header className="mb-1 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-[#24231F] sm:text-3xl">
          Carts{" "}
          <span className="ml-1 align-middle text-xs font-medium text-[#A7A6A1]">
            {String(items.length).padStart(2, "0")}
          </span>
        </h1>
        <button
          type="button"
          onClick={onDeleteAll}
          disabled={items.length === 0}
          className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-wide text-rose-500 transition-colors hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 aria-hidden="true" className="size-3.5" />
          Delete all
        </button>
      </header>

      {items.length > 0 ? (
        <div>
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onRemove={onRemove}
              onQuantityChange={onQuantityChange}
              onItemChange={onItemChange}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-[#E5E3DE] px-5 py-12 text-center text-sm text-[#77766F]">
          Your cart is empty.
        </div>
      )}
    </section>
  );
}
