// components/about-us-button.tsx
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof Button>;

export function AboutUsButton({ className, children = "About Us", ...props }: Props) {
  return (
    <Button
      {...props}
      className={cn(
        "group relative  overflow-hidden rounded-full bg-black py-1.5 pl-7 pr-2 h-fit cursor-pointer",
        "gap-8 text-lg font-medium text-white hover:bg-black",
        "transition-colors duration-500 hover:text-black",
        className
      )}
    >
      {/* bg fill: slides left -> right on hover */}
      <span
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 bg-[#F3E3D0] transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      <span className="relative z-10">{children}</span>

      {/* circle + arrow */}
      <span
        className={cn(
          "relative z-10 flex size-9 items-center justify-center rounded-full",
          "bg-[#F3E3D0] text-[#8B3A0F]",
          "transition-colors duration-500 group-hover:bg-black group-hover:text-[#F3E3D0]"
        )}
      >
        <ArrowUpRight
          className="size-5 transition-transform duration-500 ease-out group-hover:rotate-45"
          strokeWidth={2}
        />
      </span>
    </Button>
  );
}