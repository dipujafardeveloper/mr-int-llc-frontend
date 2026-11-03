"use client";
import { Suspense } from "react";
import Container from "@/components/container/Container";
import DashboardSidebar from "./_components/DashboardSidebar";
import { ProfileAvatarProvider } from "./_components/ProfileAvatarProvider";

export default function template({ children }: { children: React.ReactNode }) {
  return (
    <ProfileAvatarProvider>
      <div className="min-h-screen bg-primary-white py-10">
        <Container className="items-start gap-x-8 xl:flex ">
          <div className="xl:w-76">
            <h4 className="text-xl lg:text-2xl font-bold text-[#111827] mb-5">My Account</h4>
            <Suspense fallback={<div aria-hidden="true" className="hidden h-[32rem] w-64 rounded-xl border border-[#ECEEF0] bg-white xl:block" />}>
              <DashboardSidebar />
            </Suspense>
          </div>
          <div className="grow">{children}</div>
        </Container>
      </div>
    </ProfileAvatarProvider>
  );
}
