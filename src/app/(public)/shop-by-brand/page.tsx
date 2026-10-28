import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/container/Container";
import PageSectionTitle from "@/components/shared/section/PageSectionTitle";

export const metadata: Metadata = {
  title: "Shop by Brand",
  description:
    "Explore trusted global brands at MR International, including Samsung, Nike, Levi's, P&G, and L'Oréal.",
};

const brands: {
  name: string;
  image: string;
  width: number;
  height: number;
  blue?: boolean;
}[] = [
  { name: "MR International", image: "/image/brand-logo/logo.png", width: 77, height: 38 },
  { name: "Samsung", image: "/image/brand-logo/SAMSUNG.png", width: 162, height: 26, blue: true },
  { name: "Nike", image: "/image/brand-logo/NIKE.png", width: 101, height: 32 },
  { name: "Levi's", image: "/image/brand-logo/Levi's.png", width: 85, height: 23 },
  { name: "P&G", image: "/image/brand-logo/P&G.png", width: 85, height: 29, blue: true },
  { name: "L'Oréal", image: "/image/brand-logo/L'ORÉAL.png", width: 124, height: 26 },
];

const brandRows = Array.from({ length: 6 }, (_, row) =>
  brands.map((brand) => ({ ...brand, key: `${row}-${brand.name}` }))
).flat();

export default function ShopByBrandPage() {
  return (
    <Container className="page-padding">
      <main className="mx-auto w-full ">
        <PageSectionTitle
          title="Shop by Brand"
          subTitle="We work with trusted global brands to bring you the best products."
        />

        <ul
          aria-label="Our brands"
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
        >
          {brandRows.map((brand) => (
            <li
              className="flex h-16.5 items-center justify-center rounded-xl border border-[#E8E5E2] bg-white px-3 transition-colors hover:border-[#D4CEC8] sm:h-[66px]"
              key={brand.key}
            >
              <Image
                alt={brand.name}
                className="h-auto max-h-8 w-auto max-w-22.5 object-contain sm:max-w-[108px]"
                height={brand.height}
                src={brand.image}
                style={
                  brand.blue
                    ? {
                        filter:
                          "brightness(0) saturate(100%) invert(18%) sepia(75%) saturate(1700%) hue-rotate(197deg) brightness(92%) contrast(100%)",
                      }
                    : undefined
                }
                width={brand.width}
              />
            </li>
          ))}
        </ul>
      </main>
    </Container>
  );
}
