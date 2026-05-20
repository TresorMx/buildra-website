"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        ...variants,
        show: {
          ...(variants.show as object),
          transition: {
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={stagger}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

/**
 * WordReveal — splits a string into words and animates them in one by one
 * as the parent enters the viewport.
 */
export function WordReveal({
  text,
  className,
  highlight,
  highlightClassName = "text-accent",
  delay = 0,
}: {
  text: string | string[];
  className?: string;
  /** When `text` is an array of 3 items, the middle one gets `highlightClassName`. */
  highlight?: boolean;
  highlightClassName?: string;
  delay?: number;
}) {
  const parts = Array.isArray(text) ? text : [text];
  const isTriple = highlight && parts.length === 3;

  const words = isTriple
    ? [
        ...parts[0].split(" ").map((w) => ({ w, hl: false })),
        ...parts[1].split(" ").map((w) => ({ w, hl: true })),
        ...parts[2].split(" ").map((w) => ({ w, hl: false })),
      ]
    : parts
        .join(" ")
        .split(" ")
        .map((w) => ({ w, hl: false }));

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.05, delayChildren: delay },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={"inline-block " + (word.hl ? highlightClassName : "")}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          style={{ whiteSpace: "pre" }}
        >
          {word.w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
