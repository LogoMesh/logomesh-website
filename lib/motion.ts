/** Smooth “natural” easing — expo out */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Softer settle for large blocks (headings, sections) */
export const EASE_SOFT = [0.33, 1, 0.32, 1] as const;

/** Gentle in-out for fades */
export const EASE_IN_OUT = [0.45, 0, 0.55, 1] as const;

/** Interactive hover / taps — spring tuned for UI */
export const SPRING_UI = {
  type: "spring" as const,
  stiffness: 360,
  damping: 32,
  mass: 0.85,
};
