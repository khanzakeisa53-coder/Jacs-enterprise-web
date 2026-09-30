import React, { useEffect, useRef } from 'react';

interface NeuralNetworkCanvasProps {
  className?: string;
  particleColor?: string;
  lineColor?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export const NeuralNetworkCanvas: React.FC<NeuralNetworkCanvasProps> = ({
  className = '',
  particleColor,
  lineColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse interactive coordinates
    const mouse = { x: -1000, y: -1000, radius: 120 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    // Generate responsive count of particles
    const particleCount = Math.floor((width * height) / 10000);
    const particles: Particle[] = [];

    for (let i = 0; i < Math.max(30, Math.min(particleCount, 75)); i++) {
      const baseRadius = Math.random() * 2 + 1.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: baseRadius,
        baseRadius,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Check current dark mode on html
      const isDark = document.documentElement.classList.contains('dark');
      const pColor = particleColor || (isDark ? '124, 92, 255' : '105, 65, 198'); // Purple accent
      const blueColor = isDark ? '0, 102, 255' : '0, 86, 255'; // JacS Blue
      const orangeColor = isDark ? '255, 106, 0' : '230, 81, 0'; // JacS Orange

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Pulsing radius
        p.pulsePhase += p.pulseSpeed;
        p.radius = p.baseRadius + Math.sin(p.pulsePhase) * 0.8;

        // Interactive mouse push/pull
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
          const force = (1 - distMouse / mouse.radius) * 1.5;
          p.x -= (dxMouse / distMouse) * force;
          p.y -= (dyMouse / distMouse) * force;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2);
        
        // Alternating accent colors (purple, jacs blue, subtle orange)
        const nodeColor = i % 5 === 0 ? orangeColor : i % 2 === 0 ? blueColor : pColor;
        ctx.fillStyle = `rgba(${nodeColor}, ${isDark ? 0.75 : 0.6})`;
        ctx.fill();

        // Subtle glow halo around larger nodes
        if (p.baseRadius > 2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${nodeColor}, ${isDark ? 0.15 : 0.08})`;
          ctx.fill();
        }

        // Connect nearby nodes (Neural Network edges)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 110;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (isDark ? 0.35 : 0.22);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${pColor}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Periodic energetic signal traveling along synapse
            if (i % 3 === 0 && j % 2 === 0) {
              const signalProgress = (Math.sin(time + i + j) + 1) / 2;
              const sx = p.x + (p2.x - p.x) * signalProgress;
              const sy = p.y + (p2.y - p.y) * signalProgress;
              ctx.beginPath();
              ctx.arc(sx, sy, 1.4, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${orangeColor}, ${alpha * 1.5})`;
              ctx.fill();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [particleColor, lineColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto w-full h-full ${className}`}
    />
  );
};
