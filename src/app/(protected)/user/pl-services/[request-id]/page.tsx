import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import PrepRequestDetails from "../_components/PrepRequestDetails";
import { getPrepRequest } from "../_data/prep-requests";

export default async function PrepRequestDetailsPage({
  params,
}: {
  params: Promise<{ "request-id": string }>;
}) {
  return (
    <Suspense
      fallback={
        <div
          aria-busy="true"
          aria-label="Loading prep request"
          className="min-h-72 animate-pulse rounded-xl bg-[#f1f0ed]"
        />
      }
    >
      <PrepRequestDetailsContent params={params} />
    </Suspense>
  );
}

async function PrepRequestDetailsContent({
  params,
}: {
  params: Promise<{ "request-id": string }>;
}) {
  const { "request-id": requestId } = await params;
  const request = getPrepRequest(requestId);

  if (!request) notFound();

  if (request.status === "Correction Required") {
    redirect(`/user/pl-services/${request.id}/correction`);
  }

  return <PrepRequestDetails request={request} />;
}
