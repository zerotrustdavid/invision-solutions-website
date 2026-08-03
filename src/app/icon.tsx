import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg
        width={32}
        height={32}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="6" fill="#0A0C10" />
        <path d="M6 13 V6 H13" stroke="#C9A227" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27 6 H34 V13" stroke="#C9A227" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34 27 V34 H27" stroke="#C9A227" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 34 H6 V27" stroke="#C9A227" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="18.5" y="14" width="3" height="12" rx="1.5" fill="#C9A227" />
      </svg>
    ),
    size,
  );
}
