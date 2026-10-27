import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container/Container";

export default function WholesaleBanner() {
  return (
    <section aria-labelledby="wholesale-banner-title" >
      <Container>
        <div className="relative isolate flex min-h-100 items-center overflow-hidden rounded-md md:min-h-135">
          <Image
            src="/image/wholesale_banner.jpg"
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 90vw"
            className="-z-10 object-cover object-[center_58%]"
            aria-hidden="true"
          />
          {/* <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-black/35 via-black/35 to-black/5"
          /> */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-linear-to-t from-black/90 via-black/40 to-black/0"
          />

          <div className="relative z-10  px-6 py-9 text-white sm:px-10 md:px-12">
            <h2
              id="wholesale-banner-title"
              className="font-extrabold leading-[1.05] tracking-tight sm:text-6xl text-4xl"
            >
              Buying for
              <br />
              Your Business?
            </h2>
            <p className="mt-6 max-w-lg md:text-lg leading-relaxed text-[#CBD5E1]">
              Access applicable wholesale pricing and special discounts through
              your wholesale account.
            </p>
            <Link
              href="/contact-us"
              className="mt-3 inline-flex min-h-10 items-center justify-center rounded-full bg-[#F4E7D1] px-7 text-xs font-medium text-[#4A3928] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Wholesale
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}