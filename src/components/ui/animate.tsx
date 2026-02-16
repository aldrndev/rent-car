"use client";

import { type HTMLMotionProps, motion } from "framer-motion";
import type { ReactNode } from "react";

/* ─── shared defaults ─── */
const DURATION = 0.5;
const EASE = [0.25, 0.1, 0.25, 1] as const;

/* ─── FadeIn on scroll ─── */
interface AnimateOnScrollProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  /** px offset before element becomes visible (default -60) */
  offset?: number;
  /** delay in seconds */
  delay?: number;
  /** slide direction */
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export function AnimateOnScroll({
  children,
  offset = -60,
  delay = 0,
  direction = "up",
  className,
  ...props
}: Readonly<AnimateOnScrollProps>) {
  const directionOffset = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { x: 24, y: 0 },
    right: { x: -24, y: 0 },
    none: { x: 0, y: 0 },
  };

  const { x, y } = directionOffset[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: `${offset}px` }}
      transition={{ duration: DURATION, delay, ease: EASE }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger container ─── */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  /** delay between each child (default 0.1s) */
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: Readonly<StaggerContainerProps>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger child (pair with StaggerContainer) ─── */
interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({
  children,
  className,
  ...props
}: Readonly<StaggerItemProps>) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION, ease: EASE },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
