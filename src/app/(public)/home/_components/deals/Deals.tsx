"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import Container from "@/components/container/Container";
import ProductCard from "@/components/shared/cards/product/ProductCard";
import ProductImagesCarousel from "@/app/(public)/products/[id]/_components/carousel/ProductImagesCarousel";
import { allProducts } from "@/data/all-products";
import SectionTitle from "@/components/shared/section/SectionTitle";

type DealTab = "weekly" | "clearance";

const dealProducts: Record<DealTab, (typeof allProducts)[number][]> = {
  weekly: [allProducts[0], allProducts[1]],
  clearance: [allProducts[4], allProducts[5]],
};

const featuredProduct = allProducts[3];

function formatPrice(value: number | string) {
  return typeof value === "number" ? `$${value.toFixed(2)}` : value;
}

export default function Deals() {
  const [activeTab, setActiveTab] = useState<DealTab>("weekly");
  const products = dealProducts[activeTab];
  const sideProducts = Array.from(
    { length: 4 },
    (_, index) => products[index % products.length],
  );
  const rating = Math.min(5, Math.max(0, featuredProduct.rating ?? 0));

  return (
    <div id="deal">
      <Container className="space-y-4">
        <SectionTitle title="Deals" btnHref="/products" />
        <div className="flex gap-2" role="tablist" aria-label="Product deals">
          {(
            [
              ["weekly", "Weekly Deals"],
              ["clearance", "Clearance Deals"],
            ] as const
          ).map(([tab, label]) => (
            <button
              key={tab}
              id={`deals-tab-${tab}`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls="deals-panel"
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#99512f] ${
                activeTab === tab
                  ? "bg-[#f4e4cc] text-[#8b4b1f] shadow-sm"
                  : "text-[#8b4b1f] hover:bg-[#f8f2e9]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div
          id="deals-panel"
          role="tabpanel"
          aria-labelledby={`deals-tab-${activeTab}`}
          className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(13rem,0.72fr)_minmax(0,1fr)] lg:gap-6"
        >
          {[0, 1].map((side) => (
            <div
              key={side}
              className={`grid grid-cols-2 items-stretch gap-2 sm:gap-3 ${
                side === 0 ? "order-2 lg:order-1" : "order-3"
              }`}
            >
              {sideProducts.map((product, index) => (
                <ProductCard key={`${product.id}-${index}`} {...product} />
              ))}
            </div>
          ))}

          <article className="order-1 min-w-0 lg:order-2">
            <ProductImagesCarousel
              productHref={`/products/${featuredProduct.id}`}
              slides={Array.from({ length: 3 }, () => ({
                url: featuredProduct.image,
                alt: featuredProduct.imageAlt,
              }))}
            />

            <div className="mt-3">
              <p className="text-xs text-[#9CA3AF]">
                {featuredProduct.category}
              </p>
              <h2 className="mt-0.5 line-clamp-2 text-base font-semibold leading-tight text-slate-800">
                <Link
                  href={`/products/${featuredProduct.id}`}
                  className="hover:text-secondary-color focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-color"
                >
                  {featuredProduct.title}
                </Link>
              </h2>
              <div
                role="img"
                aria-label={`${rating} out of 5 stars`}
                className="mt-1.5 flex items-center gap-0.5 text-amber-400"
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    aria-hidden="true"
                    className="size-3.5"
                    fill={index < Math.floor(rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-bold text-secondary-color">
                  {formatPrice(featuredProduct.price)}
                </span>
                {featuredProduct.originalPrice !== undefined && (
                  <span className="text-sm text-[#9CA3AF] line-through">
                    {formatPrice(featuredProduct.originalPrice)}
                  </span>
                )}
              </div>
              {featuredProduct.soldCount !== undefined && (
                <p className="mt-2 text-xs text-[#9CA3AF]">
                  Already sold:{" "}
                  <span className="font-semibold text-[#4B5563]">
                    {featuredProduct.soldCount}/{featuredProduct.stockCount}
                  </span>
                </p>
              )}
            </div>
          </article>
        </div>
      </Container>
    </div>
  );
}
