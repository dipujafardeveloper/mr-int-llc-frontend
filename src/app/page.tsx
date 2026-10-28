import Banner from "@/app/(public)/home/_components/banner/Banner";
import Brands from "@/app/(public)/home/_components/banner/brands/brands";
import Categories from "@/app/(public)/home/_components/banner/categories/categories";
import AboutHeader from "./(public)/about-us/_components/AboutHeader";
import FeaturedProducts from "@/app/(public)/home/_components/banner/featured-products/FeaturedProducts";
import WholesaleBanner from "@/components/shared/banner/WholesaleBanner";
import Reviews from "@/app/(public)/home/_components/banner/client-reviews/Reviews";
import FAQ from "@/app/(public)/home/_components/banner/Faq/FAQ";

export default function HomePage() {
  return (
    <main className="flex-1">
      <Banner />
      <AboutHeader page="home" />
      <Categories />
      <Brands />
      <FeaturedProducts />
      <WholesaleBanner />
      <Reviews />
      <FAQ />
    </main>
  );
}
