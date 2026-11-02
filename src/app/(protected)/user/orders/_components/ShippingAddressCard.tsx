import { Phone } from "lucide-react";

export default function ShippingAddressCard() {
  return (
    <section className="rounded-2xl border border-[#edf0f3] bg-white p-5 shadow-[0_1px_3px_rgba(27,39,58,0.05)] sm:p-6">
      <h2 className="text-base font-semibold text-[#374151]">
        Shipping Address
      </h2>
      <address className="mt-4 space-y-1.5 text-sm not-italic leading-5 text-[#737b89]">
        <p className="font-semibold text-[#374151]">MR International LLC</p>
        <p>123 Business Avenue</p>
        <p>Dhaka, Bangladesh 1200</p>
        <p className="flex flex-wrap items-center gap-1.5 pt-1">
          <Phone size={14} aria-hidden="true" />
          <span>Phone: +880 1234 567890</span>
        </p>
      </address>
    </section>
  );
}
