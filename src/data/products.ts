import type { TProducts } from "@/types/products";

const productsData: TProducts[] = [
  {
    id: "catalog-product-1",
    image: "/image/product/camera.jpg",
    imageAlt: "Black mirrorless camera with a zoom lens",
    category: "Computer & Laptop",
    title: "Laptop Creator 15 A11UE Intel Core i7 16GB RAM,...",
    price: 789.99,
    originalPrice: 900,
    rating: 4,
    soldCount: 5,
    stockCount: 20,
  },
  {
    id: "catalog-product-2",
    image: "/image/product/smartphone.jpg",
    imageAlt: "Modern smartphone with a vivid display",
    category: "Computer & Laptop",
    title: "Laptop Creator 15 A11UE Intel Core i7 16GB RAM,...",
    price: 789.99,
    originalPrice: 900,
    rating: 4,
    badge: "On Sale",
    soldCount: 5,
    stockCount: 20,
  },
  {
    id: "catalog-product-3",
    image: "/image/product/headphones.jpg",
    imageAlt: "Over-ear wireless headphones",
    category: "Computer & Laptop",
    title: "Laptop Creator 15 A11UE Intel Core i7 16GB RAM,...",
    price: 789.99,
    originalPrice: 900,
    rating: 4,
    soldCount: 5,
    stockCount: 20,
  },
  {
    id: "catalog-product-4",
    image: "/image/product/red-headphones.jpg",
    imageAlt: "Black and red over-ear headphones",
    category: "Computer & Laptop",
    title: "Laptop Creator 15 A11UE Intel Core i7 16GB RAM,...",
    price: 789.99,
    originalPrice: 900,
    rating: 4,
    soldCount: 5,
    stockCount: 20,
  },
];

export const featuredProductsData: TProducts[] = [
  ...productsData,
  ...productsData.map((product) => ({
    ...product,
  })),
];

export const products = featuredProductsData.map((product, index) => ({
  ...product,
  id: `catalog-product-${index + 1}`,
}));
