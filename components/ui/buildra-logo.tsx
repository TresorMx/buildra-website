"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The BUILDRA wordmark.
 *
 * Both modes use the same pre-rendered SVG (D and R already baked in as the
 * blurred halo). No CSS filter is applied, so vector edges stay crisp at any
 * size.
 *
 * `mode`:
 *  - "static"  → nav usage, just the image, no animation.
 *  - "hero"    → same image, only adds a subtle entrance fade on mount.
 */
export function BuildraLogo({
  mode = "static",
  className,
}: {
  mode?: "static" | "hero";
  className?: string;
}) {
  if (mode === "static") {
    return (
      <img
        src="/logoblurbuildra.svg"
        alt="BUILDRA"
        className={cn("block w-auto select-none", className)}
        draggable={false}
      />
    );
  }

  return (
    <motion.img
      src="/logoblurbuildra.svg"
      alt="BUILDRA"
      className={cn("block h-auto select-none", className)}
      draggable={false}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
    />
  );
}
