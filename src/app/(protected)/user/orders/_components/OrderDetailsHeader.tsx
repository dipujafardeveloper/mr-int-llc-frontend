"use client";

import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

export default function OrderDetailsHeader({ orderId }: { orderId: string }) {
  const printInvoice = () => {
    window.print();
  };

  return (
    <header className="space-y-5">
      <Link
        href="/user/orders"
        className="inline-flex items-center gap-2 text-sm text-[#64748b] transition-colors hover:text-[#995618]"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back
      </Link>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
            Order Details
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <p className="text-lg font-semibold text-[#1f2937]">{orderId}</p>
            <span className="rounded-full bg-[#fff4e5] px-3 py-1 text-sm font-medium text-[#e58200]">
              Processing
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-[#9ca3af]">Order Date</p>
            <p className="mt-1 text-sm font-medium text-[#374151]">
              Oct 18, 2026, 10:45 AM
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={printInvoice}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#e1e5eb] bg-white px-4 text-sm font-medium text-[#4b5563] shadow-[0_1px_3px_rgba(27,39,58,0.06)] transition-colors hover:bg-[#f9fafb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#995618] disabled:opacity-70 sm:mt-2 sm:w-auto"
        >
          <Download size={16} aria-hidden="true" />
          Download Invoice
        </button>
      </div>
    </header>
  );
}
