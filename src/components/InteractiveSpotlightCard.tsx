import React, { useRef, useState } from 'react';

interface InteractiveSpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const InteractiveSpotlightCard: React.FC<InteractiveSpotlightCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(0, 86, 255, 0.25)',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-app-xl bg-white dark:bg-[#111419]/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 overflow-hidden interactive-card transition-all duration-200 ease-out hover:border-cyan-500 hover:shadow-[0_0_18px_rgba(6,182,212,0.35)] dark:hover:border-cyan-400 dark:hover:shadow-[0_0_20px_rgba(0,86,255,0.4)] ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)`,
        }}
      />
      {/* Content wrapper with relative z-index */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
