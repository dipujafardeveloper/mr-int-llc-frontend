import SectionTitle from "@/components/shared/section/SectionTitle";
import OrdersList from "./_components/OrdersList";

export default function OrdersPage() {
  return (
    <div className="space-y-8">
      <SectionTitle
        title="My Orders"
        subTitle="View and track your wholesale orders."
        btn={false}
        className="lg:space-y-1.5 space-y-1"
        subTitleClass="text-[#6B7280] max-w-80"
      />
      <OrdersList />
    </div>
  );
}
