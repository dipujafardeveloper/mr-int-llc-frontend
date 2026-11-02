"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import {
  prepRequests,
  prepRequestStatuses,
  type PrepRequestStatus,
} from "../_data/prep-requests";
import PrepRequestStatusBadge from "./PrepRequestStatusBadge";

type StatusFilter = "All Orders" | PrepRequestStatus;

const filters: StatusFilter[] = ["All Orders", ...prepRequestStatuses];

function requestHref(requestId: string, status: PrepRequestStatus) {
  const baseHref = `/user/pl-services/${requestId}`;
  return status === "Correction Required" ? `${baseHref}/correction` : baseHref;
}

export default function PrepRequestsList() {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("All Orders");
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("all");

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return prepRequests.filter((request) => {
      const matchesStatus =
        activeFilter === "All Orders" || request.status === activeFilter;
      const matchesDate =
        dateRange === "all" || request.dateKey === dateRange;
      const searchableContent =
        `${request.id} ${request.submittedAt} ${request.fileName} ${request.status}`.toLowerCase();

      return matchesStatus && matchesDate && searchableContent.includes(query);
    });
  }, [activeFilter, dateRange, search]);

  return (
    <section className="space-y-5" aria-label="3PL preparation requests">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-[390px]">
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]"
          />
          <span className="sr-only">Search requests</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by order number, product or date..."
            className="h-11 w-full rounded-xl border border-[#e1e5eb] bg-white pl-10 pr-4 text-sm text-[#374151] shadow-[0_1px_3px_rgba(27,39,58,0.08)] outline-none placeholder:text-[#9ca3af] focus:border-[#995618] focus:ring-2 focus:ring-[#995618]/15"
          />
        </label>

        <label className="relative block w-full sm:w-40">
          <span className="sr-only">Filter requests by date</span>
          <select
            value={dateRange}
            onChange={(event) => setDateRange(event.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-[#e1e5eb] bg-white px-4 pr-10 text-sm text-[#4b5563] shadow-[0_1px_3px_rgba(27,39,58,0.08)] outline-none focus:border-[#995618] focus:ring-2 focus:ring-[#995618]/15"
          >
            <option value="all">Date Range</option>
            <option value="2025-10">October 2025</option>
            <option value="2025-09">September 2025</option>
          </select>
          <ChevronDown
            size={15}
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af]"
          />
        </label>
      </div>

      <div
        className="-mx-1 flex gap-2.5 overflow-x-auto px-1 pb-1 sm:gap-3"
        role="tablist"
        aria-label="Filter requests by status"
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium shadow-[0_1px_3px_rgba(27,39,58,0.08)] transition-colors sm:px-5 sm:text-sm ${
                isActive
                  ? "border-[#995618] bg-[#995618] text-white"
                  : "border-[#e1e5eb] bg-white text-[#4b5563] hover:border-[#c7cdd5]"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {filteredRequests.length ? (
        <>
          <div className="hidden overflow-hidden border border-[#edf0f3] bg-white md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead className="bg-[#fafbfc] text-xs font-semibold uppercase tracking-wide text-[#718096]">
                  <tr>
                    <th scope="col" className="px-6 py-4">Request ID</th>
                    <th scope="col" className="px-5 py-4">Date Submitted</th>
                    <th scope="col" className="px-5 py-4">File Name</th>
                    <th scope="col" className="px-5 py-4">Status</th>
                    <th scope="col" className="px-5 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-t border-[#edf0f3] text-sm"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-[#374151]">
                        #{request.id}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-[#718096]">
                        {request.submittedAt}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-[#64748b]">
                        {request.fileName}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <PrepRequestStatusBadge status={request.status} />
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-center">
                        <Link
                          href={requestHref(request.id, request.status)}
                          className="inline-flex min-h-9 items-center justify-center rounded-lg border border-[#e1e5eb] px-4 text-sm font-medium text-[#4b5563] transition-colors hover:bg-[#f9fafb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#995618]"
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
            {filteredRequests.map((request) => (
              <li
                key={request.id}
                className="rounded-xl border border-[#edf0f3] bg-white p-4 shadow-[0_1px_3px_rgba(27,39,58,0.05)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-all text-sm font-semibold text-[#374151]">
                      #{request.id}
                    </p>
                    <p className="mt-1 text-xs text-[#718096]">
                      {request.submittedAt}
                    </p>
                  </div>
                  <PrepRequestStatusBadge status={request.status} />
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#edf0f3] pt-3">
                  <p className="min-w-0 truncate font-mono text-xs text-[#64748b]">
                    {request.fileName}
                  </p>
                  <Link
                    href={requestHref(request.id, request.status)}
                    className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-lg border border-[#e1e5eb] px-3 text-xs font-medium text-[#4b5563] transition-colors hover:bg-[#f9fafb]"
                  >
                    View Details
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="rounded-xl border border-[#edf0f3] bg-white px-5 py-12 text-center text-sm text-[#718096]">
          No requests found.
        </div>
      )}
    </section>
  );
}
