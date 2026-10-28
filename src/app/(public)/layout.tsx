import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import TopInfo from "@/components/shared/navbar/TopInfo";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <div className={"min-h-[calc(100vh-160px)]"}>{children}</div>
      <Footer />
    </div>
  );
}
