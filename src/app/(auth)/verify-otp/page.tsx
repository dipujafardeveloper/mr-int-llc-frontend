import { Suspense } from "react";
import { cookies } from "next/headers";
import HeroBanner from "@/components/shared/banner/HeroBanner";
import VerifyOTpForm from "./_components/VerifyOtpForm";

export const metadata = {
  title: "Verify OTP",
  description: "This the official website of Better Off Market",
};

async function VerifyOtpContent() {
  const email = (await cookies()).get("signup-email")?.value ?? "";
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full mx-auto z-50">
      <VerifyOTpForm email={email} />
    </div>
  );
}

export default function page() {
  const bannerData = {
    authPage: true,
  };
  return (
    <div className="relative">
      <HeroBanner data={bannerData} />
      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-full mx-auto z-50"
          />
        }
      >
        <VerifyOtpContent />
      </Suspense>
    </div>
  );
}
