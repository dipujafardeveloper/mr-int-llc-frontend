import OrderDetailsHeader from "../_components/OrderDetailsHeader";
import OrderItemsCard from "../_components/OrderItemsCard";
import OrderTimelineCard from "../_components/OrderTimelineCard";
import ShippingAddressCard from "../_components/ShippingAddressCard";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ "order-id": string }>;
}) {
  const { "order-id": orderId } = await params;

  return (
    <div className="space-y-6">
      <OrderDetailsHeader orderId={orderId} />

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(250px,0.9fr)] xl:gap-6">
        <OrderItemsCard />
        <aside className="space-y-5">
          <ShippingAddressCard />
          <OrderTimelineCard />
        </aside>
      </div>
    </div>
  );
}
