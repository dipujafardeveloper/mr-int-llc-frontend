import { cn } from "cn";

export default function SectionTitle({
  title,
  subTitle,
  className,
}: {
  className?: string;
  title?: string;
  subTitle?: string;
}) {
  return (
    <div className={cn("xl:text-4xl text-3xl font-bold text-center lg:space-y-5 space-y-4", className)}>
      <h4>{title}</h4>
      <p className="text-lg text-[#414141] font-normal">{subTitle}</p>
    </div>
  );
}
