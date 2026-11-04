import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTr } from '@/i18n';
import type { Project } from '@/data/en';

function Panel({ p, i, n, rot, radius, onOpen }: { p: Project; i: number; n: number; rot: MotionValue<number>; radius: number; onOpen: () => void }) {
  const angle = (360 / n) * i;
  // luminosité selon la face : la carte de face est nette, celles de dos s'estompent
  const opacity = useTransform(rot, (r) => {
    const a = (((angle + r) % 360) + 360) % 360;
    const d = Math.min(a, 360 - a);
    return 1 - Math.min(d / 180, 1) * 0.75;
  });
  return (
    <motion.button
      onClick={onOpen}
      data-cursor="Ouvrir"
      style={{ transform: `rotateY(${angle}deg) translateZ(${radius}px)`, opacity }}
      className="absolute left-1/2 top-1/2 -ml-[var(--w)] -mt-[calc(var(--w)*0.66)] w-[calc(var(--w)*2)] h-[calc(var(--w)*1.32)] rounded-2xl overflow-hidden border border-white/15 bg-card [backface-visibility:hidden] text-left group"
    >
      <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top" draggable={false} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 p-4">
        <p className="font-mono text-[10px] text-primary">{p.category}</p>
        <p className="font-display font-bold text-xl sm:text-2xl leading-tight">{p.title}</p>
      </div>
    </motion.button>
  );
}

/** Carrousel 3D des projets : on le fait tourner au doigt ou à la souris. */
export default function ProjectRing({ projects }: { projects: Project[] }) {
  const tr = useTr();
  const navigate = useNavigate();
  const wrap = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(140);
  const raw = useMotionValue(0);
  const rot = useSpring(raw, { stiffness: 60, damping: 20 });
  const drag = useRef<{ x: number; r: number; moved: boolean } | null>(null);

  useEffect(() => {
    const f = () => setW(Math.min(300, Math.max(170, (wrap.current?.clientWidth ?? 600) / 3.6)));
    f();
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!drag.current) raw.set(raw.get() - 0.15);
    }, 16);
    return () => clearInterval(id);
  }, [raw]);

  // deux tours de cartes pour un anneau dense
  const items = projects.length < 8 ? [...projects, ...projects] : projects;
  const n = items.length;
  const radius = Math.round((w * 1.12) / (2 * Math.tan(Math.PI / n)));

  return (
    <div
      ref={wrap}
      className="relative h-[380px] sm:h-[480px] select-none touch-pan-y cursor-grab active:cursor-grabbing [perspective:1100px]"
      style={{ ['--w' as string]: `${w / 2}px` }}
      onPointerDown={(e) => {
        drag.current = { x: e.clientX, r: raw.get(), moved: false };
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        const dx = e.clientX - drag.current.x;
        if (Math.abs(dx) > 5) drag.current.moved = true;
        raw.set(drag.current.r + dx * 0.35);
      }}
      onPointerUp={() => setTimeout(() => (drag.current = null), 0)}
      onPointerCancel={() => (drag.current = null)}
    >
      <motion.div className="absolute inset-0 [transform-style:preserve-3d]" style={{ rotateY: rot, rotateX: -6 }}>
        {items.map((p, i) => (
          <Panel
            key={`${p.id}-${i}`}
            p={p}
            i={i}
            n={n}
            rot={rot}
            radius={radius}
            onOpen={() => {
              if (!drag.current?.moved) navigate(`/projects/${p.id}`);
            }}
          />
        ))}
      </motion.div>
      <p className="absolute bottom-0 inset-x-0 text-center font-mono text-[11px] text-muted-foreground">
        ← {tr('faites tourner · touchez pour ouvrir', 'spin it · tap to open')} →
      </p>
    </div>
  );
}
