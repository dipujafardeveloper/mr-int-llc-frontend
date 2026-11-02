import { Check } from "lucide-react";
import type { PrepRequestStatus } from "../_data/prep-requests";

const steps = [
  { title: "Request Submitted", date: "Oct 19, 2025", description: "File submitted successfully" },
  { title: "Under Admin Review", date: "Oct 20, 2025", description: "The admin team reviewed your file" },
  { title: "Completed", date: "Oct 21, 2025", description: "Request completed" },
] as const;

const completionByStatus: Record<PrepRequestStatus, number> = {
  Submitted: 0,
  "Under Review": 1,
  Completed: 3,
  "Correction Required": 1,
};

export default function PrepRequestTimeline({
  status,
}: {
  status: PrepRequestStatus;
}) {
  const completedSteps = completionByStatus[status];
  const currentStep = status === "Correction Required" ? 1 : completedSteps;

  return (
    <section
      aria-labelledby="request-timeline-title"
      className="rounded-xl border border-[#dfe6ef] bg-white px-4 py-5 shadow-[0_1px_2px_rgba(16,24,40,0.06)] sm:px-6"
    >
      <h2
        id="request-timeline-title"
        className="text-xs font-bold tracking-wide text-[#94A3B8]"
      >
        REQUEST STATUS TIMELINE
      </h2>

      <div className="relative mt-5">
        <div
          aria-hidden="true"
          className="absolute left-3 right-3 top-3 hidden h-0.5 bg-[#e2e8f0] sm:block"
        />
        <div
          aria-hidden="true"
          className={`absolute left-3 top-3 hidden h-0.5 bg-[#22c55e] sm:block ${
            status === "Completed"
              ? "w-[calc(100%-1.5rem)]"
              : status === "Submitted"
                ? "w-0"
                : "w-[calc(50%-0.75rem)]"
          }`}
        />
        <ol className="relative grid gap-5 sm:grid-cols-3 sm:gap-0">
          {steps.map((step, index) => {
            const isComplete = index < completedSteps;
            const isCurrent = index === currentStep && status !== "Completed";

            return (
              <li key={step.title} className="relative flex gap-3 sm:block">
                <span
                  aria-hidden="true"
                  className={`relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full sm:size-7 ${
                    isComplete
                      ? "bg-[#22c55e] text-white"
                      : isCurrent
                        ? "border-4 border-[#ffedd5] bg-[#f97316] text-white"
                        : "bg-[#e2e8f0] text-[#94a3b8]"
                  }`}
                >
                  {isComplete ? (
                    <Check size={14} strokeWidth={3} />
                  ) : (
                    <span className="size-2 rounded-full bg-current" />
                  )}
                </span>
                <div className="pb-1 sm:pr-3 sm:pt-2">
                  <h3
                    className={`text-sm font-semibold ${
                      isCurrent ? "text-[#a45a1a]" : "text-[#273449]"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#8796ad]">{step.date}</p>
                  <p className="mt-1 text-xs text-[#9aa9bf]">
                    {index === 2 && status !== "Completed"
                      ? "Pending action"
                      : step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
