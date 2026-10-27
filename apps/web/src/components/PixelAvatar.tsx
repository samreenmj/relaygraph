import React from 'react';

interface PixelAvatarProps {
  type: 'investigator' | 'implementer' | 'verifier' | 'falkordb' | string;
  size?: number;
  className?: string;
}

export const PixelAvatar: React.FC<PixelAvatarProps> = ({
  type,
  size = 40,
  className = '',
}) => {
  if (type === 'investigator') {
    // Agent A: Scout with monocle / scanner helmet, sky blue theme
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pixelated rounded-lg ${className}`}
        style={{ shapeRendering: 'crispEdges' }}
      >
        {/* Background rounded tile */}
        <rect width="16" height="16" rx="3" fill="#DCEEFF" />
        {/* Helmet / Hair */}
        <rect x="4" y="2" width="8" height="4" fill="#0284C7" />
        <rect x="3" y="4" width="10" height="2" fill="#0369A1" />
        {/* Face */}
        <rect x="4" y="6" width="8" height="5" fill="#FED7AA" />
        {/* Scout Goggle / Scanner Monocle */}
        <rect x="5" y="7" width="3" height="2" fill="#0C4A6E" />
        <rect x="6" y="7" width="1" height="1" fill="#38BDF8" />
        <rect x="9" y="7" width="2" height="2" fill="#0C4A6E" />
        {/* Antenna / Sensor */}
        <rect x="11" y="1" width="1" height="3" fill="#38BDF8" />
        <rect x="10" y="1" width="3" height="1" fill="#0284C7" />
        {/* Jacket */}
        <rect x="3" y="11" width="10" height="4" fill="#0369A1" />
        <rect x="6" y="11" width="4" height="4" fill="#E0F2FE" />
        <rect x="7" y="12" width="2" height="1" fill="#0284C7" />
      </svg>
    );
  }

  if (type === 'implementer') {
    // Agent B: Forge with blacksmith goggles & forge vest, peach/orange theme
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pixelated rounded-lg ${className}`}
        style={{ shapeRendering: 'crispEdges' }}
      >
        <rect width="16" height="16" rx="3" fill="#FFE2D2" />
        {/* Bandana / Cap */}
        <rect x="4" y="2" width="8" height="3" fill="#EA580C" />
        <rect x="3" y="4" width="10" height="2" fill="#C2410C" />
        {/* Face */}
        <rect x="4" y="6" width="8" height="5" fill="#FFEDD5" />
        {/* Eyes / Welding Specs */}
        <rect x="5" y="7" width="2" height="2" fill="#7C2D12" />
        <rect x="6" y="7" width="1" height="1" fill="#FDBA74" />
        <rect x="9" y="7" width="2" height="2" fill="#7C2D12" />
        <rect x="10" y="7" width="1" height="1" fill="#FDBA74" />
        {/* Smirk */}
        <rect x="7" y="9" width="2" height="1" fill="#9A3412" />
        {/* Forge Apron */}
        <rect x="3" y="11" width="10" height="4" fill="#C2410C" />
        <rect x="5" y="11" width="6" height="5" fill="#78350F" />
        {/* Wrench badge */}
        <rect x="7" y="12" width="2" height="2" fill="#FDBA74" />
      </svg>
    );
  }

  if (type === 'verifier') {
    // Agent C: Sentinel with shield crest, lavender theme
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pixelated rounded-lg ${className}`}
        style={{ shapeRendering: 'crispEdges' }}
      >
        <rect width="16" height="16" rx="3" fill="#E9E4FF" />
        {/* Visor / Helmet */}
        <rect x="4" y="2" width="8" height="4" fill="#6D28D9" />
        <rect x="3" y="5" width="10" height="2" fill="#5B21B6" />
        {/* Visor Bar (Cyan/Emerald scan glow) */}
        <rect x="5" y="6" width="6" height="2" fill="#10B981" />
        <rect x="7" y="6" width="2" height="1" fill="#A7F3D0" />
        {/* Face plate */}
        <rect x="4" y="8" width="8" height="3" fill="#EDE9FE" />
        <rect x="7" y="9" width="2" height="1" fill="#6D28D9" />
        {/* Guardian Pauldrons */}
        <rect x="2" y="11" width="12" height="4" fill="#5B21B6" />
        <rect x="6" y="11" width="4" height="4" fill="#8B5CF6" />
        {/* Verified check badge */}
        <rect x="7" y="12" width="2" height="2" fill="#10B981" />
      </svg>
    );
  }

  // FalkorDB or generic graph mascot
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixelated rounded-lg ${className}`}
      style={{ shapeRendering: 'crispEdges' }}
    >
      <rect width="16" height="16" rx="3" fill="#D9F5E8" />
      {/* Graph Nodes */}
      <rect x="7" y="2" width="3" height="3" fill="#047857" />
      <rect x="3" y="10" width="3" height="3" fill="#059669" />
      <rect x="11" y="10" width="3" height="3" fill="#059669" />
      {/* Edges */}
      <rect x="5" y="5" width="2" height="5" fill="#34D399" />
      <rect x="9" y="5" width="2" height="5" fill="#34D399" />
      <rect x="6" y="11" width="5" height="1" fill="#34D399" />
      {/* Central Core */}
      <rect x="7" y="7" width="2" height="2" fill="#10B981" />
    </svg>
  );
};
