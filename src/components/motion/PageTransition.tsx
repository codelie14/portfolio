import { motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

const EASE = [0.76, 0, 0.24, 1] as const;

/** Rideau qui balaie l'écran entre deux pages, avec le contenu qui se dévoile. */
export default function PageTransition({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 } }}
        exit={{ opacity: 0, y: -20, transition: { duration: 0.35 } }}
      >
        {children}
      </motion.div>
      {/* panneau qui sort (entrée de page) */}
      <motion.div
        className="fixed inset-0 z-[150] bg-primary origin-top pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.7, ease: EASE } }}
        exit={{ scaleY: 0 }}
        style={{ transformOrigin: 'top' }}
      />
      {/* panneau qui entre (sortie de page) */}
      <motion.div
        className="fixed inset-0 z-[150] bg-[hsl(220_22%_3%)] pointer-events-none flex items-center justify-center"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.55, ease: EASE } }}
        style={{ transformOrigin: 'bottom' }}
      >
        <span className="font-mono text-primary text-sm tracking-[0.3em]">AY.sec</span>
      </motion.div>
    </>
  );
}
