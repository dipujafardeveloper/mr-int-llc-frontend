import { Handbag, ShoppingBag } from "lucide-react";

export default function CartIcon() {
  return (
    <div
      aria-label="Your Cart, 0 items, total $0.00"
      className="flex shrink-0 items-center gap-3.5"
      role="group"
    >
      <div className="relative flex size-20 items-center justify-center rounded-full bg-rose-500 text-white sm:size-13">
        <Handbag aria-hidden="true" size={18} strokeWidth={2.5} />
        <span className="absolute -right-2 -top-1 flex size-6! items-center justify-center rounded-full bg-amber-400 font-bold text-slate-950 sm:size-11">
          0
        </span>
      </div>
      <div className="flex flex-col leading-tight">
        <span className=" text-[#9CA3AF] font-medium ">Your Cart</span>
        <span className="mt-1 text-lg font-bold">
          $0.00
        </span>
      </div>
    </div>
  );
}
