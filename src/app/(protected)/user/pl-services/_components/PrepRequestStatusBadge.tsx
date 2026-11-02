import type { PrepRequestStatus } from "../_data/prep-requests";

const statusStyles: Record<PrepRequestStatus, string> = {
  Submitted: "bg-[#e0f2ff] text-[#0284c7]",
  "Under Review": "bg-[#fff3c4] text-[#c47a00]",
  Completed: "bg-[#dcfce7] text-[#16a34a]",
  "Correction Required": "bg-[#fee2e2] text-[#ef4444]",
};

export default function PrepRequestStatusBadge({
  status,
}: {
  status: PrepRequestStatus;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
