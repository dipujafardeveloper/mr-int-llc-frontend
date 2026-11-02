import { FileText } from "lucide-react";
import type { PrepRequest } from "../_data/prep-requests";

export default function PrepRequestFileCard({
  request,
}: {
  request: PrepRequest;
}) {
  return (
    <section aria-labelledby="current-file-title">
      <h2
        id="current-file-title"
        className="mb-2.5 text-sm font-semibold text-[#334155]"
      >
        Current File
      </h2>
      <div className="flex items-center gap-3 rounded-xl border border-[#dfe6ef] bg-white px-3.5 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.06)] sm:px-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#f0dfd1] text-[#a45a1a]">
          <FileText size={17} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#273449]">
            {request.fileName}
          </p>
          <p className="mt-0.5 text-xs text-[#94A3B8]">
            {request.fileSize} · {request.fileName.split(".").pop()?.toUpperCase()}
          </p>
        </div>
        <button
          type="button"
          disabled
          title="File preview is unavailable in this demo."
          className="shrink-0 rounded-lg border border-[#CBD5E1] px-3 py-1.5 text-xs font-medium text-[#334155] disabled:cursor-not-allowed disabled:opacity-80 sm:px-3.5 sm:text-sm"
        >
          View File
        </button>
      </div>
    </section>
  );
}
