import { motion, useMotionValue, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

/** Barre de progression de lecture en haut de page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-primary via-cyber-blue to-accent"
    />
  );
}

/** Curseur personnalisé : point + anneau qui grossit sur les éléments interactifs. */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    setEnabled(fine);
    if (!fine) return;
    document.documentElement.classList.add('has-cursor');
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement)?.closest?.('a,button,[data-cursor]') as HTMLElement | null;
      setHover(!!t);
      setLabel(t?.dataset.cursor ?? '');
    };
    window.addEventListener('pointermove', move);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] w-1.5 h-1.5 rounded-full bg-primary"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99] rounded-full border border-primary/60 flex items-center justify-center"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: label ? 88 : hover ? 52 : 32,
          height: label ? 88 : hover ? 52 : 32,
          backgroundColor: label ? 'hsla(187,100%,50%,1)' : hover ? 'hsla(187,100%,50%,0.12)' : 'hsla(187,100%,50%,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[11px] font-mono font-semibold text-background uppercase tracking-wider"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

/** Grain de film léger par-dessus tout le site. */
export function Grain() {
  return <div className="grain pointer-events-none fixed inset-0 z-[70]" aria-hidden />;
}
