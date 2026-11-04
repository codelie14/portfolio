import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, X } from 'lucide-react';
import { useProjects } from '@/data/en';
import { useLang, useTr } from '@/i18n';
import SEO from './SEO';
import { projectMeta } from '@/seo/site';
import { Reveal, SplitReveal } from './motion/primitives';
import Footer from './Footer';

const ORDER = ['indrawatch', 'cybergram', 'gatekeeper', 'kami', 'hackpen'];

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const tr = useTr();
  const { lang, toggle } = useLang();
  const all = useProjects();
  const project = all.find((p) => p.id === projectId);
  const [zoom, setZoom] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (!project) navigate('/#projets', { replace: true });
  }, [project, navigate]);

  if (!project) return null;

  const idx = ORDER.indexOf(project.id);
  const next = all.find((p) => p.id === ORDER[(idx + 1) % ORDER.length])!;
  const live = project.link && project.link !== '#';
  const gallery = Array.from(new Set(project.images));
  const meta = projectMeta(project.id, lang);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {meta && (
        <SEO title={meta.title} description={meta.description} path={`/projects/${project.id}`} image={meta.image} type="article" jsonLd={meta.graph} />
      )}

      {/* Barre haute */}
      <div className="fixed top-0 inset-x-0 z-[80] section-container pt-4">
        <div className="flex items-center justify-between h-14 px-4 sm:px-5 rounded-full bg-background/70 backdrop-blur-xl border border-border/60">
          <Link to="/#projets" className="group inline-flex items-center gap-2 text-sm">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {tr('Tous les projets', 'All projects')}
          </Link>
          <button onClick={toggle} className="font-mono text-xs rounded-full border border-border/70 px-3 py-1.5 hover:border-primary hover:text-primary">
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>
      </div>

      {/* Hero */}
      <div ref={heroRef} className="relative h-[92svh] min-h-[560px] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          style={{ scale: imgScale, y: imgY }}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(220_22%_4%/0.35)_0%,hsl(220_22%_4%/0.7)_55%,hsl(var(--background))_100%)]" />
        <motion.div style={{ y: titleY, opacity: fade }} className="relative h-full section-container flex flex-col justify-end pb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-mono text-sm text-primary"
          >
            {project.category} · {project.year}
          </motion.p>
          <h1 className="mt-4 font-display font-bold tracking-[-0.04em] leading-[0.88] text-[clamp(3.2rem,12vw,10rem)]">
            <SplitReveal key={project.id} text={project.title} delay={0.45} stagger={0.05} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-6 max-w-2xl text-base sm:text-xl text-white/80 leading-relaxed"
          >
            {project.description}
          </motion.p>
        </motion.div>
      </div>

      {/* Méta */}
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60 rounded-2xl overflow-hidden">
          {[
            [tr('Catégorie', 'Category'), project.category],
            [tr('Année', 'Year'), String(project.year)],
            [tr('Rôle', 'Role'), tr('Conception & développement', 'Design & development')],
            [tr('Statut', 'Status'), live ? tr('En ligne', 'Live') : tr('Livré', 'Delivered')],
          ].map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.06} y={16} className="bg-background p-5">
              <p className="font-mono text-xs text-muted-foreground">{k}</p>
              <p className="mt-1 font-medium">{v}</p>
            </Reveal>
          ))}
        </div>
        {live && (
          <Reveal className="mt-6">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor={tr('Visiter', 'Visit')}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-accent transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-primary-foreground/70 animate-pulse" />
              {project.link.replace('https://', '')} <ArrowUpRight className="w-4 h-4" />
            </a>
          </Reveal>
        )}
      </div>

      {/* Présentation */}
      <section className="section-container py-24 grid lg:grid-cols-[0.7fr_1.3fr] gap-10">
        <Reveal>
          <p className="section-kicker">{tr('Vue d’ensemble', 'Overview')}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg sm:text-2xl leading-relaxed text-foreground/90">{project.detailedDescription}</p>
        </Reveal>
      </section>

      {/* Stack */}
      <section className="section-container pb-24">
        <Reveal>
          <p className="section-kicker">Stack</p>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          {project.technologies.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: i * 0.05 }}
              className="px-5 py-2.5 rounded-full border border-primary/30 bg-primary/5 font-mono text-sm text-primary"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="section-container pb-24">
        <Reveal>
          <p className="section-kicker">{tr('Fonctionnalités', 'Features')}</p>
        </Reveal>
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {project.features.map((f, i) => (
            <Reveal key={f} delay={(i % 2) * 0.08} y={24}>
              <div className="h-full rounded-2xl border border-border/70 bg-card/40 p-6 flex gap-4 hover:border-primary/40 transition-colors">
                <span className="font-mono text-sm text-primary">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-muted-foreground leading-relaxed">{f}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Défi / Solution */}
      <section className="section-container pb-24 grid md:grid-cols-2 gap-4">
        {[
          [tr('Le défi', 'The challenge'), project.challenges, 'from-destructive/15'],
          [tr('La solution', 'The solution'), project.solutions, 'from-accent/15'],
        ].map(([k, v, g], i) => (
          <Reveal key={k} delay={i * 0.1}>
            <div className={`h-full rounded-3xl border border-border/70 bg-gradient-to-br ${g} to-transparent p-8`}>
              <p className="font-display text-2xl font-semibold">{k}</p>
              <p className="mt-4 text-muted-foreground leading-relaxed">{v}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Galerie */}
      {gallery.length > 0 && (
        <section className="section-container pb-24">
          <Reveal>
            <p className="section-kicker">{tr('Galerie', 'Gallery')}</p>
          </Reveal>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {gallery.map((src, i) => (
              <Reveal key={src} delay={(i % 2) * 0.1} className={i === 0 && gallery.length % 2 === 1 ? 'md:col-span-2' : ''}>
                <button
                  onClick={() => setZoom(src)}
                  data-cursor={tr('Agrandir', 'Zoom')}
                  className="group block w-full overflow-hidden rounded-2xl border border-border/70 bg-card"
                >
                  <img
                    src={src}
                    alt={`${project.title} ${i + 1}`}
                    loading="lazy"
                    className="w-full aspect-[16/10] object-cover object-top transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Projet suivant */}
      <Link to={`/projects/${next.id}`} data-cursor={tr('Suivant', 'Next')} className="group block border-t border-border/60">
        <div className="section-container py-20 md:py-28">
          <p className="font-mono text-sm text-muted-foreground">{tr('Projet suivant', 'Next project')}</p>
          <div className="mt-4 flex items-end justify-between gap-6">
            <p className="font-display font-bold tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,10vw,8rem)] text-stroke group-hover:[background-size:100%_100%]">
              {next.title}
            </p>
            <ArrowUpRight className="w-12 h-12 md:w-20 md:h-20 text-primary transition-transform duration-500 group-hover:rotate-45" />
          </div>
        </div>
      </Link>

      <Footer />

      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(null)}
            className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md grid place-items-center p-4"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={zoom}
              alt=""
              className="max-h-[88vh] max-w-full rounded-xl"
            />
            <button className="absolute top-5 right-5 p-2 rounded-full bg-white/10" aria-label={tr('Fermer', 'Close')}>
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
