const BRACKET_ARM = 7;

function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* top-left */}
      <path
        d={`M2 ${2 + BRACKET_ARM} V2 H${2 + BRACKET_ARM}`}
        stroke="var(--color-signal-gold)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* top-right */}
      <path
        d={`M${38 - BRACKET_ARM} 2 H38 V${2 + BRACKET_ARM}`}
        stroke="var(--color-signal-gold)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* bottom-right */}
      <path
        d={`M38 ${38 - BRACKET_ARM} V38 H${38 - BRACKET_ARM}`}
        stroke="var(--color-signal-gold)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* bottom-left */}
      <path
        d={`M${2 + BRACKET_ARM} 38 H2 V${38 - BRACKET_ARM}`}
        stroke="var(--color-signal-gold)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* centred vertical bar */}
      <rect x="18.5" y="14" width="3" height="12" rx="1.5" fill="var(--color-signal-gold)" />
    </svg>
  );
}

function LogoLockup({ size = 32, subline = true }: { size?: number; subline?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark size={size} />
      <span className="flex flex-col leading-none">
        <span
          className="font-display uppercase text-platinum"
          style={{ letterSpacing: "0.05em", fontSize: size * 0.5 }}
        >
          Invision
        </span>
        {subline && (
          <span
            className="font-mono uppercase text-slate"
            style={{ letterSpacing: "0.25em", fontSize: size * 0.19 }}
          >
            Solutions
          </span>
        )}
      </span>
    </span>
  );
}

export { LogoMark, LogoLockup };
