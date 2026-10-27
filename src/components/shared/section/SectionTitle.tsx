import { ViewAllButton } from "@/components/ui/view-all-button";
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
    <div className="flex justify-between items-start gap-2">
      <div
        className={cn(
          "xl:text-4xl md:text-3xl text-xl font-bold  lg:space-y-3 space-y-2",
          className,
        )}
      >
        <h4>{title}</h4>
        <p className="md:text-lg text-sm text-[#1A1A1A] font-normal max-w-75">{subTitle}</p>
      </div>
      <ViewAllButton />
    </div>
  );
}
