import PageSectionTitle from "@/components/shared/section/PageSectionTitle";
import PrivacyPolicyContent from "./_components/PrivacyPolicyContent";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Discover products from around the world with MR International — global shopping, made simple.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="page-padding">
      <PageSectionTitle
        title="Privacy and Policy"
        subTitle="Here’s everything you need to know about our app."
      />
      <div className="mt-10">
        <PrivacyPolicyContent />
      </div>
    </div>
  );
}
