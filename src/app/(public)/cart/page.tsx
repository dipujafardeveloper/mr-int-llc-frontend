import Container from "@/components/container/Container";
import CartPageContent from "./_components/CartPageContent";

export const metadata = {
  title: "Cart",
  description: "Review your selected products and order summary.",
};

export default function CartPage() {
  return (
    <Container className="page-padding">
      <CartPageContent />
    </Container>
  );
}
