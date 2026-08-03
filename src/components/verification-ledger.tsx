"use client";

import { motion } from "motion/react";

/**
 * The verification-ledger motif. On the light theme these sit at full opacity
 * in the muted slate tone rather than the low-opacity treatment the dark theme
 * used — faded grey on cream fails contrast and just reads as a rendering bug.
 */
function VerificationLedger({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  return (
    // Size is deliberately fixed rather than stepping up at sm:. These lines
    // are set with whitespace-nowrap, so any width increase overflows the card
    // that contains them instead of wrapping. Tracking is tuned so the longest
    // line clears the narrowest container the motif is used in.
    <div
      className={`font-mono text-[11px] leading-relaxed tracking-[0.08em] text-slate ${className}`}
    >
      {lines.map((line, i) => (
        <motion.p
          key={line}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 + i * 0.45, ease: "easeOut" }}
          className="whitespace-nowrap py-0.5"
        >
          <span aria-hidden="true" className="text-gold-ink">
            —{" "}
          </span>
          {line}
        </motion.p>
      ))}
    </div>
  );
}

export { VerificationLedger };
