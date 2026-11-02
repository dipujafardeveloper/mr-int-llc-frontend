import { cn } from "cn";

export default function PageSectionTitle({
  title,
  subTitle,
  className,
}: {
  className?: string;
  title?: string;
  subTitle?: string;
}) {
  return (
    <div className={cn("xl:text-4xl text-3xl font-bold text-center lg:space-y-3 space-y-2", className)}>
      <h4>{title}</h4>
      <p className="text-lg text-[#414141] font-normal">{subTitle}</p>
    </div>
  );
}
