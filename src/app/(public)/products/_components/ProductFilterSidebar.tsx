"use client";

import { useSearchParams } from "next/navigation";
import {
  brandOptions,
  categoryOptions,
  filterOptions,
  type CatalogFilter,
} from "@/data/all-products";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import FilterOptionGroup from "./FilterOptionGroup";
import { FilterIcon } from "@/icons";

export default function ProductFilterSidebar() {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const selectedBrands = searchParams.get("brand")?.split(",").filter(Boolean) ?? [];
  const selectedCategories =
    searchParams.get("category")?.split(",").filter(Boolean) ?? [];
  const selectedFilters =
    searchParams
      .get("filter")
      ?.split(",")
      .filter((value): value is CatalogFilter =>
        filterOptions.some((option) => option.value === value)
      ) ?? [];

  const toggleSearchParamValue = (key: string, value: string) => {
    const values = searchParams.get(key)?.split(",").filter(Boolean) ?? [];
    const nextValues = values.includes(value)
      ? values.filter((item) => item !== value)
      : [...values, value];

    updateSearchParams({ [key]: nextValues.length ? nextValues.join(",") : null });
  };

  return (
    <aside
      aria-label="Product filters"
      className="h-fit rounded-xl  bg-white p-4 sm:p-5 lg:sticky lg:top-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#24231F]">Filters</h2>
        <FilterIcon className="h-5 w-5" />
      </div>

      <section className="pb-5">
        <h3 className="mb-3 text-sm font-semibold text-[#24231F]">Price, $</h3>
        <div className="grid grid-cols-2 gap-2">
          <label className="sr-only" htmlFor="minimum-price">
            Minimum price
          </label>
          <input
            id="minimum-price"
            type="number"
            min="0"
            inputMode="decimal"
            placeholder="Min"
            value={searchParams.get("minPrice") ?? ""}
            onChange={(event) =>
              updateSearchParams({ minPrice: event.target.value || null })
            }
            className="min-w-0 rounded-md border border-[#E2DFD9] px-3 py-2 text-sm outline-none transition focus:border-secondary-color focus:ring-2 focus:ring-secondary-color/15"
          />
          <label className="sr-only" htmlFor="maximum-price">
            Maximum price
          </label>
          <input
            id="maximum-price"
            type="number"
            min="0"
            inputMode="decimal"
            placeholder="Max"
            value={searchParams.get("maxPrice") ?? ""}
            onChange={(event) =>
              updateSearchParams({ maxPrice: event.target.value || null })
            }
            className="min-w-0 rounded-md border border-[#E2DFD9] px-3 py-2 text-sm outline-none transition focus:border-secondary-color focus:ring-2 focus:ring-secondary-color/15"
          />
        </div>
      </section>

      <div className="space-y-5">
        <FilterOptionGroup
          title="Brand"
          options={brandOptions.map((brand) => ({ label: brand, value: brand }))}
          selectedValues={selectedBrands}
          onChange={(brand) => toggleSearchParamValue("brand", brand)}
        />
        <FilterOptionGroup
          title="Category"
          options={categoryOptions.map((category) => ({
            label: category,
            value: category,
          }))}
          selectedValues={selectedCategories}
          onChange={(category) =>
            toggleSearchParamValue("category", category)
          }
        />
        <FilterOptionGroup
          title="Filters"
          options={filterOptions}
          selectedValues={selectedFilters}
          onChange={(filter) => toggleSearchParamValue("filter", filter)}
        />
      </div>
    </aside>
  );
}
