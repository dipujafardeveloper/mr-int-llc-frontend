"use client";
import Container from "@/components/container/Container";
import DashboardSidebar from "./_components/DashboardSidebar";

export default function template({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primary-white py-10">
      <Container className="items-start gap-x-8 xl:flex ">
        <div className="xl:w-76">
          <h4 className="text-xl lg:text-2xl font-bold text-[#111827] mb-5">My Account</h4>
          <DashboardSidebar />
        </div>
        <div className="grow">{children}</div>
      </Container>
    </div>
  );
}
