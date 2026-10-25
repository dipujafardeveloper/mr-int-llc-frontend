import Banner from "@/components/modules/home/banner/Banner";
import Brands from "@/components/modules/home/brands/brands";
import Categories from "@/components/modules/home/categories/categories";
import AboutHeader from "./(public)/about-us/_components/AboutHeader";

export default function HomePage() {
  return (
    <main className="flex-1">
      <Banner />
      <AboutHeader page="home" />
      <Categories />
      <Brands />
    </main>
  );
}
