"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const visibleOptionCount = 8;

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
    },
  },
};

const optionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.16 },
  },
};

interface FilterOptionGroupProps<T extends string> {
  title: string;
  options: { label: string; value: T }[];
  selectedValues: T[];
  onChange: (value: T) => void;
}

export default function FilterOptionGroup<T extends string>({
  title,
  options,
  selectedValues,
  onChange,
}: FilterOptionGroupProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMoreOptions = options.length > visibleOptionCount;
  const visibleOptions =
    hasMoreOptions && !isExpanded
      ? options.slice(0, visibleOptionCount)
      : options;

  return (
    <section className="pt-2">
      <h3 className="mb-3 text-sm font-semibold text-[#24231F]">{title}</h3>

      <motion.ul
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        <AnimatePresence initial={false}>
          {visibleOptions.map((option) => (
            <motion.li
              key={option.value}
              variants={optionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-primary-gray transition-colors hover:text-secondary-color">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  onChange={() => onChange(option.value)}
                  className="size-4 cursor-pointer rounded border-[#D6D3CD] bg-[#F6F8F9] accent-secondary-color"
                />
                <span>{option.label}</span>
              </label>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {hasMoreOptions && (
        <button
          type="button"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          aria-expanded={isExpanded}
          className="mt-3 block w-full cursor-pointer text-right text-xs font-semibold text-secondary-color transition-colors hover:text-[#6f3210]"
        >
          See {isExpanded ? "less" : "more"}
        </button>
      )}
    </section>
  );
}
