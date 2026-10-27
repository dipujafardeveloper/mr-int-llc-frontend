import Banner from "@/components/modules/home/banner/Banner";
import Brands from "@/components/modules/home/brands/brands";
import Categories from "@/components/modules/home/categories/categories";
import AboutHeader from "./(public)/about-us/_components/AboutHeader";
import FeaturedProducts from "@/components/modules/home/featured-products/FeaturedProducts";
import WholesaleBanner from "@/components/shared/banner/WholesaleBanner";
import Reviews from "@/components/modules/home/client-reviews/Reviews";
import FAQ from "@/components/modules/home/Faq/FAQ";

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
