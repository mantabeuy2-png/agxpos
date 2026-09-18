import React from 'react';

interface AgxLogoProps {
  className?: string;
  size?: number | string;
  primaryColor?: string;
  accentColor?: string;
}

/**
 * AgxPOS Brand Logo based on icons8-book-100 without background container.
 * Geometric blue book with magenta/red bookmark bar.
 */
export const AgxLogo: React.FC<AgxLogoProps> = ({
  className = 'w-9 h-9',
  size,
  primaryColor = '#0F5B98',
  accentColor = '#DE1153',
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0`}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      {/* Outer Blue Book Body with Transparent Inner Window & Bottom Slot */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26 10H88C89.1 10 90 10.9 90 12V66H26C23.24 66 21 68.24 21 71C21 73.76 23.24 76 26 76H90V88C90 89.1 89.1 90 88 90H26C17.16 90 10 82.84 10 74V26C10 17.16 17.16 10 26 10ZM24 32C24 27.58 27.58 24 32 24H76V54H24V32Z"
        fill={primaryColor}
      />
      {/* Red / Magenta Horizontal Bookmark / Label */}
      <rect
        x="31"
        y="33"
        width="38"
        height="12"
        rx="1.5"
        fill={accentColor}
      />
    </svg>
  );
};
