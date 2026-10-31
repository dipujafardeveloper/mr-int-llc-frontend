import ProductFilterSidebar from "@/app/(public)/products/_components/ProductFilterSidebar";
import ProductGrid from "@/app/(public)/products/_components/ProductGrid";
import ProductResultsHeader from "@/app/(public)/products/_components/ProductResultsHeader";
import { allProducts } from "@/data/all-products";
import  { Suspense } from "react";


export default function BrandProductContainer() {
  return (
   <div className="grid items-start gap-6 lg:grid-cols-[230px_minmax(0,1fr)] xl:gap-8">
      <Suspense
        fallback={
          <aside
            aria-busy="true"
            aria-label="Loading product filters"
            className="min-h-96 rounded-xl border border-[#E9E6DF] bg-white p-5"
          />
        }
      >
        <ProductFilterSidebar page="brand" />
      </Suspense>

      <section aria-label="Product results" className="min-w-0">
        <Suspense
          fallback={
            <div className="mb-5 text-sm font-semibold text-[#34332F]">
              Found {allProducts.length} results
            </div>
          }
        >
          <ProductResultsHeader resultCount={allProducts.length} />
        </Suspense>
        <ProductGrid products={allProducts} />
      </section>
    </div>
  )
}
