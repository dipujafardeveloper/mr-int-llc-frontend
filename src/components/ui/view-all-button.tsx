// components/view-all-button.tsx
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof Button>;

export function ViewAllButton({ className, children = "View All", ...props }: Props) {
  return (
    <Button
      variant="outline"
      {...props}
      className={cn(
        "group relative h-fit md:gap-3 gap-1.5 overflow-hidden rounded-full border-[1.5px] border-neutral-900",
        "bg-transparent md:px-8 px-5 py-1.5 md:text-lg  font-normal text-neutral-900 shadow-none",
        "transition-colors duration-500 hover:bg-transparent hover:text-white cursor-pointer",
        className
      )}
    >
      {/* black fill: grows from bottom-left on hover */}
      <span
        aria-hidden
        className="absolute bottom-[-150%] left-[-10%] aspect-square w-[130%] origin-bottom-left scale-0 rounded-full bg-black transition-transform duration-500 ease-out group-hover:scale-100"
      />

      <span className="relative z-10">{children}</span>
      <ArrowUpRight className="relative z-10 md:size-5 size-4 group-hover:rotate-45 duration-300 transition-all" strokeWidth={1.5} />
    </Button>
  );
}