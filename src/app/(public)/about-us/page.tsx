import AboutHeader from "./_components/AboutHeader";
import OurCommitment from "./_components/OurCommitment";

export const metadata = {
  title: "About",
  description:
    "Discover products from around the world with MR International — global shopping, made simple.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutHeader />
      <OurCommitment />
    </main>
  );
}
