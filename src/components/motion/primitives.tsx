import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01ABCDEF';

/** Texte qui se « déchiffre » caractère par caractère. */
export function ScrambleText({
  text,
  className,
  delay = 0,
  speed = 28,
  trigger = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  trigger?: boolean;
}) {
  const [out, setOut] = useState(text.replace(/\S/g, ' '));
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!trigger) return;
    if (reduce) {
      setOut(text);
      return;
    }
    let frame = 0;
    let raf: number;
    let timeout: ReturnType<typeof setTimeout>;
    const total = text.length * 2.2 + 12;
    const tick = () => {
      frame++;
      const revealed = Math.max(0, (frame - 8) / 2.2);
      setOut(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' ';
            if (i < revealed) return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );
      if (frame < total) raf = window.setTimeout(() => requestAnimationFrame(tick), speed) as unknown as number;
      else setOut(text);
    };
    timeout = setTimeout(() => requestAnimationFrame(tick), delay * 1000);
    return () => {
      clearTimeout(timeout);
      clearTimeout(raf);
    };
  }, [text, delay, speed, trigger, reduce]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}

/** Titre révélé ligne par ligne, chaque lettre surgissant d'un masque. */
export function SplitReveal({
  text,
  className,
  delay = 0,
  stagger = 0.035,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: '-10% 0px' });
  const words = text.split(' ');
  let idx = 0;
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden>
          {w.split('').map((ch) => {
            const i = idx++;
            return (
              <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.16em] -mb-[0.08em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%', rotate: 8 }}
                  animate={inView ? { y: '0%', rotate: 0 } : {}}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger }}
                >
                  {ch}
                </motion.span>
              </span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

/** Bloc qui monte en fondu quand il entre à l'écran. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/** Élément attiré par le curseur (effet magnétique). */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className="inline-block"
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Compteur animé jusqu'à une valeur. */
export function Counter({ to, suffix = '', duration = 1.8 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf: number;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 4);
      setV(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

/** Bande défilante infinie. */
export function Marquee({
  items,
  reverse = false,
  className,
  duration = 40,
}: {
  items: ReactNode[];
  reverse?: boolean;
  className?: string;
  duration?: number;
}) {
  return (
    <div className={`marquee-mask overflow-hidden ${className ?? ''}`}>
      <div
        className="marquee-track flex w-max gap-10"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {[...items, ...items].map((it, i) => (
          <div key={i} className="shrink-0 flex items-center gap-10" aria-hidden={i >= items.length}>
            {it}
          </div>
        ))}
      </div>
    </div>
  );
}
