import { useEffect, useRef } from 'react';

/**
 * Réseau de nœuds vivant : les points dérivent, se relient entre eux
 * et réagissent au curseur. Évoque une topologie réseau / un SOC.
 */
export default function NetworkCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = 1, raf = 0;
    const mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; vx: number; vy: number; r: number; hot: number };
    let pts: P[] = [];
    const packets: { a: number; b: number; t: number }[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, (w * h) / 11000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        hot: 0,
      }));
    };

    const LINK = 130;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
        }
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 160) {
          const f = (160 - d) / 160;
          p.x += (dx / (d || 1)) * f * 2.2;
          p.y += (dy / (d || 1)) * f * 2.2;
          p.hot = Math.min(1, p.hot + 0.08);
        } else p.hot *= 0.96;
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            const o = (1 - d / LINK) * 0.35 + Math.max(a.hot, b.hot) * 0.4;
            ctx.strokeStyle = `hsla(187,100%,55%,${o})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            if (!reduce && Math.random() < 0.0009 && packets.length < 14) packets.push({ a: i, b: j, t: 0 });
          }
        }
      }
      // paquets de données qui voyagent sur les liens
      for (let k = packets.length - 1; k >= 0; k--) {
        const pk = packets[k];
        const a = pts[pk.a], b = pts[pk.b];
        pk.t += 0.02;
        if (!a || !b || pk.t >= 1 || Math.hypot(a.x - b.x, a.y - b.y) > LINK) {
          packets.splice(k, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * pk.t, y = a.y + (b.y - a.y) * pk.t;
        ctx.fillStyle = 'hsla(160,84%,55%,0.95)';
        ctx.shadowColor = 'hsl(160,84%,50%)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      for (const p of pts) {
        ctx.fillStyle = p.hot > 0.1 ? `hsla(160,84%,60%,${0.6 + p.hot * 0.4})` : 'hsla(187,100%,70%,0.7)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + p.hot * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);
    // pause hors écran pour économiser la batterie
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
