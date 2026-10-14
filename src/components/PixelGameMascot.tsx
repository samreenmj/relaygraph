import React from 'react';

export const PixelCatMascot: React.FC<{ size?: number; className?: string }> = ({
  size = 48,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Ears */}
    <rect x="7" y="5" width="4" height="4" fill="#312E81" />
    <rect x="8" y="6" width="2" height="2" fill="#F472B6" />
    <rect x="21" y="5" width="4" height="4" fill="#312E81" />
    <rect x="22" y="6" width="2" height="2" fill="#F472B6" />

    {/* Head base */}
    <rect x="6" y="8" width="20" height="13" fill="#FFFFFF" />
    <rect x="5" y="10" width="22" height="9" fill="#FFFFFF" />
    <rect x="5" y="9" width="2" height="10" fill="#312E81" />
    <rect x="25" y="9" width="2" height="10" fill="#312E81" />
    <rect x="7" y="8" width="18" height="1" fill="#312E81" />

    {/* Fur tint (Lavender top) */}
    <rect x="8" y="9" width="16" height="3" fill="#EDE9FE" />

    {/* Big cute anime eyes */}
    <rect x="9" y="13" width="3" height="4" fill="#1E1B4B" />
    <rect x="9" y="13" width="1" height="2" fill="#FFFFFF" />
    <rect x="20" y="13" width="3" height="4" fill="#1E1B4B" />
    <rect x="20" y="13" width="1" height="2" fill="#FFFFFF" />

    {/* Blush & nose */}
    <rect x="7" y="16" width="3" height="2" fill="#FBCFE8" />
    <rect x="22" y="16" width="3" height="2" fill="#FBCFE8" />
    <rect x="15" y="15" width="2" height="1" fill="#F472B6" />
    <rect x="14" y="16" width="4" height="1" fill="#312E81" />

    {/* Cape / Wizard Robe / Backpack */}
    <rect x="8" y="21" width="16" height="8" fill="#4F46E5" />
    <rect x="6" y="22" width="2" height="6" fill="#4338CA" />
    <rect x="24" y="22" width="2" height="6" fill="#4338CA" />
    <rect x="13" y="22" width="6" height="4" fill="#E0E7FF" />
    <rect x="15" y="23" width="2" height="2" fill="#FBBF24" />

    {/* Paws */}
    <rect x="9" y="28" width="4" height="2" fill="#FFFFFF" />
    <rect x="19" y="28" width="4" height="2" fill="#FFFFFF" />
    <rect x="9" y="29" width="4" height="1" fill="#312E81" />
    <rect x="19" y="29" width="4" height="1" fill="#312E81" />
  </svg>
);

export const SleepingCat: React.FC<{ size?: number; className?: string }> = ({
  size = 56,
  className = '',
}) => (
  <svg
    width={size}
    height={size * 0.6}
    viewBox="0 0 36 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Body loaf */}
    <rect x="8" y="6" width="22" height="12" fill="#E0E7FF" rx="4" />
    <rect x="6" y="9" width="25" height="9" fill="#EDE9FE" />
    {/* Curled Head */}
    <rect x="2" y="8" width="12" height="10" fill="#FFFFFF" />
    <rect x="3" y="5" width="3" height="3" fill="#F472B6" />
    <rect x="9" y="5" width="3" height="3" fill="#F472B6" />
    {/* Sleeping eye ^_^ */}
    <rect x="4" y="11" width="3" height="1" fill="#312E81" />
    <rect x="9" y="11" width="3" height="1" fill="#312E81" />
    <rect x="3" y="13" width="2" height="1" fill="#FBCFE8" />
    {/* Tail wrapping around */}
    <rect x="28" y="10" width="6" height="4" fill="#C7D2FE" />
    <rect x="32" y="14" width="3" height="4" fill="#C7D2FE" />
  </svg>
);

export const PixelStar: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="7" y="1" width="2" height="14" fill="#FBBF24" />
    <rect x="1" y="7" width="14" height="2" fill="#FBBF24" />
    <rect x="4" y="4" width="8" height="8" fill="#F59E0B" />
    <rect x="6" y="6" width="4" height="4" fill="#FEF08A" />
  </svg>
);
