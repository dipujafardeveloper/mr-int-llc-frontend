import Image from "next/image";

const items = [
  {
    name: "Wireless Headphones",
    quantity: 50,
    unitPrice: 24.5,
    image: "/image/product/headphones.jpg",
  },
  {
    name: "Leather Handbag",
    quantity: 30,
    unitPrice: 32,
    image: "/image/product/camera.jpg",
  },
  {
    name: "Running Shoes",
    quantity: 40,
    unitPrice: 28.75,
    image: "/image/product/red-headphones.jpg",
  },
] as const;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function OrderItemsCard() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#edf0f3] bg-white shadow-[0_1px_3px_rgba(27,39,58,0.05)]">
      <h2 className="border-b border-[#edf0f3] px-5 py-5 text-base font-semibold text-[#374151] sm:px-6">
        Order Items (12)
      </h2>

      <div className="hidden grid-cols-[minmax(0,1fr)_90px_110px_110px] gap-3 border-b border-[#edf0f3] px-5 py-4 text-sm text-[#9ca3af] sm:grid sm:px-6">
        <span>Product</span>
        <span className="text-center">Quantity</span>
        <span className="text-right">Unit Price</span>
        <span className="text-right">Total</span>
      </div>

      <ul className="divide-y divide-[#f0f2f4]">
        {items.map((item) => (
          <li
            key={item.name}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_90px_110px_110px] sm:gap-3 sm:px-5 sm:py-4 md:px-6"
          >
            <div className="col-span-2 flex min-w-0 items-center gap-3 sm:col-span-1">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-[#f5f6f7] sm:size-14">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-contain p-1.5"
                />
              </div>
              <span className="min-w-0 text-sm font-medium text-[#374151]">
                {item.name}
              </span>
            </div>
            <div className="flex flex-col sm:block sm:text-center">
              <span className="text-xs text-[#9ca3af] sm:hidden">Quantity</span>
              <span className="text-sm font-medium text-[#4b5563]">
                {item.quantity}
              </span>
            </div>
            <div className="flex flex-col sm:block sm:text-right">
              <span className="text-xs text-[#9ca3af] sm:hidden">Unit Price</span>
              <span className="text-sm text-[#64748b]">
                {currency.format(item.unitPrice)}
              </span>
            </div>
            <div className="flex flex-col items-end sm:block sm:text-right">
              <span className="text-xs text-[#9ca3af] sm:hidden">Total</span>
              <span className="text-sm font-semibold text-[#374151]">
                {currency.format(item.quantity * item.unitPrice)}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-[#edf0f3] px-5 py-5 sm:ml-auto sm:max-w-[350px] sm:px-6">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-4 text-[#7b8493]">
            <dt>Subtotal</dt>
            <dd className="font-medium text-[#596273]">$3,335.00</dd>
          </div>
          <div className="flex justify-between gap-4 text-[#7b8493]">
            <dt>Discount</dt>
            <dd className="font-medium text-[#ef4444]">-$100.00</dd>
          </div>
          <div className="flex justify-between gap-4 text-[#7b8493]">
            <dt>Shipping</dt>
            <dd className="font-medium text-[#596273]">$0.00</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-[#e5e7eb] pt-3 text-base font-bold text-[#1f2937]">
            <dt>Total Amount</dt>
            <dd className="text-lg">$3,235.00</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
