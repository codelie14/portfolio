import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTr } from '@/i18n';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

/** Déclenche une pluie façon Matrix : code Konami, ou événement « ay:matrix » (commande terminal). */
export function triggerMatrix(message?: string) {
  window.dispatchEvent(new CustomEvent('ay:matrix', { detail: message }));
}

export default function MatrixRain() {
  const tr = useTr();
  const [on, setOn] = useState(false);
  const [msg, setMsg] = useState<string | undefined>();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let i = 0;
    const key = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      i = k === KONAMI[i] ? i + 1 : k === KONAMI[0] ? 1 : 0;
      if (i === KONAMI.length) {
        i = 0;
        setMsg(undefined);
        setOn(true);
      }
    };
    const ev = (e: Event) => {
      setMsg((e as CustomEvent<string | undefined>).detail);
      setOn(true);
    };
    window.addEventListener('keydown', key);
    window.addEventListener('ay:matrix', ev);
    return () => {
      window.removeEventListener('keydown', key);
      window.removeEventListener('ay:matrix', ev);
    };
  }, []);

  useEffect(() => {
    if (!on) return;
    const c = canvas.current!;
    const x = c.getContext('2d')!;
    const w = (c.width = window.innerWidth);
    const h = (c.height = window.innerHeight);
    const fs = 16;
    const cols = Math.ceil(w / fs);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);
    const chars = 'アカサタナハマヤラワ01ABCDEF<>/{}#$%IAMSOC';
    let raf = 0;
    const draw = () => {
      x.fillStyle = 'rgba(3,6,10,0.08)';
      x.fillRect(0, 0, w, h);
      x.font = `${fs}px monospace`;
      drops.forEach((d, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        x.fillStyle = Math.random() > 0.96 ? '#e8fff6' : '#10f0a0';
        x.fillText(ch, i * fs, d * fs);
        drops[i] = d * fs > h && Math.random() > 0.975 ? 0 : d + 1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const stop = setTimeout(() => setOn(false), 7000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(stop);
    };
  }, [on]);

  return (
    <AnimatePresence>
      {on && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          onClick={() => setOn(false)}
          className="fixed inset-0 z-[190] bg-[#03060a]"
        >
          <canvas ref={canvas} className="absolute inset-0" />
          <div className="absolute inset-0 grid place-items-center pointer-events-none px-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center font-mono bg-black/70 border border-accent/50 rounded-2xl px-6 py-5 max-w-md"
            >
              <p className="text-accent text-lg">{msg ?? tr('Wake up, recruteur…', 'Wake up, recruiter…')}</p>
              <p className="mt-2 text-xs text-white/60">{tr('Touchez pour revenir', 'Tap to return')}</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
