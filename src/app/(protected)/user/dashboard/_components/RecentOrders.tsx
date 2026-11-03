import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import { recentOrders } from "../_data/dashboard.data";
import AnimatedArrow from "@/components/animation/AnimatedArrow";
import Link from "next/link";

const statusStyles = {
  Shipped: "bg-[#e8f1ff] text-[#3478cf]",
  Delivered: "bg-[#e8f6ee] text-[#398660]",
  Processing: "bg-[#fff2e4] text-[#bf701a]",
} as const;

export default function RecentOrders() {
  return (
    <section className="rounded-2xl border border-[#edf0f3] bg-white p-5 shadow-[0_1px_3px_rgba(27,39,58,0.05)] sm:p-7">
      <header className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight text-[#111827]">
          Recent Orders
        </h2>
        <Link
          href="/user/orders"
          className="inline-flex items-center gap-1 text-base font-semibold text-[#995618] hover:text-[#5f350d] group cursor-pointer"
        >
          View All Orders <AnimatedArrow size={16} />
        </Link>
      </header>

      <ul className="space-y-3">
        {recentOrders.map((order) => (
          <Link
            href={`/orders/${order.id}`}
            key={order.id}
            className="flex flex-wrap items-center gap-3 rounded-xl border border-[#edf0f3] p-4 sm:flex-nowrap sm:px-4 group"
          >
            <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f5f6f7]">
              <Image
                src="/image/product/camera.jpg"
                alt="Camera"
                width={48}
                height={48}
                className="size-full object-contain p-2"
              />
            </div>

            <div className="min-w-32.5 flex-1">
              <h3 className="text-base font-semibold text-[#111827]">
                Order #{order.id}
              </h3>
              <p className="mt-1 text-sm text-[#9CA3AF]">
                {order.date} · {order.itemCount}{" "}
                {order.itemCount === 1 ? "item" : "items"}
              </p>
            </div>

            <p className="ml-auto text-lg font-bold text-[#111827] sm:ml-0">
              ${order.total.toFixed(2)}
            </p>
            <span
              className={`min-w-20 rounded-full px-5 py-1.5 text-center text-sm font-medium ${statusStyles[order.status]}`}
            >
              {order.status}
            </span>
            <ChevronRight
              size={18}
              aria-hidden="true"
              className="hidden text-[#9aa4b4] sm:block  group-hover:translate-x-1.5 transition-transform duration-300"
            />
          </Link>
        ))}
      </ul>
    </section>
  );
}
