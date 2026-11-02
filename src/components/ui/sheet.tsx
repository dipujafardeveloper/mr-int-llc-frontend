"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "cn";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetTitle = SheetPrimitive.Title;

function SheetContent({
  children,
  className,
  side = "right",
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "left" | "right";
}) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/35 transition-opacity duration-200 data-closed:opacity-0 data-open:opacity-100" />
      <SheetPrimitive.Viewport className="fixed inset-0 z-50 flex overflow-hidden">
        <SheetPrimitive.Popup
          className={cn(
            "fixed inset-y-0 flex h-full w-80 max-w-[calc(100vw-1rem)] flex-col bg-white p-5 text-[#24231f] shadow-2xl outline-none transition-transform duration-300 ease-out data-open:translate-x-0",
            side === "right"
              ? "right-0 data-closed:translate-x-full"
              : "left-0 data-closed:-translate-x-full",
            className,
          )}
          {...props}
        >
          {children}
        </SheetPrimitive.Popup>
      </SheetPrimitive.Viewport>
    </SheetPrimitive.Portal>
  );
}

export { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger };