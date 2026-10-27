import type {  TProducts } from "@/types/products";



const featuredProducts: TProducts[] = [
  {
    id: "camera",
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
    id: "smartphone",
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
    id: "black-headphones",
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
    id: "red-headphones",
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

export const products: TProducts[] = [
  ...featuredProducts,
  ...featuredProducts.map((product) => ({
    ...product,
    id: `${product.id}-second-row`,
  })),
];
