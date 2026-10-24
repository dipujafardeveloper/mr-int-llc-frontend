import logo from "@/assets/footer_logo.png";
import Container from "@/components/container/Container";
import { ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { quickLinks, serviceLinks } from "./footer.data";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="mt-auto bg-primary-color text-secondary-color">
      <div className="border-b border-secondary-color/20 py-10 sm:py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-[1.5fr_0.8fr_0.9fr_1.2fr_1.2fr] lg:gap-10">
            <div className="col-span-2 flex flex-col items-start sm:col-span-3 lg:col-span-1">
              <Link href="/" aria-label="MR International home">
                <Image
                  src={logo}
                  alt="MR International LLC"
                  width={1200}
                  height={1200}
                  className="h-auto w-52 object-contain sm:w-40"
                />
              </Link>
            </div>

            <FooterLinkGroup heading="Quick Links" links={quickLinks} />
            <FooterLinkGroup heading="Services" links={serviceLinks} />

            <div>
              <h2 className="mb-4  font-semibold uppercase tracking-[0.16em]">
                Contact
              </h2>

              <div className="flex items-center gap-1.5 mb-3">
                <MapPin size={18} />
                <p className="leading-6 text-secondary-color/80 hover:text-secondary-color">
                  1234 Street, City, State, 12345
                </p>
              </div>
              <div className="flex items-center gap-1.5 mb-3">
                <Phone size={18} />
                <Link
                  href="tel:(391) 943-5578"
                  className="leading-6 text-secondary-color/80 hover:text-secondary-color"
                >
                  (391) 943-5578
                </Link>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail size={18} />
                <Link
                  href="mailto:info@brightfolk.co"
                  className="leading-6 text-secondary-color/80"
                >
                  info@brightfolk.co
                </Link>
              </div>
            </div>

            <div>
              <h2 className="mb-4  font-semibold uppercase tracking-[0.16em]">
                Subscribe
              </h2>
              <div className="relative  border-secondary-color/20 h-fit">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="mb-3 bg-white py-5.5"
                />

                <Send
                  size={24}
                  className="absolute right-0 top-0 -translate-1/2 translate-y-1/2 bg-white hover:rotate-45 duration-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="flex flex-col gap-3 py-5 text-sm font-semibold text-secondary-color/75 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 MR International LLC. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <Link
            className="transition-colors hover:text-secondary-color"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
          <Link
            className="transition-colors hover:text-secondary-color"
            href="/terms-conditions"
          >
            Terms Of Use
          </Link>
        </div>
      </Container>
    </footer>
  );
}

function FooterLinkGroup({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="mb-4  font-semibold uppercase tracking-[0.16em]">
        {heading}
      </h2>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className=" text-secondary-color/80 transition-colors hover:text-secondary-color"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
