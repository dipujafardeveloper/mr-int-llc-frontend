import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import { recentOrders } from "../_data/dashboard.data";

const statusStyles = {
  Shipped: "bg-[#e8f1ff] text-[#3478cf]",
  Delivered: "bg-[#e8f6ee] text-[#398660]",
  Processing: "bg-[#fff2e4] text-[#bf701a]",
} as const;

export default function RecentOrders() {
  return (
    <section className="rounded-2xl border border-[#edf0f3] bg-white p-4 shadow-[0_1px_3px_rgba(27,39,58,0.05)] sm:p-6">
      <header className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold tracking-tight text-[#172033]">
          Recent Orders
        </h2>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#a45a1a]">
          View All Orders <ArrowRight size={14} aria-hidden="true" />
        </span>
      </header>

      <ul className="space-y-3">
        {recentOrders.map((order) => (
          <li
            key={order.id}
            className="flex flex-wrap items-center gap-3 rounded-xl border border-[#edf0f3] px-3 py-3 sm:flex-nowrap sm:px-4"
          >
            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f5f6f7]">
              <Image
                src="/image/product/camera.jpg"
                alt="Camera"
                width={48}
                height={48}
                className="size-full object-contain p-1"
              />
            </div>

            <div className="min-w-32.5 flex-1">
              <h3 className="text-xs font-semibold text-[#273449]">
                Order #{order.id}
              </h3>
              <p className="mt-1 text-[11px] text-[#9aa4b4]">
                {order.date} · {order.itemCount}{" "}
                {order.itemCount === 1 ? "item" : "items"}
              </p>
            </div>

            <p className="ml-auto text-xs font-semibold text-[#273449] sm:ml-0">
              ${order.total.toFixed(2)}
            </p>
            <span
              className={`min-w-20 rounded-full px-3 py-1.5 text-center text-[11px] font-medium ${statusStyles[order.status]}`}
            >
              {order.status}
            </span>
            <ChevronRight
              size={16}
              aria-hidden="true"
              className="hidden text-[#9aa4b4] sm:block"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
