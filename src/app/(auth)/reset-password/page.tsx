
import HeroBanner from '@/components/shared/banner/HeroBanner';
import ResetPasswordForm from './_components/ResetPassword';

export default function ResetPasswordPage()  {
  
  return (
    <div className="relative">
      <HeroBanner  />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full mx-auto z-50">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
