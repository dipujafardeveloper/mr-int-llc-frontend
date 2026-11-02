import { CheckCircle2, Info } from "lucide-react";
import type { PrepRequest } from "../_data/prep-requests";
import PrepRequestFileCard from "./PrepRequestFileCard";
import PrepRequestHeader from "./PrepRequestHeader";
import PrepRequestTimeline from "./PrepRequestTimeline";

export default function PrepRequestDetails({
  request,
}: {
  request: PrepRequest;
}) {
  const isComplete = request.status === "Completed";

  return (
    <main className="w-full">
      <PrepRequestHeader request={request} />

      <div
        role="status"
        className={`mt-5 flex gap-3 rounded-xl border px-4 py-4 sm:px-5 ${
          isComplete
            ? "border-[#a7f3d0] bg-[#ecfdf5] text-[#059669]"
            : "border-[#bfdbfe] bg-[#eff6ff] text-[#2563eb]"
        }`}
      >
        {isComplete ? (
          <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        ) : (
          <Info className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        )}
        <div>
          <p className="text-sm font-semibold">
            {isComplete ? "Request Completed" : request.status}
          </p>
          <p className="mt-1 text-sm leading-5">
            {isComplete
              ? "Your preparation request has been completed successfully."
              : request.status === "Submitted"
                ? "Your file has been submitted and is waiting for admin review."
                : "The admin team is currently reviewing your preparation request."}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        <PrepRequestFileCard request={request} />
        <PrepRequestTimeline status={request.status} />
      </div>
    </main>
  );
}
