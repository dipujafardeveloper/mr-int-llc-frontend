import SectionTitle from "@/components/shared/section/SectionTitle";
import React from "react";
import FavoritesContainer from "./_components/FavoritesContainer";

export default function FavoritePage() {
  return (
    <div className="space-y-6 lg:space-y-7">
      <SectionTitle
        title="Favorites"
        subTitle="Manage all Favorites"
        btn={false}
        className="lg:space-y-1.5 space-y-1"
        subTitleClass="text-[#6B7280]"
      />
      <FavoritesContainer />
    </div>
  );
}
