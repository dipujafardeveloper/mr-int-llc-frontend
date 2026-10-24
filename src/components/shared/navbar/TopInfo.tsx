import Container from "@/components/container/Container";
import { Dot } from "lucide-react";

export default function TopInfo() {
  return (
    <div className="bg-primary-color py-2.5">
      <Container className=" flex items-center justify-center text-secondary-color">
        <span>Global Products</span>
        <Dot />
        <span>Retail</span>
        <Dot />
        <span>Wholesale</span>
      </Container>
    </div>
  );
}
