import { useTr } from '@/i18n';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { markBooted } from './motion/boot';

const LINES_FR = [
  '[ OK ] Initialisation du noyau AY.sec',
  '[ OK ] Chargement des modules IAM',
  '[ OK ] Montage du pare-feu applicatif',
  '[ OK ] Connexion au réseau — Abidjan, CI',
  '[ OK ] Vérification des signatures',
  '> Accès autorisé.',
];
const LINES_EN = [
  '[ OK ] Booting AY.sec kernel',
  '[ OK ] Loading IAM modules',
  '[ OK ] Mounting application firewall',
  '[ OK ] Connecting to network — Abidjan, CI',
  '[ OK ] Verifying signatures',
  '> Access granted.',
];

/** Écran de démarrage façon séquence de boot, puis rideau qui s'ouvre. */
export default function Loader() {
  const tr = useTr();
  const LINES = tr(LINES_FR, LINES_EN);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = reduce ? 300 : 2000;
    document.documentElement.classList.add('loading');
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else
        setTimeout(() => {
          setDone(true);
          document.documentElement.classList.remove('loading');
          markBooted();
        }, 250);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const shown = Math.ceil((pct / 100) * LINES.length);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex"
          exit={{ pointerEvents: 'none' }}
          transition={{ duration: 1.1 }}
        >
          {/* Deux panneaux qui s'écartent */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="absolute top-0 h-full w-1/2 bg-[hsl(220_20%_3%)]"
              style={{ left: i === 0 ? 0 : '50%' }}
              exit={{ y: i === 0 ? '-100%' : '100%' }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
            />
          ))}
          <motion.div
            className="relative w-full flex flex-col justify-between p-6 sm:p-10 font-mono"
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
            transition={{ duration: 0.35 }}
          >
            <div className="text-xs sm:text-sm text-primary/80 space-y-1.5 max-w-md">
              {LINES.slice(0, shown).map((l) => (
                <motion.p
                  key={l}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={l.startsWith('>') ? 'text-accent' : ''}
                >
                  {l}
                </motion.p>
              ))}
              <span className="inline-block w-2 h-4 bg-primary animate-pulse align-middle" />
            </div>
            <div className="flex items-end justify-between gap-6">
              <div className="text-[11px] sm:text-xs text-muted-foreground uppercase tracking-[0.3em]">
                Archange Elie Yatte
                <br />
                {tr('Sécurité · Développement', 'Security · Development')}
              </div>
              <div className="font-display text-7xl sm:text-9xl font-bold text-foreground tabular-nums leading-none">
                {pct}
                <span className="text-primary">%</span>
              </div>
            </div>
            <div className="absolute left-0 bottom-0 h-[2px] bg-primary" style={{ width: `${pct}%` }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
