"use client";

import Container from "@/components/container/Container";
import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

const faqColumns: FaqEntry[][] = [
  [
    {
      id: "place-order",
      question: "How can I place an order?",
      answer:
        "Browse our products, add the items you need to your cart, and follow the checkout steps. For help with a retail or wholesale order, contact our team.",
    },
    {
      id: "product-template",
      question: "Is there a template I can use?",
      answer:
        "Yes. Contact our team and tell us what you are preparing. We can point you to the right product information and requirements.",
    },
    {
      id: "wholesale",
      question: "Do you offer wholesale pricing?",
      answer:
        "We work with wholesale customers. Get in touch with the products and quantities you are interested in so our team can help.",
    },
    {
      id: "shipping",
      question: "Where do you ship?",
      answer:
        "Shipping availability depends on the product and destination. Contact us with your location and we will help confirm the options.",
    },
    {
      id: "order-help",
      question: "Who can help with my order?",
      answer:
        "Our support team can help with product and order questions. Visit the Contact Us page and send us the details of your request.",
    },
  ],
  [
    {
      id: "prep-service",
      question: "What is the 3PL Prep Service?",
      answer:
        "Our 3PL prep service supports businesses with product preparation and fulfillment workflows. Contact us to discuss your requirements.",
    },
    {
      id: "prep-products",
      question: "What products can be prepared?",
      answer:
        "Preparation requirements vary by product. Share your product details with our team to confirm whether it is a fit for the service.",
    },
    {
      id: "prep-timing",
      question: "How long does preparation take?",
      answer:
        "Turnaround depends on the product, quantity, and preparation needs. We can provide an estimate once we know the scope of your request.",
    },
    {
      id: "retail-wholesale",
      question: "Do you serve retail and wholesale customers?",
      answer:
        "Yes. We work with both retail and wholesale customers. Reach out to discuss the best way to support your needs.",
    },
    {
      id: "contact",
      question: "How can I get in touch?",
      answer:
        "Use the Contact Us page to send your question. Include the product or service you are asking about so we can direct your request.",
    },
  ],
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const,
    },
  },
};

export default function FAQContainer() {
  const [openId, setOpenId] = useState<string | null>("place-order");

  return (
    <div className=" mt-10 grid  grid-cols-1 items-start gap-4 sm:mt-12 md:grid-cols-2 md:gap-5">
      {faqColumns.map((column, columnIndex) => (
        <motion.div
          className="flex flex-col gap-4 md:gap-5"
          key={columnIndex}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {column.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <motion.article
                variants={itemVariants}
                layout
                className={`overflow-hidden rounded-2xl border border-[#F0F0F0] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-colors duration-300 sm:px-5 sm:py-5 ${
                  isOpen
                    ? "border-primary-color bg-primary-color/90"
                    : "border-slate-100 bg-white"
                }`}
                key={faq.id}
              >
                <h2>
                  <button
                    aria-controls={`faq-answer-${faq.id}`}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-start justify-between gap-4 text-left"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    type="button"
                  >
                    <span
                      className={`pt-0.5 text-sm font-bold sm:text-xl ${
                        isOpen ? "text-secondary-color" : "text-[#170F49]"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-secondary-color/10 text-secondary-color">
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex"
                      >
                        {isOpen ? (
                          <Minus aria-hidden="true" className="size-4" />
                        ) : (
                          <Plus aria-hidden="true" className="size-4" />
                        )}
                      </motion.span>
                    </span>
                  </button>
                </h2>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.3, ease: "easeInOut" },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={{ y: -8 }}
                        animate={{ y: 0 }}
                        exit={{ y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="pt-3  leading-5 text-[#44403C]  sm:leading-6"
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
}