import { useEffect, useRef } from "react";

interface GalaxyCanvasProps {
  className?: string;
  opacity?: number;
}

export default function GalaxyCanvas({ className = "", opacity = 1 }: GalaxyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const angleRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Star field
    interface Star { x: number; y: number; r: number; opacity: number; twinkleOffset: number; }
    const stars: Star[] = [];
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.2,
        opacity: 0.2 + Math.random() * 0.8,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    const draw = (time: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const t = time * 0.001;

      ctx.clearRect(0, 0, w, h);

      // Background deep space
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.7);
      bg.addColorStop(0, "rgba(14, 8, 30, 0)");
      bg.addColorStop(1, "rgba(3, 3, 10, 0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Twinkling stars
      for (const s of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * 1.5 + s.twinkleOffset);
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 215, 255, ${s.opacity * (0.4 + 0.6 * twinkle)})`;
        ctx.fill();
      }

      // Galaxy
      ctx.save();
      ctx.translate(cx, cy);
      angleRef.current = t * 0.04; // very slow rotation
      ctx.rotate(angleRef.current);

      const maxR = Math.min(w, h) * 0.42;

      // Core glow
      const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, maxR * 0.18);
      coreGrad.addColorStop(0, "rgba(255, 240, 200, 0.95)");
      coreGrad.addColorStop(0.2, "rgba(200, 160, 255, 0.7)");
      coreGrad.addColorStop(0.5, "rgba(80, 60, 160, 0.4)");
      coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.beginPath();
      ctx.ellipse(0, 0, maxR * 0.18, maxR * 0.12, 0, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Disk glow
      const diskGrad = ctx.createRadialGradient(0, 0, maxR * 0.05, 0, 0, maxR);
      diskGrad.addColorStop(0, "rgba(160, 100, 255, 0.25)");
      diskGrad.addColorStop(0.3, "rgba(80, 50, 180, 0.12)");
      diskGrad.addColorStop(0.6, "rgba(40, 60, 140, 0.06)");
      diskGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.beginPath();
      ctx.ellipse(0, 0, maxR, maxR * 0.3, 0, 0, Math.PI * 2);
      ctx.fillStyle = diskGrad;
      ctx.fill();

      // Spiral arms
      const drawArm = (startAngle: number, color1: string, color2: string) => {
        const numPoints = 600;
        for (let i = 0; i < numPoints; i++) {
          const frac = i / numPoints;
          const angle = startAngle + frac * Math.PI * 3.5;
          const r = frac * maxR;
          const spread = r * 0.18 * (0.5 + frac);
          const sr = r + (Math.random() - 0.5) * spread;
          const sa = angle + (Math.random() - 0.5) * 0.3;
          const px = sr * Math.cos(sa);
          const py = sr * Math.sin(sa) * 0.55;
          const particleR = 0.4 + Math.random() * 1.2 * (1 - frac * 0.6);
          const alpha = (0.05 + Math.random() * 0.35) * (1 - frac * 0.4);

          ctx.beginPath();
          ctx.arc(px, py, particleR, 0, Math.PI * 2);

          if (frac < 0.15) {
            ctx.fillStyle = `rgba(255, 235, 180, ${alpha * 1.5})`;
          } else if (frac < 0.4) {
            ctx.fillStyle = frac < 0.25 ? `rgba(200, 160, 255, ${alpha * 1.2})` : color1.replace("ALPHA", String(alpha));
          } else {
            ctx.fillStyle = color2.replace("ALPHA", String(alpha * 0.7));
          }
          ctx.fill();
        }
      };

      drawArm(0, "rgba(130, 90, 220, ALPHA)", "rgba(60, 100, 200, ALPHA)");
      drawArm(Math.PI, "rgba(110, 70, 200, ALPHA)", "rgba(50, 90, 180, ALPHA)");
      drawArm(Math.PI * 0.5, "rgba(90, 120, 200, ALPHA)", "rgba(70, 60, 180, ALPHA)");
      drawArm(Math.PI * 1.5, "rgba(100, 80, 210, ALPHA)", "rgba(60, 80, 190, ALPHA)");

      // Bright core stars
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * maxR * 0.1;
        const px = r * Math.cos(angle);
        const py = r * Math.sin(angle) * 0.55;
        ctx.beginPath();
        ctx.arc(px, py, 0.5 + Math.random(), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 252, 230, ${0.6 + Math.random() * 0.4})`;
        ctx.fill();
      }

      ctx.restore();

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity, display: "block", width: "100%", height: "100%" }}
    />
  );
}
