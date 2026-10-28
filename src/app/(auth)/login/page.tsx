import HeroBanner from "@/components/shared/banner/HeroBanner";
import LoginForm from "./_components/LoginForm";

export const metadata = {
  title: "Login",
  description:
    "Discover products from around the world with MR International — global shopping, made simple.",
};
export default function LoginPage() {
  return <div className="relative">
        <HeroBanner  />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full mx-auto z-50">
          <LoginForm />
        </div>
      </div>;
}
