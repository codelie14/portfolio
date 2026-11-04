import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useProjects, Project } from '@/data/en';
import { useTr } from '@/i18n';
import { Reveal, SplitReveal } from './motion/primitives';

const ORDER = ['indrawatch', 'cybergram', 'gatekeeper', 'kami', 'hackpen'];
const ACCENTS = ['187 100% 50%', '160 84% 45%', '210 100% 60%', '270 80% 65%', '340 85% 60%'];

function Card({
  p,
  i,
  total,
  progress,
}: {
  p: Project;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.04]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, i === total - 1 ? 0 : 0.5]);
  const tr = useTr();
  const accent = ACCENTS[i % ACCENTS.length];
  const isLogo = false;
  const live = p.link && p.link !== '#';

  return (
    <div className="sticky top-20 md:top-24 h-[calc(100svh-6rem)] flex items-start justify-center" style={{ paddingTop: i * 14 }}>
      <motion.article
        style={{ scale, ['--a' as string]: accent }}
        className="project-panel group relative w-full h-[min(78svh,640px)] rounded-[28px] overflow-hidden border border-white/10 origin-top"
      >
        {/* Visuel */}
        <div className="absolute inset-0">
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
            className={`w-full h-full transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105 ${
              isLogo ? 'object-contain p-24 md:p-40 opacity-90' : 'object-cover object-top'
            }`}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(220_22%_4%/0.2)_0%,hsl(220_22%_4%/0.75)_55%,hsl(220_22%_4%)_100%)]" />
          <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_85%_10%,hsl(var(--a)/0.35),transparent_45%)]" />
        </div>

        <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-background pointer-events-none" />

        {/* Contenu */}
        <div className="relative h-full flex flex-col justify-between p-6 sm:p-10">
          <div className="flex items-start justify-between gap-4 font-mono text-xs sm:text-sm">
            <span className="px-3 py-1.5 rounded-full border border-white/15 bg-black/30 backdrop-blur-md" style={{ color: `hsl(${accent})` }}>
              {p.category}
            </span>
            <span className="text-muted-foreground">
              {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} · {p.year}
            </span>
          </div>

          <div>
            <h3 className="font-display font-bold tracking-[-0.03em] leading-[0.9] text-[clamp(2.6rem,7vw,6rem)]">{p.title}</h3>
            <p className="mt-4 max-w-2xl text-sm sm:text-lg text-white/75 leading-relaxed">{p.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.technologies.slice(0, 7).map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono bg-white/5 border border-white/10 text-white/80">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to={`/projects/${p.id}`}
                data-cursor="Ouvrir"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
                style={{ background: `hsl(${accent})` }}
              >
                {tr('Étude de cas', 'Case study')} <ArrowUpRight className="w-4 h-4" />
              </Link>
              {live && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium border border-white/20 hover:border-white/50 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> {tr('En ligne', 'Live')} — {p.link.replace('https://', '')}
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const tr = useTr();
  const all = useProjects();
  const ordered = ORDER.map((id) => all.find((p) => p.id === id)!).filter(Boolean);

  return (
    <section id="projets" className="relative py-28 md:py-40">
      <div className="section-container">
        <Reveal>
          <p className="section-kicker">{tr('03 — Projets', '03 — Work')}</p>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display font-bold tracking-tight text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.95]">
            <SplitReveal key={tr('fr', 'en')} text={tr('Réalisations', 'Selected work')} />
            <span className="text-primary">.</span>
          </h2>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-muted-foreground">
              {tr(
                "Des plateformes complètes, de l'architecture au déploiement — chacune pensée sécurité d'abord.",
                'Complete platforms, from architecture to deployment — each one designed security-first.'
              )}
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-16">
          {ordered.map((p, i) => (
            <Card key={p.id} p={p} i={i} total={ordered.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
