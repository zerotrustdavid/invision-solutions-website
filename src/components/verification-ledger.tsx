"use client";

import { motion } from "motion/react";

function VerificationLedger({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <div className={`font-mono text-xs sm:text-sm tracking-widest text-trust-blue ${className}`}>
      {lines.map((line, i) => (
        <motion.p
          key={line}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 0.35, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 + i * 0.5, ease: "easeOut" }}
          className="whitespace-nowrap"
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}

export { VerificationLedger };
