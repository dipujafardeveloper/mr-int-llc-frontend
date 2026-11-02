"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";

const orders = [
  {
    number: "WO-1042",
    date: "Oct 18, 2026",
    dateKey: "2026-10",
    itemCount: 12,
    total: 1248,
    status: "Processing",
  },
  {
    number: "WO-1041",
    date: "Oct 15, 2026",
    dateKey: "2026-10",
    itemCount: 8,
    total: 856.5,
    status: "Shipped",
  },
  {
    number: "WO-1040",
    date: "Oct 10, 2026",
    dateKey: "2026-10",
    itemCount: 25,
    total: 2340.75,
    status: "Delivered",
  },
  {
    number: "WO-1039",
    date: "Oct 05, 2026",
    dateKey: "2026-10",
    itemCount: 6,
    total: 620,
    status: "Pending",
  },
  {
    number: "WO-1040",
    date: "Oct 10, 2026",
    dateKey: "2026-10",
    itemCount: 25,
    total: 2340.75,
    status: "Delivered",
  },
] as const;

const statuses = [
  "All Orders",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
] as const;
type OrderStatus = (typeof statuses)[number];

const statusStyles: Record<Exclude<OrderStatus, "All Orders">, string> = {
  Pending: "bg-[#f1f5f9] text-[#64748b]",
  Processing: "bg-[#fff4e5] text-[#e58200]",
  Shipped: "bg-[#e0f2ff] text-[#0284c7]",
  Delivered: "bg-[#e5f7ed] text-[#16a34a]",
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function StatusBadge({
  status,
}: {
  status: Exclude<OrderStatus, "All Orders">;
}) {
  return (
    <span
      className={`inline-flex min-w-29 justify-center rounded-full px-4 py-2 text-sm font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export default function OrdersList() {
  const [activeStatus, setActiveStatus] = useState<OrderStatus>("All Orders");
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("all");


  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        activeStatus === "All Orders" || order.status === activeStatus;
      const matchesDate = dateRange === "all" || order.dateKey === dateRange;
      const searchableText =
        `${order.number} ${order.date} ${order.itemCount} ${order.status} ${currency.format(order.total)}`.toLowerCase();

      return matchesStatus && matchesDate && searchableText.includes(query);
    });
  }, [activeStatus, dateRange, search]);


  return (
    <section className="space-y-7" aria-label="Orders">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-134">
          <Search
            size={17}
            aria-hidden="true"
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#9ca3af]"
          />
          <span className="sr-only">Search orders</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by order number, product or date..."
            className="h-11 w-full rounded-xl border border-[#e1e5eb] bg-white pl-12 pr-4 text-sm text-[#374151] shadow-[0_1px_3px_rgba(27,39,58,0.08)] outline-none placeholder:text-[#9ca3af] focus:border-[#995618] focus:ring-2 focus:ring-[#995618]/15 sm:text-base"
          />
        </label>

        {/* <label className="relative block w-full sm:w-41.5">
          <span className="sr-only">Filter by date</span>
          <select
            value={dateRange}
            onChange={(event) => setDateRange(event.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-[#e1e5eb] bg-white px-5 pr-11 text-base text-[#4b5563] shadow-[0_1px_3px_rgba(27,39,58,0.08)] outline-none focus:border-[#995618] focus:ring-2 focus:ring-[#995618]/15"
          >
            <option value="all">Date Range</option>
            <option value="2026-10">October 2026</option>
            <option value="2026-09">September 2026</option>
            <option value="2026-08">August 2026</option>
          </select>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af]"
          />
        </label> */}
      </div>

      <div
        className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1"
        role="tablist"
        aria-label="Filter orders by status"
      >
        {statuses.map((status) => {
          const isActive = activeStatus === status;

          return (
            <button
              key={status}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveStatus(status)}
              className={`shrink-0 rounded-full border px-5 py-1.5 text-sm font-medium shadow-[0_1px_3px_rgba(27,39,58,0.08)] transition-colors sm:px-5.5 sm:text-base ${
                isActive
                  ? "border-[#995618] bg-[#995618] text-white"
                  : "border-[#e1e5eb] bg-white text-[#4b5563] hover:border-[#c7cdd5]"
              }`}
            >
              {status}
            </button>
          );
        })}
      </div>

      {filteredOrders.length > 0 ? (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-[#e3e7ec] bg-white shadow-[0_1px_3px_rgba(27,39,58,0.06)] md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-190 border-collapse text-left">
                <thead className="bg-[#fafafa] text-sm font-semibold text-[#737b89]">
                  <tr>
                    <th scope="col" className="px-7 py-6">
                      Order No.
                    </th>
                    <th scope="col" className="px-5 py-6">
                      Date
                    </th>
                    <th scope="col" className="px-5 py-6">
                      Items
                    </th>
                    <th scope="col" className="px-5 py-6">
                      Total Amount
                    </th>
                    <th scope="col" className="px-5 py-6">
                      Status
                    </th>
                    <th scope="col" className="px-5 py-6 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr
                      key={`${order.number}-${order.dateKey}-${index}`}
                      className="border-t border-[#edf0f3] text-base"
                    >
                      <td className="whitespace-nowrap px-7 py-6 font-semibold text-[#1f2937]">
                        {order.number}
                      </td>
                      <td className="whitespace-nowrap px-5 py-6 text-[#737b89]">
                        {order.date}
                      </td>
                      <td className="whitespace-nowrap px-5 py-6 text-[#596273]">
                        {order.itemCount} items
                      </td>
                      <td className="whitespace-nowrap px-5 py-6 font-semibold text-[#374151]">
                        {currency.format(order.total)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-6">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="whitespace-nowrap px-5 py-5 text-center">
                        <Link href={`/user/orders/${order.number}`}
                          type="button"
                          className="rounded-xl border border-[#e1e5eb] px-5 py-2 text-sm font-medium text-[#374151] transition-colors hover:bg-[#f9fafb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#995618]"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <ul className="space-y-3 md:hidden">
            {filteredOrders.map((order, index) => (
              <li
                key={`${order.number}-${order.dateKey}-${index}`}
                className="rounded-2xl border border-[#e3e7ec] bg-white p-4 shadow-[0_1px_3px_rgba(27,39,58,0.06)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#1f2937]">
                      {order.number}
                    </p>
                    <p className="mt-1 text-sm text-[#737b89]">{order.date}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-[#edf0f3] pt-4">
                  <div>
                    <p className="text-sm text-[#737b89]">
                      {order.itemCount} items
                    </p>
                    <p className="mt-1 font-semibold text-[#374151]">
                      {currency.format(order.total)}
                    </p>
                  </div>
                  <Link href={`/user/orders/${order.number}`} className="ml-auto">
                    <button
                      type="button"
                      className="rounded-xl border border-[#e1e5eb] px-4 py-2 text-sm font-medium text-[#374151] transition-colors hover:bg-[#f9fafb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#995618]"
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="rounded-2xl border border-[#e3e7ec] bg-white px-5 py-12 text-center text-[#737b89]">
          No orders found.
        </div>
      )}
    </section>
  );
}
