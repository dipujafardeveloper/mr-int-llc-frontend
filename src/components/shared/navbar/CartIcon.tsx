import { Handbag } from "lucide-react";
import Link from "next/link";

export default function CartIcon({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/cart"
      aria-label="Your Cart, 0 items, total $0.00"
      className={`flex shrink-0 items-center ${compact ? "gap-0" : "gap-3.5"}`}
      role="group"
    >
      <div
        className={`relative flex items-center justify-center rounded-full bg-rose-500 text-white ${
          compact ? "size-11" : "size-20 sm:size-13"
        }`}
      >
        <Handbag aria-hidden="true" size={18} strokeWidth={2.5} />
        <span
          className={`absolute -right-1 -top-1 flex items-center justify-center rounded-full bg-amber-400 font-bold text-slate-950 ${
            compact ? "size-5 text-xs" : "size-6! sm:size-11"
          }`}
        >
          0
        </span>
      </div>
      <div className={`flex flex-col leading-tight ${compact ? "hidden" : ""}`}>
        <span className=" text-[#9CA3AF] font-medium ">Your Cart</span>
        <span className="mt-1 text-lg font-bold">$0.00</span>
      </div>
    </Link>
  );
}
