"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = Omit<HTMLMotionProps<"a">, "ref"> & {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light" | "dark";
  className?: string;
  /** Magnetic pull strength in pixels. 0 disables. */
  strength?: number;
};

const base =
  "inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[13px] font-medium tracking-[0.02em] transition-colors duration-300 select-none cursor-pointer";

const variants = {
  primary:
    "bg-ink text-base hover:bg-accent hover:text-base shadow-[0_10px_30px_-12px_rgba(201,169,110,0.4)]",
  ghost:
    "border border-white/15 text-ink hover:border-ink hover:bg-white/[0.04]",
  light: "text-base hover:bg-base/5",
  dark: "bg-base text-ink hover:bg-accent hover:text-base",
} as const;

export function MagneticButton({
  children,
  variant = "primary",
  className,
  strength = 6,
  href,
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current || strength === 0) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
