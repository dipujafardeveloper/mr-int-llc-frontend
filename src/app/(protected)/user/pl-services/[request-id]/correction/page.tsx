import { Suspense } from "react";
import { notFound } from "next/navigation";
import CorrectionUploadPage from "../../_components/CorrectionUploadPage";
import { getPrepRequest } from "../../_data/prep-requests";

export default async function CorrectionRequestPage({
  params,
}: {
  params: Promise<{ "request-id": string }>;
}) {
  return (
    <Suspense
      fallback={
        <div
          aria-busy="true"
          aria-label="Loading correction form"
          className="min-h-72 animate-pulse rounded-xl bg-[#f1f0ed]"
        />
      }
    >
      <CorrectionRequestContent params={params} />
    </Suspense>
  );
}

async function CorrectionRequestContent({
  params,
}: {
  params: Promise<{ "request-id": string }>;
}) {
  const { "request-id": requestId } = await params;
  const request = getPrepRequest(requestId);

  if (!request || request.status !== "Correction Required") notFound();

  return <CorrectionUploadPage request={request} />;
}
