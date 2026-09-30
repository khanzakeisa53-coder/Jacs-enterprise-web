import React from 'react';

interface JacSLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  withGlow?: boolean;
  subtitle?: string;
}

const SIZE_MAP = {
  xs: { box: 24, font: 'text-sm' },
  sm: { box: 32, font: 'text-base' },
  md: { box: 40, font: 'text-lg' },
  lg: { box: 52, font: 'text-xl' },
  xl: { box: 72, font: 'text-2xl' },
};

export const JacSLogo: React.FC<JacSLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
  withGlow = false,
  subtitle,
}) => {
  const { box, font } = SIZE_MAP[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div className={`relative flex items-center justify-center flex-shrink-0 ${withGlow ? 'group' : ''}`}>
        {withGlow && (
          <div
            className="absolute -inset-1 rounded-full blur-md opacity-40 bg-gradient-to-r from-orange-500 via-blue-600 to-indigo-600 group-hover:opacity-75 transition duration-500"
            style={{ width: box * 1.2, height: box * 1.2 }}
          />
        )}
        <svg
          width={box}
          height={box}
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transition-transform duration-300 ease-out hover:scale-105"
        >
          <defs>
            {/* Orange Back Wing Gradients */}
            <linearGradient id="jacsOrangeGrad" x1="160" y1="30" x2="450" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF7A00" />
              <stop offset="35%" stopColor="#FF5100" />
              <stop offset="85%" stopColor="#D92800" />
              <stop offset="100%" stopColor="#9C1700" />
            </linearGradient>

            <linearGradient id="jacsOrangeShine" x1="180" y1="30" x2="460" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFA64D" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF5A00" stopOpacity="0" />
            </linearGradient>

            {/* Blue Front Fold Gradients */}
            <linearGradient id="jacsBlueMain" x1="380" y1="110" x2="80" y2="390" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0066FF" />
              <stop offset="35%" stopColor="#0051E6" />
              <stop offset="70%" stopColor="#0037B3" />
              <stop offset="100%" stopColor="#002580" />
            </linearGradient>

            <linearGradient id="jacsBlueHighlight" x1="350" y1="130" x2="160" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#66B3FF" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#0077FE" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#002D9C" stopOpacity="0" />
            </linearGradient>

            {/* Deep Fold Shadow */}
            <linearGradient id="jacsInnerCrease" x1="280" y1="120" x2="330" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#5E0E00" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#871A00" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.7" />
            </linearGradient>

            <filter id="jacsShadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="2" dy="8" stdDeviation="12" floodColor="#001844" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Group with filter shadow */}
          <g filter="url(#jacsShadow)">
            {/* Orange Backside Fold of the 'J' */}
            <path
              d="M165 115 L365 30 C415 10 460 35 460 85 L445 145 C410 240 370 330 270 425 C230 460 170 455 125 410 L150 375 C190 410 245 400 280 350 C340 265 375 185 390 120 L275 120 C235 120 190 118 165 115 Z"
              fill="url(#jacsOrangeGrad)"
            />

            {/* Orange Gloss Highlight along top horizontal wing */}
            <path
              d="M175 110 L365 35 C400 20 445 40 450 78 L440 120 C380 75 260 95 175 110 Z"
              fill="url(#jacsOrangeShine)"
            />

            {/* Crease shadow between orange back and blue ribbon */}
            <path
              d="M275 120 C320 220 345 280 285 390 C270 415 250 430 230 440 C280 400 320 310 335 220 L370 120 Z"
              fill="url(#jacsInnerCrease)"
            />

            {/* Blue Front 3D Curved Body */}
            <path
              d="M365 125 C310 160 275 230 255 310 C240 370 205 440 120 440 C55 440 30 380 30 315 C30 290 35 270 40 255 L125 255 C120 275 120 295 120 310 C120 345 135 365 160 365 C200 365 220 320 235 270 C255 195 295 140 365 125 Z"
              fill="url(#jacsBlueMain)"
            />

            {/* Blue Rim & Front Facet Gloss Highlight */}
            <path
              d="M365 125 C310 160 275 230 255 310 C240 370 205 440 120 440 C85 440 55 420 40 380 C60 410 95 420 135 415 C190 410 220 350 235 290 C255 210 290 150 355 130 Z"
              fill="url(#jacsBlueHighlight)"
            />

            {/* Sleek Bottom-left curl accent */}
            <path
              d="M40 255 L125 255 L120 275 L38 275 Z"
              fill="#0052CC"
              opacity="0.9"
            />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-display font-extrabold tracking-tight ${font} text-slate-950 dark:text-white`}>
              JacS
            </span>
            <span className={`font-display font-bold tracking-tight ${font} text-slate-950 dark:text-white`}>
              Enterprise
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-600 dark:text-slate-400 tracking-tight mt-0.5 whitespace-nowrap">
            {subtitle || 'Digital Intelligence for a Better Future'}
          </span>
        </div>
      )}
    </div>
  );
};

interface JacSDeveloperHeaderProps {
  suite?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md';
}

/**
 * Standardized Developer Identity Header Component:
 * - JacS 3D Origami SVG Logo (orange #FF7A00 & blue #3B82F6)
 * - Developer Name: "JacS Enterprise" (font-extrabold text-slate-950 dark:text-white text-sm)
 * - Tagline/Suite: "JacS Enterprise Suite" (text-[11px] text-cyan-600 dark:text-cyan-400 font-mono uppercase)
 */
export const JacSDeveloperHeader: React.FC<JacSDeveloperHeaderProps> = ({
  suite = 'JacS Enterprise Suite',
  className = '',
  size = 'sm',
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div className="flex-shrink-0 flex items-center justify-center">
        <JacSLogo size={size} withGlow={true} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="font-extrabold text-slate-950 dark:text-white tracking-tight text-sm leading-none font-display">
          JacS Enterprise
        </span>
        <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-mono uppercase tracking-wider font-semibold mt-0.5 truncate">
          {suite}
        </span>
      </div>
    </div>
  );
};
