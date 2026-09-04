import React from 'react';

export interface AiModLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'icon' | 'badge' | 'avatar' | 'floating';
  className?: string;
  glow?: boolean;
  animated?: boolean;
}

const sizeConfig = {
  xs: {
    container: 'w-4 h-4',
    svg: 16,
    ring: 'w-5 h-5',
    badgeText: 'text-[7px]',
  },
  sm: {
    container: 'w-6 h-6',
    svg: 22,
    ring: 'w-7 h-7',
    badgeText: 'text-[8px]',
  },
  md: {
    container: 'w-8 h-8',
    svg: 30,
    ring: 'w-10 h-10',
    badgeText: 'text-[9px]',
  },
  lg: {
    container: 'w-10 h-10',
    svg: 38,
    ring: 'w-12 h-12',
    badgeText: 'text-[10px]',
  },
  xl: {
    container: 'w-12 h-12',
    svg: 46,
    ring: 'w-14 h-14',
    badgeText: 'text-xs',
  },
  '2xl': {
    container: 'w-14 h-14',
    svg: 54,
    ring: 'w-16 h-16',
    badgeText: 'text-sm',
  },
};

/**
 * Bespoke AI PR Moderator & Strategic Intelligence Insignia.
 * Crafted exclusively for GSRelation Strategic Communications.
 * Combines strategic broadcast media waves, an interlocking neural crest,
 * and a 4-point luminescent intelligence spark.
 */
export const AiModLogo: React.FC<AiModLogoProps> = ({
  size = 'md',
  variant = 'icon',
  className = '',
  glow = true,
  animated = false,
}) => {
  const config = sizeConfig[size] || sizeConfig.md;
  const uniqueId = React.useId().replace(/:/g, '');

  const svgContent = (
    <svg
      width={config.svg}
      height={config.svg}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${animated ? 'transition-transform duration-500 hover:rotate-12' : ''}`}
      aria-hidden="true"
    >
      <defs>
        {/* Core Base Gradient - Charcoal & Deep Slate */}
        <linearGradient id={`aiModBase-${uniqueId}`} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#111827" />
          <stop offset="50%" stopColor="#1F2937" />
          <stop offset="100%" stopColor="#0B1320" />
        </linearGradient>

        {/* Outer Accent Rim - Sage Green to Sage Tint */}
        <linearGradient id={`aiModRim-${uniqueId}`} x1="8" y1="2" x2="40" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3D9981" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#2E7D68" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#D4D7CC" stopOpacity="0.75" />
        </linearGradient>

        {/* Central Luminous Starburst - Sage Luminescence */}
        <radialGradient id={`aiModSpark-${uniqueId}`} cx="24" cy="24" r="14" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#A7F3D0" />
          <stop offset="70%" stopColor="#2E7D68" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#111827" stopOpacity="0" />
        </radialGradient>

        {/* Media Wave Gradient - Sage & Mint */}
        <linearGradient id={`aiModWave-${uniqueId}`} x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#2E7D68" />
        </linearGradient>

        <filter id={`aiModGlow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Hex-Faceted Diamond Shield */}
      <path
        d="M24 3.5L41.5 13.6V34.4L24 44.5L6.5 34.4V13.6L24 3.5Z"
        fill={`url(#aiModBase-${uniqueId})`}
        stroke={`url(#aiModRim-${uniqueId})`}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />

      {/* Strategic Broadcast Ring & Neural Lattice Lines */}
      <circle
        cx="24"
        cy="24"
        r="14"
        stroke="#2E7D68"
        strokeWidth="1"
        strokeOpacity="0.4"
        strokeDasharray="2 3"
      />

      {/* Interlocking Media Arc 1 (North-East to South-West) */}
      <path
        d="M14 20C14 15 19 12 24 12C29 12 34 15 34 20"
        stroke={`url(#aiModWave-${uniqueId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />

      {/* Interlocking Media Arc 2 (South-West to North-East) */}
      <path
        d="M34 28C34 33 29 36 24 36C19 36 14 33 14 28"
        stroke={`url(#aiModWave-${uniqueId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />

      {/* Radial Signal Radar Beams */}
      <line x1="24" y1="6" x2="24" y2="10" stroke="#2E7D68" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="38" x2="24" y2="42" stroke="#2E7D68" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="24" x2="12" y2="24" stroke="#6EE7B7" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="24" x2="40" y2="24" stroke="#6EE7B7" strokeWidth="1.5" strokeLinecap="round" />

      {/* Central Strategic Spark / Quad-Lens Core */}
      <path
        d="M24 13C24 18.5 21 21.5 15.5 22C21 22.5 24 25.5 24 31C24 25.5 27 22.5 32.5 22C27 21.5 24 18.5 24 13Z"
        fill={`url(#aiModSpark-${uniqueId})`}
        filter={`url(#aiModGlow-${uniqueId})`}
      />

      {/* Micro Neural Nodes */}
      <circle cx="15.5" cy="22" r="1.5" fill="#A7F3D0" />
      <circle cx="32.5" cy="22" r="1.5" fill="#A7F3D0" />
      <circle cx="24" cy="13" r="1.5" fill="#D4D7CC" />
      <circle cx="24" cy="31" r="1.5" fill="#D4D7CC" />

      {/* Center Pinpoint Singularity */}
      <circle cx="24" cy="22" r="2" fill="#FFFFFF" />
      <circle cx="24" cy="22" r="0.75" fill="#111827" />
    </svg>
  );

  // Variant 1: Pure Icon
  if (variant === 'icon') {
    return (
      <div className={`relative inline-flex items-center justify-center ${config.container} ${className}`}>
        {glow && (
          <div className="absolute inset-0 bg-[#2E7D68]/20 blur-[3px] rounded-full -z-10 pointer-events-none" />
        )}
        {svgContent}
      </div>
    );
  }

  // Variant 2: Avatar with faceted backing for chat messages
  if (variant === 'avatar') {
    return (
      <div
        className={`relative inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-[#111827] via-[#1F2937] to-[#14231E] border border-[#2E7D68]/40 shadow-sm ${config.container} ${className}`}
      >
        {svgContent}
      </div>
    );
  }

  // Variant 3: Floating Action Button Insignia
  if (variant === 'floating') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        {/* Subtle Ambient Pulse Ring */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#2E7D68]/40 via-[#3D9981]/30 to-[#D4D7CC]/30 blur-[2px] animate-pulse pointer-events-none" />
        {svgContent}
      </div>
    );
  }

  // Variant 4: Badge with container
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-md bg-[#111827] border border-[#2E7D68]/40 p-1 shadow-xs ${className}`}
    >
      {svgContent}
    </div>
  );
};
