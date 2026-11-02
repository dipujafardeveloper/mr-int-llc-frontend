import { notFound } from "next/navigation";
import CorrectionUploadPage from "../../_components/CorrectionUploadPage";
import { getPrepRequest } from "../../_data/prep-requests";

export default async function CorrectionRequestPage({
  params,
}: {
  params: Promise<{ "request-id": string }>;
}) {
  const { "request-id": requestId } = await params;
  const request = getPrepRequest(requestId);

  if (!request || request.status !== "Correction Required") notFound();

  return <CorrectionUploadPage request={request} />;
}
