import Link from "next/link";
import { ArrowLeft, Check, FileText } from "lucide-react";

const requestDetails = [
  { label: "Submission Date", value: "Oct 19, 2026" },
  { label: "Last Updated", value: "Oct 19, 2026" },
  { label: "File Format", value: "CSV" },
  { label: "Uploaded File", value: "1 file" },
];

const timelineSteps = [
  {
    title: "Request Submitted",
    date: "Oct 19, 2026",
    description: "File submitted successfully",
    state: "complete",
  },
  {
    title: "Under Admin Review",
    date: "Oct 19, 2026",
    description: "The admin team is reviewing your file.",
    state: "current",
  },
  {
    title: "Completed",
    date: "Pending action",
    description: "",
    state: "upcoming",
  },
] as const;

export default function MyPrepRequestPage() {
  return (
    <main className="mx-auto w-full max-w-360 px-4 py-5 sm:px-6 lg:px-8">
      <Link
        href="/3pl-prep-service"
        className="inline-flex items-center gap-1 text-sm text-[#4B5563] transition-colors hover:text-[#263449] group"
      >
        <ArrowLeft
          size={13}
          aria-hidden="true"
          className="group-hover:-translate-x-0.5 duration-300 transition-all"
        />
        Back
      </Link>

      <header className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-[#0F172A]">
            Preparation Request
          </h1>
          <p className="mt-1 text-sm text-[#74839b]">
            <span className="text-[#64748B]">Request ID:</span>
            <span className="text-[#334155]">PREP-1024</span>
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bfdbfe] bg-[#EFF6FF] px-3 py-1 text-base font-semibold text-[#2563EB]">
          <span className="size-2.5 rounded-full bg-[#2563EB]" />
          Under Review
        </span>
      </header>

      <section
        aria-labelledby="request-information-title"
        className="mt-7 rounded-lg border border-[#dfe6ef] bg-white px-5 py-5 shadow-[0_1px_2px_rgba(16,24,40,0.06)] sm:px-6"
      >
        <h2
          id="request-information-title"
          className="text-base font-bold tracking-wide text-[#94A3B8]"
        >
          REQUEST INFORMATION
        </h2>
        <dl className="mt-3 grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4">
          {requestDetails.map((detail) => (
            <div key={detail.label}>
              <dt className="text-base text-[#94A3B8]">{detail.label}</dt>
              <dd className="mt-0.5 text-base font-semibold text-[#1E293B]">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="current-file-title" className="mt-7">
        <h2
          id="current-file-title"
          className="mb-2.5 text-base font-semibold text-[#334155]"
        >
          Current File
        </h2>
        <div className="flex items-center gap-3 rounded-lg border border-[#dfe6ef] bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
          <span className="flex size-8 shrink-0 items-center justify-center rounded border border-[#f0dfd1] text-[#a45a1a]">
            <FileText size={15} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#273449]">
              inventory_prep.csv
            </p>
            <p className="mt-0.5 text-xs text-[#94A3B8]">
              2.4 MB&nbsp; · &nbsp;CSV
            </p>
          </div>
          <button
            type="button"
            disabled
            title="File preview is unavailable until an uploaded file is connected."
            className="rounded-lg border border-[#CBD5E1] px-3.5 py-1.5 text-sm font-medium text-[#334155] disabled:cursor-not-allowed disabled:opacity-80"
          >
            View File
          </button>
        </div>
      </section>

      <section
        aria-labelledby="request-timeline-title"
        className="mt-6 rounded-xl border border-[#dfe6ef] bg-white px-5 py-5 shadow-[0_1px_2px_rgba(16,24,40,0.06)] sm:px-6"
      >
        <h2
          id="request-timeline-title"
          className="text-base font-bold tracking-wide text-[#94A3B8]"
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
            className="absolute left-3 top-3 hidden h-0.5 w-[calc(50%-0.75rem)] bg-[#22c55e] sm:block"
          />
          <ol className="relative grid gap-5 sm:grid-cols-3 sm:gap-0">
            {timelineSteps.map((step) => (
              <li key={step.title} className="relative">
                <span
                  aria-hidden="true"
                  className={`relative z-10 flex size-7 items-center justify-center rounded-full ${
                    step.state === "complete"
                      ? "bg-[#22c55e] text-white"
                      : step.state === "current"
                        ? "border-4 border-[#dbeafe] bg-[#a45a1a] text-white"
                        : "bg-[#e2e8f0] text-[#94a3b8]"
                  }`}
                >
                  {step.state === "complete" ? (
                    <Check size={15} strokeWidth={3} />
                  ) : (
                    <span
                      className={`size-2 rounded-full ${
                        step.state === "current" ? "bg-white" : "bg-[#94a3b8]"
                      }`}
                    />
                  )}
                </span>
                <h3
                  className={`mt-2 text-base font-bold ${
                    step.state === "current"
                      ? "text-[#a45a1a]"
                      : step.state === "upcoming"
                        ? "text-[#526078]"
                        : "text-[#273449]"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-[#8796ad]">{step.date}</p>
                {step.description && (
                  <p className="mt-1 text-sm text-[#9aa9bf]">
                    {step.description}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
