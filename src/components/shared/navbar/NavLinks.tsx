"use client";
import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/home",
  },
  {
    name: "All Products",
    href: "/products",
  },
  {
    name: "Shop by Brand",
    href: "/shop-by-brand",
  },
  {
    name: "3PL Prep Service",
    href: "/3pl-prep-service",
  },
  {
    name: "About Us",
    href: "/about-us",
  },
  {
    name: "FAQ",
    href: "/faq",
  },
  {
    name: "Contact Us",
    href: "/contact-us",
  },
];
export default function NavLinks() {
  const pathName = usePathname();

  const isActive = (link: { href: string; name: string }) => {
    if (pathName === link.href) {
      return true;
    }
    if (pathName.includes(link.href)) {
      return true;
    }
    return false;
  };
  return (
    <nav
      aria-label="Main navigation"
      className="flex gap-7 text-base font-medium lg:text-lg "
    >
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          aria-current={pathName === link.href ? "page" : undefined}
          className={cn(
            "group relative inline-block pb-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-center after:bg-[#B75A22] after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 focus-visible:after:scale-x-100 hover:scale-95 duration-300 ease-in-out transition-all",
            isActive(link)
              ? "font-semibold text-[#B75A22] after:scale-x-100"
              : "after:scale-x-0",
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
