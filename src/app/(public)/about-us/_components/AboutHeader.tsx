"use client";

import Container from "@/components/container/Container";
import Image from "next/image";
import { motion } from "motion/react";
import aboutImage from "@/assets/about_us_image.png";

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut" as const,
      staggerChildren: 0.14,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

const stats = [
  { value: "500+", label: "Projects" },
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Client Reviews" },
];

export default function AboutHeader() {
  return (
    <section className="border-t border-slate-100 py-10 sm:py-14 lg:py-16">
      <Container>
        <motion.div
          className="grid items-center gap-x-10 gap-y-7 md:grid-cols-[1.15fr_0.85fr]"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.p
              className="mb-1 text-xl  text-[#0D0D0D]"
              variants={itemVariants}
            >
              About Us
            </motion.p>
            <motion.h1
              className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-[42px] xl:text-6xl"
              variants={itemVariants}
            >
              Your Trusted
              <br className="hidden sm:block" /> Global Shopping Partner
            </motion.h1>

            <motion.div
              className="mt-6 flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-10"
              variants={itemVariants}
            >
              {stats.map((stat) => (
                <div className="min-w-16 text-center" key={stat.label}>
                  <p className="text-2xl font-bold leading-none text-slate-800 sm:text-3xl lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-[#4B5563]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.p
            className="max-w-lg text-lg leading-6 text-[#1A2028] md:justify-self-end"
            variants={itemVariants}
          >
            We connect businesses and shoppers with products from around the
            world, making global shopping simple for retail and wholesale.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-9 overflow-hidden rounded-lg sm:mt-11"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="relative aspect-3/1 w-full"
            variants={itemVariants}
            whileHover={{ scale: 0.996 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Image
              src={aboutImage}
              alt="A team meeting around a table to discuss products and business"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.p
          className="mx-auto mt-8 max-w-3xl text-center text-lg leading-6 text-[#1A2028] sm:mt-9"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.5 }}
        >
          Bringing a diverse range of products together for individuals,
          families, and businesses. From everyday essentials to bulk
          purchasing, we aim to make product discovery and shopping simple and
          convenient.
        </motion.p>
      </Container>
    </section>
  );
}
