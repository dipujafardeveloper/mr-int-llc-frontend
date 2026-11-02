import React from "react";
import Banner from "./_components/banner/Banner";
import AboutHeader from "../about-us/_components/AboutHeader";
import Categories from "./_components/banner/categories/categories";
import Brands from "./_components/banner/brands/brands";
import FeaturedProducts from "./_components/banner/featured-products/FeaturedProducts";
import WholesaleBanner from "@/components/shared/banner/WholesaleBanner";
import Reviews from "./_components/banner/client-reviews/Reviews";
import FAQ from "./_components/banner/Faq/FAQ";
import Deals from "./_components/deals/Deals";

export default function page() {
  return (
    <main className="flex-1 md:space-y-16 space-y-12" >
      <div>
        <Banner />
      </div>
      <div className="md:space-y-12 space-y-10">
        <AboutHeader page="home" />
        <Categories />
        <Brands />
        <FeaturedProducts />
      </div>
      <WholesaleBanner />
      <Deals />
      <Reviews />
      <FAQ />
    </main>
  );
}
