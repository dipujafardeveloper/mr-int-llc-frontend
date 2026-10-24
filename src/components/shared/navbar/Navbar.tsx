import Container from "@/components/container/Container";
import logo from "@/assets/logo.png";
import Image from "next/image";
import NavLinks from "./NavLinks";
import Link from "next/link";
import CartIcon from "./CartIcon";

export default function Navbar() {
  return (
    <div className="py-4.5 border-b-[1.5px] border-[#F3F4F6]">
      <Container className="w-full max-w-[1766px] flex items-center justify-between gap-5 ">
        <div className="flex items-center xl:gap-10 gap-8">
          <Link href="/">
            <Image src={logo} alt="logo" width={100} height={100} />
          </Link>
          <NavLinks />
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <h6 className="cursor-pointer text-lg font-semibold text-[#F43F5E] transition-all duration-300 hover:scale-95">
            Amazing Deals
          </h6>
          <Link
            className="cursor-pointer rounded-full bg-primary-color px-5 py-1.5 text-secondary-color transition-all duration-300 hover:font-medium"
            href="/login"
          >
            Log In
          </Link>
          <CartIcon />
        </div>
      </Container>
    </div>
  );
}
