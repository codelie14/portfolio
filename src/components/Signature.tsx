import { motion, useScroll, useTransform } from 'framer-motion';
import { lazy, useRef } from 'react';
import { useTr } from '@/i18n';
import { Near } from './three/Lazy3D';

const ParticleMorph = lazy(() => import('./three/ParticleMorph'));

const STAGES = [
  { fr: ['Protéger', 'Des systèmes critiques, au quotidien.'], en: ['Protect', 'Critical systems, every single day.'] },
  { fr: ["Contrôler l'accès", 'Le bon droit, à la bonne personne, au bon moment.'], en: ['Control access', 'The right access, to the right person, at the right time.'] },
  { fr: ['Construire', 'Des plateformes sécurisées, de l’idée à la production.'], en: ['Build', 'Secure platforms, from idea to production.'] },
];

function Caption({ i, progress }: { i: number; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const tr = useTr();
  const c = i / 2;
  const opacity = useTransform(progress, [c - 0.22, c - 0.08, c + 0.08, c + 0.22], i === 0 ? [1, 1, 1, 0] : i === 2 ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, [c - 0.22, c, c + 0.22], [40, 0, -40]);
  const [title, sub] = tr(STAGES[i].fr, STAGES[i].en);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 bottom-[12svh] text-center px-6 pointer-events-none">
      <p className="font-mono text-xs text-primary tracking-[0.3em] uppercase">0{i + 1} / 03</p>
      <p className="mt-3 font-display font-bold text-[clamp(2.4rem,7vw,5.5rem)] leading-none tracking-tight">{title}</p>
      <p className="mt-3 text-muted-foreground">{sub}</p>
    </motion.div>
  );
}

/** Section épinglée : le nuage de particules se transforme au fil du défilement. */
export default function Signature() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // paliers : chaque forme reste lisible un moment avant de se transformer
  const morph = useTransform(scrollYProgress, [0.04, 0.2, 0.4, 0.6, 0.8, 0.96], [0, 0, 0.5, 0.5, 1, 1]);
  return (
    <section ref={ref} className="relative h-[320svh]" aria-label="Signature">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />
        <Near
          fallback={
            <div className="absolute inset-0 grid place-items-center font-display text-[30vw] font-bold text-stroke-muted">AY</div>
          }
        >
          <ParticleMorph progress={morph} className="absolute inset-0" />
        </Near>
        {[0, 1, 2].map((i) => (
          <Caption key={i} i={i} progress={morph} />
        ))}
      </div>
    </section>
  );
}
