"use client";

import { ArrowLeft } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const NORTHSTAR_EASE = [0.16, 1, 0.3, 1] as const;

type MetricCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export function MetricCounter({ value, prefix = "", suffix = "", decimals = Number.isInteger(value) ? 0 : 1 }: MetricCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!visible) return;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const duration = 1050;
    const startedAt = performance.now();
    let frame = 0;
    const update = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - (1 - progress) ** 5;
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [reduced, value, visible]);

  return (
    <span ref={ref} className="northstar-counter" aria-label={`${prefix}${value.toFixed(decimals)}${suffix}`}>
      {prefix}{display.toFixed(decimals)}{suffix}
    </span>
  );
}

export function NorthstarBack() {
  return (
    <a className="northstar-library-back" href="/#library">
      <span className="northstar-library-back-icon" aria-hidden="true">
        <ArrowLeft size={13} strokeWidth={2} />
      </span>
      Back to library
    </a>
  );
}
