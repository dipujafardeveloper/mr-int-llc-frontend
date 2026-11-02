import SectionTitle from "@/components/shared/section/SectionTitle";
import ChangePasswordForm from "./_components/ChangePasswordForm";

export default function ChangePasswordPage() {
  return (
    <div className="space-y-7">
      <SectionTitle
        title="Change Password"
        subTitle="Update your password to keep your account secure."
        btn={false}
        className="space-y-1 lg:space-y-1.5"
        subTitleClass="max-w-xl text-[#6B7280]"
      />
      <ChangePasswordForm />
    </div>
  );
}
