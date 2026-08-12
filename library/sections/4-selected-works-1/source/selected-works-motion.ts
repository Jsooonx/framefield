const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const DETAIL_EASE = [0.2, 0.8, 0.2, 1] as const;

export { DETAIL_EASE, EASE_OUT };

export function detailEnter(shouldReduceMotion: boolean | null, delay: number) {
  return {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, delay: shouldReduceMotion ? 0 : delay, ease: DETAIL_EASE },
  };
}

export function detailReveal(shouldReduceMotion: boolean | null, delay: number) {
  return {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, delay: shouldReduceMotion ? 0 : delay, ease: DETAIL_EASE },
  };
}
