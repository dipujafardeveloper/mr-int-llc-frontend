import Container from "@/components/container/Container";
import BrandProductContainer from "./_components/BrandProductContainer";

const brandNames: Record<string, string> = {
  "mr international": "MR International",
  samsung: "Samsung",
  nike: "Nike",
  "levi's": "Levi's",
  "p&g": "P&G",
  "l'oréal": "L'Oréal",
};

export default async function BrandShopDetailsPages({
  params,
}: {
  params: Promise<{ "brand-id": string }>;
}) {
  const brand = await params;
  let decodedBrandId = brand["brand-id"];
  try {
    decodedBrandId = decodeURIComponent(decodedBrandId);
  } catch (error) {
    if (!(error instanceof URIError)) {
      throw error;
    }
  }

  const brandId = decodedBrandId.replace(/[-_]+/g, " ").trim();
  const brandName =
    brandNames[brandId.toLowerCase()] ??
    brandId.replace(/(^|\s)\p{L}/gu, (letter) => letter.toUpperCase());

  return (
    <Container className="page-padding">
      <h4 className="text-2xl font-semibold mb-5">
        Shop by Brand | {brandName}
      </h4>
      <BrandProductContainer />
    </Container>
  );
}
