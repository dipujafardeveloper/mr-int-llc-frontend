import Container from "@/components/container/Container";
import ProductCard from "@/components/shared/cards/product/ProductCard";
import PageSectionTitle from "@/components/shared/section/PageSectionTitle";
import { products } from "@/data/products";

export default function RelatedProducts() {
  return (
    <Container className="md:space-y-10 space-y-8">
      <div className="space-y-3">
        <h6 className="text-[#BABABA] text-lg text-center">Products</h6>
        <PageSectionTitle title="You Might Also Like" />
      </div>
      <div className="grid w-full grid-cols-2 md:gap-5 gap-3 lg:grid-cols-4 md:grid-cols-3">
        {products?.slice(0, 4).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </Container>
  );
}
