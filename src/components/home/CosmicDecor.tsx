"use client";

import { motion } from "motion/react";

type Props = { className?: string; style?: React.CSSProperties; delay?: number };

const floaty = (delay = 0, y = 14, r = 8) => ({
  animate: { y: [0, -y, 0], rotate: [0, r, 0] },
  transition: { duration: 6 + delay, repeat: Infinity, ease: "easeInOut" as const, delay },
});

/* A little connected constellation */
export function Constellation({ className, style, delay = 0 }: Props) {
  return (
    <motion.svg
      className={className}
      style={style}
      viewBox="0 0 120 90"
      fill="none"
      aria-hidden="true"
      {...floaty(delay, 12, 5)}
    >
      <path
        d="M12 66 L40 48 L58 62 L84 30 L106 40"
        stroke="var(--gold)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="2 6"
        opacity="0.7"
      />
      {[
        [12, 66, 3.5],
        [40, 48, 2.4],
        [58, 62, 2.8],
        [84, 30, 4],
        [106, 40, 2.4],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="var(--coral)" />
      ))}
      <path d="M96 14 l1.8 4.4 4.4 1.8 -4.4 1.8 -1.8 4.4 -1.8 -4.4 -4.4 -1.8 4.4 -1.8z" fill="var(--gold)" />
    </motion.svg>
  );
}

/* Orbit with a planet */
export function Orbit({ className, style, delay = 0 }: Props) {
  return (
    <motion.svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      {...floaty(delay, 16, -6)}
    >
      <circle cx="50" cy="50" r="34" fill="none" stroke="var(--coral)" strokeWidth="1.2" strokeDasharray="2 7" opacity="0.6" />
      <circle cx="50" cy="50" r="22" fill="none" stroke="var(--gold)" strokeWidth="1.2" opacity="0.5" />
      <circle cx="50" cy="50" r="9" fill="var(--gold)" />
      <motion.g
        style={{ originX: "50px", originY: "50px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="84" cy="50" r="4.5" fill="var(--coral-deep)" />
      </motion.g>
      <motion.g
        style={{ originX: "50px", originY: "50px" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="16" r="3" fill="var(--plum)" />
      </motion.g>
    </motion.svg>
  );
}

/* Four-point sparkle */
export function Sparkle({ className, style, delay = 0 }: Props) {
  return (
    <motion.svg
      className={className}
      style={style}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7], rotate: [0, 90, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <path d="M20 2 C22 14 26 18 38 20 C26 22 22 26 20 38 C18 26 14 22 2 20 C14 18 18 14 20 2z" fill="var(--gold)" />
    </motion.svg>
  );
}

/* Dotted comet streak */
export function Streak({ className, style, delay = 0 }: Props) {
  return (
    <motion.svg
      className={className}
      style={style}
      viewBox="0 0 140 60"
      fill="none"
      aria-hidden="true"
      {...floaty(delay, 10, 4)}
    >
      <path d="M6 50 Q70 40 128 8" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 9" opacity="0.75" />
      <circle cx="128" cy="8" r="6" fill="var(--gold)" />
      <circle cx="128" cy="8" r="11" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.5" />
    </motion.svg>
  );
}
