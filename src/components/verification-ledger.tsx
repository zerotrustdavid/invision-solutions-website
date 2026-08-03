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
    <div
      className={`font-mono text-xs tracking-[0.16em] text-slate sm:text-sm ${className}`}
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
