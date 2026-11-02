import { ViewAllButton } from "@/components/ui/view-all-button";
import { cn } from "cn";
import Link from "next/link";

export default function SectionTitle({
  title,
  subTitle,
  className,
  btn = true,
  subTitleClass,
  btnHref,
}: {
  className?: string;
  title?: string;
  subTitle?: string;
  btn?: boolean;
  btnHref?: string;
  subTitleClass?: string;
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
        <p
          className={cn(
            "md:text-lg text-sm text-[#1A1A1A] font-normal max-w-75",
            subTitleClass,
          )}
        >
          {subTitle}
        </p>
      </div>
      {btn && (
        <Link href={btnHref || "#"}>
          <ViewAllButton />
        </Link>
      )}
    </div>
  );
}
