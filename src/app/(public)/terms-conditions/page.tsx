import SectionTitle from "@/components/shared/section/SectionTitle";
import TermsContent from "./_components/TermsContent";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "Discover products from around the world with MR International — global shopping, made simple.",
};

export default function TermsConditionPage() {
  return <div className="page-padding">
        <SectionTitle
          title="Terms and Conditions"
          subTitle="Here’s everything you need to know about our app."
        />
        <div className="mt-10">
          <TermsContent />
        </div>
      </div>;
}
