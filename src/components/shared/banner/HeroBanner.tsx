"use client";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type TProps = {
  data?: {
    title?: string;
    description?: string;
    className?: string;
    dataClassName?: string;
    authPage?: boolean;
    children?: React.ReactNode;
  };
};

const wordReveal = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.4 },
  },
};

const word = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroBanner({ data }: TProps) {
  const words = useMemo(() => (data?.title ?? "").split(" "), [data?.title]);

  return (
    <div className="relative overflow-hidden">
  

      <div
        className={cn(
          "relative min-h-[calc(100vh-44px)] w-full flex flex-col justify-end pb-11 overflow-hidden",
          data?.className,
        )}
      >
        {/* Ken Burns style background */}
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundImage: `url('/image/auth_banner_image.png')` }}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
        />

        {/* Diagonal gradient wipe overlay */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: "easeInOut" }}
          className="absolute inset-0 z-10 bg-[#1F4E8B]"
        />

        {/* Base darkening gradient */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0)_-59.22%,rgba(0,0,0,0.7)_69.98%)]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-30"
        >
        
        </motion.div>

      
      </div>
    </div>
  );
}
