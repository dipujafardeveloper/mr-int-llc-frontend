import ProductCard from "@/components/shared/cards/product/ProductCard";
import { products } from "@/data/products";

export default function FavoritesContainer() {
  return (
    <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard {...product} filled={true} />
        </div>
      ))}
    </div>
  );
}
