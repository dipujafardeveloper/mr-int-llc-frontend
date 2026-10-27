import Container from "@/components/container/Container";
import AllProductsContent from "./_components/AllProductsContent";

export const metadata = {
  title: "All Products",
  description:
    "Discover products from around the world with MR International — global shopping, made simple.",
};

export default function AllProductsPage() {
  return (
    <Container className="page-padding">
      <AllProductsContent />
    </Container>
  );
}
