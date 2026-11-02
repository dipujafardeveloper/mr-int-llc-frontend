import { Check } from "lucide-react";

const timeline = [
  { title: "Order Placed", date: "Oct 18, 2026, 10:45 AM", state: "complete" },
  { title: "Payment Confirmed", date: "Oct 18, 2026, 11:20 AM", state: "complete" },
  { title: "Processing", date: "Oct 18, 2026, 01:15 AM", state: "current" },
  { title: "Shipped", date: "", state: "upcoming" },
  { title: "Delivered", date: "", state: "upcoming" },
] as const;

export default function OrderTimelineCard() {
  return (
    <section className="rounded-2xl border border-[#edf0f3] bg-white p-5 shadow-[0_1px_3px_rgba(27,39,58,0.05)] sm:p-6">
      <h2 className="text-base font-semibold text-[#374151]">Order Timeline</h2>

      <ol className="mt-5 space-y-0">
        {timeline.map((step, index) => {
          const isComplete = step.state === "complete";
          const isCurrent = step.state === "current";

          return (
            <li
              key={step.title}
              className="relative flex min-h-14 gap-3.5 pb-3 last:min-h-0 last:pb-0"
            >
              {index < timeline.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute left-[11px] top-6 h-[calc(100%-12px)] w-0.5 ${
                    isComplete ? "bg-[#10b981]" : "bg-[#e2e8f0]"
                  }`}
                />
              )}
              <span
                className={`relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  isComplete
                    ? "border-[#10b981] bg-[#10b981] text-white"
                    : isCurrent
                      ? "border-[#f59e0b] bg-white text-[#f59e0b]"
                      : "border-[#d7dce3] bg-[#f3f4f6] text-[#cbd5e1]"
                }`}
              >
                {isComplete ? (
                  <Check size={13} strokeWidth={3} aria-hidden="true" />
                ) : (
                  <span className="size-2 rounded-full bg-current" />
                )}
              </span>
              <div className="min-w-0 pt-0.5">
                <p
                  className={`text-sm font-medium leading-5 ${
                    isComplete
                      ? "text-[#374151]"
                      : isCurrent
                        ? "text-[#d97706]"
                        : "text-[#9ca3af]"
                  }`}
                >
                  {step.title}
                </p>
                {step.date && (
                  <p className="mt-0.5 text-xs leading-4 text-[#a3acb9]">
                    {step.date}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
