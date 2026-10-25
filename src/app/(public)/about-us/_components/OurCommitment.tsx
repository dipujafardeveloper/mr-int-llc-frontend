"use client";

import Container from "@/components/container/Container";
import Image from "next/image";
import { motion } from "motion/react";
import commitmentImage from "@/assets/about-commitment.png";

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const commitmentCopy =
  "We focus on product variety, a user-friendly shopping experience, and solutions that support both retail and wholesale customers.";

export default function OurCommitment() {
  return (
    <Container>
      <motion.div
        className="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-14"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div
          className="relative aspect-[1.41/1] overflow-hidden rounded-xl"
          variants={itemVariants}
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Image
            src={commitmentImage}
            alt="A selection of global retail products arranged in front of a world map"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        <div className="md:pl-2 lg:pl-4">
          <motion.h2
            className="mb-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl"
            variants={itemVariants}
          >
            Our Commitment
          </motion.h2>
          <motion.p
            className="text-sm leading-6 text-slate-700 sm:text-base"
            variants={itemVariants}
          >
            {commitmentCopy}
          </motion.p>
          <motion.p
            className="mt-4 text-sm leading-6 text-slate-700 sm:text-base"
            variants={itemVariants}
          >
            {commitmentCopy}
          </motion.p>
        </div>
      </motion.div>
    </Container>
  );
}
