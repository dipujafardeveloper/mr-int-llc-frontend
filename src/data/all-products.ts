import type { TProducts } from "@/types/products";

export type CatalogFilter =
  | "buy-again"
  | "todays-sales"
  | "availability"
  | "new-arrival"
  | "on-sale";

export type CatalogProduct = TProducts & {
  id: string;
  brand: string;
  filters: CatalogFilter[];
};

const productSeeds: Omit<CatalogProduct, "id" | "brand" | "filters">[] = [
  {
    image: "/image/product/camera.jpg",
    imageAlt: "Black mirrorless camera with a zoom lens",
    category: "Photography",
    title: "Mirrorless Creator Camera with Zoom Lens",
    price: 789.99,
    originalPrice: 900,
    rating: 4,
    soldCount: 5,
    stockCount: 20,
  },
  {
    image: "/image/product/smartphone.jpg",
    imageAlt: "Modern smartphone with a vivid display",
    category: "Mobile Phones",
    title: "Pro Smartphone with Dynamic Display",
    price: 789.99,
    originalPrice: 900,
    rating: 4,
    soldCount: 5,
    stockCount: 20,
  },
  {
    image: "/image/product/headphones.jpg",
    imageAlt: "Over-ear wireless headphones",
    category: "Audio",
    title: "Studio Wireless Over-Ear Headphones",
    price: 129.99,
    originalPrice: 159.99,
    rating: 5,
    soldCount: 12,
    stockCount: 30,
  },
  {
    image: "/image/product/red-headphones.jpg",
    imageAlt: "Black and red over-ear headphones",
    category: "Gaming",
    title: "Wireless Gaming Headset with Noise Cancellation",
    price: 99.99,
    originalPrice: 129.99,
    rating: 4,
    soldCount: 8,
    stockCount: 24,
  },
];

const brands = [
  "Canon",
  "Samsung",
  "Sony",
  "Asus",
  "HP",
  "Apple",
  "Bose",
  "Logitech",
  "Acer",
  "Dell",
  "Lenovo",
  "Microsoft",
];

const categories = [
  "Photography",
  "Mobile Phones",
  "Audio",
  "Gaming",
  "Computers",
  "Smart Devices",
  "Electronics",
  "Accessories",
  "Home Audio",
  "Lifestyle",
];

export const allProducts: CatalogProduct[] = Array.from(
  { length: 12 },
  (_, index) => {
    const seed = productSeeds[index % productSeeds.length];
    const filters: CatalogFilter[] = [];

    if (index % 2 === 0) filters.push("availability");
    if (index % 3 === 0) filters.push("todays-sales");
    if (index % 4 === 0) filters.push("buy-again");
    if (index % 3 === 1) filters.push("new-arrival");
    if (index % 5 === 0) filters.push("on-sale");

    return {
      ...seed,
      id: `catalog-product-${index + 1}`,
      brand: brands[index],
      category: categories[index % categories.length],
      title: `${brands[index]} ${seed.title}`,
      price: Number((Number(seed.price) + (index % 3) * 25).toFixed(2)),
      filters,
      ...(filters.includes("on-sale") ? { badge: "On Sale" } : {}),
    };
  }
);

export const brandOptions = brands;
export const categoryOptions = categories;

export const filterOptions: { label: string; value: CatalogFilter }[] = [
  { label: "Buy Again", value: "buy-again" },
  { label: "Today's Sales", value: "todays-sales" },
  { label: "Availability", value: "availability" },
  { label: "New Arrival", value: "new-arrival" },
  { label: "On Sale", value: "on-sale" },
];
