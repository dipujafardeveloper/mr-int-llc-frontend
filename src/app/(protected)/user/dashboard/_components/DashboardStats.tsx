import { dashboardStats } from "../_data/dashboard.data";

export default function DashboardStats() {
  return (
    <section aria-label="Order summary" className="grid gap-4 sm:grid-cols-2">
      {dashboardStats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-2xl border border-[#edf0f3] bg-white px-5 py-5 shadow-[0_1px_3px_rgba(27,39,58,0.05)] sm:px-6"
        >
          <h2 className="text-xs font-medium text-[#74839b]">{stat.label}</h2>
          <p className="mt-1 text-2xl font-bold leading-none text-[#172033]">
            {stat.value}
          </p>
        </article>
      ))}
    </section>
  );
}
