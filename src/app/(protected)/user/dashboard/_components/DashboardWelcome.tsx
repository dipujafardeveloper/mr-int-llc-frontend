import Link from "next/link";
import { Pencil } from "lucide-react";
import { dashboardUser } from "../_data/dashboard.data";

export default function DashboardWelcome() {
  return (
    <section
      className="flex flex-wrap items-center justify-between gap-5 px-5 py-6 sm:px-7 sm:py-7"
      style={{
        borderRadius: "24px",
        border: "1.5px solid rgba(238, 222, 200, 0.60)",
        background:
          "linear-gradient(90deg, #FBF8F2 0%, #F7F3EA 50%, #F4EEE1 100%)",
        boxShadow: "0 1.5px 3px 0 rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="flex min-w-0 items-start gap-4">
        <div
          aria-hidden="true"
          className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#e9dcc6] text-sm font-semibold text-[#86501d] shadow-sm"
        >
          SJ
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-[#172033] sm:text-2xl">
            Welcome back, {dashboardUser.name}!
          </h1>
          <p className="mt-1 truncate text-xs text-[#74839b] sm:text-sm">
            {dashboardUser.email}
          </p>
          <span className="mt-2 inline-flex rounded-full border border-[#cce8dc] bg-[#eaf5ef] px-3 py-1 text-[11px] font-medium text-[#388165]">
            {dashboardUser.customerType}
          </span>
        </div>
      </div>

      <Link
        href="/user/profile"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#a45a1a] px-5 text-xs font-medium text-white transition-colors hover:bg-[#874710] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a45a1a]"
      >
        <Pencil size={14} aria-hidden="true" />
        Edit Profile
      </Link>
    </section>
  );
}
